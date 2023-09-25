import { useEffect, useState } from "react";

async function fetchTextContent(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch content');
    }
    const jsonContent = await response.json();
    //return in preety format 
    return JSON.stringify(jsonContent, null, 2);
}

function ContentDisplay({ id, content_type, number }) {

    const [contentElement, setContentElement] = useState(null);
    const contentUrl = `https://api.hiro.so/ordinals/v1/inscriptions/${id}/content`

    useEffect(() => {
        if (content_type.startsWith('image/')) {
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
        else {
            fetchTextContent(contentUrl)
                .then((textContent) => {
                    setContentElement(<pre className="bg-slate-200/70 h-full w-full overflow-hidden p-5 text-black">{textContent}</pre>);
                    console.log(contentElement);
                })
                .catch((error) => {
                    console.error('Error fetching text content:', error);
                    setContentElement(
                        <pre className=" h-full w-full overflow-hidden p-5 text-white border bg-slate-200/10">Something went wrong ʕ•̠͡•ʔ</pre>);
                });
        }
    }, []);

    return (
        <div className="group-hover:scale-105 text-white w-full h-full relative">
            {contentElement}
            <span className="absolute bottom-2 left-2 px-2 py-1 bg-slate-100/70 text-slate-800">#{number}</span>
        </div>
    );
}

export default ContentDisplay;
