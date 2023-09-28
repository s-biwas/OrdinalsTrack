import { useEffect, useState } from "react";

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
            fetchTextContent(contentUrl)
                .then((textContent) => {
                    setContentElement(
                        <iframe
                            srcDoc={textContent}
                            title="Embedded SVG"
                            width="100%"
                            height="400"
                            sandbox="allow-scripts allow-same-origin"
                        />,
                    );
                })
                .catch((error) => {
                    console.error("Error fetching text content:", error);
                    setContentElement(
                        <pre className=" h-48 w-48 overflow-hidden border bg-slate-200/10 p-5 text-white">
                            Something went wrong ʕ•̠͡•ʔ
                        </pre>,
                    );
                });
        } else if (content_type.startsWith("image/")) {
            setContentElement(
                <img
                    src={contentUrl}
                    alt="Ordinal Image"
                    className="h-60 w-60 rounded-md"
                />,
            );
        } else if (content_type.startsWith("video/")) {
            setContentElement(
                <video controls src={contentUrl} className="rounded-md" />,
            );
        } else if (content_type.startsWith("audio/")) {
            setContentElement(
                <audio controls src={contentUrl} className="rounded-md" />,
            );
        } else if (content_type.startsWith("text/")) {
            fetchTextContent(contentUrl)
                .then(() => {
                    setContentElement(
                        <pre className="custom-scrollbar grid h-48 w-48 place-items-center overflow-scroll rounded-md bg-yellow-400 p-5 font-bold text-Grey9">
                            BitMap.get
                        </pre>,
                    );
                })
                .catch((error) => {
                    console.error("Error fetching text content:", error);
                    setContentElement(
                        <pre className=" h-48 w-48 overflow-scroll border bg-yellow-400 p-5 text-white">
                            Something went wrong ʕ•̠͡•ʔ
                        </pre>,
                    );
                });
        } else {
            fetchJsonContent(contentUrl)
                .then(() => {
                    setContentElement(
                        <pre className="custom-scrollbar grid h-48 w-48 place-items-center overflow-scroll rounded-md bg-yellow-400 p-5 font-bold text-Grey9">
                            BitMap.get
                        </pre>,
                    );
                    console.log(contentElement);
                })
                .catch((error) => {
                    console.error("Error fetching text content:", error);
                    setContentElement(
                        <pre className=" custom-scrollbar h-48 w-48 overflow-scroll border bg-yellow-400 p-5 text-white">
                            Something went wrong ʕ•̠͡•ʔ
                        </pre>,
                    );
                });
        }
    }, []);

    return (
        <div className="flex h-72 w-72 flex-col items-center justify-center gap-y-4 rounded-md  bg-stone-700 px-4  text-white shadow-xl group-hover:scale-105">
            {contentElement}
            {number && (
                <span className="rounded- self-stretch bg-green-400 px-2 py-1 text-center font-bold shadow-[10px_10px_8px_3px_rgba(0,0,0,0.2)] group-hover:shadow-xl">
                    Inscription #{number}
                </span>
            )}
        </div>
    );
}

export default ContentDisplay;
