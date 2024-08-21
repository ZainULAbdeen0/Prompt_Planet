"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import { Router } from "next/router";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [Submitting, setSubmitting] = useState(false);
  const [Post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: Post.prompt,
          userId: session?.user.id,
          tag: Post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={Post}
      setPost={setPost}
      submitting={Submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
