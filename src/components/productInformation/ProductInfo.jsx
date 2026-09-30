import React, { useState } from "react";
import { motion } from "motion/react";
import { IoArrowBack, IoStar, IoAdd, IoRemove } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

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
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
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
  return (
    <section className="min-h-screen bg-black text-white">
      <div className="pl-5 pt-7">
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

      <div className="max-w-7xl mx-auto px-8 py-12 ">
        <div className="grid grid-cols-2 gap-16 ">
          <motion.div layout>
            <div className="overflow-hidden rounded-3xl bg-neutral-900">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-[700px] object-cover hover:scale-110 transition duration-700"
                />
              ) : (
                <div className="w-full h-[700px] flex items-center justify-center text-white/40">
                  No Image
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-5">
              {galleryImages.map((image, index) => (
                <button
                  key={image.publicId || index}
                  onClick={() => handleImageChange(image)}
                  className={`overflow-hidden rounded-xl border ${selectedImage === image.url ? "border-white" : "border-white/10"}`}
                >
                  <img
                    src={image.url}
                    alt={`${product.name} ${index + 1}`}
                    className="h-32 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          <div className=" ">
            <p className="uppercase tracking-[0.45em] text-neutral-500 text-sm">
              {product.category}
            </p>
            <h1 className="text-5xl font-light mt-3"> {product.name} </h1>

            <div className="flex items-center gap-2 mt-5">
              <span className="flex gap-1 items-center">
                <IoStar className="text-yellow-400" />
                <IoStar className="text-yellow-400" />
                <IoStar className="text-yellow-400" />
                <IoStar className="text-yellow-400" />
                <IoStar className="text-yellow-400" />
              </span>
              <div className="flex gap-2 text-white/60 ml-2">
                <p>4.9</p> <p>(128 Reviews)</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <h2 className="text-4xl font-semibold"> ₹{product.price} </h2>
              {product.realPrice > product.price && (
                <span className="text-lg text-white/40 line-through">
                  ₹{product.realPrice}
                </span>
              )}

              {product.discount > 0 && (
                <span className="text-sm tracking-[0.15em] text-white/60 uppercase">
                  {product.discount}% Off
                </span>
              )}
            </div>
            <p className="text-white/60 leading-8 mt-8">
              {product.description}
            </p>

            <div className="mt-10">
              <h4 className="mb-4 text-lg"> Select Color </h4>

              <div className="flex gap-5">
                {product?.variants?.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => handlevariantChange(variant)}
                    className={`w-10 h-10 rounded-full border-2 transition ${
                      selectedVariant === variant
                        ? "border-white scale-110"
                        : "border-white/20"
                    }`}
                    style={{
                      backgroundColor: variant?.color?.code,
                    }}
                  />
                ))}
              </div>
              <p className="mt-3 text-white/60">
                Selected Color:
                <span className="text-white ml-2">
                  {selectedVariant?.color?.name || "Select Color"}
                </span>
              </p>
            </div>

            <div className="mt-10">
              <h4 className="mb-4 text-lg"> Select Size </h4>

              <div className="flex gap-5 items-center">
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
                      className={`w-12 h-12 rounded-full border-2 flex justify-center items-center transition ${selectedSize === size.size ? "border-white bg-white text-black" : "border-white/20 hover:border-white"} ${outofStock ? "opacity-30 cursor-not-allowed line-through" : ""}`}
                    >
                      {size.size}
                    </button>
                  );
                })}
              </div>

              {selectedSize && (
                <p className="mt-3 text-white/50 text-sm">
                  {
                    selectedVariant?.sizes?.find(
                      (size) => size.size === selectedSize,
                    )?.stock
                  }{" "}
                  available
                </p>
              )}
            </div>

            <div className="mt-10">
              <h4 className="mb-4 text-lg"> Quantity </h4>
              <div className="flex items-center gap-3">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition disabled:opacity-30"
                >
                  <IoRemove />
                </button>

                <p className="text-2xl font-medium w-8 text-center">
                  {quantity}
                </p>

                <button
                  onClick={increaseQuantity}
                  className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition"
                >
                  <IoAdd />
                </button>
              </div>
            </div>

            <div className="flex gap-5 mt-12">
              <button
                className="flex-1 bg-white text-black py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition"
                onClick={handleCartItems}
              >
                Add to Cart
              </button>
              <button
                className="border border-white rounded-full hover:bg-white hover:text-black transition py-4 text-lg flex-1"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
              {/* <button className="w-14 border border-white/20 rounded-full flex items-center justify-center hover:border-white transition">
                <IoHeartOutline className="text-xl" />
              </button> */}
            </div>
            <div className="h-[2px] w-full bg-white/10 mt-12" />

            <div className="mt-12 pt-8 space-y-5">
              {Object.entries(product.details || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-10">
                  <p className="text-white/60"> {key} </p>{" "}
                  <p className="text-right"> {value} </p>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-white">
                  <img
                    src={product.brand?.brandIcon?.url}
                    alt={product.brand?.brandName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white/50 text-sm"> Brand </p>
                  <p className="text-lg"> {product.brand?.brandName} </p>
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
