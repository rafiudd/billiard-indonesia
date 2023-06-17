'use client'

import Input from "@/components/Input";
import Button from "@/components/Button";
import Select from "@/components/Select";
import { useRouter } from "next/navigation";
import { category as categoryOptions } from "@/constant/category";
import { useState } from "react";

export default function FormAddVehicle() {
  const router = useRouter()

  const [isLoading, setLoading] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const body = {
        number_plate: event?.target?.number_plate?.value,
        category: event?.target?.category?.value,
      }

      const response = await fetch('/api/vehicle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const result = await response.json()

      if (result?.success) {
        alert('Berhasil menambah data')
        // router.push('/')
        window.location.href = '/'
      } else {
        alert('Gagal menambah data')
      }
    } catch (error) {
      alert('Gagal menambah data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="number_plate" className="text-violet-700">
            Plat Nomor
          </label>
          <Input
            name="number_plate"
            placeholder="Masukan Plat Nomor"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-violet-700">
            Kategori Kendaraan
          </label>
          <Select
            name="category"
            options={categoryOptions}
            placeholder="Pilih Kategori Kendaraan"
            required
          />
        </div>
      </div>
      <Button type="submit" disabled={isLoading}>
        Simpan
      </Button>
    </form>
  )
}