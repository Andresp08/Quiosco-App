import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  console.log(prisma)

  if (req.method === 'POST') {
    const orden = await prisma.orden.create({
      data: {
        pedido: req.body.pedido,
        nombre: req.body.nombre,
        total: req.body.total,
        fecha: req.body.fecha,
      },
    });
    res.json(orden);
  }
}
