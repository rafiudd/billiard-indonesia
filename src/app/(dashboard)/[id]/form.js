'use client'

import Input from "@/components/Input"
import Button from "@/components/Button"
import Select from "@/components/Select"
import { useRouter } from "next/navigation";
import { category as categoryOptions } from "@/constant/category"
import { payment as paymentOptions } from "@/constant/payment"
import { useState } from "react";

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
}

export default function FormEdit({ data }) {
  const router = useRouter()

  const [isLoading, setLoading] = useState(false)

  const category = categoryOptions.find(category => category.value === data?.category)

  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const body = {
        ...data,
        payment: event?.target?.payment?.value,
      }

      const response = await fetch('/api/vehicle', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const result = await response.json()

      if (result?.success) {
        alert('Berhasil update data')
        router.push('/')
      } else {
        alert(result?.message)
      }
    } catch (error) {
      alert('Gagal update data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="number_plate" className="text-violet-700">
            Plat Nomor
          </label>
          <Input
            name="number_plate"
            disabled
            value={data?.number_plate}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="entry_time" className="text-violet-700">
            Tanggal Masuk
          </label>
          <Input
            name="entry_time"
            disabled
            value={new Date(data?.entry_time).toLocaleDateString('id', dateOptions) || '-'}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-violet-700">
            Kategori Kendaraan
          </label>
          <Input
            name="category"
            disabled
            value={category?.name}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="fee" className="text-violet-700">
            Harga
          </label>
          <Input
            name="fee"
            disabled
            value="Rp5.000"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="payment" className="text-violet-700">
            Metode Pembayaran
          </label>
          <Select
            name="payment"
            options={paymentOptions}
            placeholder="Pilih Metode Pembayaran"
            required
          />
        </div>
      </div>
      <div className="mt-8">
        <Button type="submit" disabled={isLoading}>Checkout</Button>
      </div>
    </form>
  )
}