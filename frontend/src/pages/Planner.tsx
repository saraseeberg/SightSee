import PlannerForm from '@/components/molecules/planner/PlannerForm'

const Planner = () => {
  return (
    <main className="w-full flex flex-col items-center pt-3 min-h-[80vh]">
      <h1 className="text-6xl font-bold mt-5 text-center">Plan what to do on your trip!</h1>
      <div className="flex-1 flex flex-col mt-8 items-center w-full">
        <PlannerForm />
      </div>
    </main>
  )
}

export default Planner
