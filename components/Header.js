import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "@/styles/Header.css";

const Header = () => {
    const localStorage_Theme =
        typeof window !== "undefined" && localStorage.getItem("theme");
    const [theme, setTheme] = useState(localStorage_Theme || "dark");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        if (theme === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [theme]);
    return (
        <header>
            <a href="#main" className="logo" title="Aymvn Portfolio">
                Aymvn
            </a>
            <nav className="navigation">
                <div className="nav-links d-none d-md-flex">
                    <a href="#socials" title="View my social media accounts">
                        <i className="navbar-icon fas fa-user-friends"></i>
                        Social
                    </a>
                    <a href="#infos" title="Know more about me">
                        <i className="navbar-icon fas fa-info-circle"></i>
                        About me
                    </a>
                    <a href="#skills" title="View my skills">
                        <i className="navbar-icon fas fa-code"></i>
                        Skills
                    </a>
                    <a href="#projects" title="Check some of my work">
                        <i className="navbar-icon fas fa-project-diagram"></i>
                        Projects
                    </a>
                    <a href="#contact" title="Send me an Email">
                        <i className="navbar-icon fas fa-envelope"></i>
                        Contact
                    </a>
                </div>

                <div className="darkmode-toggle">
                    {theme === "light" && (
                        <i
                            className="fas fa-sun"
                            onClick={() => setTheme("dark")}
                        ></i>
                    )}

                    {theme === "dark" && (
                        <i
                            className="fas fa-moon"
                            onClick={() => setTheme("light")}
                        ></i>
                    )}
                </div>

                <Dropdown data-bs-theme={theme} id="dropdown">
                    <Dropdown.Toggle
                        id="menu-toggle"
                        className="d-block d-md-none menu-toggle"
                    >
                        <i className="fas fa-bars"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#socials">
                            <i className="navbar-icon fas fa-user-friends"></i>{" "}
                            Social links
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#infos">
                            <i className="navbar-icon fas fa-info-circle"></i>{" "}
                            Information
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#skills">
                            <i className="navbar-icon fas fa-code"></i> Skills
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#projects">
                            <i className="navbar-icon fas fa-project-diagram"></i>{" "}
                            Projects
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#contact">
                            <i className="navbar-icon fas fa-envelope"></i>{" "}
                            Contact
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </nav>
        </header>
    );
};

export default Header;
