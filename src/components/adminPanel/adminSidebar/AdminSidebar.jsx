import React, { useState } from "react";
import {
  FiGrid,
  FiShoppingBag,
  FiBox,
  FiTag,
  FiPackage,
  FiUsers,
  FiDollarSign,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const AdminSidebar = () => {
  const navigation = [
    {
      title: "Overview",
      items: [
        {
          name: "Dashboard",
          icon: <FiGrid />,
        },
      ],
    },
    {
      title: "Store",
      items: [
        {
          name: "Products",
          icon: <FiShoppingBag />,
        },
        {
          name: "New Arrivals",
          icon: <FiBox />,
        },
        {
          name: "Brands",
          icon: <FiTag />,
        },
        {
          name: "Orders",
          icon: <FiPackage />,
          badge: "24",
        },
        {
          name: "Customers",
          icon: <FiUsers />,
        },
        {
          name: "Sales",
          icon: <FiDollarSign />,
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          name: "Settings",
          icon: <FiSettings />,
        },
      ],
    },
  ];

  const [navigationBtn, setNavigationBtn] = useState("Dashboard");

  const handleclick = (name) => {
    setNavigationBtn(name);
  };

  return (
    <aside className="fixed top-0 left-0 z-50 h-screen w-[260px] bg-[#0B0D10] border-r border-[#242932] flex flex-col">
      
      {/* Logo */}
      <div className="h-[90px] px-7 flex flex-col items-start justify-center border-b border-[#242932]">
        <h1 className="text-3xl font-bold tracking-[0.35em] text-white">
          ME
        </h1>

        <p className="text-[8px] tracking-[0.35em] text-[#666D78] mt-1">
          MEN'S FASHION
        </p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        {navigation.map((service, index) => (
          <div
            key={index}
            className={`${index !== 0 ? "mt-8" : ""}`}
          >
            {/* Section title */}
            <p
              className="
                px-3
                mb-3
                text-[9px]
                font-medium
                uppercase
                tracking-[0.3em]
                text-[#505762]
              "
            >
              {service.title}
            </p>

            {/* Items */}
            <div className="space-y-1">
              {service.items.map((item, itemIndex) => {
                const isActive = navigationBtn === item.name;

                return (
                  <button
                    key={itemIndex}
                    onClick={() => handleclick(item.name)}
                    className={`
                      group
                      w-full
                      flex
                      items-center
                      gap-3
                      px-3
                      py-3
                      rounded-lg
                      text-sm
                      transition-all
                      duration-200

                      ${
                        isActive
                          ? "bg-[#8B5CF6]/10 text-[#A78BFA]"
                          : "text-[#8B93A1] hover:bg-[#181C22] hover:text-white"
                      }
                    `}
                  >
                    {/* Icon */}
                    <span
                      className={`
                        text-[17px]
                        transition-colors
                        duration-200

                        ${
                          isActive
                            ? "text-[#8B5CF6]"
                            : "text-[#68707C] group-hover:text-white"
                        }
                      `}
                    >
                      {item.icon}
                    </span>

                    {/* Name */}
                    <span className="flex-1 text-left">
                      {item.name}
                    </span>

                    {/* Badge */}
                    {item.badge && (
                      <span
                        className={`
                          min-w-[22px]
                          h-[22px]
                          px-1.5
                          flex
                          items-center
                          justify-center
                          rounded-full
                          text-[10px]
                          font-semibold
                          
                          ${
                            isActive
                              ? "bg-[#8B5CF6] text-white"
                              : "bg-[#242932] text-[#8B93A1]"
                          }
                        `}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="p-5 border-t border-[#242932]">
        <button
          className="
            group
            w-full
            flex
            items-center
            gap-3
            px-3
            py-3
            rounded-lg
            text-sm
            text-[#8B93A1]
            hover:bg-red-500/10
            hover:text-red-400
            transition-all
            duration-200
          "
        >
          <FiLogOut
            className="
              text-[17px]
              group-hover:text-red-400
              transition-colors
            "
          />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;