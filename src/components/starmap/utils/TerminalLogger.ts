export type LogLevel = 'info' | 'warn' | 'success';

export interface TerminalLogEvent {
  message: string;
  level: LogLevel;
  timestamp: number;
}

export const addTerminalLog = (message: string, level: LogLevel = 'info') => {
  const event = new CustomEvent<TerminalLogEvent>('starmap-log', {
    detail: { message, level, timestamp: Date.now() },
  });
  window.dispatchEvent(event);
};
