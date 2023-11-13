import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/utils/dbConnect";

export const authOptions = {
    session: {
        strategy: "jwt", // Jest JSON Web Token (Session)
    },

    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const { email, password } = credentials;

                // validate data
                if (!email || !password) {
                    throw new Error("Please enter all fields");
                }

                // validate password
                if (password.length < 6) {
                    throw new Error(
                        "Password should be at least 6 characters long"
                    );
                }

                // validate email
                if (!/\S+@\S+\.\S+/.test(email)) {
                    throw new Error("Please enter a valid email");
                }

                // connect to database
                await connectToDatabase();

                // find user
                const user = await User.findOne({ email });

                // Check if user exists
                if (!user) {
                    throw new Error("Invalid email or password");
                }

                // Check if password is correct
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    throw new Error("Invalid email or password");
                }

                // return user
                return user;
            },
        }),
    ],
    pages: {
        signIn: "/dashboard/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user);
            return token;
        },
        async session({ session, token }) {
            session.user.createdAt = token.user.createdAt;

            const currentDate = new Date();
            const createdAt = new Date(token.user.createdAt);

            // Calculate the time difference in milliseconds
            const timeDiffMs = currentDate - createdAt;

            // Calculate the time difference in days, months, and years
            const millisecondsPerDay = 1000 * 60 * 60 * 24;
            const days = Math.floor(timeDiffMs / millisecondsPerDay);
            const months = Math.floor(days / 30);
            const years = Math.floor(days / 365);

            let accountAge;

            if (years >= 1) {
                const remainingMonths = months % 12;
                const remainingDays = (days % 365) % 30;
                accountAge = `${years} year${years > 1 ? "s" : ""}`;
                if (remainingMonths > 0) {
                    accountAge += ` ${remainingMonths} month${
                        remainingMonths > 1 ? "s" : ""
                    }`;
                }
                if (remainingDays > 0) {
                    accountAge += ` ${remainingDays} day${
                        remainingDays > 1 ? "s" : ""
                    }`;
                }
            } else if (months >= 1) {
                const remainingDays = days % 30;
                accountAge = `${months} month${months > 1 ? "s" : ""}`;
                if (remainingDays > 0) {
                    accountAge += ` ${remainingDays} day${
                        remainingDays > 1 ? "s" : ""
                    }`;
                }
            } else {
                accountAge = `${days} day${days > 1 ? "s" : ""}`;
            }

            session.user.accountAge = accountAge;

            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};

const Handler = NextAuth(authOptions);

export { Handler as GET, Handler as POST };
