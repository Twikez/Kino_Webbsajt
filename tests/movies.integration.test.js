import request from "supertest";
import app from "../server";

describe("Movie page SSR", () => {
  it("shows a movie title", async () => {
    const res = await request(app).get("/movie/1");
    expect(res.status).toBe(200);
    expect(res.text).toMatch(/<h1>.*<\/h1>/);
  });
});