import { contacts } from "../data/contacts.js";
import getName from "./contacts.js";

test("getting first name", () => {
  expect(getName()).toBe("Vanesa");
});
