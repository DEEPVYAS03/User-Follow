import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, Stack, Heading, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      setToken(res.data);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Box bg="gray.900" p="6" mt="6" borderRadius="md" boxShadow="lg">
            <Heading as="h1" mb="6" textAlign="center" color="teal.300">Login</Heading>
            {error && (
              <Text color="red.500" mb="4" textAlign="center">{error}</Text>
            )}
            <form onSubmit={handleSubmit}>
              <Stack spacing="4">
                <FormControl>
                  <FormLabel color="teal.300">Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    color="white"
                    bg="gray.800"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color="teal.300">Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    color="white"
                    bg="gray.800"
                  />
                </FormControl>
                <Button type="submit" colorScheme="teal" size="lg" width="full">Login</Button>
              </Stack>
            </form>
          </Box>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
