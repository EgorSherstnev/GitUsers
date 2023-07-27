import React, { useState } from "react";
import axios from "axios";

function UserSearch() {
   const [searchQuery, setSearchQuery] = useState('');
   const [users, setUsers] = useState([]);

   const handleSearch = async() => {
      try {
         const response = await axios.get(`https://api.github.com/search/users?q=${searchQuery}`)
         setUsers(response.data.items);
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <div>
         <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
         <button onClick={handleSearch}>Поиск</button>
         {users.map(user => (
            <div key={user.id}>
               <a href={`/user/${user.login}`}>{user.login}</a>
               <p>Репозитории: {user.public_repos}</p>
            </div>
         ))}
      </div>
   )
}

export default UserSearch;