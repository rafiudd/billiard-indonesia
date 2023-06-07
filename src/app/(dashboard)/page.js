import Button from '@/components/Button'
import Input from '@/components/Input'
import Image from 'next/image'
// import prisma from '@/lib/prisma'

const statistics = [
  {
    name: 'car',
    title: 'Mobil',
    value: '196 Kendaraan',
    icon: '/svg/car.svg'
  },
  {
    name: 'motorcycle',
    title: 'Motor',
    value: '116 Kendaraan',
    icon: '/svg/motorcycle.svg'
  },
  {
    name: 'truck',
    title: 'Truk',
    value: '24 Kendaraan',
    icon: '/svg/truck.svg'
  },
  {
    name: 'bus',
    title: 'Bus',
    value: '5 Kendaraan',
    icon: '/svg/bus.svg',
  },
  {
    name: 'income',
    title: 'Rp9.000.000',
    value: 'Total Pendapatan',
    icon: '/image/income.png',
  },
]

const tableData = [
  {
    id: 'PRK-8523245',
    number_plate: 'R 24923 94',
    entry_time: 'Kamis, 17 Januari 2023 15:15',
    exit_time: 'Kamis, 17 Januari 2023 15:15',
    fee: 'Rp5.000'
  },
  {
    id: 'PRK-8523243',
    number_plate: 'R 24923 94',
    entry_time: 'Kamis, 17 Januari 2023 15:15',
    exit_time: '',
    fee: ''
  },
]

export default async function MonitoringManagement() {
  // const result = await prisma?.vehicle?.findMany() || []
  // console.log(result)

  return (
    <main className='container mx-auto'>
      <div>
        <h1 className='font-bold text-5xl mb-1'>
          Dashboard Monitoring Parkirin
        </h1>
        <h2 className='text-2xl'>
          Statistik Kendaraan Yang Parkir Hari Ini
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
              Statistik Kendaraan Yang Parkir Hari Ini
            </p>
          </div>
          <div className='flex gap-3'>
            <Button>Tambah Data</Button>
            <Input className="w-96" placeholder="Cari Berdasar ID Parkir / Plat Nomor" />
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
            {tableData.map(item => (
              <tr key={item.id} className='border'>
                <td className='px-4 py-3'>
                  {item.id || '-'}
                </td>
                <td className='px-4 py-3'>
                  {item.number_plate || '-'}
                </td>
                <td className='px-4 py-3'>
                  {item.entry_time || '-'}
                </td>
                <td className='px-4 py-3'>
                  {item.exit_time || '-'}
                </td>
                <td className='px-4 py-3'>
                  {item.fee || '-'}
                </td>
                <td className='px-4 py-3'>
                  {!item.fee ? (
                    <Button size='small' variant='secondary'>Keluar</Button>
                  ) : (
                    <Button size='small'>Lunas</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
