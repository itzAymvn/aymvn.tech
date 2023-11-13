const SkillCard = ({ skill }) => {
    return (
        <div className="skill">
            <i className={`skill-icon ${skill.icon}`} data-aos="fade-right"></i>
            <div data-aos="fade-left">
                <div className="skill-title">{skill.name}</div>
                <div className="skill-bar">
                    <div className="skill-progress">
                        <div className="skill-percentage">
                            {skill.percentage}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillCard;
