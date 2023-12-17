import { PrismaClient } from "@prisma/client";

import AddProduct from "./addProduct";
import UpdateProduct from "./updateProduct";
import DeleteProduct from "./deleteProduct";
const prisma = new PrismaClient();

const getProduct = async () => {
  const res = await prisma.product.findMany({
    select: {
      id: true,
      plu: true,
      name: true,
      productCategory: true,
      product_category_id: true,
      active: true,
      created_user: true,
      updated_user: true,
    },
  });
  return res;
};

const getProductCategory = async () => {
  const res = await prisma.productCategory.findMany();
  return res;
};

const Product = async () => {
  const [product, productCategory] = await Promise.all([
    getProduct(),
    getProductCategory(),
  ]);

  return (
    <div className="relative overflow-x-auto">
      <div className="my-2">
        <AddProduct category={productCategory} />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase text-white bg-indigo-950 dark:bg-gray-700 dark:text-gray-400 ">
          <tr>
            <th scope="col" className="px-6 py-4 rounded-tl-xl">
              Plu
            </th>
            <th scope="col" className="px-6 py-4">
              Product
            </th>
            <th scope="col" className="px-6 py-4">
              Product Category
            </th>
            <th scope="col" className="px-6 py-4">
              Status
            </th>
            <th scope="col" className="px-6 py-4 rounded-tr-xl">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {product.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.plu}
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
                {item.productCategory.name}
              </th>
              <td className="px-6 py-4">
                {item.active === true ? "Active" : "Non Active"}
              </td>
              <td className="px-6 py-4">
                <DeleteProduct product={item} />
                <UpdateProduct product={item} category={productCategory} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
