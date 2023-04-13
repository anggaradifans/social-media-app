import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchAPI } from "@/utility";
import Modal from "../../components/Modal";
import Breadcrumb from "@/components/Breadcrumb";

export default function UserList() {
  const [photos, setPhotos] = useState([]);
  const [album, setAlbum] = useState({});
  const [image, setImage] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const routerIsReady = router.isReady;

  const items = [
    { label: "Users", href: "/" },
    { label: album?.userId, href: `/user/${album?.userId}` },
    { label: album?.title, href: `/album/${id}` },
  ];

  const fetchPhotosByAlbum = async () => {
    const photo = await fetchAPI(`photos?albumId=${id}`);
    setPhotos(photo);
  };

  const fetchAlbum = async () => {
    const a = await fetchAPI(`albums/${id}`);
    setAlbum(a);
  };

  const handleOpenModal = (url) => {
    setImage(url);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!routerIsReady) return;
    fetchAlbum();
    fetchPhotosByAlbum();
  }, [routerIsReady]);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <img className="w-full" src={image.url} alt="photo content" />
        <div className="p-5 text-xl break-words"> {image.title} </div>
        <button
          onClick={handleCloseModal}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </Modal>
      <div className="px-24 py-5 overflow-x-hidden">
        <Breadcrumb items={items} />
        <div className="font-bold text-xl p-4">Albums</div>
        <h2 className="text-gray-900 p-4 text-2xl font-bold leading-tight">
          {album.title}
        </h2>
        <div class="flex flex-wrap p-5">
          {photos.map((photo) => (
            <div className="w-1/4 p-3">
              <div className="rounded overflow-hidden shadow-lg">
                <img
                  className="w-full cursor-pointer"
                  onClick={() => handleOpenModal(photo)}
                  src={photo.thumbnailUrl}
                  alt="Sunset in the mountains"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
