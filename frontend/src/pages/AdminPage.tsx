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
import { Button, Select } from "@kinsta/stratus";
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

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
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
          <Select
            value={newUser.role}
            onChange={() => setNewUser({ ...newUser, role: newUser.role })}>
            <Select.Option value="USER">USER</Select.Option>
            <Select.Option value="ADMIN">ADMIN</Select.Option>
          </Select>
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
            {usersData?.users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {editingUserId === user.id ? (
                    <Input
                      value={editingUser.username ?? user.username}
                      onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td>
                  {editingUserId === user.id ? (
                    <Input
                      value={editingUser.email ?? user.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingUserId === user.id ? (
                    <Select
                      value={editingUser.role ?? user.role}
                      onChange={() => setEditingUser({ ...editingUser, role: editingUser.role })}>
                      <Select.Option value="USER">USER</Select.Option>
                      <Select.Option value="ADMIN">ADMIN</Select.Option>
                    </Select>
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  <ButtonsContainer>
                    {editingUserId === user.id ? (
                      <>
                        <Button onClick={() => handleUpdateUser(user.id)}>Save</Button>
                        <Button onClick={() => setEditingUserId(null)}>Cancel</Button>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </ButtonsContainer>
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
          <label>
            Price
            <Input
              placeholder="Price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            />
          </label>
          <Input
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
          />
          <label>
            Category
            <Select
              value={newProduct.category}
              onChange={() => setNewProduct({ ...newProduct, category: newProduct.category })}>
              <Select.Option value="keyboard">keyboard</Select.Option>
              <Select.Option value="mouse">mouse</Select.Option>
              <Select.Option value="headset">headset</Select.Option>
              <Select.Option value="controller">controller</Select.Option>
              <Select.Option value="other">other</Select.Option>
            </Select>
          </label>
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
            {productsData?.products.items.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  {editingProductId === product.id ? (
                    <Input
                      value={editingProduct.name ?? product.name}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, name: e.target.value })
                      }
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {editingProductId === product.id ? (
                    <Input
                      value={editingProduct.description ?? product.description}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, description: e.target.value })
                      }
                    />
                  ) : (
                    product.description
                  )}
                </td>
                <td>
                  {editingProductId === product.id ? (
                    <Input
                      type="number"
                      value={editingProduct.price ?? product.price}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })
                      }
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td>
                  {editingProductId === product.id ? (
                    <Select
                      value={editingProduct.category ?? product.category}
                      onChange={() =>
                        setEditingProduct({ ...editingProduct, category: editingProduct.category })
                      }>
                      <Select.Option value="keyboard">keyboard</Select.Option>
                      <Select.Option value="mouse">mouse</Select.Option>
                      <Select.Option value="headset">headset</Select.Option>
                      <Select.Option value="controller">controller</Select.Option>
                      <Select.Option value="other">other</Select.Option>
                    </Select>
                  ) : (
                    product.category
                  )}
                </td>
                <td>
                  <ButtonsContainer>
                    {editingProductId === product.id ? (
                      <>
                        <Button onClick={() => handleUpdateProduct(product.id)}>Save</Button>
                        <Button onClick={() => setEditingProductId(null)}>Cancel</Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => {
                            setEditingProductId(product.id);
                            setEditingProduct({
                              name: product.name,
                              description: product.description,
                              price: product.price,
                              category: product.category,
                            });
                          }}>
                          Edit
                        </Button>
                        <Button onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                      </>
                    )}
                  </ButtonsContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
    </Container>
  );
}
