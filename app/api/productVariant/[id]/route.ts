import { NextResponse } from "next/server";
import { PrismaClient, ProductVariant } from "@prisma/client";

const prisma = new PrismaClient();

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const productVariant = await prisma.productVariant.delete({
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
  const body: ProductVariant = await request.json();
  const productVariant = await prisma.productVariant.update({
    where: {
      id: Number(params.id),
    },
    data: {
      code: body.code,
      name: body.name,
      product_id: body.product_id,
      qty: body.qty,
      price: body.price,
      active: body.active,
      created_user: body.created_user,
      updated_user: body.updated_user,
    },
  });
  return NextResponse.json({ message: "OK", productVariant }, { status: 200 });
};
