'use client'

import Input from "@/components/Input";
import Button from "@/components/Button";
import Select from "@/components/Select";
import { useRouter } from "next/navigation";
import { category as categoryOptions } from "@/constant/category";
import { useState } from "react";

export default function FormEditUser({ data }) {
  const router = useRouter()

  const [isLoading, setLoading] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // setFullname(data.fullname);
  // setEmail(data.email);
  // setPhone(data.phone);

  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const body = {
        id: data.id,
        fullname: event?.target?.fullname?.value,
        email: event?.target?.email?.value,
        phone: event?.target?.phone?.value
      }

      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const result = await response.json()

      if (result?.success) {
        alert('Berhasil update data')
        // router.push('/user-management')
        window.location.href = '/user-management'
      } else {
        alert('Gagal update data')
      }
    } catch (error) {
      alert('Gagal update data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="fullname" className="text-violet-700">
            Nama Lengkap
          </label>
          <Input
            name="fullname"
            placeholder="Nama Lengkap"
            value={fullname ? fullname : data.fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="email" className="text-violet-700">
            Email
          </label>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email ? email : data.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="phone" className="text-violet-700">
            No HP
          </label>
          <Input
            name="phone"
            placeholder="No HP"
            value={phone ? phone : data.phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <Button type="submit" disabled={isLoading}>
        Simpan
      </Button>
    </form>
  )
}