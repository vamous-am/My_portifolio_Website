"use client";

/** Renders a single project entry from `PROJECT_ITEMS`.
 *
 *  Active card (`isPlaceholder` false/undefined): screenshot in `aspect-video` with `next/image fill`,
 *  responsive `sizes` attribute, `onError` fallback panel, tech badges, and accessible action buttons.
 *  Live Demo button is hidden when `liveUrl` is absent.
 *
 *  Placeholder card (`isPlaceholder` true): dashed border, muted Construction icon panel,
 *  "Coming Soon" badge — no image, no links, `hoverable={false}`. */

import Image from "next/image";
import { useState } from "react";
import { GitBranch, ExternalLink, ImageOff, Construction } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);

  if (project.isPlaceholder) {
    return (
      <Card hoverable={false} className="border-dashed border-foreground/20 cursor-not-allowed h-full flex flex-col">
        <div className="w-full aspect-video rounded-md bg-foreground/5 flex items-center justify-center mb-4">
          <Construction className="w-10 h-10 text-foreground/20" aria-hidden="true" />
        </div>
        <h3 className="font-heading text-lg font-semibold text-foreground/40 mb-2">{project.title}</h3>
        <p className="text-sm text-foreground/40 leading-relaxed flex-1">{project.description}</p>
        <div className="mt-4">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full border border-dashed border-foreground/20 text-foreground/40">
            Coming Soon
          </span>
        </div>
      </Card>
    );
  }

  return (
    <Card hoverable className="flex flex-col h-full">
      {project.imageUrl && (
        <div className="relative w-full aspect-video rounded-md overflow-hidden mb-4 bg-foreground/5">
          {!imgError ? (
            <Image
              src={project.imageUrl}
              alt={project.imageAlt ?? project.title ?? "Project screenshot"}
              fill
              quality={100}
              className="object-cover object-top"
              onError={() => setImgError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageOff className="w-8 h-8 text-foreground/20" aria-hidden="true" />
            </div>
          )}
        </div>
      )}

      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{project.title}</h3>
      <p className="text-sm text-foreground/60 leading-relaxed mb-4 flex-1">{project.description}</p>

      {project.techStack && project.techStack.length > 0 && (
        <ul className="flex flex-wrap gap-2 mb-4" aria-label={`Technologies used in ${project.title}`}>
          {project.techStack.map((tech) => (
            <li key={tech}>
              <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 border border-primary/20 text-primary-text font-medium">
                {tech}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-3 mt-auto">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View GitHub repository for ${project.title}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-foreground/20 text-foreground/70 hover:border-foreground/40 hover:text-foreground transition-colors"
          >
            <GitBranch className="w-4 h-4" aria-hidden="true" />
            GitHub Repo
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live demo of ${project.title}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-primary/40 text-primary-text hover:bg-primary/10 hover:border-primary/60 transition-colors"
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            Live Demo
          </a>
        )}
      </div>
    </Card>
  );
}
