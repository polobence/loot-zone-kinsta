import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Button } from "@kinsta/stratus";
import { useNotification } from "../context/notification/useNotification";
import { useMutation } from "@apollo/client/react";
import { REGISTER } from "../graphql/mutations";
import { type RegisterVariables, type RegisterResponse } from "../types/Register";

type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

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
  const [registerMutation, { error }] = useMutation<RegisterResponse, RegisterVariables>(REGISTER);
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>({ mode: "onTouched" });

  const onSubmit = async (formData: RegisterFormValues) => {
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    const { data } = await registerMutation({
      variables: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      },
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
        {...register("username", { required: "Username is required" })}
      />
      {errors.username && <Error>{errors.username.message}</Error>}

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

      <Input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword", {
          required: "Confirm Password is required",
          validate: (value) => value === getValues("password") || "Passwords do not match",
        })}
      />
      {errors.confirmPassword && <Error>{errors.confirmPassword.message}</Error>}

      {error && <Error>{error.message}</Error>}

      <Button onClick={handleSubmit(onSubmit)}>Register</Button>
    </Form>
  );
}
