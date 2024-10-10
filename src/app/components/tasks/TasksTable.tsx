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

const headers = [
  'Id',
  'Nombre',
  'Descripción',
  'Estado',
  'Asignado a'
]
export function TasksTable({ data }: { data: Task[] }) {
  return (
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
            <TaskRow row={row} key={index}/>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
