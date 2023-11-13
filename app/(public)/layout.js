import { Poppins } from "next/font/google"
import "bootstrap/dist/css/bootstrap.min.css"
import "@/lib/fontawesome/css/all.min.css"

const poppins = Poppins({
	weight: ["100", "300", "400", "500", "700", "900"],
	subsets: ["latin"],
})

export const metadata = {
	title: "Aymvn - Fullstack Web Developer",
	description:
		"Welcome to Aymvn's portfolio website. I'm Ayman, a passionate 21-year-old fullstack web developer from Morocco. I love creating dynamic and user-friendly web applications that provide meaningful experiences. Explore my projects and skills in web development and feel free to contact me.",
	keywords: [
		"Aymvn",
		"Aymvn Portfolio",
		"Aymvn Web Developer",
		"Aymvn Web Development",
		"Aymvn Web Application",
		"Aymvn Fullstack Web Developer",
		"Ayman Badouzi",
		"Fullstack Web Developer",
		"Web Developer Morocco",
		"Web Development Portfolio",
		"JavaScript",
		"React",
		"Node.js",
		"HTML",
		"CSS",
		"MongoDB",
		"Express.js",
		"Next.js",
		"Tailwind CSS",
		"Bootstrap",
		"Web Application",
		"Responsive Design",
		"Frontend Development",
		"Backend Development",
		"MERN Stack",
		"Personal Projects",
		"Freelance Web Developer",
	],

	// Open Graph
	og: {
		type: "website",
		url: "https://aymvn.com",
		title: "Aymvn - Fullstack Web Developer",
		description:
			"Welcome to Aymvn's portfolio website. I'm Ayman, a passionate 21-year-old fullstack web developer from Morocco. I love creating dynamic and user-friendly web applications that provide meaningful experiences. Explore my projects and skills in web development and feel free to contact me.",
		image: `${process.env.NEXT_PUBLIC_BASE_URL}/images/og-image.png`,
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={poppins.className}>{children}</body>
		</html>
	)
}
