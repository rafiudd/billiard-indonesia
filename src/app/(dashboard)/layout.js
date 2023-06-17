import Navbar from '@/components/Navbar'
import { cookies } from 'next/headers'

export default function DashboardLayout({ children }) {
  const cookieStore = cookies()
  const isLogin = cookieStore.get('isLogin')
  const id = cookieStore.get('id')

  console.log(isLogin, id, 'cookies')

  return (
    <div>
      <Navbar isLogin={isLogin.value} id={id.value} />
      <div className='py-16'>
        {children}
      </div>
    </div>
  )
}
