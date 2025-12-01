export default async function handler(req, res) {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const [login, domain] = email.split("@");
  const inboxRes = await fetch(
    `https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`
  );
  const messages = await inboxRes.json();
  res.status(200).json({ messages });
}
