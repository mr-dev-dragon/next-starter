import { hashPassword } from "@/src/helpers/password";
import prisma from "@/src/helpers/prisma";
import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

const SignUp = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return;
  }

  const { email, password, name } = req.body;

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      email: true,
      name: true,
      id: true,
      image: true,
    },
  });

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    return;
  }

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      name,
      email: email,
      password: hashedPassword,
      image: `http://www.gravatar.com/avatar/${crypto
        .createHash("md5")
        .update(email)
        .digest("hex")}.jpg?s=120`,
    },
  });

  res.status(201).json({ message: "Created user!", ok: true });
};

export default SignUp;
