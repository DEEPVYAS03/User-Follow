import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Heading, Button, Input, Flex } from '@chakra-ui/react';
import { Container, Card, Row, Col, Form } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { token, user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const followingRes = await axios.get(`http://localhost:5000/api/follow/following/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const followingIds = followingRes.data.map(followingUser => followingUser._id);
        setUsers(res.data
          .filter(u => u._id !== user._id)
          .map(u => ({ ...u, isFollowing: followingIds.includes(u._id) }))
        );
      } catch (err) {
        console.error(err);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [token, user]);

  const handleSearch = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/search', 
        { q: searchQuery },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(res.data.filter(u => u._id !== user._id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleFollow = async (userId, isFollowing) => {
    try {
      if (isFollowing) {
        await axios.delete(`http://localhost:5000/api/follow/unfollow/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`http://localhost:5000/api/follow/follow/${userId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      // Update the users list to reflect follow/unfollow changes
      setUsers(prevUsers => 
        prevUsers.map(u => 
          u._id === userId ? { ...u, isFollowing: !isFollowing } : u
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Box bg="gray.900" p="6" mt="6" borderRadius="md" boxShadow="lg">
        <Heading as="h1" mb="6" textAlign="center" color="teal.300">Users</Heading>
        <Form inline className="mb-3">
          <Flex align="center" justify="center">
            <Input
              type="text"
              placeholder="Search users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              color="white"
              bg="gray.800"
              className="mr-sm-2"
              width="300px"
            />
            <Button onClick={handleSearch} colorScheme="teal" ml="2">Search</Button>
          </Flex>
        </Form>
        <Row>
          {users.map((user) => (
            <Col md={4} key={user._id}>
              <Card bg="dark" text="white" className="mb-3" style={{ border: '1px solid teal' }}>
                <Card.Body>
                  <Card.Title>{user.username}</Card.Title>
                  <Card.Text>{user.email}</Card.Text>
                  <Flex justify="center">
                    <Button
                      variant={user.isFollowing ? 'outline-danger' : 'outline-success'}
                      border="1px solid white"
                      color="white"
                      _hover={{ bg: user.isFollowing ? 'red.500' : 'teal.500', borderColor: user.isFollowing ? 'red.500' : 'teal.500' }}
                      mt="3"
                      onClick={() => handleFollow(user._id, user.isFollowing)}
                    >
                      {user.isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                  </Flex>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Box>
    </Container>
  );
};

export default Home;
