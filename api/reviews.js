const express = require('express');
const router = express.Router();
const {updateReview, deleteReview, createReview, getAllReviews } = require('../db/reviews');
const {verifyUser} = require('./auth/utils');

router.post("/create", verifyUser, async(req, res, next)=>{

})

//works
router.get('/', async(req,res)=>{
  try {
      const reviews = await getAllReviews();
      res.send({reviews});
  } catch (error) {
    console.log(error)
   res.status(500).send({error, message: "Unable to get items"})
  }
});
//api/reviews/:id //works
  router.put("/:id", verifyUser, async (req, res, next) => {
    try {
      const { txt, score } = req.body;
      const review = await updateReview(req.params.id, {
        txt,
        score
      });
  
      res.send({ review });
    } catch (error) {
      console.log(error)
      next();
    }
  });
//api/reviews/:id //works
  router.delete("/:id", async (req, res, next) => {
    try {
      await deleteReview(req.params.id);
  
      res.sendStatus(204)
    } catch (error) {
      console.log(error)
      next();
    }
  });

  module.exports = router;