import { useEffect, useState } from "react";

async function fetchJsonContent(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch content');
    }
    const jsonContent = await response.json();
    //return in preety format 
    return JSON.stringify(jsonContent, null, 2);
}

async function fetchTextContent(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch content');
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
    const contentUrl = `https://api.hiro.so/ordinals/v1/inscriptions/${id}/content`

    useEffect(() => {
        if (content_type === 'image/svg+xml') {
            fetchTextContent(contentUrl)
                .then((textContent) => {
                    setContentElement(<iframe
                        srcDoc={textContent}
                        title="Embedded SVG"
                        width="100%"
                        height="400"
                        sandbox="allow-scripts allow-same-origin"
                    />);
                })
                .catch((error) => {
                    console.error('Error fetching text content:', error);
                    setContentElement(
                        <pre className=" h-full w-full overflow-hidden p-5 text-white border bg-slate-200/10">Something went wrong ʕ•̠͡•ʔ</pre>);
                });
        }
        else if (content_type.startsWith('image/')) {
            setContentElement(<img
                src={contentUrl}
                alt="Ordinal Image"
                className="w-full h-full"
            />);
        }
        else if (content_type.startsWith('video/')) {
            setContentElement(<video
                controls
                src={contentUrl}
            />);
        }
        else if (content_type.startsWith('audio/')) {
            setContentElement(<audio
                controls
                src={contentUrl}
            />);
        }
        else if (content_type.startsWith('text/')) {
            fetchTextContent(contentUrl)
                .then((textContent) => {
                    setContentElement(<pre className="bg-slate-200/70 h-full w-full overflow-scroll p-5 text-black custom-scrollbar">{textContent}</pre>);
                })
                .catch((error) => {
                    console.error('Error fetching text content:', error);
                    setContentElement(
                        <pre className=" h-full w-fulloverflow-scroll custom-scrollbar p-5 text-white border bg-slate-200/10">Something went wrong ʕ•̠͡•ʔ</pre>);
                });
        }
        else {
            fetchJsonContent(contentUrl)
                .then((textContent) => {
                    setContentElement(<pre className="bg-slate-200/70 h-full w-full overflow-scroll p-5 text-black custom-scrollbar">{textContent}</pre>);
                    console.log(contentElement);
                })
                .catch((error) => {
                    console.error('Error fetching text content:', error);
                    setContentElement(
                        <pre className=" h-full w-full overflow-scroll custom-scrollbar p-5 text-white border bg-slate-200/10">Something went wrong ʕ•̠͡•ʔ</pre>);
                });
        }
    }, []);

    return (
        <div className="group-hover:scale-105 text-white w-full h-full relative min-h-[130px]">
            {contentElement}
            <span className="absolute bottom-2 left-2 px-2 py-1 bg-slate-100/70 text-slate-800">#{number}</span>
        </div>
    );
}

export default ContentDisplay;
