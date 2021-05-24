import { useEffect, useState } from "react";

function useFetch(link) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async function () {
      await fetch(link).then((res) => res.json().then((data) => setData(data)));
      setLoading(false);
    })();
  }, []);
  return [data, loading];
}

function DataRow({ info }) {
  const { name, email, body } = info;
  console.log(name);
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{body}</td>
    </tr>
  );
}

function PostTable() {
  const [data, loading] = useFetch(
    "https://jsonplaceholder.typicode.com/comments?_limit=10"
  );
  if (loading) return "Chargement...";
  return (
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Commentaire</th>
        </tr>
      </thead>
      <tbody>
        {data.map((com) => (
          <DataRow key={com.id} info={com} />
        ))}
      </tbody>
    </table>
  );
}

function App() {
  return (
    <div className="App">
      <PostTable />
    </div>
  );
}
export default App;
