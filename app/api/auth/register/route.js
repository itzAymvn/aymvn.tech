import User from "@/models/user";
import connectToDatabase from "@/utils/dbConnect";

function sendResponse(status, body) {
    return new Response(JSON.stringify(body), {
        headers: { "content-type": "application/json" },
        status: status,
    });
}

export async function POST(request) {
    const data = await request.json();
    const { name, email, password } = data;

    // validate data
    if (!name || !email || !password) {
        return sendResponse(400, { message: "Please enter all fields" });
    }

    // validate password
    if (password.length < 6) {
        return sendResponse(
            400,
            "Password should be at least 6 characters long"
        );
    }

    // Connect
    await connectToDatabase();

    // Check if user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
        return sendResponse(400, {
            message: "This email is already registered",
        });
    }

    // Create user
    const user = new User({
        name,
        email,
        password: password,
    });

    // Save user
    if (!(await user.save())) {
        return sendResponse(500, {
            message: "There was a problem registering the user",
        });
    }

    return sendResponse(201, { message: "The user has been created" });
}

// function handler() {
//     return sendResponse(200, { message: "Hello from the register route" });
// }

// export { handler as GET, handler as POST };
