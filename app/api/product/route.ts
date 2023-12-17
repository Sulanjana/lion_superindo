import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Product } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (request: Request) => {
  const product = await prisma.product.findMany();
  return NextResponse.json({ message: "OK", product }, { status: 201 });
};

export const POST = async (request: Request) => {
  const body: Product = await request.json();
  const product = await prisma.product.create({
    data: {
      name: body.name,
      active: body.active,
      created_user: body.created_user,
      updated_user: body.updated_user,
      plu: body.plu,
      product_category_id: body.product_category_id,
    },
  });
  return NextResponse.json({ message: "OK", product }, { status: 201 });
};
