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

async function updateUser() {
  await client.user.update({
    where: {
      id: 1,
    },
    data: {
      username: "sajid2812",
    },
  });
}

// createUser();
updateUser();
