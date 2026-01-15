import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Button } from "@kinsta/stratus";
import { users } from "../data/users";
import type { User } from "../types/User";

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

export function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (users.find((u) => u.username === username)) {
      setError("Username already exists");
      return;
    }

    const newUser: User = {
      id: (users.length + 1).toString(),
      username,
      email,
      password,
    };
    users.push(newUser);

    setError("");
    alert("Registration successful! Redirecting to login...");
    navigate("/login");
  };

  return (
    <Form>
      <h2>Register</h2>

      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

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

      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {error && <Error>{error}</Error>}

      <Button onClick={handleSubmit}>Register</Button>
    </Form>
  );
}
