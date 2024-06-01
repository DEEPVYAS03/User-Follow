import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Heading, Button, Flex } from '@chakra-ui/react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const Following = () => {
  const [following, setFollowing] = useState([]);
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/follow/following/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFollowing(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) {
      fetchFollowing();
    }
  }, [token, user]);

  const handleUnfollow = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/follow/unfollow/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update the following list to remove the unfollowed user
      setFollowing(prevFollowing => prevFollowing.filter(f => f._id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Box bg="gray.900" p="6" mt="6" borderRadius="md" boxShadow="lg">
        <Heading as="h1" mb="6" textAlign="center" color="teal.300">Following</Heading>
        <Row>
          {following.map((user) => (
            <Col md={4} key={user._id}>
              <Card bg="dark" text="white" className="mb-3" style={{ border: '1px solid teal' }}>
                <Card.Body>
                  <Card.Title>{user.username}</Card.Title>
                  <Card.Text>{user.email}</Card.Text>
                  <Flex justify="center">
                    <Button
                      variant="outline-danger"
                      border="1px solid white"
                      color="white"
                      _hover={{ bg: 'red.500', borderColor: 'red.500' }}
                      mt="3"
                      onClick={() => handleUnfollow(user._id)}
                    >
                      Unfollow
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

export default Following;
