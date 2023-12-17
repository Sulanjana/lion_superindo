import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { ProductCategory } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (request: Request) => {
  const productCategory = await prisma.productCategory.findMany();
  return NextResponse.json({ message: "OK", productCategory }, { status: 201 });
};

export const POST = async (request: Request) => {
  const body: ProductCategory = await request.json();
  const productCategory = await prisma.productCategory.create({
    data: {
      name: body.name,
      active: body.active,
      created_user: body.created_user,
      updated_user: body.updated_user,
    },
  });
  return NextResponse.json({ message: "OK", productCategory }, { status: 201 });
};
