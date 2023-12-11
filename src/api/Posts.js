export const getPosts = async () =>
  await fetch(`${process.env.REACT_APP_ENDPOINT}/posts`, {
    method: "GET",
  });

export const getComments = async ({ postId }) =>
  await fetch(`${process.env.REACT_APP_ENDPOINT}/comments?postId=${postId}`, {
    method: "GET",
  });
