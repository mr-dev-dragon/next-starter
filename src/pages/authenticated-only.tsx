import Layout from "../components/layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { createAuthHeaders, validateSessionAndFetch } from "../helpers/session";
import { absoluteUrl } from "../helpers/absoulte-url";
import axios from "axios";

export default function AuthenticatedOnly({ user }) {
  return (
    <Layout>
      You can only see this page Authenticated
      <pre className="mt-4">{JSON.stringify(user, null, 2)}</pre>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return validateSessionAndFetch(context, async () => {
    const { origin } = absoluteUrl(context.req);
    const authOptions = await createAuthHeaders(context);
    const { data: user } = await axios(
      origin + "/api/authenticated-only",
      authOptions
    );
    return {
      props: {
        user,
      },
    };
  });
};
