import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    axios.get('/api/get-grievances').then(res => setGrievances(res.data));
  }, []);

  const handleResponse = async (id, response) => {
    await axios.post('/api/respond-grievance', { id, response });
    alert('Response sent 💖');
  };

  return (
    <div className="p-4 max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Grievances Inbox 📬</h2>
      {grievances.map(g => (
        <div key={g.id} className="bg-white p-4 shadow rounded-xl mb-4">
          <p className="text-gray-800">{g.message}</p>
          <input
            className="border mt-2 p-1 w-full"
            placeholder="Your sweet response..."
            onBlur={(e) => handleResponse(g.id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
