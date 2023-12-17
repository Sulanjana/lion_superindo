import { PrismaClient } from "@prisma/client";

import AddProductCategory from "./addProductCategory";
import UpdateProductCategory from "./updateProductCategory";
import DeleteProductCategory from "./deleteProductCategory";
const prisma = new PrismaClient();

const getProductCategories = async () => {
  const res = await prisma.productCategory.findMany({
    select: {
      id: true,
      name: true,
      active: true,
    },
  });
  return res;
};


const ProductCategory = async () => {
  const productCategories = await getProductCategories();

  return (
    <div className="relative overflow-x-auto">
      <div className="my-2">
        <AddProductCategory  />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase text-white bg-indigo-950 dark:bg-gray-700 dark:text-gray-400 ">
          <tr>
            <th scope="col" className="px-6 py-4 rounded-tl-xl">
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
          {productCategories.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.name}
              </th>
              <td className="px-6 py-4">{item.active === true ? "Active" : "Non Active"}</td>
              <td className="px-6 py-4">
                <DeleteProductCategory productCategory={item} />
                <UpdateProductCategory category={item} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCategory;
