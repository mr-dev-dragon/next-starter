import Layout from "../components/layout";

export default function IndexPage() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use{" "}
        <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.
      </p>
      <p>
        It includes credentials login, authenticated only pages and
        authenticated only routes
      </p>
    </Layout>
  );
}
