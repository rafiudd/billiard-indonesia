import moment from "moment-timezone";
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
  const { page = 1, filter = "XT Billiard", startDate = moment.tz('Asia/Jakarta').subtract(7, 'days').format('YYYY-MM-DD'), endDate = moment.tz('Asia/Jakarta').format('YYYY-MM-DD') } = searchParams;

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

  const resultP =
    await prisma.$queryRaw`Select DATE(created_at) as grouped_date, SUM(totalbayar) as totalbayar, MAX(cabang_id) as cabang_id  
    from pesanan 
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
  
  const resultChartP = await prisma.$queryRaw`Select DATE(created_at) as grouped_date, SUM(totalbayar) as totalbayar, MAX(cabang_id) as cabang_id  
    from pesanan 
    WHERE cabang_id = ${filter} 
    AND DATE(created_at) BETWEEN ${startDate} AND ${endDate}
    GROUP BY grouped_date
    ORDER BY grouped_date ASC`;

  const today = moment.tz('Asia/Jakarta').format('YYYY-MM-DD')

  const todayData = await prisma.$queryRaw`
    SELECT SUM(totalbayar) as totalbayar
    FROM order_biliard
    WHERE cabang_id = ${filter} 
    AND DATE(created_at) = ${today}`;

  const todayDataPesanan = await prisma.$queryRaw`
    SELECT SUM(totalbayar) as totalbayar
    FROM pesanan
    WHERE cabang_id = ${filter} 
    AND DATE(created_at) = ${today}`;
  
  const lastUpdate = await prisma.$queryRaw`
    SELECT MAX(last_date_sync) as last_date_sync
    FROM cron_history`;

  return (
    <main className="container px-4 md:px-0 mx-auto">
      <div className="flex items-center">
        <div className="flex-1">
          <FormFilter />
        </div>
        <div className="flex-1">
          <p className="text-lg font-medium">Data terakhir diupdate: {lastUpdate[0]?.last_date_sync}</p>
        </div>
      </div>
      <div className="flex-1 border-gray-600 shadow-[0px_2px_30px_10px_rgba(0,0,0,0.05)] py-6 px-6 rounded mt-10" style={{borderRadius: '20px'}}>
        <p className="font-bold text-3xl leading-10">Total Pendapatan Hari ini <b style={{color: 'white', background: 'rgb(109, 40, 217)', paddingInline: '16px', paddingBlock: '4px', borderRadius: '20px'}}>{filter}</b> </p>
        <p className="text-2xl mt-3">{new Date().toLocaleDateString("id",dateOptions)}</p>
        <p className="font-bold text-5xl mt-8">{formatNominal(parseInt(todayData[0]?.totalbayar) + parseInt(todayDataPesanan[0]?.totalbayar))}</p>
      </div>
      <div className="shadow-[0px_2px_30px_10px_rgba(0,0,0,0.05)] border-gray-600 py-6 px-6 rounded mt-10" style={{borderRadius: '20px'}}>
        <div>
          <div className="flex flex-col items-start gap-8 md:gap-0 md:flex-row md:items-center">
            <div className="flex-1">
              <p className="font-bold text-3xl">Grafik Pendapatan Harian</p>
            </div>
          </div>
          <div className="mt-10">
            <BarChart data={resultChart} pesanan={resultChartP} />
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
                <th className="px-4 py-3 text-left">Tanggal</th>
                <th className="px-4 py-3 text-left">Total Penjualan Billiard</th>
                <th className="px-4 py-3 text-left">Total Penjualan Cafe</th>
                <th className="px-4 py-3 text-left">Total Penjualan</th>
                <th className="px-4 py-3 text-left">Cabang</th>
              </tr>
            </thead>
            <tbody>
              {result.map((item, i) => {
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
                    <td className="px-4 py-3 text-left">{formatNominal(resultP[i]?.totalbayar)}</td>
                    <td className="px-4 py-3 text-left">{formatNominal(parseInt(resultP[i]?.totalbayar) + parseInt(item?.totalbayar))}</td>
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
