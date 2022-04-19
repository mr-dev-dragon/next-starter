import { XCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import { Input, Label } from "../components/Form";
import Layout from "../components/layout";

import { useSignup } from "../stores/useAuth";

const SignUp = () => {
  const router = useRouter();
  const {
    createUser,
    error,
    setName,
    setPassword,
    setEmail,
    setRepeatPassword,
    isFilledIn,
  } = useSignup();

  return (
    <Layout>
      <form
        onSubmit={(e) => createUser(e, router)}
        className="max-w-[500px] m-auto p-15 mt-12"
      >
        <h2 className="text-center pb-8 font-bold text-3xl">Sign up</h2>
        <div className="mb-6">
          <Label htmlFor="name">Name</Label>
          <Input
            id="Name"
            required
            placeholder="Your name"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="hey@example.com"
            required
            type="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="password">Password</Label>
          <Input
            placeholder="super complicated password"
            required
            id="password"
            type="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <div className="mb-12">
          <Label htmlFor="email">Repeat Password</Label>
          <Input
            id="repeat-password"
            placeholder="super complicated password"
            required
            type="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRepeatPassword(e.target.value)
            }
          />
        </div>
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircleIcon
                  className="h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-brand-red rounded-md h-[48px] disabled:opacity-50"
          disabled={!isFilledIn()}
        >
          Create Account
        </button>
      </form>
    </Layout>
  );
};

export default SignUp;
