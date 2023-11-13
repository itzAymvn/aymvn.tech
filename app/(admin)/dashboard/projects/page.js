"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProjectCard from "../components/ProjectCard";
import axios from "axios";
import ProjectsLoading from "./loading";

const page = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const res = await axios.get(
                    process.env.NEXT_PUBLIC_BASE_URL + "/api/projects"
                );
                setProjects(res.data);
            } catch (error) {
                setError(error);
            }
        };
        getProjects();
    }, []);

    return (
        <div className="p-4">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link href="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Projects
                    </li>
                </ol>
            </nav>

            <div className="d-flex flex-column gap-3">
                <h4 className="d-flex justify-content-between align-items-center bg-primary text-white p-3 rounded">
                    <span>
                        <i className="fa-solid fa-diagram-project me-2"></i>
                        Projects
                    </span>

                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary disabled">
                            <i className="fas fa-plus me-2"></i>
                            New Project
                        </button>
                    </div>
                </h4>
                {projects?.length > 0 ? (
                    <div className="d-flex flex-column gap-3">
                        {projects.map((p, i) => {
                            return (
                                <ProjectCard
                                    project={p}
                                    key={i}
                                    projects={projects}
                                    setProjects={setProjects}
                                />
                            );
                        })}
                    </div>
                ) : error ? (
                    <div className="alert alert-danger">
                        <h4 className="alert-heading">Error</h4>
                        <p>{error.message}</p>
                    </div>
                ) : (
                    <ProjectsLoading />
                )}
            </div>
        </div>
    );
};

export default page;
