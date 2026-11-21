import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Signin from "../authentication/signin/Signin";
import { useNavigate } from "react-router-dom";

const Welcomepage = () => {
  const navigate = useNavigate();

  const text = "Create Your Own Trend";
  const [showlogo, setShowlogo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowlogo(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const [authcome, setauthcome] = useState(false);
  useEffect(() => {
    const authtime = setTimeout(() => {
      setauthcome(true);
    }, 10000);
    return () => clearTimeout(authtime);
  }, []);

  const [buttonanimate, setButtonanimate] = useState(false);
  useEffect(() => {
    const buttontime = setTimeout(() => {
      setButtonanimate(true);
    }, 10000);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-3 sm:px-6 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!showlogo ? (
          <motion.h1
            key="quote"
            className="text-white text-2xl sm:text-4xl md:text-5xl font-light text-center w-full"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                className="text-white text-2xl sm:text-4xl md:text-6xl font-thin uppercase tracking-[0.08em] sm:tracking-[0.15em] md:tracking-[0.2em] text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 1 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center w-full min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate("/dashboard")}
          >
            {/* Logo */}
            <motion.div
              animate={{
                y: buttonanimate ? -3 : 0,
                scale: buttonanimate ? 0.8 : 1,
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Glow */}
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="h-24 w-24 sm:h-36 sm:w-36 rounded-full bg-white/10 blur-[70px] sm:blur-[90px]" />
              </div>

              <div className="relative flex items-end gap-1 sm:gap-2">
                <motion.span
                  initial={{ y: -250, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 12,
                  }}
                  className="text-white text-7xl sm:text-8xl md:text-9xl font-thin tracking-tight"
                >
                  M
                </motion.span>

                <motion.span
                  initial={{ y: 250, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 12,
                    delay: 0.1,
                  }}
                  className="text-white text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight"
                >
                  E
                </motion.span>
              </div>
            </motion.div>

            {/* Continue Indicator */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Welcomepage;