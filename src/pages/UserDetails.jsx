import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserDetails() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchUserDetails();
  }, [username]);
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h2>{user.login}</h2>
      <p>Name: {user.name}</p>
      <p>Location: {user.location}</p>
      <p>Public Repositories: {user.public_repos}</p>
      <p>Followers: {user.followers}</p>
    </div>
  );
}

export default UserDetails;
