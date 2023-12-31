import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserList() {
  return prisma.user.findMany({ select: { email: true, displayName: true } });
}

export async function createUser(
  email: User["email"],
  displayName: string,
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const role =
    email === "ng.tr.thinh@gmail.com" && displayName === "ngtrthinh"
      ? "admin"
      : "user";

  return prisma.user.create({
    data: {
      email,
      displayName,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      role,
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
