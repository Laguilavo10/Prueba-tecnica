import type { Tarea, Estado as Status } from '@prisma/client'

export interface Task extends Tarea {}
export { Status }
