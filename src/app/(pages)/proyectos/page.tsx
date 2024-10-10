'use client'
import { conn } from '@/lib/connection'
import type { Project } from '@/types/projects'
import CreateProjectCard from '@components/projects/CreateProjectCard'
import NewProjectForm from '@components/projects/NewProjectForm'
import ProjectCard from '@components/projects/ProjectCard'
import Header from '@components/shared/Header'
import { useEffect, useState } from 'react'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  useEffect(() => {
    conn.get<Record<'data', Project[]>>('/projects').then((response) => {
      setProjects(response.data.data)
    })
  }, [])
  return (
    <>
      <Header />
      <div className='max-w-[1500px] m-auto my-10 p-10 flex flex-col gap-5 '>
        <h2 className='font-bold text-2xl'>Tus Proyectos</h2>
        <div className='grid grid-cols-auto-fit gap-5 '>
          <CreateProjectCard />
          {projects.length === 0 && (
            <p className='text-center font-bold text-xl'>
              No Tienes Proyectos activos
            </p>
          )}
          {projects.map((item, index) => (
            <ProjectCard key={index} project={item} />
          ))}
        </div>
      </div>
    </>
  )
}
