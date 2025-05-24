import { createClient } from '@supabase/supabase-js';
import { resend } from 'resend'; // example notification

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  const { message } = req.body;
  const { data, error } = await supabase.from('grievances').insert([{ message }]);

  if (error) return res.status(500).json({ error });

  // Notify via email (use Resend or EmailJS here)
  await resend.emails.send({
    from: 'grievances@yourdomain.com',
    to: 'you@example.com',
    subject: 'New Grievance Submitted',
    html: `<p>${message}</p>`,
  });

  res.status(200).json({ success: true });
}
