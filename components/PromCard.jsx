"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [Copied, setCopied] = useState("");
  const pathname = usePathname();
  const { data: session } = useSession();
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between item-start gap-5">
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
        <Link href={ session?.user.id!==post.creator._id
          ?`/user-profile?id=${post.creator._id}&username=${post.creator.username}`
          : "/profile"
        }>
          <Image
            src={post.creator.image}
            alt="User_image"
            width={40}
            height={40}
            className="rounded-full"
          />
          </Link>
          <div className="flex flex-col">
            <Link href={ session?.user.id!==post.creator._id
          ?`/user-profile?id=${post.creator._id}&username=${post.creator.username}`
          : "/profile"
        }>
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            </Link>
            <p className="text-sm font-inter text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              Copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator._id && pathname === "/profile" && (
        <div className="flex flex-row justify-between mt-5 ">
          <p 
          className="font-inter text-sm green_gradient cursor-pointer"
          onClick = {()=>handleEdit(post)}
          >
            Edit
          </p>
          <p 
          className="font-inter text-sm orange_gradient cursor-pointer"
          onClick = {()=>handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
