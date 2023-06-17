import Form from './form'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'

export default async function FormCreateUser() {
  const cookieStore = cookies()
  const id = cookieStore.get('id')?.value

  const data = await prisma?.users?.findUnique({
    where: {
      id
    }
  })
  
  return (
    <main className="container mx-auto">
      <div className="p-10 shadow-[0px_2px_30px_10px_rgba(0,0,0,0.03)] w-[767px] mx-auto">
        <h1 className="text-5xl font-bold mb-8 mt-2 text-center">
          Profile
        </h1>
        <Form data={data} />
      </div>
    </main>
  )
}