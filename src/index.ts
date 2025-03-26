import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();

const client = new PrismaClient();

app.post("/", async (req, res) => {
  const { username, password, age, city } = req.body;
  await client.user.create({
    data: {
      username: username,
      password: password,
      age: age,
      city: city,
    },
  });
});

app.put("/:id", async (req, res) => {
  await client.user.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      username: req.body.username,
    },
  });
});

app.get("/:id", async (req, res) => {
  const user = await client.user.findFirst({
    where: {
      id: parseInt(req.params.id),
    },
    select: {
      todos: true,
      username: true,
      password: true,
    },
  });
  res.status(200).json(user);
});
