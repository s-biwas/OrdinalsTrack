async function fetchTextContent(id) {
    const response = await fetch(`https://api.hiro.so/ordinals/v1/inscriptions/${id}/content`);
    if (!response.ok) {
        throw new Error('Failed to fetch content');
    }
    return response.text();
}

function ContentDisplay({ id, content_type }) {

    let contentElement;

    if (content_type.startsWith('image/')) {
        contentElement = <img
            src={`https://api.hiro.so/ordinals/v1/inscriptions/${id}/content`}
            alt="Ordinal Image"
            className="w-full h-full"
        />;
    }
    else if (content_type.startsWith('video/')) {
        contentElement = <video
            controls
            src={`https://api.hiro.so/ordinals/v1/inscriptions/${id}/content`}
        />;
    }
    else if (content_type.startsWith('audio/')) {
        contentElement = <audio
            controls
            src={`https://api.hiro.so/ordinals/v1/inscriptions/${id}/content`}
        />;
    }
    else if (content_type.startsWith('text/')) {
        fetchTextContent(id)
            .then((textContent) => {
                contentElement = <p>{textContent}</p>;
            })
            .catch((error) => {
                console.error('Error fetching text content:', error);
                contentElement = <p>Error fetching text content</p>;
            });
    }
    else if (content_type.startsWith('binary/')) {
        fetchTextContent(id)
            .then((textContent) => {
                contentElement = <p>{textContent}</p>;
            })
            .catch((error) => {
                console.error('Error fetching binary content:', error);
                contentElement = <p>Error fetching binary content</p>;
            });
    }
    else {
        contentElement = <p>Unsupported content type: {content_type}</p>;
    }

    return (
        <div className="group-hover:scale-105">
            {contentElement}
        </div>
    );
}

export default ContentDisplay;
