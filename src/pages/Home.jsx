import monkey from "../images/Monkey.svg";
import { motion } from "framer-motion";
// import { Profile } from "../components/walletConnector";
import apiConnectWallet from "../services/apiConnectWallet";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const wallet = useSelector((state) => state.wallet);
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
      className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
    >
      <div className="flex w-full flex-col-reverse items-center p-4 lg:flex-row lg:px-0 lg:py-4">
        <div className="flex flex-col items-center justify-center gap-5 p-4 text-center lg:items-start lg:gap-1 lg:p-0 lg:py-4 lg:text-left">
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
            EXPLORE YOUR{" "}
            <span style={gradientText} className="w-full">
              ORDINAL&apos;S P&L!
            </span>
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

            {!wallet?.response ? (
              <button
                onClick={apiConnectWallet}
                className=" rounded-full bg-gradient-to-r from-orange-400 to-orange-600 px-4 py-2 font-semibold text-white transition duration-300 ease-in-out hover:to-orange-700"
              >
                Connect Wallet
              </button>
            ) : (
              <Link
                to="/dashboard"
                className=" rounded-full bg-gradient-to-r from-orange-400 to-orange-600 px-4 py-2 font-semibold text-white transition duration-300 ease-in-out hover:to-orange-700"
              >
                See Your Dashboard &rarr;
              </Link>
            )}
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
