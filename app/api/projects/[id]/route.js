import project from "@/models/project";
import { getServerSession } from "next-auth";
import connectToDatabase from "@/utils/dbConnect";

export async function PUT(request, { params }) {
    const id = params.id;
    const data = await request.json();

    // Check if user is logged in
    const session = await getServerSession({ req: request });

    if (!session) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
            headers: { "content-type": "application/json" },
            status: 401,
        });
    }

    // Connect
    await connectToDatabase();

    // Check if project exists
    const projectExist = await project.findOne({ id: id });

    if (!projectExist) {
        return new Response(JSON.stringify({ message: "Project not found" }), {
            headers: { "content-type": "application/json" },
            status: 404,
        });
    }

    // Update project
    const updatedProject = await projectExist.updateOne({
        Title: data.Title,
        Desc: data.Desc,
        Link: data.Link,
        Github: data.Github,
        Image: data.Image,
    });

    if (!updatedProject) {
        return new Response(
            JSON.stringify({ message: "There was a problem updating project" }),
            {
                headers: { "content-type": "application/json" },
                status: 500,
            }
        );
    }

    return new Response(
        JSON.stringify({ message: "Project has been updated", project: data }),
        {
            headers: { "content-type": "application/json" },
            status: 200,
        }
    );
}
