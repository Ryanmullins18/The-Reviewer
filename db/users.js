const prisma = require('./index')

const createUser = (userData) => {
    return prisma.users.create({
        data: userData
    });
};

const findUserByid = (id) => {
    return prisma.users.findUnique({
        where: {id: id},
        include: {
            reviews: true,
            comments: true,
            }
          })
    };



module.exports = { createUser, findUserByid };