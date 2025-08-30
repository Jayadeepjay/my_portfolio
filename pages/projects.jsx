
import { useState } from 'react';
import { projectsData } from '../data/projectdata';
import ProjectCard from '../components/ProjectCard';
import Image from 'next/image';

export default function Projects() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">My Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} onImageClick={setSelectedImage} />
          ))}
        </div>
      </div>

      {/* Modal for full image */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-3xl w-full p-4" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-white text-2xl" onClick={() => setSelectedImage(null)}>&times;</button>
            <Image src={selectedImage} alt="Project Full" width={900} height={600} className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}
    </section>
  );
}