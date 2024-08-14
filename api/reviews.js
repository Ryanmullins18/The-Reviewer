const express = require('express');
const router = express.Router();
const {updateReview, deleteReview} = require('../db/reviews');



//api/update/:id
  router.put("/:id", async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const review = await updateReview(req.params.id, {
        name,
        description,
      });
  
      res.send({ review });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });
//api/delete/:id
  router.delete("/:id", async (req, res, next) => {
    try {
      const review = await deleteReview(req.params.id);
  
      res.send({ review });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  module.exports = router;