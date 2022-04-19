import { encode, getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import prisma from "@/src/helpers/prisma";
import { SESSION_MESSAGES } from "./constants";
import { ISODateString } from "next-auth";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

const signInRedirect = {
  redirect: {
    destination: "/signin",
    permanent: false,
  },
};

export type Session = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string | null;
    admin: boolean | null;
  };
  expires: ISODateString;
};

function validateSession({
  session,
  redirectCondition,
}: {
  session: Session;
  redirectCondition: any;
}) {
  if (redirectCondition) {
    return signInRedirect;
  }

  return { props: { session } };
}

/**
 * Usually necessary for sign in pages.
 */
export const redirectIfAuthenticated = async (
  context: GetServerSidePropsContext<any>
) => {
  const session = (await getSession(context)) as Session;
  return validateSession({ session, redirectCondition: session });
};

/**
 * No need to fetch anything else server side, validate if the user is authenticated or redirect to
 * the homepage.
 * @returns session or the redirect object for getServerSideProps or getStaticProps
 */
export const validateUserSession = async (
  context: GetServerSidePropsContext<any>
) => {
  const session = (await getSession(context)) as Session;
  return validateSession({
    session,
    redirectCondition: !session,
  });
};

/**
 * When we need to fetch more information inside getServerSideProps or getStaticProps but also
 * verifying the session, this helper will do just that.
 *
 * @param {*} context
 * @param {*} fetcherFn all the fetch logic specific to each page
 * @returns redirect object or the return object of the fetcherFn function
 */
export async function validateSessionAndFetch(
  context: GetServerSidePropsContext<any>,
  // eslint-disable-next-line no-unused-vars
  fetcherFn: (session: Session) => Promise<any>
) {
  const session = (await getSession(context)) as Session;
  if (!session) {
    return signInRedirect;
  }
  return fetcherFn(session);
}

export async function isAuthenticatedAPIRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  if (isAuthenticated(token?.email)) {
    const user = await prisma.user.findFirst({
      where: { email: token.email },
      select: {
        email: true,
        name: true,
        id: true,
        image: true,
      },
    });

    return user;
  } else {
    res.status(401).json({
      error: SESSION_MESSAGES.LOGIN_REQUIRED,
    });
    return;
  }
}

export function isAuthenticated(session: any) {
  return Boolean(session);
}

export const adminOnlyAPIRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const user = await isAuthenticatedAPIRoute(req, res);

  if (user.role !== "ADMIN") {
    res.status(401).json({
      error: SESSION_MESSAGES.ADMIN_REQUIRED,
    });

    return;
  }

  return user;
};

export function isAdmin(session: Session) {
  return session?.user?.admin || null;
}

export async function createAuthHeaders(
  context: GetServerSidePropsContext<any>
) {
  const token = await getToken({ req: context.req });
  const encodedToken = await encode({
    token: token,
    secret: process.env.NEXTAUTH_SECRET,
  });
  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${encodedToken}`,
    },
  };
}
