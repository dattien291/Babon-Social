import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase"; // auth Firebase
import { User, checkLogin, signUpWithGoogle } from "../assets/fake-data/User";

interface Strategy {
  authenticate(args: any[]): Promise<any>;
}

function useAuthenticator() {
  const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth);
  const [_loggedInUser, _error1] = useAuthState(auth);

  class LocalStrategy implements Strategy {
    async authenticate(args: any[]) {
      const [username, password] = args;
      if (!username || !password) {
        return { message: "Username and password are required", data: null };
      } else {
        const res = await checkLogin(username, password);
        return res;
      }
    }
  }

  class GoogleTrategy implements Strategy {
    async authenticate(args: any[]) {
      const [] = args;
      try {
        const loggedUser = await signInWithGoogle();
        if (loggedUser) {
          const newUser: User = {
            id: loggedUser.user.uid,
            name: loggedUser.user.displayName as string,
            username: loggedUser.user.email as string,
            password: "",
            avatar: loggedUser.user.photoURL as string,
            bio: "",
          };
          await signUpWithGoogle(newUser.name, newUser.username, newUser.avatar);
          return { message: "success", data: newUser };
        }
        return { message: "Login with google failed", data: null };
      } catch (error) {
        return { message: error, data: null };
      }
    }
  }

  class Authenticator {
    strategies: Record<string, Strategy> = {};
    use(name: string, strategy: Strategy) {
      this.strategies[name] = strategy;
    }
    authenticate(name: string, ...args: any) {
      if (!this.strategies[name]) {
        console.error("Authentication policy has not been set!");
        return false;
      }
      return this.strategies[name].authenticate.apply(null, args);
      // authenticate.apply là cú pháp apply args của typescript
    }
  }
  //======================================================================
  const authen = new Authenticator();
  authen.use("google", new GoogleTrategy());
  authen.use("local", new LocalStrategy());

  return authen;
}

export default useAuthenticator;
