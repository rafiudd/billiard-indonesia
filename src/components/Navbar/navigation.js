'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navigation ({ isLogin, id }) {
  const pathname = usePathname();

  let navLinks = [
    { name: 'Login', href: '/login' },
  ]

  if(isLogin) {
    navLinks = [
      { name: 'Report Management', href: '/' },
      // { name: 'User Management', href: '/user-management' },
      // { name: 'Profile', href: '/profile' }
    ]
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='flex gap-9 items-center'>
        {navLinks.map(link => {
          const isActive = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${isActive ? 'font-semibold' : 'font-normal'} text-lg`}
            >
              {link.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
