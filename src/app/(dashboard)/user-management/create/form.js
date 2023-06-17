'use client'

import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateUser() {
  const router = useRouter()

  const [isLoading, setLoading] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const body = {
        fullname: event?.target?.fullname?.value,
        email: event?.target?.email?.value,
        phone: event?.target?.phone?.value,
        password: event?.target?.password?.value
      }

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const result = await response.json()
      if (result?.success) {
        alert('Berhasil menambah data')
        // router.push('/user-management')
        window.location.href = '/user-management'
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
          <label htmlFor="fullname" className="text-violet-700">
            Nama Lengkap
          </label>
          <Input
            name="fullname"
            placeholder="Nama Lengkap"
            required
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
            required
          />
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="phone" className="text-violet-700">
            No HP
          </label>
          <Input
            name="phone"
            placeholder="No HP"
            required
          />
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="password" className="text-violet-700">
            Password
          </label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
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