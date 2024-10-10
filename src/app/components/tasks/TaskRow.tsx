'use client'
import { type Task } from '@/types/tasks'
import { Estado as Status } from '@prisma/client'
import { TableCell, TableRow } from '@components/ui/table'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@components/ui/select'
import { useState } from 'react'
import { conn } from '@/lib/connection'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import type { User } from '@components/shared/Header'

export default function TaskRow({ row, users }: { row: Task, users: User[] }) {
  const [status, setStatus] = useState(row.estado)
  const optionStatus = Object.values(Status)
  const handleStatusChange = async (value: Status) => {
    try {
      await conn.patch(`/tasks/${row.id}`, { status: value })
      setStatus(value)
      toast.success('Estado actualizado')
    } catch (error) {
      toast.error('No se pudo actualizar el estado')
    }
  }

  const styleStatus = {
    EN_PROGRESO: 'bg-yellow-200 text-yellow-800',
    COMPLETADO: 'bg-green-200 text-green-800',
    PENDIENTE: 'bg-red-200 text-red-800'
  }
  return (
    <TableRow>
      <TableCell className='text-center'>{row.id}</TableCell>
      <TableCell className='text-center'>{row.nombre}</TableCell>
      <TableCell className='text-center'>{row.descripcion}</TableCell>
      <TableCell className=' flex justify-center'>
        <Select onValueChange={handleStatusChange} value={status}>
          <SelectTrigger className={cn('text-center', styleStatus[status])}>
            <SelectValue placeholder={row.estado} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Estado</SelectLabel>
              {optionStatus.map((estado) => (
                <SelectItem key={estado} value={estado}>
                  {estado}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className='text-center'>
        {users.find((user) => user.id === row.asignada_a)?.nombre}
      </TableCell>
    </TableRow>
  )
}
