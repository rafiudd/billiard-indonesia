export const orderBiliard = async (filter, startDate, endDate, skip) => {
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
}

export const chartOrderBiliard = async (filter, startDate, endDate) => {
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
}

export const orderPesanan = async (filter, startDate, endDate, skip) => {
  if(filter === 'All') {
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
}

export const chartOrderPesanan = async (filter, startDate, endDate) => {
  if(filter === 'All') {
    const result = await prisma.$queryRaw`Select DATE(created_at) as grouped_date, SUM(totalbayar) as totalbayar, MAX(cabang_id) as cabang_id  
      from pesanan 
      WHERE DATE(created_at) BETWEEN ${startDate} AND ${endDate}
      GROUP BY grouped_date, cabang_id
      ORDER BY grouped_date ASC, cabang_id`;
    return result
  }
  const result = await prisma.$queryRaw`Select DATE(created_at) as grouped_date, SUM(totalbayar) as totalbayar, MAX(cabang_id) as cabang_id  
    from pesanan 
    WHERE cabang_id = ${filter} 
    AND DATE(created_at) BETWEEN ${startDate} AND ${endDate}
    GROUP BY grouped_date
    ORDER BY grouped_date ASC`;
  return result
}

export const orderToday = async (filter, today) => {
  const result = await prisma.$queryRaw`
    SELECT SUM(totalbayar) as totalbayar
    FROM order_biliard
    WHERE (${filter} = 'All' OR cabang_id = ${filter})
    AND DATE(created_at) = ${today}`
  return result
}

export const orderPesananToday = async (filter, today) => {
  const result = await prisma.$queryRaw`
    SELECT SUM(totalbayar) as totalbayar
    FROM pesanan
    WHERE (${filter} = 'All' OR cabang_id = ${filter})
    AND DATE(created_at) = ${today}`;
  return result
}

export const lastSyncData = async() => {
  const result = await prisma.$queryRaw`
    SELECT MAX(last_date_sync) as last_date_sync
    FROM cron_history`
  return result
}