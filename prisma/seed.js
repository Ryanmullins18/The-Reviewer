const {PrismaClient} = require('@prisma/client')
const {faker} = require("@faker-js/faker")


const prisma = new PrismaClient();

const main = async () => {
    await prisma.$connect();
    //seed 5 users
    console.log('creating users')
    const [user1, user2, user3, user4, user5] = await Promise.all(
        [...Array(5)].map(()=>{
            return prisma.users.create({
                data: {
                    username: faker.internet.userName(),
                    password: faker.internet.password(),
                },
            });
        })
        );
        const users = await prisma.users.findMany();
        console.log('created users:', users)  
        
        const [item1, item2, item3, item4, item5] = await Promise.all(
            [...Array(5)].map(()=>{
                return prisma.items.create({
                    data: {
                        name: faker.commerce.product(),
                        description: faker.lorem.sentences({min: 1, max: 3}),
                    },
                });
            })
            );
            const items = await prisma.items.findMany();
            console.log('created items:', items)  

        
            console.log('creating reviews')
        const [review1, review2, review3, review4] = await Promise.all(
            [...Array(5)].map((_,i) => prisma.reviews.create({
                    data: {
                        score: faker.number.float({ multipleOf: 0.50, min: 0, max:5 }),
                        txt: faker.lorem.sentences({min: 1, max: 3}),
                        user_id: users[i].id,
                        item_id: items[i].id,
                    },
                })
            )
        );
        const reviews = await prisma.reviews.findMany();
        console.log('created reviews', reviews)

        console.log('creating comments')
        const [comment1, comment2, comment3, comment4] = await Promise.all(
            [...Array(5)].map((_,i) => prisma.comments.create({
                data: {
                    comment: faker.lorem.sentences({min: 1, max: 3}),
                    author_id: users[i].id,
                    review_id: reviews[i].id,
                },
            })
            )
            );
            const comments = await prisma.comments.findMany();
            console.log('comments', comments)
            
            
            
            
    
};

main()
.then(async ()=>{
    await prisma.$disconnect();
})
.catch(async (err)=>{
    console.log(`ERROR ${err}`)
})