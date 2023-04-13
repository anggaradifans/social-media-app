import PostThread from "../../components/PostThread";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchAPI } from "@/utility";
import Breadcrumb from "@/components/Breadcrumb";

const Posts = () => {
  const [post, setPost] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const routerIsReady = router.isReady;
  const items = [
    { label: "Users", href: "/" },
    { label: post?.author, href: `/user/${post?.userId}` },
    { label: id, href: `/post/${id}` },
  ];
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

      {post && <PostThread key={post.id} {...post} />}
    </div>
  );
};

export default Posts;
