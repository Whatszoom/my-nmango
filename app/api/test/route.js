import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mydb");

    const data = await db.collection("test").find({}).toArray();

    return Response.json(data);
  } catch (error) {
    return Response.json([]);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("mydb");

    await db.collection("test").insertOne(body);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false });
  }
}
