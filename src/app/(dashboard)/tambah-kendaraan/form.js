'use client'

import Input from "@/components/Input";
import Button from "@/components/Button";
import Select from "@/components/Select";
import { useRouter } from "next/navigation";

const categoryOptions = [
  { name: 'Mobil', value: 'CAR' },
  { name: 'Motor', value: 'MOTORCYCLE' },
  { name: 'Truk', value: 'TRUCK' },
  { name: 'Bus', value: 'BUS' },
]

export default function FormAddVehicle() {
  const router = useRouter()

  const onSubmit = async (event) => {
    event.preventDefault()

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
        router.push('/')
      } else {
        alert('Gagal menambah data')
      }
    } catch (error) {
      alert('Gagal menambah data')
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
      <Button type="submit">
        Simpan
      </Button>
    </form>
  )
}