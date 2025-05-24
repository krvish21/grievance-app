import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message } = req.body;

  const { data, error } = await supabase
    .from('grievances')
    .insert([{ message }]);

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ message: 'Failed to submit grievance' });
  }

  res.status(200).json({ message: 'Grievance submitted' });
}
