import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const LatestArrivalsProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const latestArrivalsData = location.state?.latestProducts || {};

  const [latestArrivalsProductsData, setLatestArrivalsProductsData] = useState(
    [],
  );

  const [loading, setLoading] = useState(true);

  const getLatestArrivals = async () => {
    try {
      setLoading(true);

      const latestArrivalsApi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Me/NewArrivals`,
      );

      setLatestArrivalsProductsData(latestArrivalsApi.data.products || []);
    } catch (error) {
      console.log("Error in latest arrivals", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLatestArrivalsProduct = latestArrivalsProductsData
    .filter(
      (latestProduct) =>
        latestProduct.category === latestArrivalsData?.category,
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    getLatestArrivals();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0D10] px-6 py-8 text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="group flex items-center gap-2 text-sm text-neutral-400 transition hover:text-white"
      >
        <IoArrowBack className="text-lg transition-transform group-hover:-translate-x-1" />
        Back
      </button>

      {/* Header */}
      <div className="mt-10 border-b border-[#242932] pb-7">
        <h1 className="text-2xl font-semibold tracking-tight capitalize">
          {latestArrivalsData.name || "Latest Arrivals"}
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
          {latestArrivalsData.description}
        </p>
      </div>

      {/* Products Header */}
      <div className="mb-6 mt-8 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">Collection Products</h2>
          <p className="mt-1 text-xs text-neutral-500">
            Manage products in this collection.
          </p>
        </div>

        <span className="rounded-md border border-[#242932] bg-[#12151A] px-3 py-2 text-xs text-neutral-400">
          {filteredLatestArrivalsProduct.length} Products
        </span>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-700 border-t-purple-500" />
        </div>
      ) : filteredLatestArrivalsProduct.length > 0 ? (
        /* Product Grid */

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredLatestArrivalsProduct.map((product) => {
            const mainImage =
              product.variants?.[0]?.color?.mainImage?.url ||
              product.images?.[0]?.url;

            const totalStock =
              product.variants?.reduce(
                (total, variant) =>
                  total +
                  (variant.sizes?.reduce(
                    (sum, size) => sum + Number(size.stock || 0),
                    0,
                  ) || 0),
                0,
              ) || 0;

            const colors =
              product.variants?.map((variant) => variant.color) || [];

            const sizes = [
              ...new Set(
                product.variants?.flatMap(
                  (variant) => variant.sizes?.map((size) => size.size) || [],
                ) || [],
              ),
            ];

            return (
              <div
                key={product._id}
                className="group overflow-hidden rounded-xl border border-[#242932] bg-[#12151A] transition hover:border-purple-500/40"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden bg-[#191D24]">
                  {mainImage ? (
                    <img
                      src={mainImage}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-neutral-600">
                      No Image
                    </div>
                  )}

                  <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-[9px] text-neutral-300">
                    {product.category}
                  </span>

                  {product.discount > 0 && (
                    <span className="absolute right-2 top-2 rounded bg-purple-600 px-2 py-1 text-[9px] font-semibold text-white">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-500">
                      {product.brand?.brandName || "ME"}
                    </span>

                    <span
                      className={`text-[9px] ${
                        product.status === "Active"
                          ? "text-green-400"
                          : "text-neutral-500"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>

                  <h3 className="mt-1 truncate text-sm font-semibold text-white">
                    {product.name}
                  </h3>

                  <p className="mt-1 line-clamp-1 text-[10px] text-neutral-500">
                    {product.description || "No description"}
                  </p>

                  {/* Price */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">
                      ₹{product.price?.toLocaleString("en-IN")}
                    </span>

                    {product.realPrice > product.price && (
                      <span className="text-[10px] text-neutral-600 line-through">
                        ₹{product.realPrice?.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  <div className="my-3 border-t border-[#242932]" />

                  {/* Stock and SKU */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] text-neutral-600">STOCK</p>
                      <p
                        className={`mt-1 text-xs font-medium ${
                          totalStock === 0
                            ? "text-red-400"
                            : totalStock <= 10
                              ? "text-yellow-400"
                              : "text-green-400"
                        }`}
                      >
                        {totalStock} Units
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[9px] text-neutral-600">SKU</p>
                      <p className="mt-1 text-xs text-neutral-300">
                        {product.sku || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Colors and Sizes */}
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {colors.slice(0, 5).map((color, index) => (
                        <span
                          key={index}
                          title={color.name}
                          className="h-4 w-4 rounded-full border border-white/20"
                          style={{ backgroundColor: color.code || "#888" }}
                        />
                      ))}
                      {colors.length > 5 && (
                        <span className="text-[9px] text-neutral-500">
                          +{colors.length - 5}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {sizes.slice(0, 4).map((size) => (
                        <span
                          key={size}
                          className="rounded border border-[#303640] px-1.5 py-1 text-[9px] text-neutral-400"
                        >
                          {size}
                        </span>
                      ))}
                      {sizes.length > 4 && (
                        <span className="text-[9px] text-neutral-500">
                          +{sizes.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-3 flex items-center justify-between border-t border-[#242932] pt-3">
                    <span className="text-[9px] text-neutral-600">
                      {product.createdAt
                        ? new Date(product.createdAt).toLocaleDateString(
                            "en-IN",
                          )
                        : "N/A"}
                    </span>

                    {/* <button
                      onClick={() =>
                        navigate("/adminDash/storeProducts", {
                          state: { productId: product._id },
                        })
                      }
                      className="text-[11px] font-medium text-purple-400 hover:text-purple-300"
                    >
                      View Details →
                    </button> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-[#242932] bg-[#12151A] py-16 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#1B1F27]">
            <icon name="package-open" size="xl" color="secondary" />
          </div>

          <h3 className="text-sm font-semibold text-neutral-300">
            No Products Found
          </h3>

          <p className="mt-2 text-xs text-neutral-500">
            No products have been added to this collection yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default LatestArrivalsProductPage;
