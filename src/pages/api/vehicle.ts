import { NextApiRequest, NextApiResponse } from "next";

import { query } from "@/lib/db";
import { authenticated } from './people';

export default authenticated(async function getPeople(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result: any = await query(`
      SELECT * FROM vehicle
    `);
    return res.json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
