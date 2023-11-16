import moment from "moment";
import prisma from "@/lib/prisma";
import Pagination from "@/components/Pagination";
import FormFilter from "@/components/FormFilter";
import BarChart from "@/components/BarChart";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "2-digit",
  timeZone: "Asia/Jakarta",
};

const dateOptionsWithClock = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
};

const formatNominal =  (nominal) => new Intl.NumberFormat("id", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
}).format(nominal || 0);

export default async function MonitoringManagement({ searchParams }) {
  const { page = 1, filter = "XT Billiard", startDate = moment().subtract(7, 'days').format('YYYY-MM-DD'), endDate = new Date().toISOString().split('T')[0] } = searchParams;

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

  const resultChart = await prisma.$queryRaw`Select DATE(created_at) as grouped_date, SUM(totalbayar) as totalbayar, MAX(cabang_id) as cabang_id  
    from order_biliard 
    WHERE cabang_id = ${filter} 
    AND DATE(created_at) BETWEEN ${startDate} AND ${endDate}
    GROUP BY grouped_date
    ORDER BY grouped_date ASC`;

  const today = new Date().toISOString().split('T')[0]

  const todayData = await prisma.$queryRaw`SELECT SUM(totalbayar) as totalbayar
  FROM order_biliard
  WHERE cabang_id = ${filter} 
  AND DATE(created_at) = ${today}`;

  return (
    <main className="container px-4 md:px-0 mx-auto">
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-lg font-medium">Data terakhir diupdate: {new Date().toLocaleDateString("id", dateOptionsWithClock)}</p>
        </div>
        <div className="flex-1">
          <FormFilter />
        </div>
      </div>
      <div className="flex-1 shadow-lg shadow-white-500/40 py-6 px-6 rounded mt-10">
        <p className="font-bold text-3xl">Total Pendapatan Hari ini</p>
        <p className="text-2xl mt-3">{new Date().toLocaleDateString("id",dateOptions)}</p>
        <p className="font-bold text-5xl mt-8">{formatNominal(todayData.totalbayar)}</p>
      </div>
      <div className="shadow-lg shadow-white-500/40 py-6 px-6 rounded mt-10">
        <div>
          <div className="flex flex-col items-start gap-8 md:gap-0 md:flex-row md:items-center">
            <div className="flex-1">
              <p className="font-bold text-3xl">Grafik Pendapatan Harian</p>
            </div>
          </div>
          <div className="mt-10">
            <BarChart data={resultChart} />
          </div>
        </div>

        <div>
          <div className="pt-10 mb-4">
            <div className="flex flex-col items-start gap-8 md:gap-0 md:flex-row md:items-center">
              <div className="flex-1">
                <p className="font-bold text-3xl">Tabel Pendapatan Harian</p>
              </div>
            </div>
          </div>
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

                return (
                  <tr key={item.id} className="border">
                    <td className="px-4 py-3 text-left">{created_at}</td>
                    <td className="px-4 py-3 text-left">{formatNominal(item?.totalbayar)}</td>
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
      </div>
    </main>
  );
}
