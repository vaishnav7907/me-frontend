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
    <div className="h-screen bg-black flex items-center justify-center px-6 relative">
      {/* <AnimatePresence>
        {authcome && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="absolute top-8 right-10 flex gap-8"
          >
            <motion.span className="border-b border-gray-400 cursor-pointer hover:scale-110 transition duration-300" onClick={()=>navigate("/signin")}>
              <p className="text-white">Sign In</p>
            </motion.span>

            <motion.span className="border-b border-gray-400 cursor-pointer hover:scale-110 transition duration-300" onClick={()=>navigate("/signup")}>
              <p className="text-white">Sign Up</p>
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence> */}
      <AnimatePresence mode="wait">
        {!showlogo ? (
          <motion.h1
            key="quote"
            className="text-white text-5xl font-light"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                className="text-white text-4xl md:text-6xl font-thin uppercase tracking-[0.2em] text-center"
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
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
                <div className="h-36 w-36 rounded-full bg-white/10 blur-[90px]" />
              </div>

              <div className="relative flex items-end gap-2">
                <motion.span
                  initial={{ y: -250, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 12,
                  }}
                  className="text-white text-8xl md:text-9xl font-thin tracking-tight"
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
                  className="text-white text-8xl md:text-9xl font-bold tracking-tight"
                >
                  E
                </motion.span>
              </div>
            </motion.div>

            {/* Continue Indicator */}
            <AnimatePresence>
              {buttonanimate && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mt-14 flex flex-col items-center cursor-pointer"
                  onClick={() => setauthcome(true)}
                >
                  

                  <div className="relative flex items-center justify-center w-12 h-12">
                    <motion.div
                      className="absolute w-12 h-12 rounded-full border border-white/30"
                      animate={{
                        scale: [1, 1.6],
                        opacity: [0.6, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />

                    <motion.div
                      className="absolute w-12 h-12 rounded-full border border-white/15"
                      animate={{
                        scale: [1, 1.3],
                        opacity: [0.4, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: 0.4,
                        repeat: Infinity,
                      }}
                    />

                    <motion.div
                      className="w-3 h-3 rounded-full bg-white"
                      animate={{
                        scale: [1, 1.25, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Welcomepage;
