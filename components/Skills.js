import { useState, useEffect } from "react";
import axios from "axios";
import "@/styles/Skills.css";

// import skillsData from "@/data/Skills";
import SkillCategoryCard from "@/components/Cards/SkillCategoryCard";

const Skills = () => {
    const [skillsData, setSkillsData] = useState([]);
    const [error, setError] = useState({ status: false, message: "" });

    useEffect(() => {
        async function fetchSkillsData() {
            try {
                const { data } = await axios.get("/api/skills");
                setSkillsData(data);
            } catch (error) {
                setError({ status: true, message: error.message });
            }
        }

        fetchSkillsData();
    }, []);

    useEffect(() => {
        if (!skillsData.length) return; // Check if skillsData has a value

        // Get all elements with the "skill" class
        const skills = document.querySelectorAll(".skill");

        // Function to be called on "scroll" event
        function animateSkillsProgressBar() {
            // Loop through each skill
            skills.forEach((skill) => {
                // Get the skill's top and height values
                const skillTop = skill.getBoundingClientRect().top;
                const skillHeight = skill.getBoundingClientRect().height;

                // Get the skill's progress bar and percentage elements
                const skillProgress = skill.querySelector(".skill-progress");
                const skillPercentage =
                    skill.querySelector(".skill-percentage").innerText;

                // Check if the skill is within the viewport
                if (skillTop + skillHeight / 2 < window.innerHeight) {
                    // If it is, set the skill's progress bar to the skill percentage
                    skillProgress.style.transform = `translateX(${skillPercentage})`;
                } else {
                    // If it isn't, reset the progress bar to 0
                    skillProgress.style.transform = `translateX(0)`;
                }
            });
        }

        // Attach the event listener when the component is mounted
        window.addEventListener("scroll", animateSkillsProgressBar);

        // Clean up event listener when the component is unmounted
        return () => {
            window.removeEventListener("scroll", animateSkillsProgressBar);
        };
    }, [skillsData]);

    return (
        <section className="skills" id="skills">
            <h2 className="title">
                {" "}
                <i className="navbar-icon fas fa-laptop-code"></i>
                Skills
            </h2>
            <div className="content">
                {skillsData.length > 0 ? (
                    <div className="skills-container">
                        {skillsData.map((cat) => {
                            return (
                                <SkillCategoryCard
                                    skillCategory={cat}
                                    key={cat.category}
                                />
                            );
                        })}
                    </div>
                ) : error.status ? (
                    <div className="error">
                        <h5>
                            Error fetching skills data. Please try again later.
                        </h5>
                        <h5>
                            If the problem persists, please contact me at{" "}
                            <a href="mailto:aymanbdouzi@gmail.com">
                                aymanbdouzi@gmail.com
                            </a>
                        </h5>
                    </div>
                ) : (
                    <div className="skill-loading">
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

export default Skills;
