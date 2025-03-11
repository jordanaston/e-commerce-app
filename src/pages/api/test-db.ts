import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongoose";

export default async function testDb(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    res.status(200).json({ message: "Database connected!" });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Failed to connect to database" });
  }
}
