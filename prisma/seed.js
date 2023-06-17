const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.users.create({
    data: {
      email: 'admin@parkirin.com',
      fullname: 'Admin Parkirin',
      password: 'admin',
      phone: '085123232423'
    },
  })

  console.log({ admin })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })