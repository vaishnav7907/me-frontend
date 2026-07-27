// import React, { useState } from "react";
// import { motion } from "motion/react";

// // Product Images
// // import shirt1 from "../../../assets/shirt1.jpg";
// // import shirt2 from "../../../assets/shirt2.jpg";
// // import tshirt1 from "../../../assets/tshirt1.jpg";
// // import tshirt2 from "../../../assets/tshirt2.jpg";
// // import jeans1 from "../../../assets/jeans1.jpg";
// // import hoodie1 from "../../../assets/hoodie1.jpg";
// // import jacket1 from "../../../assets/jacket1.jpg";
// // import blazer1 from "../../../assets/blazer1.jpg";

// const products = [
//   {
//     id: 1,
//     name: "Classic White Shirt",
//     category: "Shirts",
//     price: "$79",
//     // image: shirt1,
//   },
//   {
//     id: 2,
//     name: "Black Linen Shirt",
//     category: "Shirts",
//     price: "$89",
//     // image: shirt2,
//   },
//   {
//     id: 3,
//     name: "Oversized T-Shirt",
//     category: "T-Shirts",
//     price: "$45",
//     // image: tshirt1,
//   },
//   {
//     id: 4,
//     name: "Premium Cotton Tee",
//     category: "T-Shirts",
//     price: "$49",
//     // image: tshirt2,
//   },
//   {
//     id: 5,
//     name: "Slim Fit Jeans",
//     category: "Jeans",
//     price: "$99",
//     // image: jeans1,
//   },
//   {
//     id: 6,
//     name: "Essential Hoodie",
//     category: "Hoodies",
//     price: "$95",
//     // image: hoodie1,
//   },
//   {
//     id: 7,
//     name: "Leather Jacket",
//     category: "Jackets",
//     price: "$199",
//     // image: jacket1,
//   },
//   {
//     id: 8,
//     name: "Tailored Blazer",
//     category: "Blazers",
//     price: "$179",
//     // image: blazer1,
//   },
// ];

// const categories = [
//   "All",
//   "Shirts",
//   "T-Shirts",
//   "Jeans",
//   "Jackets",
//   "Hoodies",
//   "Blazers",
// ];

// const MenCollection = () => {
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const filteredProducts =
//     selectedCategory === "All"
//       ? products
//       : products.filter(
//           (item) => item.category === selectedCategory
//         );

//   return (
//     <div className="bg-gray-600 min-h-screen text-black">

//       {/* Hero */}
//       <section className="border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-24">

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="uppercase tracking-[8px] text-gray-400 text-sm"
//           >
//             Premium Fashion
//           </motion.p>

//           <motion.h1
//             initial={{ y: 40, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: .7 }}
//             className="text-6xl md:text-8xl font-extralight mt-6"
//           >
//             Men's Collection
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: .3 }}
//             className="max-w-2xl mt-8 text-gray-500 leading-8"
//           >
//             Discover timeless menswear crafted with premium fabrics,
//             clean silhouettes, and effortless sophistication.
//           </motion.p>

//         </div>
//       </section>

//       {/* Categories */}

//       <section className="sticky top-0 bg-white z-20 border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap gap-4">

//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`px-6 py-2 uppercase tracking-[3px] text-sm transition

//               ${
//                 selectedCategory === category
//                   ? "bg-black text-white"
//                   : "border border-black hover:bg-black hover:text-white"
//               }`}
//             >
//               {category}
//             </button>
//           ))}

//         </div>
//       </section>

//       {/* Products */}

//       <section className="max-w-7xl mx-auto px-6 py-20">

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

//           {filteredProducts.map((item, index) => (

//             <motion.div
//               key={item.id}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{
//                 duration: .5,
//                 delay: index * .05,
//               }}
//               className="group cursor-pointer"
//             >

//               {/* Image */}

//               <div className="overflow-hidden bg-gray-100 aspect-[3/4]">

//                 <img
//                 //   src={item.image}
//                   alt={item.name}
//                   className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
//                 />

//               </div>

//               {/* Info */}

//               <div className="mt-5">

//                 <p className="uppercase tracking-[3px] text-xs text-gray-400">
//                   {item.category}
//                 </p>

//                 <h2 className="mt-2 text-xl font-light">
//                   {item.name}
//                 </h2>

//                 <div className="flex items-center justify-between mt-4">

//                   <span className="font-medium text-lg">
//                     {item.price}
//                   </span>

//                   <span className="text-xs uppercase tracking-[3px] text-gray-400">
//                     New
//                   </span>

//                 </div>

//               </div>

//             </motion.div>

//           ))}

//         </div>

//       </section>

//     </div>
//   );
// };

// export default MenCollection;
