// index.test.js
import request from "supertest";
import app from "./../src/index";

describe("API Endpoints", () => {
  it("GET /api/supermarkets - success", async () => {
    // Mock valid query parameters
    const lat = 52.52;
    const lon = 13.405;
    const radius = 1000;

    const response = await request(app)
      .get(`/api/supermarkets?lat=${lat}&lon=${lon}&radius=${radius}`)
      .expect("Content-Type", /json/)
      .expect(200);

    // Add more expectations here based on the structure of your data
    expect(response.body).toHaveProperty("features"); // Assuming Geoapify returns a "features" array
  });

  it("GET /api/entertainment - success", async () => {
    const lat = 52.52;
    const lon = 13.405;
    const radius = 1000;

    const response = await request(app)
      .get(`/api/entertainment?lat=${lat}&lon=${lon}&radius=${radius}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("features");
  });

  it("GET /api/entertainment - invalid parameters", async () => {
    const response = await request(app)
      .get("/api/entertainment?lat=invalid&lon=invalid&radius=invalid")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });

  it("GET /api/parks - success", async () => {
    const lat = 52.52;
    const lon = 13.405;
    const radius = 1000;

    const response = await request(app)
      .get(`/api/parks?lat=${lat}&lon=${lon}&radius=${radius}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("features");
  });

  it("GET /api/restaurants - success with optional parameters", async () => {
    const lat = 52.52;
    const lon = 13.405;
    const radius = 1000;
    const categories = "catering.restaurant.asian";
    const conditions = "halal.only";

    const response = await request(app)
      .get(
        `/api/restaurants?lat=${lat}&lon=${lon}&radius=${radius}&categories=${categories}&conditions=${conditions}`
      )
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("features");
  });

  it("POST /api/feedback - success", async () => {
    const feedback = {
      user: "testUser",
      comment: "Great service!",
    };

    const response = await request(app)
      .post("/api/feedback")
      .send(feedback)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toHaveProperty("message", "Feedback received");
    expect(response.body).toHaveProperty("feedback");
    expect(response.body.feedback).toMatchObject(feedback);
  });

  it("POST /api/feedback - failure due to missing fields", async () => {
    const feedback = {
      user: "testUser",
      // Missing 'comment' field
    };

    const response = await request(app)
      .post("/api/feedback")
      .send(feedback)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });

  // Add more tests for error cases, other endpoints, etc.
});
