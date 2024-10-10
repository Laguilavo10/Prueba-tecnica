'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from '@components/ui/table'
import type { Task } from '@/types/tasks'
import TaskRow from './TaskRow'
import NewTaskForm from './NewTaskForm'
import { Button } from '@components/ui/button'
import { useEffect, useState } from 'react'
import { conn } from '@/lib/connection'
import type { User } from '@components/shared/Header'

const headers = ['Id', 'Nombre', 'Descripción', 'Estado', 'Asignado a']
export function TasksTable({
  data,
  projectId,
  setTasks
}: {
  data: Task[]
  projectId: number
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}) {
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    conn.get<Record<'data', User[]>>('/user').then((response) => {
      setUsers(response.data.data)
    })
  }, [])
  return (
    <>
      <NewTaskForm users={users} projectId={projectId} setTasks={setTasks}>
        <Button>Crear Tarea</Button>
      </NewTaskForm>
      <section id='truth-table'>
        <Table className='overflow-y-auto'>
          <TableCaption>Tabla de verdad</TableCaption>
          <TableHeader>
            <TableRow>
              {headers.map((header: string) => (
                <TableHead key={header} className='text-center font-bold'>
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((row, index) => (
              <TaskRow row={row} key={index} />
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  )
}
