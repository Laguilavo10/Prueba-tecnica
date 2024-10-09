import { conn } from '@/lib/connection'
import type { Project } from '@/types/projects'
import CreateProjectCard from '@components/projects/CreateProjectCard'
import NewProjectForm from '@components/projects/NewProjectForm'
import ProjectCard from '@components/projects/ProjectCard'

export default async function Projects() {
  const projects = await conn.get<Record<'data', Project[]>>('/projects')
  const items = projects?.data?.data ?? []
  return (
    <div className='max-w-[1500px] m-auto my-10 p-10 flex flex-col gap-5 '>
      <h2 className='font-bold text-2xl'>Tus Projectos</h2>
      <section className='grid grid-cols-auto-fit gap-5 '>
        <NewProjectForm>
          <CreateProjectCard />
        </NewProjectForm>
        {items.map((item, index) => (
          <ProjectCard
            key={index}
            project={item}
          />
        ))}
      </section>
    </div>
  )
}
