import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { ProductVariant } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (request: Request) => {
  const productVariant = await prisma.productVariant.findMany();
  return NextResponse.json({ message: "OK", productVariant }, { status: 201 });
};

export const POST = async (request: Request) => {
  const body: ProductVariant = await request.json();
  const productCategory = await prisma.productVariant.create({
    data: {
      product_id: body.product_id,
      code: body.code,
      name: body.name,
      qty: body.qty,
      price: body.price,
      active: body.active,
      created_user: body.created_user,
      updated_user: body.updated_user,
    },
  });
  return NextResponse.json({ message: "OK", productCategory }, { status: 201 });
};
