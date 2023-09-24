import { useEffect, useState } from "react";
import { createAvatar } from "../../utils/generateWeb3Avatar"
import Copy from "../../images/Copy.svg"

export default function UserProfile({ address }) {
    useEffect(() => {
        createAvatar("avatar", address);
    }, [address]);

    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(address);
            setCopied(true);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    return (
        <div className="w-full border-2 rounded-md flex justify-center items-center flex-col min-h-[100px] p-7 gap-6 my-7">
            <h2 className="text-lg font-light border-b ">Connected With :</h2>
            <div className="flex flex-col items-start justify-start gap-4">
                <div className="flex gap-2 flex-col md:flex-row items-center overflow-hidden">
                    <div id="avatar" className="w-10 h-10"></div>
                    <span className="text-sm md:text-base lg:text-lg lg:font-medium">{address}</span>
                </div>
                <div
                    onClick={copyToClipboard}
                    className="flex gap-1 items-center cursor-pointer group">
                    <img src={Copy} alt="copy address" className="w-5 h-5" />
                    <span className=" text-[#7c7c7c] group-hover:text-white">{!copied ? "Copy Address" : "copied"}</span>
                </div>
            </div>
        </div>
    )
}
