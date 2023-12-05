import prisma from "@/lib/prisma";

export const orderBiliard = async (filter, startDate, endDate, skip) => {
  console.log(startDate, endDate, 'ORDERR');
  try {
    if(filter === 'All'){
      const result =  await prisma.$queryRaw`Select DATE(created_at) as grouped_date, SUM(totalbayar) as totalbayar, MAX(cabang_id) as cabang_id
      from order_biliard 
      WHERE DATE(created_at) BETWEEN ${startDate} AND ${endDate}
      GROUP BY grouped_date, cabang_id
      ORDER BY grouped_date DESC, cabang_id
      LIMIT 10
      OFFSET ${skip}
      `;
      return result
    }
    const result = await prisma.$queryRaw`Select DATE(created_at) as grouped_date, SUM(totalbayar) as totalbayar, MAX(cabang_id) as cabang_id  
    from order_biliard 
    WHERE cabang_id = ${filter} 
    AND DATE(created_at) BETWEEN ${startDate} AND ${endDate}
    GROUP BY grouped_date
    ORDER BY grouped_date DESC
    LIMIT 10
    OFFSET ${skip}
    `;
    return result
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const chartOrderBiliard = async (filter, startDate, endDate) => {
  try {
    if(filter === 'All'){
      const result = await prisma.$queryRaw`Select DATE(created_at) as grouped_date, SUM(totalbayar) as totalbayar, MAX(cabang_id) as cabang_id  
        from order_biliard 
        WHERE DATE(created_at) BETWEEN ${startDate} AND ${endDate}
        GROUP BY grouped_date, cabang_id
        ORDER BY grouped_date ASC, cabang_id`;
      return result 
    }
    const result = await prisma.$queryRaw`Select DATE(created_at) as grouped_date, SUM(totalbayar) as totalbayar, MAX(cabang_id) as cabang_id  
      from order_biliard 
      WHERE cabang_id = ${filter} 
      AND DATE(created_at) BETWEEN ${startDate} AND ${endDate}
      GROUP BY grouped_date
      ORDER BY grouped_date ASC`;
    return result
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const orderPesanan = async (filter, startDate, endDate, skip) => {
  try {
    if(filter === 'All'){
      const result =  await prisma.$queryRaw`Select DATE(created_at) as grouped_date, SUM(TotalBayar) as totalbayar, MAX(cabang_id) as cabang_id
      from pesanan 
      WHERE DATE(created_at) BETWEEN ${startDate} AND ${endDate}
      GROUP BY grouped_date, cabang_id
      ORDER BY grouped_date DESC, cabang_id
      LIMIT 10
      OFFSET ${skip}
      `;
      return result
    }
    const result = await prisma.$queryRaw`Select DATE(created_at) as grouped_date, SUM(TotalBayar) as totalbayar, MAX(cabang_id) as cabang_id  
    from pesanan 
    WHERE cabang_id = ${filter} 
    AND DATE(created_at) BETWEEN ${startDate} AND ${endDate}
    GROUP BY grouped_date
    ORDER BY grouped_date DESC
    LIMIT 10
    OFFSET ${skip}
    `;
    return result
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const chartOrderPesanan = async (filter, startDate, endDate) => {
  try {
    if(filter === 'All') {
      const result = await prisma.$queryRaw`Select DATE(created_at) as grouped_date, SUM(TotalBayar) as totalbayar, MAX(cabang_id) as cabang_id  
        from pesanan 
        WHERE DATE(created_at) BETWEEN ${startDate} AND ${endDate}
        GROUP BY grouped_date, cabang_id
        ORDER BY grouped_date ASC, cabang_id`;
      return result
    }
    const result = await prisma.$queryRaw`Select DATE(created_at) as grouped_date, SUM(TotalBayar) as totalbayar, MAX(cabang_id) as cabang_id  
      from pesanan 
      WHERE cabang_id = ${filter} 
      AND DATE(created_at) BETWEEN ${startDate} AND ${endDate}
      GROUP BY grouped_date
      ORDER BY grouped_date ASC`;
    return result
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const orderToday = async (filter, startDate, endDate) => {
  console.log(filter, startDate, endDate, 'FILTER');
  try {
    if (filter === 'All') {
      const result = await prisma.$queryRaw`
        SELECT SUM(totalbayar) as totalbayar
        FROM order_biliard
        WHERE DATE(created_at) BETWEEN ${startDate} AND ${endDate}`;
      return result;
    }
    const result = await prisma.$queryRaw`
      SELECT SUM(totalbayar) as totalbayar
      FROM order_biliard
      WHERE cabang_id = ${filter} AND DATE(created_at) BETWEEN ${startDate} AND ${endDate}`;
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
        WHERE DATE(created_at) BETWEEN ${startDate} AND ${endDate}`;
      return result;
    }

    const result = await prisma.$queryRaw`
      SELECT SUM(TotalBayar) as totalbayar
      FROM pesanan
      WHERE cabang_id = ${filter}
      AND DATE(created_at) BETWEEN ${startDate} AND ${endDate}`;
      
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const lastSyncData = async() => {
  try {
    const result = await prisma.$queryRaw`
    SELECT MAX(last_date_sync) as last_date_sync
    FROM cron_history`
  return result
  } catch (error) {
    console.log(error);
    return [];
  }
}