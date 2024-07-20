import { serialize } from 'cookie'

export default async function hello(req, res) {
  let Cred = null;
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const email = req.body.email
  const password = req.body.password
  try {
    Cred = await VaidateUserandPassword(email, password); // Await the promise>
    if (Cred) {
      res.status(200).json({ Cred: Cred , valid : true });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
  console.log(Cred)


}

function VaidateUserandPassword(email, password) {
  return fetch('http://127.0.0.1:223/userpass')
    .then(res => res.json())
    .then(data => {
      const validCredentials = data.filter(elem => elem.email === email && elem.password === password);
      console.log(validCredentials); // Log the valid credentials
      return validCredentials[0];
    })
    .catch(error => console.error('Error:', error)); // Handle any errors
}