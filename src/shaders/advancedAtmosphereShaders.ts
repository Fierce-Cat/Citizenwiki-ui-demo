export const advancedAtmosphereVertexShader = `
varying vec3 vWorldPosition;
varying vec3 vNormal;

void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

export const advancedAtmosphereFragmentShader = `
uniform vec3 planetPosition;
uniform float planetRadius;
uniform float atmosphereRadius;
uniform vec3 lightDirection;
uniform vec3 lightColor;
uniform vec3 Kr; // Rayleigh absorption constant
uniform float time;

varying vec3 vWorldPosition;
varying vec3 vNormal;

#define PI 3.1415927

// credit: iq/rgba
float hash( float n ) {
    return fract(sin(n)*43758.5453);
}

float iSphere(in vec3 ro, in vec3 rd, in vec4 sph) {
    float r = sph.w;
    vec3 oc = ro - sph.xyz;
    float b = 2.0 * dot(oc, rd);
    float c = dot(oc, oc) - r * r;
    float h = b * b - 4.0 * c;
    if (h < 0.0) return -1.0;
    return (-b - sqrt(h)) / 2.0;
}

float iSphere2(in vec3 ro, in vec3 rd, in vec4 sph) {
    float r = sph.w;
    vec3 oc = ro - sph.xyz;
    float b = 2.0 * dot(oc, rd);
    float c = dot(oc, oc) - r * r;
    float h = b * b - 4.0 * c;
    if (h < 0.0) return -1.0;
    return (-b + sqrt(h)) / 2.0;
}

struct iMediaIntersection {
    float tnear;
    float tfar;
    uint mnear;
    uint mfar;
    vec3 nor;
};

iMediaIntersection mSphere(in vec3 ro, in vec3 rd, in vec4 sph, in float sphgnd) {
    iMediaIntersection res;
    res.tnear = -1.0;
    res.tfar = -1.0;
    res.mnear = 0u;
    res.mfar = 0u;
    res.nor = vec3(0.0);
    
    float r = sph.w;
    vec3 oc = ro - sph.xyz;
    float b = 2.0 * dot(oc, rd);
    float c = dot(oc, oc) - r * r;
    float h = b * b - 4.0 * c;
    
    if (h >= 0.0) {
        float hsqrt = sqrt(h);
        res.tnear = (-b - hsqrt) / 2.0;
        res.mnear = 1u;
        
        res.tfar = (-b + hsqrt) / 2.0;
        res.mfar = 1u;
        
        r = sphgnd;
        c = dot(oc, oc) - r * r;
        h = b * b - 4.0 * c;
        
        if (h >= 0.0) {
            res.tfar = (-b - sqrt(h)) / 2.0;
            res.mfar = 2u;
            res.nor = normalize(ro + rd * res.tfar - sph.xyz);
        }
    }
    return res;
}

float phase(float alpha, float g) {
    float gg = g * g;
    float a = 3.0 * (1.0 - gg);
    float b = 2.0 * (2.0 + gg);
    float c = 1.0 + alpha * alpha;
    float d = pow(1.0 + gg - 2.0 * g * alpha, 1.5);
    return (a / b) * (c / d);
}

vec3 absorb(float dist, vec3 col, float f, vec3 Kr_val) {
    vec3 c = col;    
    c *= (vec3(1.0) - pow(Kr_val, vec3(f / max(dist, 0.0000000001))));
    c *= (vec3(1.0) - pow(vec3(0.05, 0.7, 0.9), vec3(f / max(dist * 0.5, 0.0000000001))));
    c *= (vec3(1.0) - pow(vec3(0.01, 0.85, 0.9), vec3(f / max(dist * 0.1, 0.0000000001))));
    return c;
}

float airDensity(float alt) {
    return max(0.0, 5.0 * exp(-7.0 * alt) * (1.0 - alt));
}

void main() {
    vec3 ro = cameraPosition;
    vec3 rd = normalize(vWorldPosition - cameraPosition);
    
    vec3 light = normalize(lightDirection);
    vec3 lightcol = lightColor;
    
    vec4 sph1 = vec4(planetPosition, atmosphereRadius);
    float sph1gnd = planetRadius;
    
    iMediaIntersection hit = mSphere(ro, rd, sph1, sph1gnd);
    
    // If we are inside the atmosphere, tnear will be negative. We should start raymarching from 0.
    // If tfar is negative, the whole intersection is behind us, so we discard.
    if (hit.tfar < 0.0) {
        discard;
    }
    
    hit.tnear = max(0.0, hit.tnear);
    
    if (hit.tfar <= hit.tnear) {
        discard;
    }
    
    float sph1atmscale = 1.0 / (sph1.w - sph1gnd); 
    
    float miePhaseVal = 0.97;
    float ralPhaseVal = -0.01;
    float absorbCoeff = 0.8;
    
    float density = 0.0;
    vec3 col = vec3(0.0);
    
    if (hit.mnear == 1u) {
        float mie = phase(dot(rd, light), miePhaseVal) * 0.005;
        float rayleigh = phase(dot(rd, light), ralPhaseVal) * 1.4;
        
        float litDensity = 0.0;
        float dt = (hit.tfar - hit.tnear) * 0.03;
        
        vec3 mieAccum = vec3(0.0);
        vec3 rayleighAccum = vec3(0.0);
        
        for(float t = hit.tnear; t < hit.tfar - 0.00001; t += dt) {
            vec3 apos = ro + rd * t;
            float alt = (length(apos - sph1.xyz) - sph1gnd) * sph1atmscale;
            
            float lt = iSphere(apos, light, vec4(sph1.xyz, sph1gnd));
            float sliceDensity = dt * airDensity(alt);
            float litSlice = sliceDensity * (lt < 0.0 ? 1.0 : 0.0);
            
            vec3 influx = vec3(0.0);
            
            if (lt < 0.0) {
                float tsun = iSphere2(apos, light, sph1);
                float dtl = tsun * 0.1;
                float densitytosun = 0.0;
                
                for (float tl = 0.0; tl < tsun; tl += dtl) {
                    vec3 spos = apos + light * tl;
                    densitytosun += dtl * airDensity((length(spos - sph1.xyz) - sph1gnd) * sph1atmscale);
                }
                
                influx = absorb(densitytosun, lightcol, absorbCoeff, Kr);
            }
            
            density += sliceDensity;
            litDensity += litSlice;
            
            mieAccum += absorb(density, influx * mie * litSlice, absorbCoeff, Kr);
            rayleighAccum += absorb(density, influx * Kr * rayleigh * litSlice, absorbCoeff, Kr);
        }
        
        vec3 acol = mieAccum + rayleighAccum;
        
        if (hit.mfar == 1u || hit.mfar == 2u) {
            col = acol;
        }
    }
    
    // Tonemapping
    float whitelevel = 2.0;
    col = (col * (vec3(1.0) + (col / (whitelevel * whitelevel)))) / (vec3(1.0) + col);
    
    // Gamma
    col = pow(max(col, 0.0), vec3(1.0 / 2.2));
    
    gl_FragColor = vec4(col, 1.0);
}
`;
