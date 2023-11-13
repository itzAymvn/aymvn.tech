const AboutCard = (props) => {
    return (
        <div className="data-card" data-aos="flip-left">
            <div className="icon">
                <i className={props.iconClassName}></i>
            </div>
            <div className="info">
                <h3>{props.cardTitle}</h3>
                <p>
                    {props.type === "email" ? (
                        <a
                            href={"mailto:" + props.cardContent}
                            style={{ color: "inherit" }}
                        >
                            {props.cardContent}
                        </a>
                    ) : (
                        props.cardContent
                    )}
                </p>
            </div>
        </div>
    );
};

export default AboutCard;
