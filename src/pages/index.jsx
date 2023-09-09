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
      a.download = 'compressed_image.jpg'; 
      a.click();
    }
  }

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const todayDay = new Date().getDay();
const dayInWord = daysOfWeek[todayDay];  

const boldStyle = {
    fontWeight: "bold",
  };

  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();

  return (
    <div className='p-4'>
      <div className="text-right"><span style={boldStyle}>{dayInWord}, </span>{day} {month} {year} <br /></div>
      <div>
        <h1>Welcome {userService.userValue?.firstName}!</h1>                  
          </div>
          
       <div> 
       <div>      
      <h3 className='text-center text-[22px] font-bold text-[#2566EB]'>Eazy Image Compressor</h3>
      <div className='inputImage'>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        />
        </div>
        </div>
      <div className='maincontainer'>
        {originalImageURL && (
            <div>
            <h4 className='text-center'>Original Image</h4>
            <p className='text-center'>Size: {originalImageSize}</p>
            <div className='originalImage'>
            <img src={originalImageURL} alt="Original" />
          </div>
          </div>
        )}
        {compressedImageURL && (
            <div>
            <h4 className='text-center'>Compressed Image</h4>
            <p className='text-center'>Size: {compressedImageSize}</p>
            <div className='comprssedImage'>
            <img src={compressedImageURL} alt="Compressed" />
          </div>
          <div className='savaButton'>
            <button onClick={handleDownload}>Save As</button>
          </div>
          </div>
        )}
        </div>
      </div>
</div>
  );
}
