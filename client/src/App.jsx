import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users/")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .then((data)=> console.log(data));
  }, []);

  return (
    <div className="div">
      <h1>Hello MERN</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
