import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(u => <li key={u.id}>{u.name} - {u.email}</li>)}
      </ul>
    </div>
  );
}

export default App;
