export interface NewProject {
  name: string
  description: string
  startDate: string
  endDate: string
}

export interface Project {
  id: number
  nombre: string
  descripcion: string
  fecha_inicio: string
  fecha_finalizacion: string
  usuario_id: number
}
