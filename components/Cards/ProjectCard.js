const ProjectCard = (props) => {
    return (
        <div className="project-card">
            <div className="image">
                <img
                    src={props.projectImage}
                    alt={props.projectImageAlt}
                    className="project-img"
                />
            </div>
            <div className="project-info">
                <div>
                    <h3 className="project-title">{props.projectTitle}</h3>
                    <p>{props.projectDesc}</p>
                </div>
                <div className="links">
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={props.projectLink}
                        className="project-link"
                    >
                        <i className="fas fa-link"></i>
                    </a>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={props.projectGithub}
                        className="project-github"
                    >
                        <i className="fab fa-github"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
