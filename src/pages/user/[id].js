import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { fetchAPI, insertWithBodyAPI } from "@/utility";
import Modal from "@/components/Modal";

export default function UserList() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", body: "" });
  const router = useRouter();
  const { id } = router.query;
  const routerIsReady = router.isReady;
  const items = [
    { label: "Users", href: "/" },
    { label: user?.name, href: `/user/${id}` },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await insertWithBodyAPI("posts", "POST", {
      ...formData,
      userId: id,
    });
    const newList = posts;
    newList.push(res);
    setPosts(newList);
    handleCloseModal();
  }

  async function handleDelete(id) {
    await insertWithBodyAPI(`posts/${id}`, "DELETE");
    const newList = posts.filter((o) => o.id !== id);
    setPosts(newList);
  }

  useEffect(() => {
    if (!routerIsReady) return;
    const fetchUsers = async () => {
      const u = await fetchAPI(`users/${id}`);
      setUser(u);
    };
    const fetchPostsByUser = async () => {
      const p = await fetchAPI(`users/${id}/posts`);
      setPosts(p);
    };
    const fetchAlbumsByUser = async () => {
      const a = await fetchAPI(`users/${id}/albums`);
      setAlbums(a);
    };
    fetchUsers();
    fetchPostsByUser();
    fetchAlbumsByUser();
  }, [routerIsReady]);

  return (
    <div className="px-24">
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full"
            />
          </label>

          <label className="block mb-2">
            Body:
            <textarea
              name="body"
              value={formData.message}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full h-32"
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </Modal>
      <Breadcrumb items={items} />
      <div className="bg-white rounded-lg shadow-md overflow-hidden mx-4 my-2 my-8">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Name
            </div>
            <h2 className="text-gray-900 text-2xl font-bold leading-tight">
              {user.name}
            </h2>
            <div className="mt-4">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Email
              </div>
              <div className="text-gray-900 text-lg leading-tight">
                {user.email}
              </div>
            </div>
            <div className="mt-4">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Location
              </div>
              <div className="text-gray-900 text-lg leading-tight">{`${user?.address?.street} ${user?.address?.suite}, ${user?.address?.city}`}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-1/2">
          <div className="flex">
            <div className="font-bold text-xl p-5">Post History</div>
            <button
              className="text-gray-700 font-bold mt-1 rounded"
              onClick={handleOpenModal}
            >
              Create new Post
            </button>
          </div>
          {posts.map((post) => (
            <div className="bg-white shadow-md rounded-md p-5">
              <Link href={`/post/${post.id}`}>
                <h2 className="text-lg font-medium mb-2">{post.title}</h2>
              </Link>
              <div className="flex">
                <div className=" w-2/3 items-center text-gray-500 text-sm">
                  <span>Posted by {user.name}</span>
                </div>
                <div
                  onClick={() => handleDelete(post.id)}
                  className="w-1/3 cursor-pointer items-center flex justify-end text-gray-500 text-sm"
                >
                  <span>Delete</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2">
          <div className="font-bold text-xl p-5">Albums</div>
          {albums.map((album) => (
            <div class="rounded overflow-hidden mx-5 my-2 shadow-lg">
              <div class="px-6 py-4">
                <Link href={`/album/${album.id}`}>
                  <p className="text-gray-700 text-base">{album.title}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
