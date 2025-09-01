import React, { useState, useEffect } from 'react';
import './css/GalleryPage.css';

console.log('env:', {
    CLOUD_NAME: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    FOLDER:     process.env.REACT_APP_CLOUDINARY_FOLDER
});

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const FOLDER     = process.env.REACT_APP_CLOUDINARY_FOLDER;
const LIST_URL   =
    `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${FOLDER}.json`;

export default function GalleryPage() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch(LIST_URL)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch Cloudinary list');
                return res.json();
            })
            .then(json => {
                const resources = json.resources || [];
                // sort alphabetically by public_id
                resources.sort((a, b) =>
                    a.public_id.localeCompare(b.public_id, undefined, { sensitivity: 'base' })
                );
                setImages(resources);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="gallery-container">
            {images.map(img => (
                <div className="gallery-item" key={img.public_id}>
                    <img
                        className="gallery-image"
                        src={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${img.public_id}.${img.format}`}
                        alt={img.public_id}
                    />
                </div>
            ))}
        </div>
    );
}
