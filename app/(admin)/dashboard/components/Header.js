import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

const Header = () => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        document.body.dataset.bsTheme = theme;
    }, [theme]);

    const { data: session, status } = useSession();
    return (
        <header className="header w-100">
            <nav className="navbar navbar-expand navbar-light  shadow-sm px-3">
                <div className="container-fluid">
                    <Link
                        href="/dashboard"
                        className="navbar-brand d-flex align-items-center"
                    >
                        <i className="fas fa-home me-2"></i>
                        Dashboard
                    </Link>
                </div>
                <div id="navbarNav">
                    <ul className="navbar-nav d-flex align-items-center">
                        <>
                            <div className="d-none d-md-flex align-items-center">
                                {session?.user ? (
                                    <>
                                        <Dropdown>
                                            <Dropdown.Toggle id="dropdown-basic">
                                                <i className="fas fa-cog me-2"></i>
                                                <span>Manage</span>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Link
                                                    href="/dashboard/projects"
                                                    className="dropdown-item"
                                                >
                                                    <i className="fas fa-diagram-project me-2"></i>
                                                    Projects
                                                </Link>
                                                <Link
                                                    href="/dashboard/skills"
                                                    className="dropdown-item"
                                                >
                                                    <i className="fas fa-star me-2"></i>
                                                    Skills
                                                </Link>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <li
                                            className="nav-item"
                                            style={{ cursor: "pointer" }}
                                        >
                                            <span
                                                className="nav-link d-flex align-items-center"
                                                onClick={() => signOut()}
                                            >
                                                <i className="fas fa-sign-out-alt  me-2"></i>
                                                Logout
                                            </span>
                                        </li>
                                    </>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="nav-link d-flex align-items-center"
                                    >
                                        <i className="fas fa-sign-out-alt  me-2"></i>
                                        Login
                                    </Link>
                                )}
                                <li
                                    className="nav-item"
                                    onClick={() => {
                                        setTheme(
                                            theme === "dark" ? "light" : "dark"
                                        );
                                    }}
                                >
                                    <span className="nav-link d-flex align-items-center">
                                        {theme === "dark" ? (
                                            <i className="fas fa-sun me-2"></i>
                                        ) : (
                                            <i className="fas fa-moon me-2"></i>
                                        )}
                                    </span>
                                </li>
                            </div>
                            <div className="d-flex d-md-none">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        variant="light"
                                        id="dropdown-basic"
                                    >
                                        <i className="fas fa-user"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {session?.user ? (
                                            <>
                                                <Link
                                                    href="/dashboard/projects"
                                                    className="dropdown-item"
                                                >
                                                    <i className="fas fa-diagram-project me-2"></i>
                                                    Projects
                                                </Link>
                                                <Link
                                                    href="/dashboard/skills"
                                                    className="dropdown-item"
                                                >
                                                    <i className="fas fa-star me-2"></i>
                                                    Skills
                                                </Link>

                                                <Dropdown.Item
                                                    onClick={() => signOut()}
                                                >
                                                    <i className="fas fa-sign-out-alt  me-2"></i>
                                                    Logout
                                                </Dropdown.Item>
                                            </>
                                        ) : (
                                            <Dropdown.Item href="/login">
                                                Login
                                            </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
