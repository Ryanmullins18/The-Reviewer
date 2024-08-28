const client = require('./index')

const createUser = (userData) => {
    return client.users.create({
        data: userData
    });
};

const getAllUsers = () => {
    return client.users.findMany();
  };

const findUserByid = (id) => {
    return client.users.findUnique({
        where: {id: id},
        include: {
            reviews: true,
            comments: true,
            }
          })
    };

module.exports = { createUser, findUserByid, getAllUsers };