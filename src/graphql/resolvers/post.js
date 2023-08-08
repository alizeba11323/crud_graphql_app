module.exports = {
  Query: {
    hello: () => {
      return "Hello World App";
    },
    getAllPost: async (parent, args, { postContext }, info) => {
      const posts = await postContext.find({});
      console.log(posts);
      return posts;
    },
    getSinglePost: async (parent, { id }, { postContext }, info) => {
      const post = await postContext.findById(id);
      return post;
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
