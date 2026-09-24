import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsBox } from "react-icons/bs";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { UseMe } from "../../../../context/Meprovider";

const BrandGrid = () => {
  const {
    setBrandId,
    setUpdateBrandOpen,
    setBrandDeleteModal,
    setBrandDeleteName,
    setBrandDeleteIcon,
  } = UseMe();

  const [getBrands, setGetBrands] = useState([]);

  const getAllBrands = async () => {
    try {
      const getBrandsFn = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/getBrand`,
      );

      setGetBrands(getBrandsFn.data.brand || []);

      console.log("get all brands", getBrandsFn.data.brand);
    } catch (error) {
      console.log("error in get brands", error);
      console.log("Server response:", error.response?.data);
    }
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-5 px-3 py-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {getBrands.map((brand) => (
          <div
            key={brand._id}
            className="group overflow-hidden rounded-2xl border border-[#252a30] bg-[#0d0f11] shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#3a4048]"
          >
            <div className="relative h-40 w-full overflow-hidden bg-[#15181c]">
              {brand.brandImage?.url ? (
                <img
                  src={brand.brandImage.url}
                  alt={brand.brandName}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#15181c]">
                  <span className="text-xs text-gray-600">
                    No brand image
                  </span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute left-4 top-4">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white shadow-lg">
                  {brand.brandIcon?.url ? (
                    <img
                      src={brand.brandIcon.url}
                      alt={brand.brandName}
                      className="h-full w-full object-contain p-1.5"
                    />
                  ) : (
                    <span className="text-[9px] text-gray-500">
                      Logo
                    </span>
                  )}
                </div>
              </div>

              <div className="absolute right-4 top-4">
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/40 text-white/70 backdrop-blur-sm transition hover:bg-black/70 hover:text-white"
                >
                  <PiDotsThreeVerticalBold size={18} />
                </button>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="truncate text-base font-semibold text-white">
                  {brand.brandName}
                </h4>

                {brand.brandSlogan && (
                  <p className="mt-1 truncate text-xs text-white/60">
                    {brand.brandSlogan}
                  </p>
                )}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <BsBox size={13} />

                  <span className="text-xs">
                    {brand.productCount} products
                  </span>
                </div>

                <div
                  className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                    brand.status === "Active"
                      ? "border-green-400/15 bg-green-400/[0.06] text-green-400"
                      : "border-gray-500/15 bg-gray-500/[0.06] text-gray-500"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      brand.status === "Active"
                        ? "bg-green-400"
                        : "bg-gray-500"
                    }`}
                  />

                  {brand.status}
                </div>
              </div>

              <div className="my-4 h-px w-full bg-[#24282e]" />

              <div className="flex items-center justify-end gap-1">
                <button
                  type="button"
                  title="Edit brand"
                  onClick={() => {
                    setBrandId(brand._id);
                    setUpdateBrandOpen(true);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/[0.05] hover:text-white"
                >
                  <MdOutlineModeEditOutline size={17} />
                </button>

                <button
                  type="button"
                  title="Delete brand"
                  onClick={() => {
                    setBrandDeleteName(brand.brandName);
                    setBrandDeleteIcon(brand.brandIcon?.url);
                    setBrandId(brand._id);
                    setBrandDeleteModal(true);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
                >
                  <RiDeleteBin6Line size={17} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandGrid;