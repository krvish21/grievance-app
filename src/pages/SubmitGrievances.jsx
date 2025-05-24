import { useState } from 'react';
import axios from 'axios';

export default function SubmitGrievance() {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    await axios.post('/api/submit-grievance', { message: text });
    setSubmitted(true);
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-12 bg-pink-100 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Tell me what's wrong 💌</h1>
      {submitted ? (
        <p className="text-green-600">Got it! I’ll look into it soon 🐻</p>
      ) : (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 p-2 border rounded-lg"
            placeholder="Type your grievance here..."
          />
          <button
            onClick={handleSubmit}
            className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
}
