import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { useForm, Controller } from "react-hook-form";
import { GET_USERS, GET_ALL_PRODUCTS } from "../graphql/queries";
import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../graphql/mutations";
import type {
  GetUsersData,
  CreateUserVariables,
  UpdateUserVariables,
  DeleteUserVariables,
  GetAllProductsData,
  CreateProductVariables,
  UpdateProductVariables,
  DeleteProductVariables,
  User,
  Product,
} from "../types/Admin";
import {
  Button,
  Input,
  NumberInput,
  Select,
  Table,
  Textarea,
  type TableColumnDef,
} from "@kinsta/stratus";
import styled from "@emotion/styled";

type UserFormValues = {
  username: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

type ProductFormValues = {
  name: string;
  description: string;
  details: string;
  price: number;
  imageUrl: string;
  category: "keyboard" | "mouse" | "headset" | "controller" | "other";
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export function AdminPage() {
  const {
    data: usersData,
    loading: loadingUsers,
    error: usersError,
    refetch: refetchUsers,
  } = useQuery<GetUsersData>(GET_USERS);
  const [createUser] = useMutation<{ createUser: User }, CreateUserVariables>(CREATE_USER);
  const [updateUser] = useMutation<{ updateUser: User }, UpdateUserVariables>(UPDATE_USER);
  const [deleteUser] = useMutation<{ deleteUser: boolean }, DeleteUserVariables>(DELETE_USER);

  const userForm = useForm<UserFormValues>({ defaultValues: { role: "USER" } });
  const {
    register: registerUser,
    handleSubmit: handleSubmitUser,
    formState: { errors: userErrors },
    reset: resetUserForm,
    control: userControl,
  } = userForm;

  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<Partial<UpdateUserVariables>>({});

  const {
    data: productsData,
    loading: loadingProducts,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery<GetAllProductsData>(GET_ALL_PRODUCTS);
  const [createProduct] = useMutation<{ createProduct: Product }, CreateProductVariables>(
    CREATE_PRODUCT,
  );
  const [updateProduct] = useMutation<{ updateProduct: Product }, UpdateProductVariables>(
    UPDATE_PRODUCT,
  );
  const [deleteProduct] = useMutation<{ deleteProduct: boolean }, DeleteProductVariables>(
    DELETE_PRODUCT,
  );

  const productForm = useForm<ProductFormValues>({ defaultValues: { category: "other" } });
  const {
    register: registerProduct,
    handleSubmit: handleSubmitProduct,
    formState: { errors: productErrors },
    reset: resetProductForm,
    control: productControl,
  } = productForm;

  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState<Partial<UpdateProductVariables>>({});

  const onSubmitUser = async (formData: UserFormValues) => {
    await createUser({ variables: formData });
    resetUserForm();
    refetchUsers();
  };

  const handleUpdateUser = async (id: number) => {
    await updateUser({ variables: { id, ...editingUser } });
    setEditingUserId(null);
    refetchUsers();
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUser({ variables: { id } });
    refetchUsers();
  };

  const onSubmitProduct = async (formData: ProductFormValues) => {
    await createProduct({ variables: formData });
    resetProductForm();
    refetchProducts();
  };

  const handleUpdateProduct = async (id: number) => {
    await updateProduct({ variables: { id, ...editingProduct } });
    setEditingProductId(null);
    refetchProducts();
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct({ variables: { id } });
    refetchProducts();
  };

  const userColumns: TableColumnDef<User>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
    },
    {
      id: "username",
      header: "Username",
      cell: ({ row }) => {
        const user = row.original;

        if (editingUserId === user.id) {
          return (
            <Input
              value={editingUser.username ?? user.username}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  username: e.target.value,
                })
              }
            />
          );
        }

        return user.username;
      },
    },
    {
      id: "email",
      header: "Email",
      cell: ({ row }) => {
        const user = row.original;

        if (editingUserId === user.id) {
          return (
            <Input
              value={editingUser.email ?? user.email}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  email: e.target.value,
                })
              }
            />
          );
        }

        return user.email;
      },
    },
    {
      id: "role",
      header: "Role",
      cell: ({ row }) => {
        const user = row.original;

        if (editingUserId === user.id) {
          return (
            <Select
              value={editingUser.role ?? user.role}
              onChange={(value) =>
                setEditingUser({
                  ...editingUser,
                  role: value as "USER" | "ADMIN",
                })
              }>
              <Select.Option value="USER">USER</Select.Option>
              <Select.Option value="ADMIN">ADMIN</Select.Option>
            </Select>
          );
        }

        return user.role;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;

        if (editingUserId === user.id) {
          return (
            <ButtonsContainer>
              <Button onClick={() => handleUpdateUser(user.id)}>Save</Button>
              <Button onClick={() => setEditingUserId(null)}>Cancel</Button>
            </ButtonsContainer>
          );
        }

        return (
          <ButtonsContainer>
            <Button
              onClick={() => {
                setEditingUserId(user.id);
                setEditingUser({
                  username: user.username,
                  email: user.email,
                  role: user.role,
                });
              }}>
              Edit
            </Button>
            <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
          </ButtonsContainer>
        );
      },
    },
  ];

  const productColumns: TableColumnDef<Product>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
    },
    {
      id: "name",
      header: "Name",
      cell: ({ row }) => {
        const product = row.original;

        if (editingProductId === product.id) {
          return (
            <Input
              value={editingProduct.name ?? product.name}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  name: e.target.value,
                })
              }
            />
          );
        }

        return product.name;
      },
    },
    {
      id: "description",
      header: "Description",
      cell: ({ row }) => {
        const product = row.original;

        if (editingProductId === product.id) {
          return (
            <Input
              value={editingProduct.description ?? product.description}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              }
            />
          );
        }

        return product.description;
      },
    },
    {
      id: "details",
      header: "Details",
      cell: ({ row }) => {
        const product = row.original;

        if (editingProductId === product.id) {
          return (
            <Textarea
              hasAutoGrow
              value={editingProduct.details ?? product.details}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  details: e.target.value,
                })
              }
            />
          );
        }

        return product.details;
      },
    },
    {
      id: "price",
      header: "Price",
      cell: ({ row }) => {
        const product = row.original;

        if (editingProductId === product.id) {
          return (
            <NumberInput
              value={editingProduct.price ?? product.price}
              onChange={(value) =>
                setEditingProduct({
                  ...editingProduct,
                  price: parseFloat(value as string),
                })
              }
            />
          );
        }

        return product.price;
      },
    },
    {
      id: "imageUrl",
      header: "Image URL",
      cell: ({ row }) => {
        const product = row.original;

        if (editingProductId === product.id) {
          return (
            <Input
              value={editingProduct.imageUrl ?? product.imageUrl}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  imageUrl: e.target.value,
                })
              }
            />
          );
        }

        return product.imageUrl;
      },
    },
    {
      id: "category",
      header: "Category",
      cell: ({ row }) => {
        const product = row.original;

        if (editingProductId === product.id) {
          return (
            <Select
              value={editingProduct.category ?? product.category}
              onChange={(value) =>
                setEditingProduct({
                  ...editingProduct,
                  category: value as "keyboard" | "mouse" | "headset" | "controller" | "other",
                })
              }>
              <Select.Option value="keyboard">keyboard</Select.Option>
              <Select.Option value="mouse">mouse</Select.Option>
              <Select.Option value="headset">headset</Select.Option>
              <Select.Option value="controller">controller</Select.Option>
              <Select.Option value="other">other</Select.Option>
            </Select>
          );
        }

        return product.category;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original;

        if (editingProductId === product.id) {
          return (
            <ButtonsContainer>
              <Button onClick={() => handleUpdateProduct(product.id)}>Save</Button>
              <Button onClick={() => setEditingProductId(null)}>Cancel</Button>
            </ButtonsContainer>
          );
        }

        return (
          <ButtonsContainer>
            <Button
              onClick={() => {
                setEditingProductId(product.id);
                setEditingProduct({
                  name: product.name,
                  description: product.description,
                  details: product.details,
                  price: product.price,
                  imageUrl: product.imageUrl,
                  category: product.category,
                });
              }}>
              Edit
            </Button>
            <Button onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
          </ButtonsContainer>
        );
      },
    },
  ];

  return (
    <Container>
      <h1>Admin Panel</h1>

      <Section>
        <h2>Users</h2>

        <Form onSubmit={handleSubmitUser(onSubmitUser)}>
          <Input
            placeholder="Username"
            {...registerUser("username", { required: "Username is required" })}
          />
          {userErrors.username && <p style={{ color: "red" }}>{userErrors.username.message}</p>}

          <Input
            placeholder="Email"
            type="email"
            {...registerUser("email", {
              required: "Email is required",
              pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Invalid email format" },
            })}
          />
          {userErrors.email && <p style={{ color: "red" }}>{userErrors.email.message}</p>}

          <Input
            placeholder="Password"
            type="password"
            {...registerUser("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
          />
          {userErrors.password && <p style={{ color: "red" }}>{userErrors.password.message}</p>}

          <Controller
            name="role"
            control={userControl}
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <Select label="Role" {...field}>
                <Select.Option value="USER">USER</Select.Option>
                <Select.Option value="ADMIN">ADMIN</Select.Option>
              </Select>
            )}
          />
          <Button onClick={handleSubmitUser(onSubmitUser)}>Create User</Button>
        </Form>

        {loadingUsers && <p>Loading users...</p>}
        {usersError && <p>Error: {usersError.message}</p>}

        <Table data={usersData?.users || []} columns={userColumns} />
      </Section>

      <Section>
        <h2>Products</h2>
        <Form onSubmit={handleSubmitProduct(onSubmitProduct)}>
          <Input
            placeholder="Name"
            {...registerProduct("name", { required: "Name is required" })}
          />
          {productErrors.name && <p style={{ color: "red" }}>{productErrors.name.message}</p>}

          <Input
            placeholder="Description"
            {...registerProduct("description", { required: "Description is required" })}
          />
          {productErrors.description && (
            <p style={{ color: "red" }}>{productErrors.description.message}</p>
          )}

          <Input
            placeholder="Details"
            {...registerProduct("details", { required: "Details are required" })}
          />
          {productErrors.details && <p style={{ color: "red" }}>{productErrors.details.message}</p>}

          <Controller
            name="price"
            control={productControl}
            rules={{
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
            }}
            render={({ field }) => <NumberInput label="Price" {...field} />}
          />
          {productErrors.price && <p style={{ color: "red" }}>{productErrors.price.message}</p>}

          <Input
            placeholder="Image URL"
            {...registerProduct("imageUrl", { required: "Image URL is required" })}
          />
          {productErrors.imageUrl && (
            <p style={{ color: "red" }}>{productErrors.imageUrl.message}</p>
          )}

          <Controller
            name="category"
            control={productControl}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select label="Category" {...field}>
                <Select.Option value="keyboard">keyboard</Select.Option>
                <Select.Option value="mouse">mouse</Select.Option>
                <Select.Option value="headset">headset</Select.Option>
                <Select.Option value="controller">controller</Select.Option>
                <Select.Option value="other">other</Select.Option>
              </Select>
            )}
          />
          <Button onClick={handleSubmitProduct(onSubmitProduct)}>Create Product</Button>
        </Form>

        {loadingProducts && <p>Loading products...</p>}
        {productsError && <p>Error: {productsError.message}</p>}

        <Table data={productsData?.products.items || []} columns={productColumns} />
      </Section>
    </Container>
  );
}
