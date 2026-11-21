import React, { useState } from "react";
import { motion } from "motion/react";
import { IoArrowBack, IoStar, IoAdd, IoRemove } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductInfo = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const product = location.state?.product;

  const [selectedImage, setSelectedImage] = useState(
    product?.variants?.[0]?.color?.mainImage?.url || "",
  );

  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || null,
  );

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-xl">Product not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 border border-white px-6 py-3 rounded-full"
          >
            Go Back
          </button>
        </div>
      </section>
    );
  }

  const handlevariantChange = (variant) => {
    setSelectedVariant(variant);
    setSelectedImage(variant?.color?.mainImage?.url || "");
    setSelectedSize("");
    setQuantity(1);
  };

  const increaseQuantity = () => {
    if (!selectedSize) {
      return;
    }

    const selectedSizeData = selectedVariant?.sizes?.find(
      (size) => size.size === selectedSize,
    );

    if (selectedSizeData && quantity < selectedSizeData.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleImageChange = (image) => {
    setSelectedImage(image.url);
  };

  const mainImage = selectedVariant?.color?.mainImage;
  const subImages = selectedVariant?.color?.subImages || [];

  const galleryImages = [
    ...(mainImage?.url
      ? [{ url: mainImage.url, publicId: mainImage.publicId }]
      : []),
    ...subImages,
  ];

  const handleCartItems = () => {
    if (!selectedVariant) return;

    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const selectedSizeData = selectedVariant.sizes.find(
      (size) => size.size === selectedSize,
    );

    if (!selectedSizeData || selectedSizeData.stock <= 0) {
      alert("Selected size is out of stock");
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: selectedImage,
      color: selectedVariant.color,
      size: selectedSize,
      quantity,
    };

    console.log(cartItem);

    navigate("/mainpage/Cart", { state: { cartProducts: cartItem } });
  };

  const handleBuyNow = () => {
    if (!selectedVariant) {
      alert("Please select a color");
      return;
    }

    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const selectedSizeData = selectedVariant.sizes?.find(
      (size) => size.size === selectedSize,
    );

    if (!selectedSizeData || selectedSizeData.stock <= 0) {
      alert("Selected size is out of stock");
      return;
    }

    const buyNowProduct = {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedVariant.color,
      image: selectedImage,
    };

    console.log("Buy Now:", buyNowProduct);

    navigate("/productInfo/Checkout", { state: { products: buyNowProduct } });
  };

  const addToCart = async () => {
    try {
      const userToken = localStorage.getItem("userToken");

      const addToCartApi = await axios.post(
        `${import.meta.env.VITE_API_URL}/Me/addToCart/${product._id}`,
        {
          color: selectedVariant.color.name,
          size: selectedSize,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      console.log(addToCartApi.data);
      alert("Product added to cart successfully");
    } catch (error) {
      console.log(
        "Error in add to cart:",
        error.response?.data?.message || error.message,
      );
    }
  };

  return (
    <section className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="pl-4 sm:pl-5 pt-5 sm:pt-7">
        <button
          className="group flex items-center gap-3"
          onClick={() => navigate(-1)}
        >
          <span className="text-xl transition-transform duration-300 group-hover:-translate-x-2">
            <IoArrowBack />
          </span>
          <span className="uppercase tracking-[0.35em] text-sm">Back</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Grid — single col on mobile, two cols on lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* LEFT: Image Gallery */}
          <motion.div layout>
            {/* Main Image */}
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-900">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-72 sm:h-96 md:h-[500px] lg:h-[700px] object-cover hover:scale-110 transition duration-700"
                />
              ) : (
                <div className="w-full h-72 sm:h-96 md:h-[500px] lg:h-[700px] flex items-center justify-center text-white/40">
                  No Image
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4 mt-3 sm:mt-5">
                {galleryImages.map((image, index) => (
                  <button
                    key={image.publicId || index}
                    onClick={() => handleImageChange(image)}
                    className={`overflow-hidden rounded-lg sm:rounded-xl border ${
                      selectedImage === image.url
                        ? "border-white"
                        : "border-white/10"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      className="h-20 sm:h-28 lg:h-32 w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* RIGHT: Product Details */}
          <div>
            {/* Category & Name */}
            <p className="uppercase tracking-[0.35em] sm:tracking-[0.45em] text-neutral-500 text-xs sm:text-sm">
              {product.category}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light mt-2 sm:mt-3 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
              <h2 className="text-3xl sm:text-4xl font-semibold">
                &#8377;{product.price}
              </h2>
              {product.realPrice > product.price && (
                <span className="text-base sm:text-lg text-white/40 line-through">
                  &#8377;{product.realPrice}
                </span>
              )}
              {product.discount > 0 && (
                <span className="text-xs sm:text-sm tracking-[0.15em] text-white/60 uppercase">
                  {product.discount}% Off
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-white/60 leading-7 sm:leading-8 mt-6 sm:mt-8 text-sm sm:text-base">
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="mt-8 sm:mt-10">
              <h4 className="mb-3 sm:mb-4 text-base sm:text-lg">
                Select Color
              </h4>
              <div className="flex flex-wrap gap-3 sm:gap-5">
                {product?.variants?.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => handlevariantChange(variant)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 transition ${
                      selectedVariant === variant
                        ? "border-white scale-110"
                        : "border-white/20"
                    }`}
                    style={{ backgroundColor: variant?.color?.code }}
                  />
                ))}
              </div>
              <p className="mt-2 sm:mt-3 text-white/60 text-sm">
                Selected Color:
                <span className="text-white ml-2">
                  {selectedVariant?.color?.name || "Select Color"}
                </span>
              </p>
            </div>

            {/* Size Selector */}
            <div className="mt-8 sm:mt-10">
              <h4 className="mb-3 sm:mb-4 text-base sm:text-lg">
                Select Size
              </h4>
              <div className="flex flex-wrap gap-3 sm:gap-5 items-center">
                {selectedVariant?.sizes?.map((size, index) => {
                  const outofStock = size.stock <= 0;
                  return (
                    <button
                      key={size._id || index}
                      disabled={outofStock}
                      onClick={() => {
                        setSelectedSize(size.size);
                        setQuantity(1);
                      }}
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 flex justify-center items-center transition text-sm sm:text-base ${
                        selectedSize === size.size
                          ? "border-white bg-white text-black"
                          : "border-white/20 hover:border-white"
                      } ${
                        outofStock
                          ? "opacity-30 cursor-not-allowed line-through"
                          : ""
                      }`}
                    >
                      {size.size}
                    </button>
                  );
                })}
              </div>
              {selectedSize && (
                <p className="mt-2 sm:mt-3 text-white/50 text-xs sm:text-sm">
                  {
                    selectedVariant?.sizes?.find(
                      (size) => size.size === selectedSize,
                    )?.stock
                  }{" "}
                  available
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="mt-8 sm:mt-10">
              <h4 className="mb-3 sm:mb-4 text-base sm:text-lg">Quantity</h4>
              <div className="flex items-center gap-3">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition disabled:opacity-30"
                >
                  <IoRemove />
                </button>
                <p className="text-xl sm:text-2xl font-medium w-8 text-center">
                  {quantity}
                </p>
                <button
                  onClick={increaseQuantity}
                  className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition"
                >
                  <IoAdd />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-10 sm:mt-12">
              <button
                className="flex-1 bg-white text-black py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-gray-200 transition"
                onClick={addToCart}
              >
                Add to Cart
              </button>
              <button
                className="flex-1 border border-white rounded-full hover:bg-white hover:text-black transition py-3.5 sm:py-4 text-base sm:text-lg"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>

            {/* Divider */}
            <div className="h-[1px] sm:h-[2px] w-full bg-white/10 mt-10 sm:mt-12" />

            {/* Product Details Table */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 space-y-4 sm:space-y-5">
              {Object.entries(product.details || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-6 sm:gap-10">
                  <p className="text-white/60 text-sm sm:text-base shrink-0">
                    {key}
                  </p>
                  <p className="text-right text-sm sm:text-base">{value}</p>
                </div>
              ))}
            </div>

            {/* Brand */}
            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden bg-white shrink-0">
                  <img
                    src={product.brand?.brandIcon?.url}
                    alt={product.brand?.brandName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white/50 text-xs sm:text-sm">Brand</p>
                  <p className="text-base sm:text-lg">
                    {product.brand?.brandName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;