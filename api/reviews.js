const express = require('express');
const router = express.Router();
const {updateReview, deleteReview, createReview, getAllReviews, getReviewById } = require('../db/reviews');
const {verifyUser} = require('./auth/utils');
const client = require('../db/index')


router.post("/:id", async(req, res)=>{
  try {
    const {score, txt} = req.body;
    const newReview  = await client.reviews.create({
     data: {
      score:parseFloat(score),
      txt,
      item_id: req.params.id,
      user_id:req.user.id
     }
    })
    
    res.status(200).send({newReview});
  }  catch (error) {
    console.log(error)
    res.status(500).send({error, message: "no good"})
   }
});

router.get("/:id", async (req, res) => {
  try {
    const review = await getReviewById(req.params.id);
    res.send({ item });
  } catch (error) {
      res.status(500).send({error, message: "Unable to get item"})
     }
});
//works
router.get('/', async(req,res)=>{
  try {
      const reviews = await getAllReviews();
      res.send({reviews});
  } catch (error) {
    console.log(error)
   res.status(500).send({error, message: "Unable to get reviews"})
  }
});
//api/reviews/:id //works
  router.put("/:id", verifyUser, async (req, res, next) => {
    try {
      const { txt, score } = req.body;
      const review = await updateReview(req.params.id, {
        txt,
        score:parseFloat(score),
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
      const review= await deleteReview(req.params.id);
  
      res.send({review})
    } catch (error) {
      console.log(error)
      next();
    }
  });

  module.exports = router;