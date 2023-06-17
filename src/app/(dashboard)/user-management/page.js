import Button from '@/components/Button'
import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import Search from '@/components/Search'
import Pagination from '@/components/Pagination'

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
}

export default async function UserManagement({ searchParams }) {
  const { search = '', page = 1 } = searchParams

  const skip = (page - 1) * 10

  const result = await prisma?.users?.findMany({
    skip,
    take: 10,
    where: {
      OR: [
        {
          fullname: {
            contains: search
          },
        }, {
          email: {
            contains: search
          }
        }
      ]
    },
    orderBy: {
      last_login: 'desc',
    },
  }) || []

  return (
    <main className='container mx-auto'>
      <div className='py-9'>
        <div className='flex justify-between items-center'>
          <div>
            <p className='font-bold text-5xl mb-1'>
              User Management
            </p>
            <p className='text-2xl'>
              Management User Parkirin
            </p>
          </div>
          <div className='flex gap-3'>
            <Link href="/user-management/create">
              <Button>Tambah Data</Button>
            </Link>
            <Search
              className="w-96"
              placeholder="Cari Berdasar Nama / Email"
            />
          </div>
        </div>
      </div>

      <div>
        <table className='w-full text-left'>
          <thead className='bg-violet-700 text-white'>
            <tr>
              <th className='px-4 py-3'>
                ID User
              </th>
              <th className='px-4 py-3'>
                Nama Lengkap
              </th>
              <th className='px-4 py-3'>
                Email
              </th>
              <th className='px-4 py-3'>
                No HP
              </th>
              <th className='px-4 py-3'>
                Login Terakhir
              </th>
              <th className='px-4 py-3'>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {result.map(item => {
              const lastLogin = item?.last_login ? new Date(item?.last_login).toLocaleDateString('id', dateOptions) : '-'
         
              return (
                <tr key={item.id} className='border'>
                  <td className='px-4 py-3'>
                    {item?.id || '-'}
                  </td>
                  <td className='px-4 py-3'>
                    {item?.fullname || '-'}
                  </td>
                  <td className='px-4 py-3'>
                    {item.email}
                  </td>
                  <td className='px-4 py-3'>
                    {item.phone}
                  </td>
                  <td className='px-4 py-3'>
                    {lastLogin}
                  </td>
                  <td className='px-4 py-3'>
                  <Link href={'/user-management/' + item.id}>
                    <Button size='small' variant='secondary'>Ubah</Button>
                  </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className='w-full flex justify-end py-4'>
          <Pagination dataLength={result?.length} />
        </div>
      </div>
    </main>
  )
}
