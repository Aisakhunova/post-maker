import React, { useState, useRef } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import "./styles/App.css";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton.";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "Description" },
    { id: 2, title: "JavaScript 2", body: "Description" },
    { id: 3, title: "JavaScript 3", body: "Description" },
  ]);
  const createPost = (newPOst) => {
    setPosts([...posts, newPOst]);
  };
  const removePost = (post) => {
    setPosts(posts.filter((el) => el.id !== post.id));
  };
  const [selectedSort, setSelectedSort] = useState("");

  const [searchQuerry, setSearchQuerry] = useState("");

  function getSortedPosts() {
    console.log("called");
    if (sortedPosts) {
      return sortedPosts;
    }
    return posts;
  }

  const sortedPosts = getSortedPosts;

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0" }} />
      <MyInput
        value={searchQuerry}
        onChange={(e) => setSearchQuerry(e.target.value)}
        placeholder="Search..."
      ></MyInput>
      <MySelect
        value={selectedSort}
        onChange={sortPosts}
        defaultValue="Sort by"
        options={[
          { value: "title", name: "By title" },
          { value: "body", name: "By Description" },
        ]}
      />

      {posts.length !== 0 ? (
        <PostList remove={removePost} posts={posts} title="Posts about JS" />
      ) : (
        <h1 style={{ textAlign: "center" }}>POSTS ARE NOT FOUND</h1>
      )}
    </div>
  );
}

export default App;
