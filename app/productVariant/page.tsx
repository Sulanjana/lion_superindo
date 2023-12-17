import { PrismaClient } from "@prisma/client";

import AddProductVarian from "./addProductVariant";
import UpdateProductVarian from "./updateProductVariant";
import DeleteProductVarian from "./deleteProductVariant";
const prisma = new PrismaClient();

const getProductVarian = async () => {
  const res = await prisma.productVariant.findMany({
    select: {
      id: true,
      product_id: true,
      code: true,
      name: true,
      qty: true,
      price: true,
      active: true,
      created_user: true,
      updated_user: true,
      product:true
    },
  });
  return res;
};

const getProducts = async () => {
  const res = await prisma.product.findMany();
  return res;
};

const ProductVarian = async () => {
  const [productVariant, products] = await Promise.all([
    getProductVarian(),
    getProducts(),
  ]);

  return (
    <div className="relative overflow-x-auto">
      <div className="my-2">
        <AddProductVarian products={products} />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase text-white bg-indigo-950 dark:bg-gray-700 dark:text-gray-400 ">
          <tr>
            <th scope="col" className="px-6 py-4 rounded-tl-xl">
              Code
            </th>
            <th scope="col" className="px-6 py-4">
              Name
            </th>
            <th scope="col" className="px-6 py-4">
              Product
            </th>
            <th scope="col" className="px-6 py-4">
              Quantity
            </th>
            <th scope="col" className="px-6 py-4">
              Price
            </th>
            <th scope="col" className="px-6 py-4">
              Active
            </th>
            <th scope="col" className="px-6 py-4 rounded-tr-xl">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {productVariant.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.code}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.name}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.product.name}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.qty}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.price}
              </th>
              <td className="px-6 py-4">
                {item.active === true ? "Active" : "Non Active"}
              </td>
              <td className="px-6 py-4">
                <DeleteProductVarian variant={item} />
                <UpdateProductVarian
                  variant={item}
                  products={products}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductVarian;
