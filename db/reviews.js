const client = require("./index");

const createReview = (reviewData) => {
  return client.reviews.create({
    data: reviewData,
  });
};

const getAllReviews = () => {
  return client.reviews.findMany({
    include:{
      comments: true,
    },
  });
};

  const updateReview = (id, reviewData) => {
    return client.reviews.update({
      where: { id: id },
      data: reviewData,
    });
  };
  
  const deleteReview = async (id) => {
      return client.reviews.delete({
        where: { id: id },
          
      });
   
  };
  
  module.exports = {
    updateReview,
    getAllReviews,
    deleteReview,
    createReview
  }