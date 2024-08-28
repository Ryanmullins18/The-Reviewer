const express = require('express');
const router = express.Router();
const {verifyUser} = require('./auth/utils');
const {getAllItems, getItemById, updateItem, deleteItem} = require('../db/items');

//works
router.get('/', async(req,res)=>{
    try {
        const items = await getAllItems(req.items_id);
        res.send({items});
    } catch (error) {
     res.status(500).send({error, message: "Unable to get items"})
    }
});

//works
router.get("/:id", async (req, res) => {
    try {
      const item = await getItemById(req.params.id);
      res.send({ item });
    } catch (error) {
        res.status(500).send({error, message: "Unable to get item"})
       }
  });

  module.exports = router;