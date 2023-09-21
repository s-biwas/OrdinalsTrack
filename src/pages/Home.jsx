import React from "react";
import monkey from "../images/Monkey.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  const gradientText = {
    fontFamily: "Paytone One",
    background: "linear-gradient(45deg, #f06, #9f6)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  };
  const animationStyle = {
    animation: "moveUpDown 3s ease-in-out infinite",
  };

  return (
    <motion.div
      className="flex h-screen flex-wrap items-center justify-center "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
    >
      <div className="flex w-full items-center p-4 md:w-1/3 lg:w-1/3">
        <div className="p-4">
          <motion.p
            className="text-2xl font-bold text-white md:text-lg"
            style={{
              fontFamily: "Outfit",
            }}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 1, delay: 0.5 },
            }}
          >
            Unlock the Secrets of NFT Trading Success
          </motion.p>
          <motion.p
            className="text-4xl leading-tight text-white md:text-5xl lg:text-7xl"
            style={{
              fontFamily: "Paytone One",
            }}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 1, delay: 0.7 },
            }}
          >
            DISCOVER RARE <span style={gradientText}>MONKEY NFT'S!</span>
          </motion.p>
          <motion.p
            className="text-base font-bold text-white opacity-70 md:text-lg"
            style={{
              fontFamily: "Outfit",
            }}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 1, delay: 0.9 },
            }}
          >
            The Ultimate Tool to Analyze Your NFT Investments
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 1, delay: 0.9 },
            }}
          >
            <button className="mt-4 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 px-4 py-2 font-semibold text-white transition duration-300 ease-in-out hover:to-orange-700">
              <Link to="/addwallet">Connect Wallet</Link>
            </button>
          </motion.div>
        </div>
      </div>
      <div className="w-full p-4 md:w-2/3 lg:w-2/3">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -100 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: 0.5 },
          }}
        >
          <motion.img
            src={monkey}
            alt="Monkey"
            className="mx-auto w-full rounded-full md:w-3/4 lg:w-2/3"
            style={animationStyle}
            initial={{ opacity: 0, y: -100 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 1, delay: 0.7 },
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
