const {PrismaClient} = require('@prisma/client')
const {faker} = require("@faker-js/faker")


const prisma = new PrismaClient();



const main = async () => {
    const items = [{
        name: "Nike Ultrafly",
        description: "Manifest your mountainous best, when the trail ahead is skiddy and uncertain. Our all-new championship trail racing shoe melds our best speed components from the running world with what you need to plant your flag first at the finish line. It offers peak performance, sleek speed and endurance for those who want to summit nature’s playground.",
        img_url: "https://believeintherun.com/wp-content/uploads/2023/07/Nike-Ultrafly-featured-image.jpg"
    },
    {
        name: "PlayStation®5 Digital Edition Console",
        description: "The PS5® Digital Edition* unleashes new gaming possibilities that you never anticipated",
        img_url: "https://media.direct.playstation.com/is/image/sierialto/PS5-Digital-Slim-New-Hero-1-v2?$Background_Small$"
     
    },
    {
        name: "Alienware Aurora R16 Gaming Desktop",
        description: "The Alienware Aurora R16 marks the debut of our Legend 3 design in desktop form.",
        img_url: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/desktops/alienware-desktops/alienware-aurora-r16/media-gallery/liquid/desktop-aw-r16-bk-lqd-cooling-gallery-3.psd?fmt=png-alpha&pscan=auto&scl=1&wid=4500&hei=3800&qlt=100,1&resMode=sharp2&size=4500,3800&chrss=full&imwidth=5000"
     
    },
    {
        name: "Carhartt Loose-Fit Hooded Jacket for Men",
        description: "This men's jacket is made of cotton duck that's rugged and durable. It has a warm blanket lining down the body with smooth quilted nylon through the sleeves. The droptail hem provides extra coverage but leaves enough room for your tool belt.",
        img_url: "https://assets.basspro.com/image/upload/c_limit,dpr_2.0,f_auto,h_1008,q_auto,w_900/c_limit,h_1008,w_900/v1/ProductImages/600/brownn_50398_main?pgw=1"
     
    }, {
        name: 'Apple - MacBook Pro 14"',
        description: "The 14-inch MacBook Pro blasts forward with M3, an incredibly advanced chip that brings serious speed and capability",
        img_url: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6534/6534641_sd.jpg;maxHeight=2000;maxWidth=2000;format=webp"
     
    },
    {
        name: "Apple iPhone 15 Pro",
        description: "iPhone 15 Pro. Forged in titanium and featuring the groundbreaking A17 Pro chip",
        img_url: "https://www.visible.com/shop/assets/images/shop/webp/iPhone_15_Pro_BLA_1.webp"
     
    }]

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
        
        await Promise.all(
            items.map((item)=>{
                return prisma.items.create({
                    data: {
                    name: item.name,  
                    description: item.description,
                    img_url: item.img_url
                    },
                });
            })
            );
            const getItems = await prisma.items.findMany();
            console.log('created items:', items)  

        
        //     console.log('creating reviews')
        // const [review1, review2, review3, review4, review5] = await Promise.all(
        //     [...Array(5)].map((_,i) => prisma.reviews.create({
        //             data: {
        //                 score: faker.number.float({ multipleOf: 0.50, min: 0, max:5 }),
        //                 txt: faker.lorem.sentences({min: 1, max: 3}),
        //                 user_id: users[i].id,
        //                 item_id: items[i].id,
        //             },
        //         })
        //     )
        // );
        // const reviews = await prisma.reviews.findMany();
        // console.log('created reviews', reviews)

        // console.log('creating comments')
        // const [comment1, comment2, comment3, comment4] = await Promise.all(
        //     [...Array(4)].map((_,i) => prisma.comments.create({
        //         data: {
        //             comment: faker.lorem.sentences({min: 1, max: 3}),
        //             author_id: users[i].id,
        //             review_id: reviews[i].id,
        //         },
        //     })
        //     )
        //     );
            // const comments = await prisma.comments.findMany();
            // console.log('comments', comments)
            
            
            
            
    
};

main()
.then(async ()=>{
    await prisma.$disconnect();
})
.catch(async (err)=>{
    console.log(`ERROR ${err}`)
})