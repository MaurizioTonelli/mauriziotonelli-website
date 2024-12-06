import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type ProjectWithSlug, getAllProjects } from '@/lib/projects'
import { formatDate } from '@/lib/formatDate'

function Project({ project }: { project: ProjectWithSlug }) {
  return (
    <Card as="article">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        {project.thumbnail && <Card.Thumbnail src={project.thumbnail} />}

        <article>
          <Card.Title href={`/projects/${project.slug}`}>
            {project.title}
          </Card.Title>
          {project.date && (
            <Card.Eyebrow as="time" dateTime={project.date} decorate>
              {formatDate(project.date)}
            </Card.Eyebrow>
          )}
          <Card.Description>{project.description}</Card.Description>
          <Card.Cta>Read project description</Card.Cta>
        </article>
      </div>
    </Card>
  )
}

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Some of my most recent development projects.',
}

export default async function ProjectsIndex() {
  let projects = await getAllProjects()

  return (
    <SimpleLayout
      title="My projects"
      intro="Some of my most recent development projects."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {projects.map((project) => (
            <Project key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
