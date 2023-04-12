import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function UserList() {
  const [photos, setPhotos] = useState([]);
  const [album, setAlbum] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const routerIsReady = router.isReady;

  const fetchPhotosByAlbum = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${id}`
    );
    const data = await res.json();
    setPhotos(data);
  };

  const fetchAlbum = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${id}`
    );
    const data = await res.json();
    setAlbum(data);
  };

  useEffect(() => {
    if (!routerIsReady) return;
    fetchAlbum();
    fetchPhotosByAlbum();
  }, [routerIsReady]);

  return (
    <div>
      <div class="font-bold text-xl p-4">Albums</div>
      <h2 className="text-gray-900 p-4 text-2xl font-bold leading-tight">
        {album.title}
      </h2>
      <div class="flex flex-wrap p-5">
        {photos.map((photo) => (
          <div className="w-1/4 p-3">
            <div class="rounded overflow-hidden shadow-lg">
              <img
                class="w-full"
                src={photo.thumbnailUrl}
                alt="Sunset in the mountains"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
