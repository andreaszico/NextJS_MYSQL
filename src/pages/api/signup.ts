import { NextApiHandler } from "next";
import Filter from "bad-words";
import { query } from "@/lib/db";
import { hash } from "bcrypt";

const filter = new Filter();

const signup: NextApiHandler = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (req.method === "POST") {
      if (!password || !name || !email) {
        return res.status(400).json({
          message: "all required",
          name: name,
          email: email,
          password: password,
        });
      }

      hash(password, 10, async function (err, hash) {
        await query(
          `
              INSERT INTO person (name, email, password) VALUES (?, ?, ?) 
              `,
          [filter.clean(name), email, hash]
        );

        const results2 = await query(
          `
        SELECT * FROM person     
        `,
          [filter.clean(name), email, password]
        );

        return res.json(results2);
      });
    } else {
      return res.status(405).json({ message: "We only support POST" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default signup;
