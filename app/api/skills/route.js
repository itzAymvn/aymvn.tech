import { connectToDatabase } from "@/utils/dbConnect";
import skill from "@/models/skill";

export async function GET() {
    await connectToDatabase();

    const skills = await skill.find({});

    return new Response(JSON.stringify(skills), {
        headers: { "content-type": "application/json" },
    });
}

export const revalidate = 10;
