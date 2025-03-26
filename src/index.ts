import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function createUser() {
  await client.user.create({
    data: {
      username: "sajid",
      password: "12345",
      age: 24,
      city: "Kolkata",
    },
  });
}

createUser();
