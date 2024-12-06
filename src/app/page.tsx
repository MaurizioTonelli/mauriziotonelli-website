import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import logoOnaxis from '@/images/logos/onaxis.png'
import logoAutocom from '@/images/logos/autocom.png'
import logoNatgas from '@/images/logos/natgas.png'
import logoMentco from '@/images/logos/mentco.png'
import logoDefault from '@/images/logos/default.png'
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'
import { type ProjectWithSlug, getAllProjects } from '@/lib/projects'
import { formatDate } from '@/lib/formatDate'
import { Button } from '@/components/Button'

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

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

interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

function Role({ role }: { role: Role }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

function Resume() {
  let resume: Array<Role> = [
    {
      company: 'OnAxis',
      title: 'Senior Software Developer',
      logo: logoOnaxis,
      start: '2022',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'Autocom',
      title: 'Senior Software Developer',
      logo: logoAutocom,
      start: '2022',
      end: '2022',
    },
    {
      company: 'Natgas',
      title: 'Software Developer',
      logo: logoNatgas,
      start: '2021',
      end: '2022',
    },
    {
      company: 'Mobil México',
      title: 'Freelance React.js Developer',
      logo: logoMentco,
      start: '2021',
      end: '2021',
    },
    {
      company: 'Rancho Del Carmen',
      title: 'Freelance Winforms Development',
      logo: logoDefault,
      start: '2020',
      end: '2021',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work experience</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
    </div>
  )
}

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
              rotations[imageIndex % rotations.length],
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function Home() {
  let projects = (await getAllProjects()).slice(0, 5)

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h3 className="mb-4 text-2xl font-bold tracking-tight text-zinc-500 sm:text-3xl dark:text-zinc-500">
            Maurizio Tonelli
          </h3>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Full-Stack JavaScript Developer | React.js, Next.js, Node.js
          </h1>
        </div>
        <div className="flex max-w-4xl flex-col items-start justify-between xl:flex-row">
          <div className="order-2 xl:order-1">
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              I&apos;m Maurizio, a passionate full-stack web developer.
            </p>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              I excel in building performant and responsive frontend
              applications using React.js and developing robust backends with
              Node.js and Express.
            </p>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              I can design, create and manage databases such as MongoDB, MySQL,
              and PostgreSQL. Additionally, I have experience working on
              projects with general-purpose programming languages like Python,
              C, C++, and Java.
            </p>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              With experience in developing custom ERP features, financial
              dashboards, and robust web applications, I help businesses improve
              efficiency, streamline workflows, and meet their unique needs.
            </p>
          </div>
          <iframe
            className="order-1 my-12 h-96 min-w-full xl:order-2 xl:my-0 xl:ml-12 xl:mr-[-300px] xl:h-[315px] xl:min-w-[560px]"
            src="https://www.youtube.com/embed/2p0Gk9zCuiA?si=QquSDR-d6jt4Kq0L"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mb-12 space-y-10">
          <Resume />
        </div>
        <div className="flex flex-col gap-16">
          <>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-800 sm:text-4xl dark:text-zinc-100">
              My projects
            </h2>
            {projects.map((project) => (
              <Project key={project.slug} project={project} />
            ))}
          </>
        </div>
        <div className="mt-12 flex flex-row justify-center">
          <Button href="/projects">View all the projects</Button>
        </div>
      </Container>
    </>
  )
}
