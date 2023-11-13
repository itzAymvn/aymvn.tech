"use client"
import AOS from "aos"

import "@/styles/App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "aos/dist/aos.css"

import Header from "@/components/Header"
import Summary from "@/components/Summary"
import Social from "@/components/Social"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"

import { useEffect } from "react"

export default function Home() {
	useEffect(() => {
		AOS.init({
			easing: "ease-out-cubic",
			once: true,
			offset: 100,
		})
	}, [])

	return (
		<>
			<Header />
			<Summary />
			<Social />
			<About />
			<Skills />
			<Projects />
			<Contact />
		</>
	)
}
