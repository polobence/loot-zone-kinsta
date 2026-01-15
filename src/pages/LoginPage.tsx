import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import styled from "@emotion/styled";
import { Button } from "@kinsta/stratus";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
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
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      setError("");
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <Form>
        <h2>Login</h2>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Error>{error}</Error>}
        <Button onClick={handleSubmit}>Login</Button>
      </Form>

      <p>
        Don’t have an account? <Button onClick={() => navigate("/register")}>Register</Button>
      </p>
    </>
  );
}
