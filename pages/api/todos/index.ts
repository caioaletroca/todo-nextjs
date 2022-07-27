import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient } from '@prisma/client'
import apiHandler from 'utils/apiHandler';
import { getToken } from 'next-auth/jwt';

async function get(req: NextApiRequest, res: NextApiResponse<Prisma.Todo[]>) {
  const prisma = new PrismaClient();
  const token = await getToken({ req });

  const todos = await prisma.Todo.findMany({ where: { user_id: token?.sub } });

  res.status(200).json(todos);
}

async function post(req: NextApiRequest, res: NextApiResponse<Prisma.Todo>) {
  const prisma = new PrismaClient();
  const token = await getToken({ req });
  
  const todo = await prisma.Todo.create({ data: { user_id: token?.sub, ...req.body } });

  res.status(201).json(todo);
}

export default apiHandler({ get, post })