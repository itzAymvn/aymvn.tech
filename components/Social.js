import "@/styles/Social.css";

import SocialCard from "@/components/Cards/SocialCard";

const Social = () => {
    return (
        <section className="social" id="socials">
            <h2 className="title">
                {" "}
                <i className="navbar-icon fas fa-user-friends"></i>
                Socials
            </h2>
            <div className="content">
                <SocialCard
                    SocialIcon="fab fa-facebook"
                    SocialName="Facebook"
                    SocialTitle="You can find me "
                    SocialLink="https://www.facebook.com/itzaymvn/"
                />
                <SocialCard
                    SocialIcon="fab fa-twitter"
                    SocialName="Twitter"
                    SocialTitle="You can find me "
                    SocialLink="https://twitter.com/itzaymvn"
                />
                <SocialCard
                    SocialIcon="fab fa-instagram"
                    SocialName="Instagram"
                    SocialTitle="You can find me "
                    SocialLink="https://www.instagram.com/itzaymvn/"
                />
                <SocialCard
                    SocialIcon="fab fa-github"
                    SocialName="Github"
                    SocialTitle="You can find me "
                    SocialLink="https://github.com/itzAymvn"
                />
                <SocialCard
                    SocialIcon="fab fa-discord"
                    SocialName="Discord"
                    SocialTitle="You can find me "
                    SocialLink="https://discord.com/users/706788662314008577"
                />
            </div>
        </section>
    );
};

export default Social;
