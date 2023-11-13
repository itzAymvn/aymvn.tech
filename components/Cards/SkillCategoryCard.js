import React from "react";
import SkillCard from "@/components/Cards/SkillCard";

const SkillCategoryCard = (skillCategory) => {
    return (
        <div className="category">
            <h3 className="category-title">
                {skillCategory.skillCategory.category}
            </h3>
            <div className="skills-list">
                {skillCategory.skillCategory.skills.map((skill, i) => {
                    return <SkillCard skill={skill} key={i} />;
                })}
            </div>
        </div>
    );
};

export default SkillCategoryCard;
