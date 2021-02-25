import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { query } from "@/lib/db";
import { verify } from "jsonwebtoken";
import { secret } from "api/secret";

export const authenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try{
    verify(req.cookies.auth!, secret, async (err, decoded) => {
      if (!err && decoded) {
        return await fn(req,res);
      }
  
      return res.status(401).json({
        messages: 'Sorry you are not authenticateds',
      })
    });
  }catch(err){   
    return res.json({
      messages: err,
    })
  }
};

export default authenticated(async function getPeople(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await query(`
      SELECT * FROM microphone
    `);

    return res.json(result);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
