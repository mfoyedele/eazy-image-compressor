import { useRouter } from 'next/router';

export default function Received() {
  const router = useRouter();
  const { images } = router.query;

  if (!images || !Array.isArray(images)) {
    return <div>No images received.</div>;
  }

  return (
    <div>
      <h1>Received Images:</h1>
      <ul>
        {images.map((image, index) => (
          <li key={index}><img src={`/public/${image}`} alt={`Received ${index}`} /></li>
        ))}
      </ul>
    </div>
  );
}
