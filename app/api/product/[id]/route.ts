import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Product } from "@prisma/client";
const prisma = new PrismaClient();

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const product = await prisma.product.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json({ message: "OK" }, { status: 200 });
};

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: Product = await request.json();
  const product = await prisma.product.update({
    where: {
      id: Number(params.id),
    },
    data: {
      name: body.name,
      plu: body.plu,
      product_category_id: body.product_category_id,
      active: body.active,
      created_user: body.created_user,
      updated_user: body.updated_user,
    },
  });
  return NextResponse.json({ message: "OK", product }, { status: 200 });
};
