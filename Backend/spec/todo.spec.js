const request = require("supertest");
const app = require("..");
const { clearDatabase } = require("../db.connection");

const req = request(app);

describe("Todo Routes", () => {
  let userInDB, token, todoInDB;
  beforeAll(async () => {
    let myUser = {
      name: "mohamed ali",
      email: "mohamed@gmail.com",
      password: "abc123",
    };

    let res1 = await req.post("/user/signup").send(myUser);
    userInDB = res1.body.data;
    let res2 = await req.post("/user/login").send(myUser);
    token = res2.body.token;
  });

  it("Test Post(/todo) to create todo", async () => {
    let res = await req
      .post("/todo")
      .send({ title: "new Todo" })
      .set({ authorization: token });

    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe("new Todo");
    todoInDB = res.body.data;
  });

  it('Test router.get("/:id") without auth return please login first ', async () => {
    let res = await req.get(`/todo/${todoInDB._id}`);
    expect(res.body.message).toContain('please login first');
  });
  it('Test router.get("/:id") with  auth return todo with id ', async () => {
    let res = await req.get(`/todo/${todoInDB._id}`).set({ authorization: token });;
    expect(res.body.data.title).toContain(todoInDB.title);
  });
});
