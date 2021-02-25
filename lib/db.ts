import mysql from 'serverless-mysql'

export const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  },
})

export async function query(
  q: string,
  values: (string | number)[] | string | number = []
) {
  try {
    const results: any = await db.query(q, values)
    await db.end()
    return results
  } catch (e) {
    throw Error(e.message)
  }
}
export async function queryExamp(
  q: string,
  values: (string | number)[] | string | number = []
) {
  try {
    const results: any = await db.query(q, values)
    await db.end()
    return results[0]
  } catch (e) {
    throw Error(e.message)
  }
}