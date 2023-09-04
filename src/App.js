import React, { useState, useRef, useMemo, useEffect } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import "./styles/App.css";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton.";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import Filter from "./components/Filter";
import MyModal from "./components/UI/MyModal/MyModal";
import { UsePosts } from "./hooks/usePosts";

import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import { useFetching } from "./hooks/useFetching";
import getpagesCount from "./utils/pages";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", querry: "" });
  const [modal, setModal] = useState(false);
  const searchedAndSortedPosts = UsePosts(posts, filter.sort, filter.querry);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPost, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getpagesCount(totalCount, limit));
  });

  console.log(totalPages);

  const createPost = (newPOst) => {
    setPosts([...posts, newPOst]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((el) => el.id !== post.id));
  };

  useEffect(() => {
    fetchPost();
  }, [filter]);

  return (
    <div className="App">
      <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        Create a user
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />

      <Filter filter={filter} setFilter={setFilter} />

      {postError && <h1>There is a mistake: {postError}</h1>}
      {isPostLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={searchedAndSortedPosts}
          title="Posts about JS"
        />
      )}
    </div>
  );
}

export default App;
