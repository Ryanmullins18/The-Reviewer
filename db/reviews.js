  
  const updateReview = (id, reviewData) => {
    return client.reviews.update({
      where: { id: id },
      data: reviewData,
    });
  };
  
  const deleteReview = async (id) => {
    const review = await getReviewById(id);
    if (review) {
      return client.reviews.delete({
        where: { id: id },
      });
    }
    return;
  };
  
  module.exports = {
    updateReview,
    deleteReview,
  }