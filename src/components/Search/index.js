'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import Input from '../Input'

export default function Search(props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      params.delete('page')
 
      return params.toString()
    },
    [searchParams]
  )

  const onSubmit = (event) => {
    event.preventDefault()

    const searchValue = event?.target?.search?.value
    router.push(pathname + '?' + createQueryString('search', searchValue))
  }
 
  return (
    <form onSubmit={onSubmit}>
      <Input name="search" {...props} />
    </form>
  )
}
