import "@/styles/Contact.css"
import emailjs from "@emailjs/browser"
import Swal from "sweetalert2"

emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)

const Contact = () => {
	const sendEmail = (e) => {
		e.preventDefault()
		let formData = new FormData(e.target)
		emailjs
			.send(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, // service ID
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, // template ID
				{
					from_name: formData.get("name"),
					email: formData.get("email"),
					message: formData.get("message"),
					from_subject: formData.get("subject"),
				}
			)
			.then((result) => {
				if (result.status === 200) {
					Swal.fire({
						icon: "success",
						title: "Message sent successfully!",
						showConfirmButton: false,
						timer: 1500,
					})

					e.target.reset()
				}
			})
			.catch((error) => {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Something went wrong! I's probably on our end, please try again later.",
				})

				console.log(error)
			})
	}
	return (
		<section className="contact" id="contact">
			<h2 className="title">
				{" "}
				<i className="navbar-icon fas fa-envelope"></i>
				Contact
			</h2>
			<div className="content">
				<div className="contactform">
					<form onSubmit={(e) => sendEmail(e)}>
						<div className="form-inputs">
							<div className="user-data">
								<input
									data-aos="zoom-in-up"
									type="text"
									name="name"
									placeholder="Your name"
									required
									autoFocus
									autoComplete="off"
								/>
								<input
									data-aos="zoom-in-up"
									type="email"
									name="email"
									placeholder="Your email"
									required
									autoComplete="off"
								/>
								<input
									data-aos="zoom-in-up"
									type="text"
									name="subject"
									placeholder="Subject"
									required
									autoComplete="off"
								/>
							</div>
							<textarea
								data-aos="zoom-in-up"
								placeholder="Your message"
								name="message"
								autoComplete="off"
								required
							></textarea>
						</div>
						<button type="submit">Send</button>
					</form>
				</div>
			</div>
		</section>
	)
}

export default Contact
