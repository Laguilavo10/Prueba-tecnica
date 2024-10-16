'use client'
import { conn } from '@/lib/connection'
import type { Project } from '@/types/projects'
import type { Task } from '@/types/tasks'
import OptionsButtonsProjects from '@components/projects/OptionsButtonsProjects'
import Header from '@components/shared/Header'
import { TasksTable } from '@components/tasks/TasksTable'
import { useEffect, useState } from 'react'

export default function ProjectId({ params }: { params: { id: string } }) {
  const id = params.id

  const [tasks, setTasks] = useState<Task[]>([])
  const [project, setProject] = useState<Project>({
    id: 0,
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_finalizacion: '',
    usuario_id: 0
  })
  useEffect(() => {
    conn
      .get<Record<'data', Task[]>>(`/tasks?project_id=${id}`)
      .then((response) => {
        setTasks(response.data.data)
      })
    conn.get<Record<'data', Project>>(`/projects/${id}`).then((response) => {
      setProject(response.data.data)
    })
  }, [])
  return (
    <>
      <Header />
      <section className='max-w-[1200px] m-auto flex flex-col gap-10 my-10 px-10'>
        <div className='flex justify-between'>
          <h2 className='font bold text-xl'>
            Proyecto #{id}:{' '}
            <span className='italic font-normal'>{project.nombre}</span>{' '}
          </h2>
          <OptionsButtonsProjects project={project} setProject={setProject} />
        </div>
        <TasksTable data={tasks ?? []} projectId={Number(id)} setTasks={setTasks}/>
      </section>
    </>
  )
}
