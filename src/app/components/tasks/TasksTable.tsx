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
import { decodeJWT } from '@/lib/decodeJWT'
import Cookies from 'js-cookie'

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
  const [userRole, setUserRole] = useState('')
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    conn.get<Record<'data', User[]>>('/user').then((response) => {
      setUsers(response.data.data)
    })
    const token = Cookies.get('Token') ?? ''
    const decodedToken = decodeJWT(token)
    setUserRole(decodedToken?.rol as string)
  }, [])

  return (
    <>
      <NewTaskForm users={users} projectId={projectId} setTasks={setTasks}>
        <Button className={userRole !== 'ADMIN' ? 'hidden' : ''}>
          Crear Tarea
        </Button>
      </NewTaskForm>
      <section id='truth-table' className='max-w-[1200px] m-auto'>
        <Table className='overflow-auto'>
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
              <TaskRow row={row} key={index} users={users} />
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  )
}
