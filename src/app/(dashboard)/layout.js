import Navbar from '@/components/Navbar'

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className='py-16'>
        {children}
      </div>
    </div>
  )
}
