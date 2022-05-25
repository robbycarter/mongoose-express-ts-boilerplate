import request from "supertest";
import app from "../../../server";
import UserModal, { IUser } from "../../../app/models/User";
import mongoose from "mongoose";

describe('/api/user', () => {
  let user: any;

  beforeEach(async () => {

    user = await request(app).post('/api/user/register')
      .send({
        email: "abc@mail.com",
        password: "qwerty"
      })
  })

  afterEach(async () => {
    await UserModal.deleteMany({});
    //await server.close();
    mongoose.connection.close()
  });


  describe('POST /register', () => {

    it('should create and authenticate user and return token', async () => {

      const userAuth = { email: "unique.email@mail.com", password: 'qwerty' }

      const res = await request(app).post('/api/user/register').send(userAuth)

      const reqData = JSON.parse(JSON.stringify(res)).req;
      
      console.log(res.body)

      expect(res.status).toEqual(200);
      // expect(res.body).toHaveProperty('token');
    })

  })

})
