import { useState } from 'react';

export default function Upload() {
  const [images, setImages] = useState([]);
  const [uploaded, setUploaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch('/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImages(data.images);
        setUploaded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="images" multiple />
        <button type="submit">Upload</button>
      </form>

      {uploaded && (
        <div>
          <h2>Uploaded Images:</h2>
          <ul>
            {images.map((image, index) => (
              <li key={index}><img src={`/public/${image}`} alt={`Uploaded ${index}`} /></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
