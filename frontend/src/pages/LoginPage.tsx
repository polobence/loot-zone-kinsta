import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import styled from "@emotion/styled";
import { Button } from "@kinsta/stratus";
import { useMutation } from "@apollo/client/react";
import { useForm } from "react-hook-form";
import { LOGIN } from "../graphql/mutations";
import type { LoginMutationData, LoginMutationVariables } from "../types/Login";

type LoginFormValues = {
  email: string;
  password: string;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 400px;
  margin: 5rem auto;
  padding: 3rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Error = styled.p`
  color: red;
  font-weight: bold;
`;

export function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [loginMutation, { loading, error: loginError }] = useMutation<
    LoginMutationData,
    LoginMutationVariables
  >(LOGIN);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ mode: "onTouched" });

  const onSubmit = async (formData: LoginFormValues) => {
    try {
      const { data } = await loginMutation({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (data?.login) {
        const { token, user } = data.login;
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/");
      }
    } catch (err: unknown) {
      // error already handled by loginError from useMutation
      console.error(err);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <Input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Invalid email format" },
          })}
        />
        {errors.email && <Error>{errors.email.message}</Error>}

        <Input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
        />
        {errors.password && <Error>{errors.password.message}</Error>}

        {(loginError || undefined) && <Error>{loginError?.message}</Error>}

        <Button onClick={handleSubmit(onSubmit)}>{loading ? "Logging in..." : "Login"}</Button>
      </Form>

      <p>
        Don’t have an account? <Button onClick={() => navigate("/register")}>Register</Button>
      </p>
    </Container>
  );
}
