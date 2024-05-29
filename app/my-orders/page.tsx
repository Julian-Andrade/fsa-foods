// Next
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
// Prisma
import { db } from '../_lib/prisma'
// Libs
import { authOptions } from '../_lib/auth'
// Components
import Header from '../_components/header'
import OrderItem from './_components/order-item'

const MyOrdersPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return redirect('/')
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  })

  return (
    <div className="container">
      <Header />

      <div className="py-6">
        <h2 className="font-semibold">Meus Pedidos</h2>

        <div className="mt-6">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyOrdersPage
