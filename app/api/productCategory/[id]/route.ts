import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ProductCategory } from "@prisma/client";
const prisma = new PrismaClient();

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const productCategory = await prisma.productCategory.delete({
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
  const body: ProductCategory = await request.json();
  const productCategory = await prisma.productCategory.update({
    where: {
      id: Number(params.id),
    },
    data: {
      name: body.name,
      active: body.active,
      created_user: body.created_user,
      updated_user: body.updated_user,
    },
  });
  return NextResponse.json({ message: "OK", productCategory }, { status: 200 });
};
