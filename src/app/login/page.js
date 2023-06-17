import Form from './form'

export default async function FormCreateUser() {
  return (
    <main className="container mx-auto py-[20vh]">
      <div className="p-10 shadow-[0px_2px_30px_10px_rgba(0,0,0,0.03)] w-[767px] mx-auto">
        <h1 className="text-5xl font-bold mb-8 mt-2 text-center">
          Login
        </h1>
        <Form />
      </div>
    </main>
  )
}