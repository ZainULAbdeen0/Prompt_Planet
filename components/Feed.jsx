"use client";

import { useState, useEffect } from "react";
import PromptCard from "../components/PromCard"; // Assuming your component is named PromptCard
import { showToast } from "@utils/toast";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = ({ initialldata }) => {
  const [allPosts, setAllPosts] = useState(initialldata);
  const [page, setPage] = useState(1); // Track the current page for pagination
  const [loading, setLoading] = useState(false);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    const response = await fetch(`/api/prompt?limit=6&page=${page}`, {
      method: "GET",
    });
    const data = await response.json();
    if (data.length === 0) {
      showToast("No more prompts avaliable", "info");
    }
    setAllPosts((prevPosts) => [...prevPosts, ...data]); // Append new posts to the current list
    setPage(page);
    setLoading(false);
  };

  useEffect(() => {
    if (!initialldata.length) {
      fetchPosts();
    } else {
      setAllPosts(initialldata);
    }
  }, [initialldata]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}

      {/* Load More Button */}
      <div className="text-center mt-5">
        <button
          onClick={() => fetchPosts(page + 1)} // Increment page and fetch more data
          disabled={loading}
          className="bg-gray-300 border-2 border-gray-100 hover:border-gray-300 text-white font-medium py-1 px-3 rounded-3xl mb-5 flex items-center justify-center"
        >
          {loading ? (
            <div className="flex space-x-1">
              <div className="w-2.5 h-2.5 rounded-full bg-white animate-bounce"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white animate-bounce200"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white animate-bounce400"></div>
            </div>
          ) : (
            "Load More"
          )}
        </button>
      </div>
    </section>
  );
};

export default Feed;
