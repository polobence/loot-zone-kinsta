import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import styled from "@emotion/styled";
import { Button } from "@kinsta/stratus";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/mutations";
import type { LoginMutationData, LoginMutationVariables } from "../types/Login";

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
  const [error, setError] = useState("");

  const [loginMutation, { loading }] = useMutation<LoginMutationData, LoginMutationVariables>(
    LOGIN,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      if (data?.login) {
        const { token, user } = data.login;
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/");
      }
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  return (
    <Container>
      <Form>
        <h2>Login</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Error>{error}</Error>}
        <Button onClick={handleSubmit}>{loading ? "Logging in..." : "Login"}</Button>
      </Form>

      <p>
        Don’t have an account? <Button onClick={() => navigate("/register")}>Register</Button>
      </p>
    </Container>
  );
}
