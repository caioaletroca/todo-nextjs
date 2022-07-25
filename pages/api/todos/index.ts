// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, todos } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<todos[]>
) {
  const prisma = new PrismaClient();

  const todos = await prisma.todos.findMany();

  res.status(200).json(todos);
}
