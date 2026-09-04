import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { BiError } from "react-icons/bi";
import { SiHackthebox } from "react-icons/si";
import { FiLayers, FiTrendingUp, FiSearch } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";
import { CiGrid41, CiCircleList } from "react-icons/ci";
import ProductList from "../list/ProductList";
import ProductGrid from "../Grid/ProductGrid";
import AddProductOverDisplay from "../productOverDisplay/AddProductOverDisplay";

const StoreProducts = () => {
  const categories = [
    { name: "All", item: 48 },
    { name: "Shirts", item: 12 },
    { name: "T-Shirts", item: 10 },
    { name: "Pants", item: 9 },
    { name: "Jackets", item: 8 },
    { name: "Innerwear", item: 9 },
  ];

  const statusFilters = ["All", "Active", "Inactive", "Low Stock"];

  const [gridListView, setGridListView] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0D10] text-white">
      <div className="py-7 px-7">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-6">
            <p className="uppercase tracking-[0.20em] text-neutral-500 text-[11px]">
              Store / Products
            </p>

            <div>
              <h4 className="font-semibold text-3xl text-white tracking-tight">
                Products
              </h4>

              <p className="max-w-2xl mt-2 text-sm text-neutral-500 leading-6">
                Manage your fashion collection, variants and inventory.
              </p>
            </div>
          </div>

          <button
            className="
              flex
              items-center
              gap-2
              h-10
              px-4
              bg-white
              text-black
              font-semibold
              text-sm
              rounded-lg
              hover:bg-neutral-200
              transition-colors
            "
            onClick={() => setShowAddProduct(true)}
          >
            <IoAdd size={19} />
            <span>Add Product</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-9">
          <div className="bg-[#101318] border border-[#242932] rounded-2xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="uppercase tracking-[0.12em] text-neutral-500 text-[10px]">
                  Products
                </p>

                <h3 className="text-2xl text-white font-semibold mt-2">48</h3>

                <p className="text-xs text-neutral-600 mt-1">Total catalog</p>
              </div>

              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <SiHackthebox className="text-neutral-400" size={18} />
              </div>
            </div>
          </div>

          <div className="bg-[#101318] border border-[#242932] rounded-2xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="uppercase tracking-[0.12em] text-neutral-500 text-[10px]">
                  Inventory
                </p>

                <h3 className="text-2xl text-white font-semibold mt-2">
                  1,284
                </h3>

                <p className="text-xs text-neutral-600 mt-1">Units available</p>
              </div>

              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <FiLayers className="text-neutral-400" size={18} />
              </div>
            </div>
          </div>

          <div className="bg-[#101318] border border-[#242932] rounded-2xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="uppercase tracking-[0.12em] text-neutral-500 text-[10px]">
                  Low Stock
                </p>

                <h3 className="text-2xl text-white font-semibold mt-2">7</h3>

                <p className="text-xs text-neutral-600 mt-1">Needs attention</p>
              </div>

              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <BiError className="text-neutral-400" size={19} />
              </div>
            </div>
          </div>

          <div className="bg-[#101318] border border-[#242932] rounded-2xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="uppercase tracking-[0.12em] text-neutral-500 text-[10px]">
                  Sales
                </p>

                <h3 className="text-2xl text-white font-semibold mt-2">
                  ₹2.74L
                </h3>

                <p className="text-xs text-neutral-600 mt-1">This month</p>
              </div>

              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <FiTrendingUp className="text-neutral-400" size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="flex items-center gap-8 overflow-x-auto border-b border-[#242932]">
          {categories.map((data) => (
            <button
              key={data.name}
              onClick={() => setActiveCategory(data.name)}
              className={`
                relative
                flex
                items-center
                gap-2
                whitespace-nowrap
                pt-1
                pb-4
                text-sm
                transition-colors
                ${
                  activeCategory === data.name
                    ? "text-white"
                    : "text-neutral-500 hover:text-neutral-300"
                }
              `}
            >
              <span>{data.name}</span>

              <span
                className={`
                  text-[10px]
                  ${
                    activeCategory === data.name
                      ? "text-neutral-400"
                      : "text-neutral-600"
                  }
                `}
              >
                {data.item}
              </span>

              <span
                className={`
                  absolute
                  bottom-0
                  left-0
                  h-px
                  bg-white
                  transition-all
                  duration-300
                  ${activeCategory === data.name ? "w-full" : "w-0"}
                `}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <div
            className="
            flex
            items-center
            gap-3
            bg-[#12151A]
            border
            border-[#242932]
            px-4
            h-10
            w-full
            xl:w-96
            rounded-lg
          "
          >
            <FiSearch size={18} className="text-neutral-600 shrink-0" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, brands..."
              className="
                bg-transparent
                outline-none
                w-full
                text-sm
                text-white
                placeholder:text-neutral-600
              "
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {statusFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveStatus(filter)}
                className={`
                  h-9
                  px-4
                  rounded-lg
                  border
                  text-xs
                  font-medium
                  whitespace-nowrap
                  transition-all
                  ${
                    activeStatus === filter
                      ? "bg-white text-black border-white"
                      : "bg-[#101318] text-neutral-400 border-[#242932] hover:text-white hover:border-[#343941]"
                  }
                `}
              >
                {filter}
              </button>
            ))}

            <button
              className="
                h-9
                px-4
                rounded-lg
                bg-[#101318]
                border
                border-[#242932]
                text-xs
                text-neutral-400
                flex
                items-center
                gap-2
                whitespace-nowrap
                hover:text-white
                hover:border-[#343941]
                transition-all
              "
            >
              Newest
              <RiArrowDownSLine size={16} />
            </button>

            <div
              className="
              flex
              items-center
              gap-1
              h-9
              p-1
              rounded-lg
              bg-[#101318]
              border
              border-[#242932]
            "
            >
              <button
                onClick={() => setGridListView(false)}
                className={`
                  h-7
                  w-7
                  rounded-md
                  flex
                  items-center
                  justify-center
                  transition-all
                  ${
                    !gridListView
                      ? "bg-white/[0.10] text-white"
                      : "text-neutral-600 hover:text-neutral-300"
                  }
                `}
              >
                <CiGrid41 size={18} />
              </button>

              <button
                onClick={() => setGridListView(true)}
                className={`
                  h-7
                  w-7
                  rounded-md
                  flex
                  items-center
                  justify-center
                  transition-all
                  ${
                    gridListView
                      ? "bg-white/[0.10] text-white"
                      : "text-neutral-600 hover:text-neutral-300"
                  }
                `}
              >
                <CiCircleList size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-10">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="uppercase tracking-[0.12em] text-neutral-600 text-[10px]">
              Collection
            </p>

            <h3 className="text-lg text-white font-semibold mt-1">
              {activeCategory === "All" ? "All Products" : activeCategory}
            </h3>
          </div>

          <button className="text-xs text-neutral-500 hover:text-white transition-colors">
            Select all
          </button>
        </div>

        <div>{!gridListView ? <ProductGrid /> : <ProductList />}</div>

        {showAddProduct && (
          <AddProductOverDisplay onClose={() => setShowAddProduct(false)} />
        )}
      </div>
    </div>
  );
};

export default StoreProducts;
