import PostThread from "../../components/PostThread";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchAPI, insertWithBodyAPI } from "@/utility";
import Breadcrumb from "@/components/Breadcrumb";
import Modal from "@/components/Modal";

const Posts = () => {
  const [post, setPost] = useState({});
  const [formData, setFormData] = useState({ email: "", name: "", body: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const routerIsReady = router.isReady;
  const items = [
    { label: "Users", href: "/" },
    { label: post?.author, href: `/user/${post?.userId}` },
    { label: id, href: `/post/${id}` },
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
  async function handleDelete(id) {
    await insertWithBodyAPI(`posts/${id}`, "DELETE");
    const newComments = post.threadComments.filter((o) => o.id !== id);
    setPost({
      ...post,
      comments: newComments.length,
      threadComments: newComments,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await insertWithBodyAPI("comments", "POST", {
      ...formData,
      postId: id,
    });
    const newComments = post.threadComments;
    newComments.push(res);
    setPost({
      ...post,
      comments: newComments.length,
      threadComments: newComments,
    });
    handleCloseModal();
  }

  useEffect(() => {
    if (!routerIsReady) return;
    const fetchPost = async () => {
      const p = await fetchAPI(`posts/${id}`);
      const comments = await fetchAPI(`posts/${id}/comments`);
      const { name } = await fetchAPI(`users/${p.userId}`);
      setPost({
        ...p,
        author: name,
        comments: comments.length,
        threadComments: comments,
      });
    };
    fetchPost();
  }, [routerIsReady]);

  return (
    <div className="container mx-auto px-24">
      <Breadcrumb items={items} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Title:
            <input
              type="text"
              name="name"
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
      {post && (
        <>
          <PostThread
            key={post.id}
            {...post}
            openModal={handleOpenModal}
            deleteComment={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default Posts;
