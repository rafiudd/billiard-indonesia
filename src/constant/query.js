import prisma from "@/lib/prisma";
import moment from "moment";

const calculateDateRange = (startDate, endDate) => {
  const dateRange = [];
  let currentDate = moment(startDate);

  while (currentDate.isSameOrBefore(endDate)) {
    dateRange.push({
      start: currentDate.format('YYYY-MM-DD 09:00:00'),
      end: currentDate.add(1, 'day').format('YYYY-MM-DD 07:00:00'),
    });
  }

  return dateRange;
};

export const orderBiliard = async (filter, startDate, endDate, skip) => {
  console.log(startDate, endDate, 'ORDERR');
  try {
    let result = [];

    if (filter === 'All') {
      const dateRange = calculateDateRange(startDate, endDate);

      for (const range of dateRange) {
        const { start, end } = range;


        const dailyResult = await prisma.$queryRaw`
          Select (created_at) as grouped_date, SUM(totalbayar) as totalbayar, MAX(cabang_id) as cabang_id  
          from order_biliard 
          WHERE (created_at) BETWEEN ${start} AND ${end}
          GROUP BY cabang_id
          ORDER BY grouped_date DESC
          LIMIT 10
          OFFSET ${skip}
        `;

        result.push(...dailyResult);
      }
    } else {
      const dateRange = calculateDateRange(startDate, endDate);

      for (const range of dateRange) {
        const { start, end } = range;


        const dailyResult = await prisma.$queryRaw`
          Select (created_at) as grouped_date, SUM(totalbayar) as totalbayar, MAX(cabang_id) as cabang_id  
          from order_biliard 
          WHERE cabang_id = ${filter} 
          AND (created_at) BETWEEN ${start} AND ${end}
          GROUP BY cabang_id
          ORDER BY grouped_date DESC
        `;

        result.push(...dailyResult);
      }
    }

    console.log(result);
    return result.reverse();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const chartOrderBiliard = async (filter, startDate, endDate) => {
  try {
    let result = [];
    if(filter === 'All'){
      const dateRange = calculateDateRange(startDate, endDate);

      for (const range of dateRange) {
        const { start, end } = range;


        const dailyResult = await prisma.$queryRaw`
          Select (created_at) as grouped_date, SUM(totalbayar) as totalbayar, MAX(cabang_id) as cabang_id  
          from order_biliard 
          WHERE (created_at) BETWEEN ${start} AND ${end}
          GROUP BY cabang_id
          ORDER BY grouped_date DESC
        `;

        result.push(...dailyResult);
      }
    }
    const dateRange = calculateDateRange(startDate, endDate);

    for (const range of dateRange) {
      const { start, end } = range;

      const dailyResult = await prisma.$queryRaw`
        Select (created_at) as grouped_date, SUM(TotalBayar) as totalbayar, MAX(cabang_id) as cabang_id  
        from order_biliard 
        WHERE cabang_id = ${filter} 
        AND (created_at) BETWEEN ${start} AND ${end}
        GROUP BY cabang_id
        ORDER BY grouped_date DESC
      `;

      result.push(...dailyResult);
    }
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const orderPesanan = async (filter, startDate, endDate, skip) => {
  try {
    const dateRange = calculateDateRange(startDate, endDate);
    let result = [];
    if (filter === 'All') {
      const dateRange = calculateDateRange(startDate, endDate);

      for (const range of dateRange) {
        const { start, end } = range;


        const dailyResult = await prisma.$queryRaw`
          Select (created_at) as grouped_date, SUM(TotalBayar) as totalbayar, MAX(cabang_id) as cabang_id  
          from pesanan 
          WHERE (created_at) BETWEEN ${start} AND ${end}
          GROUP BY cabang_id
          ORDER BY grouped_date DESC
          LIMIT 10
          OFFSET ${skip}
        `;

        result.push(...dailyResult);
      }
    } else {
      for (const range of dateRange) {
        const { start, end } = range;
  
        const dailyResult = await prisma.$queryRaw`
          Select (created_at) as grouped_date, SUM(TotalBayar) as totalbayar, MAX(cabang_id) as cabang_id  
          from pesanan 
          WHERE cabang_id = ${filter} 
          AND (created_at) BETWEEN ${start} AND ${end}
          GROUP BY cabang_id
          ORDER BY grouped_date DESC
        `;
  
        result.push(...dailyResult);
      }
    }

    return result.reverse();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const chartOrderPesanan = async (filter, startDate, endDate) => {
  try {
    const dateRange = calculateDateRange(startDate, endDate);

    let result = [];
    if(filter === 'All') {
      for (const range of dateRange) {
        const { start, end } = range;

  
        const dailyResult = await prisma.$queryRaw`
          Select (created_at) as grouped_date, SUM(TotalBayar) as totalbayar, MAX(cabang_id) as cabang_id  
          from pesanan 
          WHERE (created_at) BETWEEN ${start} AND ${end}
          GROUP BY cabang_id
          ORDER BY grouped_date DESC
        `;
  
        result.push(...dailyResult);
      }

      return result;
    }

    for (const range of dateRange) {
      const { start, end } = range;

      const dailyResult = await prisma.$queryRaw`
        Select (created_at) as grouped_date, SUM(TotalBayar) as totalbayar, MAX(cabang_id) as cabang_id  
        from pesanan 
        WHERE cabang_id = ${filter} 
        AND (created_at) BETWEEN ${start} AND ${end}
        GROUP BY cabang_id
        ORDER BY grouped_date DESC
      `;

      result.push(...dailyResult);
    }
    return result
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const orderToday = async (filter, startDate, endDate) => {
  try {
    if (filter === 'All') {
      const result = await prisma.$queryRaw`
        SELECT SUM(totalbayar) as totalbayar
        FROM order_biliard
        WHERE (created_at) BETWEEN ${startDate} AND ${endDate}`;
      return result;
    }
    const result = await prisma.$queryRaw`
      SELECT SUM(totalbayar) as totalbayar
      FROM order_biliard
      WHERE cabang_id = ${filter} AND (created_at) BETWEEN ${startDate} AND ${endDate}`;
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};


export const orderPesananToday = async (filter, startDate, endDate) => {
  try {
    if (filter === 'All') {
      const result = await prisma.$queryRaw`
        SELECT SUM(TotalBayar) as totalbayar
        FROM pesanan
        WHERE (created_at) BETWEEN ${startDate} AND ${endDate}`;
      return result;
    }

    const result = await prisma.$queryRaw`
      SELECT SUM(TotalBayar) as totalbayar
      FROM pesanan
      WHERE cabang_id = ${filter}
      AND (created_at) BETWEEN ${startDate} AND ${endDate}`;
      
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const lastSyncData = async(cabang_id) => {
  try {
    const result = await prisma.$queryRaw`
    SELECT MAX(last_date_sync) as last_date_sync
    FROM cron_history WHERE cabang_id = ${cabang_id}`
  return result
  } catch (error) {
    console.log(error);
    return [];
  }
}