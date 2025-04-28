import { expect } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import Book from "./models/bookModel.js";
import app from "./server.js";

dotenv.config();

const logResponse = (testName, res) => {
  console.log(`\n----- ${testName} Response -----`);
  console.log(`Status: ${res.status}`);
  console.log(`Headers: ${JSON.stringify(res.headers, null, 2)}`);
  console.log(`Body: ${JSON.stringify(res.body, null, 2)}`);
  console.log('------------------------------\n');
};

describe("Book & Auth API Tests", function () {
  this.timeout(10000);
  let bookId;
  let authToken;
  let testUser = { username: "testuser", email: "testuser@example.com", password: "password123" };

  before(async () => {
    await mongoose.disconnect();
    await mongoose.connect(process.env.MONGODB_URI_TEST);
    await User.deleteMany();
    await Book.deleteMany();
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send(testUser);
    logResponse("User Registration", res);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("message").equal("User registered successfully");
  });

  it("should log in the user", async () => {
    const res = await request(app).post("/api/auth/login").send({ email: testUser.email, password: testUser.password });
    logResponse("User Login", res);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
    authToken = res.body.token;
  });

  it("should create a new book", async () => {
    const bookData = { title: "Test Book", author: "John Doe", genre: "Fiction", publicationYear: 2024 };
    const res = await request(app).post("/api/books").set("Authorization", `Bearer ${authToken}`).send(bookData);
    logResponse("Create Book", res);
    expect(res.status).to.equal(201);
    bookId = res.body.book._id;
  });

  it("should fetch all books", async () => {
    const res = await request(app).get("/api/books");
    logResponse("Fetch All Books", res);
    expect(res.status).to.equal(200);
  });

  it("should fetch a single book by ID", async () => {
    const res = await request(app).get(`/api/books/${bookId}`);
    logResponse("Fetch Single Book", res);
    expect(res.status).to.equal(200);
  });

  it("should update a book", async () => {
    const updateData = { title: "Updated Test Book" };
    const res = await request(app).put(`/api/books/${bookId}`).set("Authorization", `Bearer ${authToken}`).send(updateData);
    logResponse("Update Book", res);
    expect(res.status).to.equal(200);
  });

  it("should delete a book", async () => {
    const res = await request(app).delete(`/api/books/${bookId}`).set("Authorization", `Bearer ${authToken}`);
    logResponse("Delete Book", res);
    expect(res.status).to.equal(200);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
