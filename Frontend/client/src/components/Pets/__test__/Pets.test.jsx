import { describe, test, beforeAll, afterEach, afterAll, expect } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { fireEvent, render, screen } from "@testing-library/react";
import mockedCats from "../../../mocks/cats.json";
import Pets from "../Pets";

// mocking
const server = setupServer(
  http.get("http://localhost:4000/cats", () => {
    return HttpResponse.json(mockedCats, { status: 200 });
  })
);

describe("Test Pets Component", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Test initial Render", async () => {
    render(<Pets />);
    let catCards = await screen.findAllByRole("article");
    expect(catCards.length).toBe(5);
  });

  test("Test Gender Filter", async () => {
    render(<Pets />);
    let catCards = await screen.findAllByRole("article");
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: "male" },
    });
    expect(screen.getAllByRole("article").length).toBe(2);
    expect(screen.getAllByRole("article")).toStrictEqual([
      catCards[1],
      catCards[3],
    ]);
  });

test("Test Favourite Filter", async () => {
  render(<Pets />);
  let catCards = await screen.findAllByRole("article");

  fireEvent.change(screen.getByLabelText(/Favourite/i), {
    target: { value: "favoured" },
  });

  const favouredCats = mockedCats.filter((cat) => cat.favoured === true);

  expect(screen.getAllByRole("article").length).toBe(favouredCats.length);
  expect(screen.getAllByRole("article")).toStrictEqual(
    catCards.filter((_, i) => mockedCats[i].favoured === true)
  );
});

});
