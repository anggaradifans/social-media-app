import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export default function UserList() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const routerIsReady = router.isReady;
  const items = [
    { label: "Users", href: "/" },
    { label: id, href: `/user/${id}` },
  ];

  useEffect(() => {
    if (!routerIsReady) return;
    const fetchUsers = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const data = await res.json();
      setUser(data);
    };
    const fetchPostsByUser = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}/posts`
      );
      const data = await res.json();
      setPosts(data);
    };
    const fetchAlbumsByUser = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}/albums`
      );
      const data = await res.json();
      setAlbums(data);
    };
    fetchUsers();
    fetchPostsByUser();
    fetchAlbumsByUser();
  }, [routerIsReady]);

  return (
    <div className="px-24">
      <Breadcrumb items={items} />
      <div className="bg-white rounded-lg shadow-md overflow-hidden mx-5 my-2 my-8">
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
          <div class="font-bold text-xl p-5">Post History</div>
          {posts.map((post) => (
            <div class="rounded overflow-hidden mx-5 my-2 shadow-lg">
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{post.title}</div>
                <p class="text-gray-700 text-base">{post.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2">
          <div class="font-bold text-xl p-5">Albums</div>
          {albums.map((album) => (
            <div class="rounded overflow-hidden mx-5 my-2 shadow-lg">
              <div class="px-6 py-4">
                <Link href={`/album/${album.id}`}>
                  <p class="text-gray-700 text-base">{album.title}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
