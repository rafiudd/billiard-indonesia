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

export default async function MonitoringManagement({ searchParams }) {
  const { search = '', page = 1 } = searchParams

  const skip = (page - 1) * 10

  const result = await prisma?.vehicle?.findMany({
    skip,
    take: 10,
    where: {
      OR: [
        {
          number_plate: {
            contains: search
          },
        }, {
          id: {
            contains: search
          }
        }
      ]
    },
    orderBy: {
      entry_time: 'desc',
    },
  }) || []

  const carTotal = await prisma?.vehicle?.count({
    where: {
      category: 'CAR'
    }
  }) || 0

  const motorTotal = await prisma?.vehicle?.count({
    where: {
      category: 'MOTORCYCLE'
    }
  }) || 0

  const truckTotal = await prisma?.vehicle?.count({
    where: {
      category: 'TRUCK'
    }
  }) || 0

  const busTotal = await prisma?.vehicle?.count({
    where: {
      category: 'BUS'
    }
  }) || 0

  const sumFee = await prisma?.vehicle?.aggregate({
    _sum: {
      fee: true
    }
  })

  const income = new Intl.NumberFormat('id', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(sumFee?._sum?.fee)

  const statistics = [
    {
      name: 'car',
      title: 'Mobil',
      value: `${carTotal} Kendaraan`,
      icon: '/svg/car.svg'
    },
    {
      name: 'motorcycle',
      title: 'Motor',
      value: `${motorTotal} Kendaraan`,
      icon: '/svg/motorcycle.svg'
    },
    {
      name: 'truck',
      title: 'Truk',
      value: `${truckTotal} Kendaraan`,
      icon: '/svg/truck.svg'
    },
    {
      name: 'bus',
      title: 'Bus',
      value: `${busTotal} Kendaraan`,
      icon: '/svg/bus.svg',
    },
    {
      name: 'income',
      title: income || 0,
      value: 'Total Pendapatan',
      icon: '/image/income.png',
    },
  ]

  return (
    <main className='container mx-auto'>
      <div>
        <h1 className='font-bold text-5xl mb-1'>
          Dashboard Monitoring Parkirin
        </h1>
        <h2 className='text-2xl'>
          Statistik Kendaraan Parkirin
        </h2>
      </div>

      <div className='flex flex-wrap gap-6 py-9'>
        {statistics.map(stat => (
          <div
            key={stat.name}
            className='px-7 py-4 min-w-[179px] rounded shadow-[4px_4px_20px_4px_rgba(0,0,0,0.05)]'
          >
            <div className='relative text-center flex justify-center w-32 h-11 mx-auto'>
              <Image
                src={stat.icon}
                alt={stat.name}
                fill
                className='object-contain'
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className='text-center mt-4'>
              <p className='font-semibold text-2xl'>{stat.title}</p>
              <p className='text-lg'>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='py-9'>
        <div className='flex justify-between items-center'>
          <div>
            <p className='font-bold text-5xl mb-1'>
              Tabel Kendaraan
            </p>
            <p className='text-2xl'>
              Tabel Kendaraan Parkirin
            </p>
          </div>
          <div className='flex gap-3'>
            <Link href="/tambah-kendaraan">
              <Button>Tambah Data</Button>
            </Link>
            <Search
              className="w-96"
              placeholder="Cari Berdasar ID Parkir / Plat Nomor"
            />
          </div>
        </div>
      </div>

      <div>
        <table className='w-full text-left'>
          <thead className='bg-violet-700 text-white'>
            <tr>
              <th className='px-4 py-3'>
                ID Parkir
              </th>
              <th className='px-4 py-3'>
                Plat Nomor
              </th>
              <th className='px-4 py-3'>
                Jam Masuk
              </th>
              <th className='px-4 py-3'>
                Jam Keluar
              </th>
              <th className='px-4 py-3'>
                Biaya
              </th>
              <th className='px-4 py-3'>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {result.map(item => {
              const entryTime = item?.entry_time ? new Date(item?.entry_time).toLocaleDateString('id', dateOptions) : '-'
              const exitTime = item?.exit_time ? new Date(item?.exit_time).toLocaleDateString('id', dateOptions) : '-'

              const fee = new Intl.NumberFormat('id', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(item?.fee)

              return (
                <tr key={item.id} className='border'>
                  <td className='px-4 py-3'>
                    {item?.id || '-'}
                  </td>
                  <td className='px-4 py-3'>
                    {item?.number_plate || '-'}
                  </td>
                  <td className='px-4 py-3'>
                    {entryTime}
                  </td>
                  <td className='px-4 py-3'>
                    {exitTime}
                  </td>
                  <td className='px-4 py-3'>
                    {fee}
                  </td>
                  <td className='px-4 py-3'>
                    {item?.status === 'PARK' ? (
                      <Link href={'/' + item.id}>
                        <Button size='small' variant='secondary'>Keluar</Button>
                      </Link>
                    ) : (
                      <Button size='small' disabled>Lunas</Button>
                    )}
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
