import prisma from "@/lib/prisma";
import Pagination from "@/components/Pagination";
import FormFilter from "@/components/FormFilter";

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
  const { page = 1, filter = "XT Billiard", startDate = new Date().toISOString().split('T')[0], endDate = new Date().toISOString().split('T')[0] } = searchParams;

  const skip = (page - 1) * 10;
  const result =
    await prisma.$queryRaw`Select DATE(created_at) as grouped_date, SUM(totalbayar) as totalbayar, MAX(cabang_id) as cabang_id  
    from order_biliard 
    WHERE cabang_id = ${filter} 
    AND DATE(created_at) BETWEEN ${startDate} AND ${endDate}
    GROUP BY grouped_date
    ORDER BY grouped_date DESC
    LIMIT 10
    OFFSET ${skip}
    `;

  return (
    <main className="container px-4 md:px-0 mx-auto">
      <div className="py-9">
        <div className="flex flex-col items-start gap-8 md:gap-0 md:flex-row md:items-center">
          <div className="flex-1">
            <p className="font-bold text-5xl mb-1">Order Billiard</p>
            <p className="text-2xl">Order Billiard Masuk</p>
          </div>
          <FormFilter />
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
