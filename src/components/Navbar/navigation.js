'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navLinks = [
  { name: 'Monitoring Management', href: '/' },
  { name: 'User Management', href: '/user-management' },
  { name: 'Profile', href: '/profile' },
]

export default function Navigation () {
  const pathname = usePathname();

  return (
    <div className='flex items-center justify-center'>
      <div className='flex gap-9'>
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
