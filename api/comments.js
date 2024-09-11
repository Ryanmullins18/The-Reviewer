const express = require('express');
const router = express.Router();
const {deleteComment, updateComment,createComment, getAllComments } = require('../db/comments');
const {getReviewById } = require('../db/reviews');
const {verifyUser} = require('./auth/utils');
const client = require('../db/index')

//works
router.post("/:id", async(req, res)=>{
  try {
    const {comment} = req.body;
    const newComment  = await client.comments.create({
     data: {
      comment,
      review_id: req.params.id,
      author_id:req.user.id
     }
    })
    const review = await getReviewById(req.params.id);
    res.status(200).send({newComment, review});
  }  catch (error) {
    console.log(error)
    res.status(500).send({error, message: "no good"})
   }
});

//works
  router.get('/', async(req,res)=>{
    try {
        const comments = await getAllComments();
        res.send({comments});
    } catch (error) {
     res.status(500).send({error, message: "Unable to get comments"})
    }
  });

//api/comments/:id //works
  router.put("/:id",  async (req, res, next) => {
    try {
      const { comment } = req.body;
      const commentUp = await updateComment(req.params.id,{comment}
       
      );
  
      res.send({ commentUp });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });
//api/comments/:id //works
  router.delete("/:id", verifyUser, async (req, res, next) => {
    try {
      const comment = await deleteComment(req.params.id);
  
      res.send("comment deleted");
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  module.exports = router;