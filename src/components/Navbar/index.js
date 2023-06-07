import Logo from '@/components/Logo'
import Link from 'next/link'
import Navigation from './navigation'

export default function Navbar () {
  return (
    <nav className='py-6 sticky top-0 bg-white z-10 shadow-[0px_2px_30px_10px_rgba(0,0,0,0.05)]'>
      <div className='container mx-auto flex justify-between'>
        <Link href="/">
          <Logo />
        </Link>
        <Navigation />
      </div>
    </nav>
  )
}
