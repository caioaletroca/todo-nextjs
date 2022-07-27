import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "utils/apiHandler";

async function deleteAction(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();

    await prisma.Todo.delete({
        where: {
            id: Number(req.query.id)
        }
    })

    res.status(200).json();
}

export default apiHandler({ delete: deleteAction });