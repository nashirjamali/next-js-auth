export type LoginState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
    }
  | undefined;
