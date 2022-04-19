import { isAuthenticatedAPIRoute } from "@/src/helpers/session";

import type { NextApiRequest, NextApiResponse } from "next";

const AuthenticatedOnly = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await isAuthenticatedAPIRoute(req, res);
  if (req.method !== "GET") {
    return;
  }

  res.json({ user });
};

export default AuthenticatedOnly;
