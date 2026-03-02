import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
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
import { Button } from "@kinsta/stratus";
import styled from "@emotion/styled";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  th,
  td {
    border: 1px solid #e5e5e5;
    padding: 0.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
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

  const [newUser, setNewUser] = useState<Partial<CreateUserVariables>>({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });
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

  const [newProduct, setNewProduct] = useState<Partial<CreateProductVariables>>({
    name: "",
    description: "",
    details: "",
    price: 0,
    imageUrl: "",
    category: "other",
    userId: 1,
  });
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState<Partial<UpdateProductVariables>>({});

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({ variables: newUser as CreateUserVariables });
    setNewUser({ username: "", email: "", password: "", role: "USER" });
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

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct({ variables: newProduct as CreateProductVariables });
    setNewProduct({
      name: "",
      description: "",
      details: "",
      price: 0,
      imageUrl: "",
      category: "other",
      userId: 1,
    });
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

  return (
    <Container>
      <h1>Admin Panel</h1>

      <Section>
        <h2>Users</h2>

        <Form>
          <Input
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
          <Input
            placeholder="Email"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <Input
            placeholder="Password"
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value as "USER" | "ADMIN" })}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <Button onClick={handleCreateUser}>Create User</Button>
        </Form>

        {loadingUsers && <p>Loading users...</p>}
        {usersError && <p>Error: {usersError.message}</p>}
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData?.users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>
                  {editingUserId === u.id ? (
                    <Input
                      value={editingUser.username ?? u.username}
                      onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                    />
                  ) : (
                    u.username
                  )}
                </td>
                <td>
                  {editingUserId === u.id ? (
                    <Input
                      value={editingUser.email ?? u.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    />
                  ) : (
                    u.email
                  )}
                </td>
                <td>
                  {editingUserId === u.id ? (
                    <select
                      value={editingUser.role ?? u.role}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, role: e.target.value as "USER" | "ADMIN" })
                      }>
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  ) : (
                    u.role
                  )}
                </td>
                <td>
                  {editingUserId === u.id ? (
                    <>
                      <Button onClick={() => handleUpdateUser(u.id)}>Save</Button>
                      <Button onClick={() => setEditingUserId(null)}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          setEditingUserId(u.id);
                          setEditingUser({ username: u.username, email: u.email, role: u.role });
                        }}>
                        Edit
                      </Button>
                      <Button onClick={() => handleDeleteUser(u.id)}>Delete</Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>

      <Section>
        <h2>Products</h2>
        <Form>
          <Input
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <Input
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <Input
            placeholder="Details"
            value={newProduct.details}
            onChange={(e) => setNewProduct({ ...newProduct, details: e.target.value })}
          />
          <Input
            placeholder="Price"
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
          />
          <Input
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
          />
          <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
            <option value="keyboard">keyboard</option>
            <option value="mouse">mouse</option>
            <option value="headset">headset</option>
            <option value="controller">controller</option>
            <option value="other">other</option>
          </select>
          <Input
            placeholder="User ID"
            type="number"
            value={newProduct.userId}
            onChange={(e) => setNewProduct({ ...newProduct, userId: parseInt(e.target.value) })}
          />
          <Button onClick={handleCreateProduct}>Create Product</Button>
        </Form>

        {loadingProducts && <p>Loading products...</p>}
        {productsError && <p>Error: {productsError.message}</p>}
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productsData?.products.items.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  {editingProductId === p.id ? (
                    <Input
                      value={editingProduct.name ?? p.name}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, name: e.target.value })
                      }
                    />
                  ) : (
                    p.name
                  )}
                </td>
                <td>
                  {editingProductId === p.id ? (
                    <Input
                      value={editingProduct.description ?? p.description}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, description: e.target.value })
                      }
                    />
                  ) : (
                    p.description
                  )}
                </td>
                <td>
                  {editingProductId === p.id ? (
                    <Input
                      type="number"
                      value={editingProduct.price ?? p.price}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })
                      }
                    />
                  ) : (
                    p.price
                  )}
                </td>
                <td>
                  {editingProductId === p.id ? (
                    <select
                      value={editingProduct.category ?? p.category}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, category: e.target.value })
                      }>
                      <option value="keyboard">keyboard</option>
                      <option value="mouse">mouse</option>
                      <option value="headset">headset</option>
                      <option value="controller">controller</option>
                      <option value="other">other</option>
                    </select>
                  ) : (
                    p.category
                  )}
                </td>
                <td>
                  {editingProductId === p.id ? (
                    <>
                      <Button onClick={() => handleUpdateProduct(p.id)}>Save</Button>
                      <Button onClick={() => setEditingProductId(null)}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          setEditingProductId(p.id);
                          setEditingProduct({
                            name: p.name,
                            description: p.description,
                            price: p.price,
                            category: p.category,
                          });
                        }}>
                        Edit
                      </Button>
                      <Button onClick={() => handleDeleteProduct(p.id)}>Delete</Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
    </Container>
  );
}
