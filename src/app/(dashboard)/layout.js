import Navbar from '@/components/Navbar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function DashboardLayout({ children }) {
  const cookieStore = cookies()
  const isLogin = cookieStore.get('isLogin')
  const id = cookieStore.get('id')

  if (!isLogin) {
    redirect('/login')
  }

  return (
    <div>
      <Navbar isLogin={isLogin?.value ? isLogin.value : false} id={ id?.value } />
      <div className='py-16'>
        {children}
      </div>
    </div>
  )
}
