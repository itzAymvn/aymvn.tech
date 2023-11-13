import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req, res, next) {
    const pathname = req.nextUrl.pathname;
    const protectedPaths = [
        "/dashboard",
        "/dashboard/projects",
        "/dashboard/skills",
    ];
    if (protectedPaths.includes(pathname)) {
        const token = await getToken({ req });

        // if the token exists, continue
        if (token) {
            return NextResponse.next();
        }

        // if the token doesn't exist, redirect to login page
        const loginUrl = new URL("/login", process.env.NEXT_PUBLIC_BASE_URL);
        return NextResponse.redirect(loginUrl);
    }

    if (pathname == "/login") {
        const token = await getToken({ req });
        if (token) {
            const dashboardUrl = new URL(
                "/dashboard",
                process.env.NEXT_PUBLIC_BASE_URL
            );
            return NextResponse.redirect(dashboardUrl);
        }

        return NextResponse.next();
    }
}
