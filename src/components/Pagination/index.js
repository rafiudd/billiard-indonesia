'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export default function Pagination({ dataLength }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const currentPage = Number(searchParams.get('page')) || 1

  const onPrevious = () => {
    const previousPage = currentPage - 1
    router.push(pathname + '?' + createQueryString('page', previousPage))
  }

  const onNext = () => {
    const nextPage = currentPage + 1
    router.push(pathname + '?' + createQueryString('page', nextPage))
  }

  return (
    <div className='flex gap-2'>
      <button
        className='w-8 h-8 bg-violet-700 text-white rounded-full disabled:bg-gray-300'
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      <button
        className='w-8 h-8 bg-violet-700 text-white rounded-full disabled:bg-gray-300'
        onClick={onNext}
        disabled={dataLength < 10}
      >
        {'>'}
      </button>
    </div>
  )
}
