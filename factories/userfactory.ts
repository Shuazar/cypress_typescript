import { faker } from "@faker-js/faker";
import { User } from "../types/user";

interface Factory {
  user: User;
  getUser: () => User;
}

export const userFactory: Factory = {
  user: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    message: faker.company.name(),
  },
  getUser(): User {
    return this.user;
  },
};