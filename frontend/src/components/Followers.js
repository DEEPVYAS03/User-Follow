import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Heading, Button, Flex } from '@chakra-ui/react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const Followers = () => {
  const [followers, setFollowers] = useState([]);
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/follow/followers/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFollowers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) {
      fetchFollowers();
    }
  }, [token, user]);

  const handleRemoveFollower = async (followerId) => {
    try {
      await axios.delete(`http://localhost:5000/api/follow/remove-follower/${followerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update the followers list to remove the follower
      setFollowers(prevFollowers => prevFollowers.filter(f => f._id !== followerId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Box bg="gray.900" p="6" mt="6" borderRadius="md" boxShadow="lg">
        <Heading as="h1" mb="6" textAlign="center" color="teal.300">Followers</Heading>
        <Row>
          {followers.map((follower) => (
            <Col md={4} key={follower._id}>
              <Card bg="dark" text="white" className="mb-3" style={{ border: '1px solid teal' }}>
                <Card.Body>
                  <Card.Title>{follower.username}</Card.Title>
                  <Card.Text>{follower.email}</Card.Text>
                  <Flex justify="center">
                    <Button
                      variant="outline-danger"
                      border="1px solid white"
                      color="white"
                      _hover={{ bg: 'red.500', borderColor: 'red.500' }}
                      mt="3"
                      ml="2"
                      onClick={() => handleRemoveFollower(follower._id)}
                    >
                      Remove
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

export default Followers;
