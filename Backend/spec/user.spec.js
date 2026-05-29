// const request = require("supertest");
// const app = require("..");
// const { clearDatabase } = require("../db.connection");

// const req = request(app);

// describe("User Routes", () => {
//   //   afterAll(async () => {
//   //     await clearDatabase();
//   //   });

//   let myUser = {
//     name: "mohamed ali",
//     email: "Mohamed@gmail.com",
//     password: "abc123",
//   };
//   let UserInDB;

//   it("Test Post(/user/signup) to creat user correctly", async () => {
//     let res = await req.post("/user/signup").send(myUser);
//     expect(res.status).toBe(201);
//     expect(res.body.data.name).toBe("mohamed ali");
//     UserInDB = res.body.data;
//   });
//   it("Test Post(/user/login) to not login user  with invalid credits", async () => {
//     let res = await req
//       .post("/user/login")
//       .send({ email: myUser.email, password: "awe123" });
//     expect(res.status).toBe(401);
//     expect(res.body.message).toContain("Invalid");
//   });
//   it("Test Post(/user/login) to not login user  with valid credits", async () => {
//     let res = await req.post("/user/login").send(myUser);
//     expect(res.status).toBe(200);
//     expect(res.body.token).toBeDefined();
//   });

    // it('Test router.get("/:id") to return user', async () => {
    //   let res = await req.get(`/user/${UserInDB._id}`);
    //   expect(res.body.data.name).toBe(UserInDB.name);
    // });
// });
