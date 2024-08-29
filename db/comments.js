const client = require("./index");

const createComment = (commentData) => {
    return prisma.comments.create({
      data: commentData,
    });
  };

  const getAllComments = () => {
    return client.comments.findMany();
  };

const updateComment = (id, commentData) => {
    return client.comments.update({
      where: { id: id },
      data: commentData,
    });
  };

  const deleteComment = async (id) => {
      return client.comments.delete({
        where: { id: id },
      });
  };
  
  module.exports = {
    deleteComment,
    updateComment,
    createComment,
    getAllComments
  }