import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, Stack, Heading, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { Container, Row, Col } from 'react-bootstrap';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', { username, email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error registering');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Box bg="gray.900" p="6" mt="6" borderRadius="md" boxShadow="lg">
            <Heading as="h1" mb="6" textAlign="center" color="teal.300">Register</Heading>
            {error && (
              <Text color="red.500" mb="4" textAlign="center">{error}</Text>
            )}
            <form onSubmit={handleSubmit}>
              <Stack spacing="4">
                <FormControl>
                  <FormLabel color="teal.300">Username</FormLabel>
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    color="white"
                    bg="gray.800"
                  />
                </FormControl>
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
                <Button type="submit" colorScheme="teal" size="lg" width="full">Register</Button>
              </Stack>
            </form>
          </Box>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
