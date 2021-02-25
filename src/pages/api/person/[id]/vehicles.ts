import { NextApiRequest, NextApiResponse } from "next";

import { query } from "@/lib/db";

export default async function getPeople(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result: any = await query(`
      SELECT * FROM vehicle WHERE ownerId = ?
    `, req.query.id);

    return res.json(result[0]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }

  res.json("");
}
  