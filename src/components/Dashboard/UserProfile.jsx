import { useEffect, useState } from "react";
import { createAvatar } from "../../utils/generateWeb3Avatar";
import Copy from "../../images/Copy.svg";

export default function UserProfile({
  address,
  accountStatus = "Connected With :",
}) {
  useEffect(() => {
    createAvatar("avatar", address);
  }, [address]);

  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      <div className="my-7 flex min-h-[100px] w-full flex-col items-center justify-center gap-6 rounded-md border-2 p-7">
        <h2 className="border-b text-lg font-light ">{accountStatus}</h2>
        <div className="flex flex-col items-start justify-start gap-4">
          <div className="flex flex-col items-center gap-2 overflow-hidden md:flex-row">
            <div id="avatar" className="h-10 w-10"></div>
            <span className="break-all text-sm md:text-base lg:text-lg lg:font-medium">
              {address}
            </span>
          </div>
          <div
            onClick={copyToClipboard}
            className="group flex cursor-pointer items-center gap-1"
          >
            <img src={Copy} alt="copy address" className="h-5 w-5" />
            <span className=" text-[#7c7c7c] group-hover:text-white">
              {!copied ? "Copy Address" : "copied"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
