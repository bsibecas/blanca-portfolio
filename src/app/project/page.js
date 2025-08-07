import { Suspense } from 'react';
import ProjectClient from './ProjectClient';

export default function ProjectPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading project...</div>}>
      <ProjectClient />
    </Suspense>
  );
}
