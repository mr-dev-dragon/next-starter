import axios from "axios";
import { signIn } from "next-auth/react";
import { NextRouter } from "next/router";
import create, { GetState, SetState } from "zustand";
import { PASSWORD_ERRORS, ROUTES } from "../helpers/constants";

type useSignInProps = {
  email: string;
  error: string;
  password: string;
};

export const useSignIn = create(
  (set: SetState<useSignInProps>, get: GetState<useSignInProps>) => ({
    error: "",
    email: "",
    password: "",
    isFilledIn: () => {
      const { email, password } = get();

      return email && password;
    },
    setPassword: (password: string) => set({ password }),
    setEmail: (email: string) => set({ email }),
    signIn: async (e: any, router: NextRouter) => {
      const { email, password } = get();
      e.preventDefault();
      try {
        await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        router.push("/");
      } catch {}
    },
  })
);

type useSignupProps = {
  email: string;
  error: string;
  password: string;
  name: string;
  repeatPassword: string;
};

export const useSignup = create(
  (set: SetState<useSignupProps>, get: GetState<useSignupProps>) => ({
    error: "",
    email: "",
    password: "",
    repeatPassword: "",
    name: "",
    isFilledIn: () => {
      const { email, password, repeatPassword } = get();

      return email && password && repeatPassword;
    },
    setPassword: (password: string) => set({ password }),
    setEmail: (email: string) => set({ email }),
    setName: (name: string) => set({ name }),
    setRepeatPassword: (repeatPassword: string) => set({ repeatPassword }),
    createUser: async (e: any, router: NextRouter) => {
      const { email, password, repeatPassword, name } = get();
      set({ error: "" });
      e.preventDefault();

      if (password.length < 6) {
        set({ error: PASSWORD_ERRORS.TOO_SMALL });
        return;
      }

      if (password !== repeatPassword) {
        set({ error: PASSWORD_ERRORS.NO_MATCH });
        return;
      }

      const { data } = await axios.post(ROUTES.API_SIGN_UP, {
        email,
        password,
        name,
      });

      if (!data.ok) {
        throw new Error(data.message || "Something went wrong!");
      }
      router.push(ROUTES.SIGN_IN);
      return data;
    },
  })
);
