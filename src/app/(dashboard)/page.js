import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import Filter from "@/components/Filter";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
};

export default async function MonitoringManagement({ searchParams }) {
  const { search = "", page = 1, filter = "XT Billiard" } = searchParams;

  const skip = (page - 1) * 10;
  const result =
    await prisma.$queryRaw`Select DATE(created_at) as grouped_date, SUM(totalbayar) as totalbayar, MAX(cabang_id) as cabang_id  
    from order_biliard 
    WHERE cabang_id = ${filter} GROUP BY grouped_date
    LIMIT 10
    OFFSET ${skip}
    `;
  return (
    <main className="container mx-auto">
      <label
        for="countries"
        class="block mb-2 text-sm font-medium text-gray-900"
      >
        Select an option
      </label>

      <div className="py-9">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-5xl mb-1">Order Billiard</p>
            <p className="text-2xl">Order Billiard Masuk</p>
          </div>
          <div className="flex gap-3">
            <Filter/>
          </div>
        </div>
      </div>

      <div>
        <table className="w-full text-left">
          <thead className="bg-violet-700 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Tanggal Order</th>
              <th className="px-4 py-3 text-left">Total Penjualan</th>
              <th className="px-4 py-3 text-left">Cabang</th>
            </tr>
          </thead>
          <tbody>
            {result.map((item) => {
              const created_at = item?.grouped_date
                ? new Date(item?.grouped_date).toLocaleDateString(
                    "id",
                    dateOptions
                  )
                : "-";

              const fee = new Intl.NumberFormat("id", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(item?.totalbayar);

              return (
                <tr key={item.id} className="border">
                  <td className="px-4 py-3 text-left">{created_at}</td>
                  <td className="px-4 py-3 text-left">{fee}</td>
                  <td className="px-4 py-3 text-left">{item.cabang_id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="w-full flex justify-end py-4">
          <Pagination dataLength={result?.length} />
        </div>
      </div>
    </main>
  );
}
