const client = require("./index");

const createItems = (itemData) => {
  return client.items.create({
    data: itemData,
  });
};

const getAllItems = () => {
  return client.items.findMany({
    include:{
      reviews: {
        take: -1
      }
      
    },
  },
  );
};

const getItemById = (id) => {
  return client.items.findUnique({
    where: { id: id },
    include: {
        reviews: {include: {comments: true}},
    }
  });
};


const updateItem = (id, itemData) => {
  return client.items.update({
    where: { id: id },
    data: itemData,
  });
};

const deleteItem = async (id) => {
  // console.log(id)
  const item = await getItemById(id);
  // console.log(item)
  if (item) {
    // console.log("hello world")
    return client.items.delete({
      where: { id },
    });
  }
  return;
};

module.exports = {
  createItems,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
}