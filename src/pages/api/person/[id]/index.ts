import { NextApiHandler } from "next";
import Filter from "bad-words";
import { query } from "@/lib/db";

const filter = new Filter();

const handler: NextApiHandler = async (req, res) => {
  const { name, email, id } = req.body;
  try {
    if (req.method === "PUT") {
      if (!id || !name || !email) {
        return res
          .status(400)
          .json({ message: "`id`,`title`, and `content` are all required" });
      }

      const results = await query(
        `
        UPDATE person
        SET name = ?, email = ?
        WHERE id = ?
        `,
        [filter.clean(name), filter.clean(email), id]
      );

      return res.json(results);
    } else {
      const result: any = await query(
        `
              SELECT * FROM person WHERE id = ?
            `,
        req.query.id
      );
      return res.json(result[0]);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
