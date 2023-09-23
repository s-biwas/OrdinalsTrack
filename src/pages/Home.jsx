import monkey from "../images/Monkey.svg";
import { motion } from "framer-motion";
// import { Profile } from "../components/walletConnector";
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
      className="flex flex-wrap items-center justify-center max-w-screen-xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
    >
      <div className="flex w-full items-center p-4 flex-col-reverse lg:flex-row lg:px-0 lg:py-4">
        <div className="p-4 lg:p-0 lg:py-4 flex flex-col justify-center items-center text-center lg:text-left lg:items-start gap-5 lg:gap-1">
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
            Unlock the Potential of BTC Ordinals
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
            EXPLORE YOUR <span style={gradientText} className="w-full">ORDINAL&apos;S P&L!</span>
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
            The Ultimate Tool to Analyze Your Ordinal Returns
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 1, delay: 0.9 },
            }}
            className="mt-4"
          >
            {/* <Profile embedOn={"home"} /> */}
            <Link
              to={"addwallet"}
              className=" rounded-full bg-gradient-to-r from-orange-400 to-orange-600 px-4 py-2 font-semibold text-white transition duration-300 ease-in-out hover:to-orange-700">
              Connect Wallet
            </Link>
          </motion.div>
        </div>
        <div className="w-full p-4">
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
              className="mx-auto w-full rounded-full"
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
      </div>
    </motion.div>
  );
};

export default Home;
