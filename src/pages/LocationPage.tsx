import React from 'react';
import { useParams } from 'react-router-dom';
import { MainContent } from '../components/ui/location/MainContent';
import { ContextSidebar } from '../components/ui/context-sidebar/ContextSidebar';

export function LocationPage() {
  const { id } = useParams();
  
  // In a real app, we would fetch data based on the ID.
  // For now, we'll just render the static Area 18 content.
  
  return (
    <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden">
      <MainContent />
      <ContextSidebar />
    </div>
  );
}
