import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: '800',
  subsets: ['latin']
})

export default function Logo (props) {
  console.log(props, 'PROPS')
  return (
    <div className='px-9 py-3'>
      <p className={`${poppins.className} text-2xl`}>
        Billiard Indonesia
      </p>
    </div>
  )
}
