'use client'

import Input from "@/components/Input";
import Button from "@/components/Button";
import Select from "@/components/Select";
import { useRouter } from "next/navigation";
import { category as categoryOptions } from "@/constant/category";
import { useState } from "react";

export default function CreateUser() {
  const router = useRouter()

  const [isLoading, setLoading] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const body = {
        email: event?.target?.email?.value,
        password: event?.target?.password?.value
      }

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const result = await response.json()
      if (result?.success) {
        alert('Berhasil login')
        router.push('/user-management')
      } else {
        alert('Gagal login')
      }
    } catch (error) {
      alert('Gagal login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
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
        Login
      </Button>
    </form>
  )
}