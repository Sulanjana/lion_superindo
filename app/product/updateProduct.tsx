"use client";

import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { ProductCategory } from "@prisma/client";

type Product = {
  id: number;
  name: string;
  active: boolean;
  product_category_id: number;
  plu: string;
};
const UpdateProduct = ({
  product,
  category,
}: {
  product: Product;
  category: ProductCategory[];
}) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [payload, setPayload] = useState({
    name: product.name,
    active: product.active,
    product_category_id: product.product_category_id,
    plu: product.plu,
    created_user: "OPERATOR",
    updated_user: "OPERATOR",
  });

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(payload.active);
    await axios.patch(`/api/product/${product.id}`, {
      name: payload.name,
      active: payload.active,
      product_category_id: payload.product_category_id,
      plu: payload.plu,
      created_user: "OPERATOR",
      updated_user: "OPERATOR",
    });
    router.refresh();
    setOpenModal(false);
  };
  return (
    <>
      {/* Modal toggle */}
      <button
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className="mt-2 text-white inline-flex items-center bg-yellow-500 hover:text-yellow-500 hover:font-bold hover:bg-yellow-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-indigo-950 dark:focuindigo:80ng-blue-800"
        type="button"
        onClick={() => {
          setOpenModal(true);
          setPayload({
            name: product.name,
            active: product.active,
            product_category_id: product.product_category_id,
            plu: product.plu,
            created_user: "OPERATOR",
            updated_user: "OPERATOR",
          });
        }}
      >
        Update Product
      </button>
      {/* Main modal */}
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={
          !openModal
            ? "hidden"
            : "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        }
        style={{ background: " rgba(0,0,0,0.5)" }}
      >
        <div className="relative p-4 w-full max-w-md max-h-full m-auto">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update Product
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
                onClick={() => setOpenModal(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form onSubmit={handleUpdate} className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    value={payload.name}
                    onChange={(e) =>
                      setPayload({ ...payload, name: e.target.value })
                    }
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Name Product"
                    required={true}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Plu
                  </label>
                  <input
                    value={payload.plu}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        plu: e.target.value.toUpperCase(),
                      })
                    }
                    style={{ textTransform: "uppercase" }}
                    autoCapitalize="word"
                    type="text"
                    name="plu"
                    id="plu"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Plu Product"
                    required={true}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={payload.product_category_id}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        product_category_id: Number(e.target.value),
                      })
                    }
                    required={true}
                  >
                    <option disabled value={-1}>
                      Category
                    </option>
                    {category.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>
                  <select
                    id="product"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={Number(payload.active)}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        active: Number(e.target.value) === 0 ? false : true,
                      })
                    }
                    required={true}
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Non Active</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-yellow-500 hover:text-yellow-500 hover:font-bold hover:bg-yellow-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-indigo-950 dark:focuindigo:80ng-blue-800"
              >
                Update Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
