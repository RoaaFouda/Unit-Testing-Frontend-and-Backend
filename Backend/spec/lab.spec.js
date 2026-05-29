const request = require('supertest')
const app = require('..') 
const userModel = require('../models/user')
const mongoose = require('mongoose')
const { clearDatabase, closeDatabase } = require("../db.connection");
const todoModel = require('../models/todo')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const req = request(app)

describe("lab testing:", () => {

    describe("users routes:", () => {


        beforeAll(async () => {
            await userModel.create({
                name: "Alice",
                email: "alice@example.com",
                password: "hashedpassword123" 
            })
        })

        it("req to get(/search), expect to get the correct user with his name", async () => {
            const res = await req.get("/user/search").query({ name: "Alice" })

            expect(res.status).toBe(200)
            expect(res.body.data.name).toBe("Alice")
        })


        it("req to get(/search) with invalid name, expect res status and res message to be as expected", async () => {
            const res = await req.get("/user/search").query({ name: "Nobody" })

            expect(res.status).toBe(200)
            expect(res.body.message).toBe("There is no user with name: Nobody")
        })

        it("req to delete(/), expect res status to be 200 and a message sent in res", async () => {
            const res = await req.delete("/user/")

            expect(res.status).toBe(200)
            expect(res.body.message).toBe("users have been deleted successfully")
        })

    })

 describe("todos routes:", () => {

    let token;
    let userId;
    let todoId;

    beforeAll(async () => {

        const hashedPassword = await bcrypt.hash("password123", 10)
        const user = await userModel.create({
            name: "TestUser",
            email: "testuser@example.com",
            password: hashedPassword
        })
        userId = user._id

        token = jwt.sign(
            { id: user._id, name: user.name },
            process.env.SECRET
        )

        const todo = await todoModel.create({
            title: "My first todo",
            userId: user._id
        })
        todoId = todo._id
    })

    it("req to patch(/) with id only, expect res status and res message to be as expected", async () => {
        const res = await req
            .patch(`/todo/${todoId}`)
            .set("Authorization", token)
            .send({})

        expect(res.status).toBe(400)
        expect(res.body.message).toBe("must provide title and id to edit todo")
    })

    it("req to patch(/) with id and title, expect res status and res to be as expected", async () => {
        const res = await req
            .patch(`/todo/${todoId}`)
            .set("Authorization", token)
            .send({ title: "Updated title" })

        expect(res.status).toBe(200)
        expect(res.body.data).toBeDefined()
        expect(res.body.data.title).toBe("Updated title")
    })

    it("req to get(/user), expect to get all user's todos", async () => {
        const res = await req
            .get("/todo/user")
            .set("Authorization", token)

        expect(res.status).toBe(200)
        expect(res.body.data).toBeDefined()
        expect(Array.isArray(res.body.data)).toBe(true)
        expect(res.body.data.length).toBeGreaterThan(0)
        res.body.data.forEach(todo => {
            expect(todo.userId.toString()).toBe(userId.toString())
        })
    })

    it("req to get(/user), expect to not get any todos for user who has no todo", async () => {
        const hashedPassword = await bcrypt.hash("password456", 10)
        const emptyUser = await userModel.create({
            name: "EmptyUser",
            email: "empty@example.com",
            password: hashedPassword
        })
        const emptyToken = jwt.sign(
            { id: emptyUser._id, name: emptyUser.name },
            process.env.SECRET
        )

        const res = await req
            .get("/todo/user")
            .set("Authorization", emptyToken)

        expect(res.status).toBe(200)
        expect(res.body.message).toBe("Couldn't find any todos for " + emptyUser._id)
    })
})

    afterAll(async () => {
        await clearDatabase();
        await closeDatabase()
    })

})

