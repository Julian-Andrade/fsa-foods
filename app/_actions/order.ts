'use server'

// Next
import { revalidatePath } from 'next/cache'
// Prisma
import { Prisma } from '@prisma/client'
import { db } from '../_lib/prisma'

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  await db.order.create({ data })
  revalidatePath('/my-orders')
}
