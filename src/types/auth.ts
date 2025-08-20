export interface LoginForm {
  email: string;
  password: string;
}

export interface UserRole {
  name: string;
  roles: string[];
  color: string;
}

export interface LoginPageProps {
  onLogin?: (credentials: LoginForm) => void;
  isLoading?: boolean;
}