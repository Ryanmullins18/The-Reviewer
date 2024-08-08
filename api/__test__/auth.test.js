const supertest = require('supertest');
const server = require('../../server');
const prisma = require('../../db/index');
const bcrypt = require('bcrypt');

describe('/api/auth', ()=> {

    describe("POST /register", ()=> {
        beforeEach(()=>{
            prisma.users.create = jest.fn().mockResolvedValue({
                id:123, 
                username: 'test',
                password: 'hashPass'
            });
        });

        afterEach(()=>{
            jest.clearAllMocks();
        });
        test("returns 201 status code when successful", async ()=> {
            const res = await supertest(server).post(
                '/api/auth/register'
            ).send({username: 'test', password: 'hashPass'})

            expect(res.status).toBe(201)
        });
     
    });
});