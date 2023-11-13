const SocialCard = (props) => {
    return (
        <div className="data-card" data-aos="flip-left">
            <div className="icon">
                <i className={props.SocialIcon}></i>
            </div>
            <div className="info">
                <h3>{props.SocialName}</h3>
                <p>
                    {props.SocialTitle}
                    <a
                        target="”_blank”"
                        rel="noreferrer"
                        href={props.SocialLink}
                    >
                        here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SocialCard;
