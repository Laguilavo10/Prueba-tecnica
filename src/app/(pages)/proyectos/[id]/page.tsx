import { conn } from '@/lib/connection'
import { TasksTable } from '@components/tasks/TasksTable'

export default async function ProjectId({
  params
}: {
  params: { id: string }
}) {
  const id = params.id
  const { data } = await conn.get(`/tasks?project_id=${id}`)
  return (
    <section className='w-[1200px] m-auto'>
      <TasksTable data={data?.data ?? []} />
    </section>
  )
}
