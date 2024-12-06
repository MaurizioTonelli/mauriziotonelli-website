import glob from 'fast-glob'
import type { StaticImageData } from 'next/image'

interface Project {
  title: string
  description: string
  author: string
  ranking?: number
  date?: string
  thumbnail?: StaticImageData | string
}

export interface ProjectWithSlug extends Project {
  slug: string
}

async function importProject(
  projectFilename: string,
): Promise<ProjectWithSlug> {
  let { project } = (await import(`../app/projects/${projectFilename}`)) as {
    default: React.ComponentType
    project: Project
  }

  return {
    slug: projectFilename.replace(/(\/page)?\.mdx$/, ''),
    ...project,
  }
}

export async function getAllProjects() {
  let projectFilenames = await glob('*/page.mdx', {
    cwd: './src/app/projects',
  })

  let projects = await Promise.all(projectFilenames.map(importProject))
  return projects.sort((a, z) => (a.ranking || 0) - (z.ranking || 0))
}
