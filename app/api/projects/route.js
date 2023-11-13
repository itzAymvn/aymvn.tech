import { connectToDatabase } from "@/utils/dbConnect";
import project from "@/models/project";

export async function GET() {
    await connectToDatabase();

    const projects = await project.find({});

    return new Response(JSON.stringify(projects), {
        headers: { "content-type": "application/json" },
    });
}

export async function POST(request) {
    const body = await request.json();
    const { Title, Desc, Link, Github, Image } = body;

    // validate data
    if (!Title || !Desc || !Link || !Github || !Image) {
        return new Response(
            JSON.stringify({ error: "Please enter all fields" }),
            {
                headers: { "content-type": "application/json" },
            }
        );
    }

    // connect to database
    await connectToDatabase();

    // create project
    const newProject = new project({
        Title,
        Desc,
        Link,
        Github,
        Image,
    });

    // save project
    if (await newProject.save()) {
        return new Response(
            JSON.stringify({ message: "Project created successfully" }),
            {
                headers: { "content-type": "application/json" },
            }
        );
    } else {
        return new Response(JSON.stringify({ error: "Something went wrong" }), {
            headers: { "content-type": "application/json" },
        });
    }
}

export const revalidate = 10;
