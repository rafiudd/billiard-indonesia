'use client'

import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateUser({ data }) {
  const router = useRouter()

  const [isLoading, setLoading] = useState(false)
  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      document.cookie = 'isLogin' + '=; Max-Age=-99999999;';
      document.cookie = 'id' + '=; Max-Age=-99999999;';
      // location.reload()
      router.push('/login')
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="fullname">
            Nama Lengkap
          </label>
          <Input
            name="fullname"
            value={data.fullname}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="phone">
            No HP
          </label>
          <Input
            name="phone"
            value={data.phone}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="email">
            Email
          </label>
          <Input
            type="email"
            name="email"
            value={data.email}
            disabled
          />
        </div>
      </div>
      <Button variant="secondary" type="submit" disabled={isLoading}>
        Logout
      </Button>
    </form>
  )
}