import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/submit-grievance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (res.ok) {
      setSubmitted(true);
      setMessage('');
    } else {
      setError('Something went wrong! 😓');
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-pink-600 mb-4">💌 Submit Your Grievance</h1>
        {submitted ? (
          <div className="text-green-600 font-medium">Thanks love! I'll look into it 😘</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me what's wrong ❤️"
              className="p-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-300 resize-none h-32"
              required
            />
            <button
              type="submit"
              className="bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-600 transition"
            >
              Submit
            </button>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
