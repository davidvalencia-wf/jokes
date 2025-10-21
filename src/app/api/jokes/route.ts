import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/getDb";
import { jokesTable } from "@/db/schema";

type JokeInput = {
joke: string;
submitter: string;
rating: number;
date: string;
};

export async function POST(request: NextRequest) {
const db = getDb();
const { joke, submitter, rating, date }: JokeInput = await request.json();
try {
    const newJoke = await db
    .insert(jokesTable)
    .values({ joke, submitter, rating, date })
    .returning();
    return NextResponse.json(newJoke[0], { status: 201 });
} catch (error) {
    return NextResponse.json({ error: "Failed to create joke" }, { status: 500 });
}
}


export async function GET(request: NextRequest) {
    const db = getDb();
    try {
      const jokes = await db.select().from(jokesTable);
      return NextResponse.json(jokes, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch jokes" },
        { status: 500 }
      );
    }
  }
  