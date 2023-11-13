"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

const page = () => {
    const { data: session, status } = useSession();
    return (
        <div className="p-4">
            <div className="d-flex flex-column gap-1">
                <p>
                    <i className="fas fa-user me-2"></i>
                    Welcome, {session?.user?.name || "loading..."}
                </p>
                <p>
                    <i className="fas fa-clock me-2"></i>
                    Account age: {session?.user?.accountAge || "loading..."}
                </p>
                <p>
                    <i className="fas fa-calendar me-2"></i>
                    Created at:{" "}
                    {session?.user?.createdAt
                        ? new Date(session.user.createdAt).toLocaleDateString()
                        : "loading..."}
                </p>
                <p>
                    <i className="fas fa-envelope me-2"></i>
                    Account email: {session?.user?.email || "loading..."}
                </p>
            </div>
            <div className="d-flex flex-column gap-3">
                <div className="card">
                    <h5 className="card-header">
                        <i className="fa-solid fa-diagram-project me-2"></i>
                        <span>Projects</span>
                    </h5>
                    <div className="card-body">
                        <p className="card-text">Manage your projects here.</p>
                        <Link
                            href="/dashboard/projects"
                            className="btn btn-primary"
                        >
                            <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>

                <div className="card">
                    <h5 className="card-header">
                        <i className="fa-regular fa-star me-2"></i>
                        <span>Skills</span>
                    </h5>
                    <div className="card-body">
                        <p className="card-text">Manage your skills here.</p>
                        <Link
                            href="/dashboard/skills"
                            className="btn btn-primary"
                        >
                            <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
