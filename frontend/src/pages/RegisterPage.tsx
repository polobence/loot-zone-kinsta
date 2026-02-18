import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Button } from "@kinsta/stratus";
import { useNotification } from "../context/notification/useNotification";
import { useMutation } from "@apollo/client/react";
import { REGISTER } from "../graphql/mutations";
import { type RegisterVariables, type RegisterResponse } from "../types/Register";

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
  const [register, { error }] = useMutation<RegisterResponse, RegisterVariables>(REGISTER);
  const { showNotification } = useNotification();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setFormError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    const { data } = await register({
      variables: { username, email, password },
    });

    if (data) {
      localStorage.setItem("token", data.register.token);
      showNotification("Registration successful!");
      navigate("/login");
    }
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

      {error && <Error>{error.message}</Error>}
      {formError && <Error>{formError}</Error>}

      <Button onClick={handleSubmit}>Register</Button>
    </Form>
  );
}
