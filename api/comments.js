const express = require('express');
const router = express.Router();
const {deleteComment, updateComment,createComment } = require('../db/comments');
const {verifyUser} = require('./auth/utils');


router.post("/create", verifyUser, async (req, res, next) => {
    try {
      const newComment  = await createComment({
        ...req.body, id: req.reviews.id 
      })
  
      res.send({ newComment });
    } catch ({ error }) {
      next();
    }
  });

  router.get('/', async(req,res)=>{
    try {
        const comments = await getAllReviews();
        res.send({reviews});
    } catch (error) {
     res.status(500).send({error, message: "Unable to get items"})
    }
  });

//api/comments/:id
  router.put("/:id", verifyUser, async (req, res, next) => {
    try {
      const { comment } = req.body;
      const commentUp = await updateComment(req.params.id,
       comment
      );
  
      res.send({ commentUp });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });
//api/comments/:id
  router.delete("/:id", verifyUser, async (req, res, next) => {
    try {
      const comment = await deleteComment(req.params.id);
  
      res.send({ comment });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  module.exports = router;