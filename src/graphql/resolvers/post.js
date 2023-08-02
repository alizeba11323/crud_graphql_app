module.exports = {
  Query: {
    hello: () => {
      return "Hello World App";
    },
  },
  Mutation: {
    createPost: async (
      parent,
      { inputPost: { title, content, image } },
      { postContext },
      info
    ) => {
      const newPost = await postContext.create({ title, content, image });
      return newPost;
    },
  },
};
