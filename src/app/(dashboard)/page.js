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
  timeZone: 'Asia/Jakarta'
}

export default async function MonitoringManagement({ searchParams }) {
  const { search = '', page = 1 } = searchParams

  const skip = (page - 1) * 10

  const result = await prisma?.order_biliard?.findMany({
    skip,
    take: 10,
    where: {
      OR: [
        {
          customer: {
            contains: search
          },
        }, {
          cabang_id: {
            contains: search
          }
        }
      ]
    },
    orderBy: {
      created_at: 'desc',
    },
  }) || []

  return (
    <main className='container mx-auto'>
      <div className='py-9'>
        <div className='flex justify-between items-center'>
          <div>
            <p className='font-bold text-5xl mb-1'>
              Order Billiard
            </p>
            <p className='text-2xl'>
              Order Billiard Masuk
            </p>
          </div>
          <div className='flex gap-3'>
            {/* <Link href="/tambah-kendaraan">
              <Button>Filter Data</Button>
            </Link> */}
          </div>
        </div>
      </div>

      <div>
        <table className='w-full text-left'>
          <thead className='bg-violet-700 text-white'>
            <tr>
              <th className='px-4 py-3'>
                ID Order
              </th>
              <th className='px-4 py-3'>
                Nama Customer
              </th>
              <th className='px-4 py-3'>
                Cabang
              </th>
              <th className='px-4 py-3'>
                Total Bayar
              </th>
              <th className='px-4 py-3'>
                Kasir
              </th>
              <th className='px-4 py-3 text-right'>
                Tanggal Order
              </th>
            </tr>
          </thead>
          <tbody>
            {result.map(item => {
              const entryTime = item?.entry_time ? new Date(item?.entry_time).toLocaleDateString('id', dateOptions) : '-'
              const created_at = item?.created_at ? new Date(item?.created_at).toLocaleDateString('id', dateOptions) : '-'

              const fee = new Intl.NumberFormat('id', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(item?.totalbayar)

              return (
                <tr key={item.id} className='border'>
                  <td className='px-4 py-3'>
                    {item?.id_order_biliard.toString()}
                  </td>
                  <td className='px-4 py-3'>
                    {item?.customer || '-'}
                  </td>
                  <td className='px-4 py-3'>
                    {item?.cabang_id}
                  </td>
                  <td className='px-4 py-3'>
                    {fee}
                  </td>
                  <td className='px-4 py-3'>
                    {item?.created_by}
                  </td>
                  <td className='px-4 py-3 text-right'>
                    {created_at}
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
