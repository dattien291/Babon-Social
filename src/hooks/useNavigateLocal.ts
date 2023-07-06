import { useNavigate } from "react-router-dom";

interface Strategy {
  directional(...args: any[]): void;
}

function useNavigateLocal() {
  const navigate = useNavigate();

  class ProfileStrategy implements Strategy {
    directional(...args: any[]) {
      const [path, payload] = args;
      navigate(`${path}/${payload.dataProfile}`);
    }
  }

  class ChatStrategy implements Strategy {
    directional(...args: any[]) {
      const [path, id] = args;
      navigate(`${path}/${id}`);
    }
  }

  class DefaultStrategy implements Strategy {
    directional(...args: any[]) {
      const [path] = args;
      navigate(path);
    }
  }

  class Navigator {
    strategies: Record<string, Strategy> = {};
    use(path: string, strategy: Strategy) {
      this.strategies[path] = strategy;
    }
    directional(...args: any) {
      const [path] = args;
      if (!this.strategies[path]) {
        console.error("Navigation policy has not been set!");
        return false;
      }
      return this.strategies[path].directional.apply(null, args);
      // directional.apply là cú pháp apply args của typescript
    }
  }

  const nav = new Navigator();
  nav.use("/profile", new ProfileStrategy());
  nav.use("/chat", new ChatStrategy());
  nav.use("/sign-up", new DefaultStrategy());
  nav.use("/login", new DefaultStrategy());

  return nav;
}

export default useNavigateLocal;
