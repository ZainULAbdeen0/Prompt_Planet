"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setsearchText] = useState("");
  const [Posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {};

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt", {
        method: "GET",
      });
      const data = await response.json();
      setPosts(data);
    };
    fetchPrompts();
  });
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          className="search_input peer"
          value={searchText}
          onChange={handleSearchChange}
        />
      </form>
      <PromptCardList data={Posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
