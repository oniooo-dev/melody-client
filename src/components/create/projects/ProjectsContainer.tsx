import React from 'react'
import ProjectBanner from './ProjectBanner';

interface Project {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl: string;
  duration: number;
  isPublic: boolean;
}

const projects: Project[] = [
  {
    id: "1",
    userId: "1",
    name: "Project 1",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    thumbnailUrl: "https://png.pngtree.com/thumb_back/fh260/background/20230616/pngtree-faceted-abstract-background-in-3d-with-shimmering-iridescent-metallic-texture-of-image_3603748.jpg",
    duration: 100,
    isPublic: true,
  },
  {
    id: "2",
    userId: "2",
    name: "Project 2",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    thumbnailUrl: "https://png.pngtree.com/thumb_back/fh260/background/20230616/pngtree-faceted-abstract-background-in-3d-with-shimmering-iridescent-metallic-texture-of-image_3603748.jpg",
    duration: 100,
    isPublic: true,
  },
  {
    id: "3",
    userId: "3",
    name: "Project 3",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    thumbnailUrl: "https://png.pngtree.com/thumb_back/fh260/background/20230616/pngtree-faceted-abstract-background-in-3d-with-shimmering-iridescent-metallic-texture-of-image_3603748.jpg",
    duration: 100,
    isPublic: true,
  },
  {
    id: "4",
    userId: "4",
    name: "Project 4",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    thumbnailUrl: "https://png.pngtree.com/thumb_back/fh260/background/20230616/pngtree-faceted-abstract-background-in-3d-with-shimmering-iridescent-metallic-texture-of-image_3603748.jpg",
    duration: 100,
    isPublic: true,
  },
  {
    id: "5",
    userId: "5",
    name: "Project 5",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    thumbnailUrl: "https://png.pngtree.com/thumb_back/fh260/background/20230616/pngtree-faceted-abstract-background-in-3d-with-shimmering-iridescent-metallic-texture-of-image_3603748.jpg",
    duration: 100,
    isPublic: true,
  },
  {
    id: "6",
    userId: "6",
    name: "Project 6",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    thumbnailUrl: "https://png.pngtree.com/thumb_back/fh260/background/20230616/pngtree-faceted-abstract-background-in-3d-with-shimmering-iridescent-metallic-texture-of-image_3603748.jpg",
    duration: 100,
    isPublic: true,
  },
]

const ProjectsContainer = () => {
  return (
    <div
      className="grid grid-cols-6 gap-4 w-full"
    >
      {
        projects.map(
          (project) => (
            <ProjectBanner
              key={project.id}
              id={project.id}
              userId={project.userId}
              name={project.name}
              createdAt={project.createdAt}
              updatedAt={project.updatedAt}
              thumbnailUrl={project.thumbnailUrl}
              duration={project.duration}
              isPublic={project.isPublic}
            />
          )
        )
      }
    </div>
  )
}

export default ProjectsContainer