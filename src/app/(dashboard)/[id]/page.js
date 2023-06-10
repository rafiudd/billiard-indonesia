import Link from 'next/link'
import Form from './form'
import prisma from '@/lib/prisma'

export default async function EditVehicle({ params }) {
  const { id } = params

  const data = await prisma?.vehicle?.findUnique({
    where: {
      id
    }
  })
  
  return (
    <main className="container mx-auto">
      <div className="p-10 shadow-[0px_2px_30px_10px_rgba(0,0,0,0.03)] w-[767px] mx-auto">
        <Link href="/" className="text-2xl">
          {'< Kembali'}
        </Link>
        <h1 className="text-5xl font-bold mb-8 mt-2">
          Update Data
        </h1>
        <Form data={data} />
      </div>
    </main>
  )
}