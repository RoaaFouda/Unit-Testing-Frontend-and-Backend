// request
// test response

const request = require("supertest");
const app = require("..");

const req = request(app);
// localhost:3333/

describe("Test Default Route", () => {
  it("Test get(/) to res all todos",async () => {
    let res =await req.get("/");
    expect(res.status).toBe(200)
    expect(res.body.todos.length).toBe(0);
  });
});
