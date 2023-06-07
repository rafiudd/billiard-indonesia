import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: '800',
  subsets: ['latin']
})

export default function Logo () {
  return (
    <div className='px-9 py-3 bg-violet-700 w-fit'>
      <p className={`${poppins.className} text-2xl text-white`}>
        Parkirin.
      </p>
    </div>
  )
}
