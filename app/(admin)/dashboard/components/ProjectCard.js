import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ProjectCard = ({ project, projects, setProjects }) => {
    const [editMode, setEditMode] = useState(false);

    const [title, setTitle] = useState(project.Title);
    const [desc, setDesc] = useState(project.Desc);
    const [link, setLink] = useState(project.Link);
    const [github, setGithub] = useState(project.Github);
    const [image, setImage] = useState(project.Image);

    const handleUpdate = async () => {
        const data = {
            Title: title,
            Desc: desc,
            Link: link,
            Github: github,
            Image: image,
        };

        const res = await axios.put(
            process.env.NEXT_PUBLIC_BASE_URL + "/api/projects/" + project.id,
            data
        );

        if (res.status === 200) {
            setTitle(res.data.project.Title);
            setDesc(res.data.project.Desc);
            setLink(res.data.project.Link);
            setGithub(res.data.project.Github);

            // now we need to update dom
            // we can do this by using the spread operator

            setProjects((prev) => {
                return prev.map((p) => {
                    if (p.id === project.id) {
                        return res.data.project;
                    } else {
                        return p;
                    }
                });
            });

            Swal.fire({
                icon: "success",
                title: "Success",
                text: res.data.message,
            });

            setEditMode(false);
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: res.data.message,
            });
        }
    };

    return (
        <div className="card" key={project.id}>
            {/* <ToastContainer /> */}
            {editMode ? (
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="desc"
                            rows="3"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="link" className="form-label">
                            Link
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="github" className="form-label">
                            Github
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="github"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            Image
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                </div>
            ) : (
                <>
                    <h5 className="card-header">{project.Title}</h5>
                    <div className="card-body">
                        <p className="card-text">{project.Desc}</p>
                        <p className="card-text">{project.Link}</p>
                        <p className="card-text">{project.Github}</p>
                        <p className="card-text">{project.Image}</p>
                    </div>
                </>
            )}
            <div className="card-footer d-flex justify-content-end gap-1">
                {editMode && (
                    <button className="btn btn-success" onClick={handleUpdate}>
                        <i className="fas fa-check"></i>
                    </button>
                )}

                {editMode ? (
                    <button
                        className="btn btn-danger"
                        onClick={() => setEditMode(false)}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                ) : (
                    <button
                        className="btn btn-primary"
                        onClick={() => setEditMode(true)}
                    >
                        <i className="fas fa-edit"></i>
                    </button>
                )}
                <button className="btn btn-danger">
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
    );
};

export default ProjectCard;
