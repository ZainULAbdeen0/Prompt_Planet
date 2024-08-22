"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="prompt_layout mt-6">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={() => handleTagClick(post.tag)}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setsearchText] = useState("");
  const [Posts, setPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchReults, setSearchReults] = useState([]);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setsearchText(e.target.value);

    setSearchTimeout(() => {
      setTimeout(() => {
        const searhresult = filterPrompts(e.target.value);
        setSearchReults(searhresult);
      }, 500);
    });
  };
  const handleTagClick = (tag) => {
    setsearchText(tag);
    const searhresult = filterPrompts(tag);
    setSearchReults(searhresult);
  };
  const filterPrompts = (searchtext) => {
    const regex = RegExp(searchtext, "i");
    return Posts.filter(
      (e) =>
        regex.test(e.tag) ||
        regex.test(e.creator.username) ||
        regex.test(e.prompt)
    );
  };

  const fetchPrompts = async () => {
    const response = await fetch("/api/prompt", {
      method: "GET",
    });
    const data = await response.json();
    setPosts(data);
  };
  useEffect(() => {
    fetchPrompts();
  }, []);
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
      {searchText ? (
        <PromptCardList data={searchReults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={Posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
