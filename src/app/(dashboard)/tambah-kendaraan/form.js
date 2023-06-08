'use client'

import Input from "@/components/Input";
import Button from "@/components/Button";
import Select from "@/components/Select";

const categoryOptions = [
  { name: 'Mobil', value: 'car' },
  { name: 'Motor', value: 'motorcycle' },
  { name: 'Truk', value: 'truck' },
  { name: 'Bus', value: 'bus' },
]

export default function FormAddVehicle() {
  const onSubmit = (event) => {
    event.preventDefault()

    const data = {
      number_plate: event?.target?.number_plate?.value,
      category: event?.target?.category?.value,
    }

    alert(`plat nomor: ${data.number_plate}, kategori kendaraan: ${data.category}`)
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