// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { serialize } from 'cookie'

export default function hello(req, res) {
  res.status(200).json({ name: "John Doe" });
}
