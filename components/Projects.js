import axios from "axios";
import ProjectCard from "@/components/Cards/ProjectCard";
import { Carousel } from "react-bootstrap";
import "@/styles/Projects.css";
import { useEffect, useState } from "react";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState({ status: false, message: "" });
    useEffect(() => {
        async function fetchProjectsData() {
            try {
                const { data } = await axios.get("/api/projects");
                setProjects(data);
            } catch (error) {
                setError({ status: true, message: error.message });
            }
        }

        fetchProjectsData();
    }, []);

    return (
        <section className="projects" id="projects">
            <h2 className="title">
                {" "}
                <i className="navbar-icon fas fa-project-diagram"></i>
                Projects
            </h2>
            <div className="content">
                {projects !== undefined && projects.length > 0 ? (
                    <div className="carousel">
                        <Carousel interval={2000} keyboard={true} slide={true}>
                            {projects.map((project, i) => (
                                <Carousel.Item key={i}>
                                    <ProjectCard
                                        projectImage={project.Image}
                                        projectTitle={project.Title}
                                        projectDesc={project.Desc}
                                        projectLink={project.Link}
                                        projectGithub={project.Github}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                ) : error.status ? (
                    <div className="error">
                        <h5>
                            Error fetching projects data. Please try again
                            later.
                        </h5>
                        <h5>
                            If the problem persists, please contact me at{" "}
                            <a href="mailto:aymanbdouzi@gmail.com">
                                aymanbdouzi@gmail.com
                            </a>
                        </h5>
                    </div>
                ) : (
                    <div className="projects-loading">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
