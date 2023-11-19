import Form from './form'

export default async function FormCreateUser() {
  return (
  <main className="container mx-auto py-10 sm:py-20">
    <div className="p-6 sm:p-10 shadow-lg w-full sm:w-[767px] mx-auto">
      <h1 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 mt-2 text-center">
        Login
      </h1>
      <Form />
    </div>
  </main>
  )
}