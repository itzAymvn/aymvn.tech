import "@/styles/About.css";

import AboutCard from "@/components/Cards/AboutCard";

const About = () => {
    const getAge = (dateString) => {
        let today = new Date();
        let birthDate = new Date(dateString);

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();
        let daysRemaining = 30 - birthDate.getDate();

        // Adjust for negative values or incomplete months
        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }

        return {
            years,
            months,
            days,
            daysRemaining,
        };
    };

    return (
        <section className="infos" id="infos">
            <h2 className="title">
                {" "}
                <i className="navbar-icon fas fa-info-circle"></i>
                About me
            </h2>
            <div className="content">
                <AboutCard
                    iconClassName="fas fa-user"
                    cardTitle="Name"
                    cardContent="My name is Ayman"
                />
                <AboutCard
                    iconClassName="fa fa-birthday-cake"
                    cardTitle="Age"
                    cardContent={`${getAge("2002/07/06").years} years old`}
                />
                <AboutCard
                    iconClassName="fas fa-map-marker-alt"
                    cardTitle="Location"
                    cardContent="Morocco"
                />
                <AboutCard
                    iconClassName="fa fa-envelope"
                    cardTitle="Email"
                    cardContent="aymanbdouzi@gmail.com"
                    type="email"
                />
            </div>
        </section>
    );
};

export default About;
