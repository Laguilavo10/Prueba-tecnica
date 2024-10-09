import CreateProjectCard from '@components/projects/CreateProjectCard'
import NewProjectForm from '@components/projects/NewProjectForm'
import ProjectCard from '@components/projects/ProjectCard'

export default function Projects() {
  return (
    <div className='max-w-[1500px] m-auto my-10 p-10 flex flex-col gap-5 '>
      <h2 className='font-bold text-2xl'>Tus Projectos</h2>
      <section className='grid grid-cols-auto-fit gap-5 '>
        <NewProjectForm>
          <CreateProjectCard />
        </NewProjectForm>
        {[null, null, null, null, null, null, null, null, null, null].map(
          (_, index) => (
            <ProjectCard key={index} />
          )
        )}
      </section>
    </div>
  )
}
