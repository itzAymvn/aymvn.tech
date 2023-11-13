"use client";
import React, { useState } from "react";
import axios from "axios";

function ProjectForm() {
    const [Title, setTitle] = useState("");
    const [Desc, setDescription] = useState("");
    const [Image, setImage] = useState("");
    const [Link, setLink] = useState("");
    const [Github, setGithub] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!Title || !Desc || !Image || !Link || !Github) {
            setSuccessMessage("");
            setErrorMessage("Please enter all fields");
            return;
        }

        // Validate URl function
        const validateUrl = (string) => {
            var res = string.match(/^(ftp|http|https):\/\/[^ "]+$/i);
            return res !== null;
        };

        if (!validateUrl(Image)) {
            setSuccessMessage("");
            setErrorMessage("Please enter a valid image URL");
            return;
        }

        if (!validateUrl(Link)) {
            setSuccessMessage("");
            setErrorMessage("Please enter a valid link URL");
            return;
        }

        try {
            const response = await axios.post("/api/projects", {
                Title,
                Desc,
                Image,
                Link,
                Github,
            });
            setErrorMessage("");
            setSuccessMessage(response.data.message);

            // Reset form fields
            setTitle("");
            setDescription("");
            setImage("");
            setLink("");
            setGithub("");
        } catch (error) {
            setSuccessMessage("");
            setErrorMessage(error.response.data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="m-5">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Title
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="Title"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <textarea
                    className="form-control"
                    id="description"
                    name="Desc"
                    value={Desc}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">
                    Image
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="image"
                    name="Image"
                    value={Image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="link" className="form-label">
                    Link
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="link"
                    name="Link"
                    value={Link}
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
                    name="Github"
                    value={Github}
                    onChange={(e) => setGithub(e.target.value)}
                />
            </div>

            <div className="mb-3">
                {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                )}
                {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                )}
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
}

export default ProjectForm;
