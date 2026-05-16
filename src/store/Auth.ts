import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { AppwriteException, ID, Models, OAuthProvider } from "appwrite";
import { account } from "@/models/client/config";

export interface UserPrefs {
  reputation?: number;
  bio?: string;
}

interface IAuthStore {
  session: Models.Session | null;
  jwt: string | null;
  user: Models.User<UserPrefs> | null;
  hydrated: boolean;

  setHydrated(): void;
  verifySession(): Promise<void>;
  login(
    email: string,
    password: string,
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  createAccount(
    name: string,
    email: string,
    password: string,
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  loginWithGoogle(): Promise<void>;
  loginWithGithub(): Promise<void>;
  logout(): Promise<void>;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,

      setHydrated() {
        set({ hydrated: true });
      },

      async verifySession() {
        try {
          const session = await account.getSession("current");

          const [user, { jwt }] = await Promise.all([
            account.get<UserPrefs>(),
            account.createJWT(),
          ]);

          if (user.prefs?.reputation === undefined) {
            await account.updatePrefs<UserPrefs>({
              reputation: 0,
            });
          }

          set({
            session,
            user,
            jwt,
          });
        } catch (error) {
          console.error(error);

          set({
            session: null,
            user: null,
            jwt: null,
          });
        }
      },

      async login(email: string, password: string) {
        try {
          const session = await account.createEmailPasswordSession(
            email,
            password,
          );

          const user = await account.get<UserPrefs>();

          // block unverified email users
          if (!user.emailVerification) {
            await account.deleteSession("current");

            return {
              success: false,
              error: new AppwriteException(
                "Please verify your email before logging in.",
              ),
            };
          }

          const { jwt } = await account.createJWT();

          if (user.prefs?.reputation === undefined) {
            await account.updatePrefs<UserPrefs>({
              reputation: 0,
            });
          }

          set({
            session,
            user,
            jwt,
          });

          return { success: true };
        } catch (error) {
          console.error(error);

          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async createAccount(name: string, email: string, password: string) {
        try {
          await account.create(ID.unique(), email, password, name);

          await account.createVerification(
            `${process.env.NEXT_PUBLIC_APP_URL}/verify-email`,
          );

          return { success: true };
        } catch (error) {
          console.error(error);

          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
      async loginWithGoogle() {
        try {
          await account.createOAuth2Session(
            OAuthProvider.Google,
            `${process.env.NEXT_PUBLIC_APP_URL}/`,
            `${process.env.NEXT_PUBLIC_APP_URL}/login`,
          );
        } catch (error) {
          console.error(error);
        }
      },
      async loginWithGithub() {
        try {
          await account.createOAuth2Session(
            OAuthProvider.Github,
            `${process.env.NEXT_PUBLIC_APP_URL}/`,
            `${process.env.NEXT_PUBLIC_APP_URL}/login`,
          );
        } catch (error) {
          console.error(error);
        }
      },

      async logout() {
        try {
          await account.deleteSessions();
          set({ session: null, jwt: null, user: null });
        } catch (error) {
          console.error(error);
        }
      },
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    },
  ),
);
