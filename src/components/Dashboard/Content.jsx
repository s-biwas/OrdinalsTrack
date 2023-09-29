import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

async function fetchJsonContent(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch content");
    }
    const jsonContent = await response.json();
    //return in preety format
    return JSON.stringify(jsonContent, null, 2);
}

async function fetchTextContent(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch content");
    }

    const textContent = await response.text();

    try {
        // Attempt to parse the textContent as JSON
        const parsedJSON = JSON.parse(textContent);
        // If successful, stringify it in a pretty format
        return JSON.stringify(parsedJSON, null, 2);
    } catch (error) {
        // If parsing as JSON fails, return the plain text content
        return textContent;
    }
}

function ContentDisplay({ id, content_type, number }) {
    const [contentElement, setContentElement] = useState(null);
    const contentUrl = `https://api.hiro.so/ordinals/v1/inscriptions/${id}/content`;

    useEffect(() => {
        if (content_type === "image/svg+xml") {
            setContentElement(
                <ReactSVG src={contentUrl} className="h-full w-full rounded-md" />
            );
        } else if (content_type.startsWith("image/")) {
            setContentElement(
                <img
                    src={contentUrl}
                    alt="Ordinal Image"
                    className="h-full w-full rounded-md"
                />,
            );

        } else if (content_type.startsWith("video/")) {
            setContentElement(
                <video controls src={contentUrl} className="rounded-md h-full w-full" />,
            );
        } else if (content_type.startsWith("audio/")) {
            setContentElement(
                <audio controls src={contentUrl} className="rounded-md h-full w-full" />,
            );
        } else if (content_type.startsWith("text/")) {
            fetchTextContent(contentUrl)
                .then((textContent) => {
                    setContentElement(
                        <pre className=" grid h-full w-full place-items-center overflow-scroll rounded-md p-5 font-bold content text-white cbar">
                            {textContent}
                        </pre>,
                    );
                })
                .catch((error) => {
                    console.error("Error fetching text content:", error);
                    setContentElement(
                        <pre className=" h-48 w-48 overflow-scroll border p-5 content text-white cbar">
                            Something went wrong ʕ•̠͡•ʔ
                        </pre>,
                    );
                });
        } else {
            fetchJsonContent(contentUrl)
                .then((content) => {
                    setContentElement(
                        <pre className=" grid h-48 w-48 place-items-center overflow-scroll rounded-md  p-5 font-bold content text-Grey9 cbar">
                            {content}
                        </pre>,
                    );
                    console.log(contentElement);
                })
                .catch((error) => {
                    console.error("Error fetching text content:", error);
                    setContentElement(
                        <pre className=" h-48 w-48 content overflow-scroll border bg-yellow-400 p-5 text-white c-bar">
                            Something went wrong ʕ•̠͡•ʔ
                        </pre>,
                    );
                });
        }
    }, []);

    return (
        <div className="h-80 w-72 box-wrapper p-1 rounded-md flex flex-col group-hover:scale-105 cursor-pointer">
            <div className={`flex h-64 w-full flex-col items-center justify-center gap-y-4 rounded-md box overflow-hidden ${number ? "h-64" : "h-full"}`}>
                {contentElement}
            </div>
            {number && (
                <span className="h-16 flex justify-center items-center w-full text-center font-bold Iholder">
                    Inscription #{number}
                </span>
            )}
        </div>
    );
}

export default ContentDisplay;
