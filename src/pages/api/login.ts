import { NextApiHandler } from "next";
import Filter from "bad-words";
import { query } from "@/lib/db";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import cookie from "cookie";

const filter = new Filter();

const signup: NextApiHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (req.method === "POST") {
      const persons = await query(
        `
            SELECT * FROM person WHERE email = ?
            `,
        email
      );
      const person = persons[0];
      
      compare(password, person.password, (err, result) => {
        if (!err && result) {
          
          const claims = {
            sub: person.id,
            myPersonName: person.email,
          };
          
          const jwt = sign(claims, "eea2b176-2b4b-4168-82bd-b40a5c880011", {
            expiresIn: "1h",
          });

          res.setHeader(
            'Set-Cookie',
            cookie.serialize("auth", jwt, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              sameSite: "strict",
              maxAge: 3600,
              path: '/'
            })
          );

          res.json({
            message: 'Welcome back!!'
          });

        } else {
          res.json({
            person: person,
            messages: "Ups, Something went wrong!",
          });
        }
      });
    } else {
      return res.status(405).json({ message: "We only support POST" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default signup;
