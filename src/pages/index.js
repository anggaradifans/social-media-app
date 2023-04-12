import { useState, useEffect } from "react";
import Link from "next/link";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users from your API
    const fetchUsers = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="px-10 md:px-48">
      <h1>User List</h1>
      <table className="mt-10 w-full border border-neutral40 text-sm">
        <thead className="text-neutral200 bg-neutral20 border-b border-neutral40">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Location</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-neutral40 last:border-b-0"
            >
              <td className="p-4">
                <Link className="text-blue-600" href={`/user/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{`${user.address?.street} ${user.address?.suite}, ${user.address?.city}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
