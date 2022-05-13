import { Router } from "express";

const api = Router();
let nextId = 4;

let postData = [
  {
    id: 1,
    content: "대충 글 내용 1",
    writer: 1,
  },
  {
    id: 2,
    content: "대충 글 내용 2",
    writer: 1,
  },
  {
    id: 3,
    content: "대충 글 내용 1",
    writer: 2,
  },
];

api.get("/posts", (req, res) => {
  return res.json({
    data: postData,
  });
});

api.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  if (!postData[id - 1]) {
    return res.json({
      error: "Post not exist",
    });
  }
  return res.json({
    data: postData[id - 1],
  });
});

api.post("/posts", (req, res) => {
  const id = req.header("id"); // userID
  const { content } = req.body;
  const postCount = postData.push({
    id: nextId++,
    content,
    writer: id,
  });
  return res.json({
    data: {
      post: {
        id: postCount,
      },
    },
  });
});

api.put("/posts/:postId", (req, res) => {
  const userId = req.header("id");
  const { postId } = req.params;
  const { content } = req.body;
  const index = postData.findIndex((post) => post.id === postId);

  if (index === -1) {
    return res.json({
      error: "That post does not exist",
    });
  }

  if (!(postData[index].writer === userId)) {
    return res.json({
      error: "Cannot modify post",
    });
  }

  postData[index].content = content;

  return res.json({
    data: {
      id: postData[index].id,
    },
  });
});

api.delete("/posts/:postId", (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  const index = postData.findIndex((post) => post.id === postId);

  if (index === -1) {
    return res.json({
      error: "That post does not exist",
    });
  }

  if (!(postData[index].writer === userId)) {
    return res.json({
      error: "Cannot delete post",
    });
  }

  postData = postData.filter((post) => post.id !== postId);
  res.json({
    data: "Successfully deleted",
  });
});

export default api;
