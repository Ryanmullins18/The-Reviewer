const express = require('express');
const router = express.Router();
const {getAllItems, getItemById, updateItem, deleteItem} = require('../db/items');

router.get('/', async(req,res)=>{
    try {
        const items = await getAllItems(req.items_id);
        res.send({items});
    } catch (error) {
     res.status(500).send({error, message: "Unable to get items"})
    }
});

router.get("/:id", async (req, res) => {
    try {
      const item = await getItemById(req.params.id);
      res.send({ item });
    } catch (error) {
        res.status(500).send({error, message: "Unable to get item"})
       }
  });

//api/update/:id
  router.put("/:id", async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const item = await updateItem(req.params.id, {
        name,
        description,
      });
  
      res.send({ item });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });
//api/delete/:id
  router.delete("/:id", async (req, res, next) => {
    try {
      const item = await deleteItem(req.params.id);
  
      res.send({ item });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  module.exports = router;