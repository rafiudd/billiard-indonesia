"use client"
import { useState, useCallback } from "react"
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import Filter from "@/components/Filter"
import RangeDatePicker from "@/components/RangeDatePicker"

export default function FormFilter() {
  const [date, setDate] = useState({
    startDate: new Date().toISOString().split('T')[0], 
    endDate: new Date().toISOString().split('T')[0] 
  })
  const [branch, setBranch] = useState("XT Billiard")

  const router = useRouter()

  const onSubmit = (event) => {
    event.preventDefault()
    router.push(`/?filter=${branch}&startDate=${date.startDate}&endDate=${date.endDate}`)
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center flex-row flex-1 gap-3">
      <div className="basis-2/4">
        <RangeDatePicker value={date} onChange={(value) => setDate(value)} />
      </div>
      <div className="basis-1/4">
        <Filter value={branch} onChange={(e) => setBranch(e.target.value)} />
      </div>
      <div className="basis-1/4">
        <input className="py-2.5 px-4 rounded-lg w-full bg-violet-700 text-white" onClick={onSubmit} type="submit" value="Filter"/>
      </div>
    </form>
  )
}
