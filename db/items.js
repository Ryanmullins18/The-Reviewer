const client = require("./index");

const createItems = (itemData) => {
  return client.items.create({
    data: itemData,
  });
};

const getAllItems = (user_id) => {
  return client.items.findMany({
    where: { user_id },
  });
};

const getItemById = (id) => {
  return client.items.findUnique({
    where: { id: id },
    include: {
        reviews: true,
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
  const item = await getItemById(id);
  if (item) {
    return client.items.delete({
      where: { id: id },
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