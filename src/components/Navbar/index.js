import Logo from '@/components/Logo'
import Link from 'next/link'
import Navigation from './navigation'

export default function Navbar ({ isLogin, id}) {
  return (
    <nav className='py-6 sticky top-0 bg-white z-10 shadow-[0px_2px_30px_10px_rgba(0,0,0,0.05)]'>
      <div className='container px-4 md:px-0 mx-auto flex justify-between'>
        <Link href="/">
          <Logo />
        </Link>
        <Navigation isLogin={isLogin} id={id} />
      </div>
    </nav>
  )
}
