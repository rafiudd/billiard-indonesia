"use client"
import moment from "moment"
import { useState, useCallback } from "react"
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import Filter from "@/components/Filter"
import RangeDatePicker from "@/components/RangeDatePicker"

export default function FormFilter() {
  const [date, setDate] = useState({
    startDate: moment().subtract(8, 'days').format('YYYY-MM-DD'), 
    endDate: moment().format('YYYY-MM-DD')
  })
  const [branch, setBranch] = useState("XT Billiard");

  const router = useRouter()

  const onSubmit = (event) => {
    event.preventDefault()
    router.push(`/?filter=${branch}&startDate=${date.startDate}&endDate=${date.endDate}`)
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full md:w-unset md:items-center md:flex-row flex-1 gap-3">
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
