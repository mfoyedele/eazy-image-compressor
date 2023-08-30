import React, { useRef, useState } from 'react';
import { userService } from 'services';
import { Link } from 'components';

const MAX_WIDTH = 320;
const MAX_HEIGHT = 180;

export default function Home() {
  const inputRef = useRef(null);
  const [originalImageURL, setOriginalImageURL] = useState(null);
  const [compressedImageURL, setCompressedImageURL] = useState(null);
  const [originalImageSize, setOriginalImageSize] = useState(null);
  const [compressedImageSize, setCompressedImageSize] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const blobURL = URL.createObjectURL(file);
    setOriginalImageURL(blobURL);
    setOriginalImageSize(readableBytes(file.size));

    const img = new Image();
    img.src = blobURL;

    img.onload = () => {
      const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      canvas.toBlob((blob) => {
        const compressedBlobURL = URL.createObjectURL(blob);
        setCompressedImageURL(compressedBlobURL);
        setCompressedImageSize(readableBytes(blob.size));
      });
    };
  };

 function calculateSize(img, maxWidth, maxHeight) {
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
    }
    return [width, height];
  }

  function readableBytes(bytes) {
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
  }
  
  
    function handleDownload() {
    if (compressedImageURL) {
      const a = document.createElement('a');
      a.href = compressedImageURL;
      a.download = 'compressed_image.jpg'; // Set the desired filename
      a.click();
    }
  }

  return (
    <div className='p-4'>
      <div>
        <h1>Hi {userService.userValue?.firstName}!</h1>
                <p>Welcome!</p>
                <p><Link legacyBehavior href="/users">Manage Users</Link></p>          
          </div>
          
          <div>
              
      <h3>Image Compressor</h3>
          </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <div id="container">
        {originalImageURL && (
          <div>
            <h4>Original Image</h4>
            <p>Size: {originalImageSize}</p>
            <img src={originalImageURL} alt="Original" />
          </div>
        )}
        {compressedImageURL && (
          <div>
            <h4>Compressed Image</h4>
            <p>Size: {compressedImageSize}</p>
            <img src={compressedImageURL} alt="Compressed" />
            <button onClick={handleDownload}>Save As</button>
          </div>
        )}
      </div>
    </div>
  );
}
