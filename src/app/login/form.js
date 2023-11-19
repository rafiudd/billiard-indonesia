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
        // router.push('/')
        window.location.href = '/'
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
    <form onSubmit={onSubmit} className="flex-1 shadow-lg shadow-white-500/40 py-6 px-6 rounded mt-10">
    <div className="mb-6">
      <div className="mb-4">
        <label htmlFor="email" className="text-violet-700 block text-sm font-medium">
          Email
        </label>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-violet-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="text-violet-700 block text-sm font-medium">
          Password
        </label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-violet-500"
        />
      </div>
    </div>
    <Button style={{width: '100%'}} type="submit" disabled={isLoading}>
      Login
    </Button>
  </form>
  )
}