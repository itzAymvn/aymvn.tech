const getAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Check if the birth date has not occurred yet this month
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
        years--;
        months += 12;
    }

    // Check if the birth date has already occurred this month but today is before the birth date
    if (months === 0 && days < 0) {
        years--;
        months = 11;
        const previousMonthDate = new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            birthDate.getDate()
        );
        days = Math.floor((today - previousMonthDate) / (1000 * 60 * 60 * 24));
    }

    // Calculate the number of days until the next birthday
    const nextBirthday = new Date(
        today.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
    );
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysRemaining =
        Math.floor((nextBirthday - today) / (1000 * 60 * 60 * 24)) + 1;

    return {
        years,
        months,
        days,
        daysRemaining,
    };
};

export async function GET(request) {
    const age = getAge("2002-07-06");

    return new Response(
        JSON.stringify({
            full_name: "Ayman Badouzi",
            email: "aymanbdouzi@gmail.com",
            age: {
                years: age.years,
                months: age.months,
                days: age.days,
                days_remaining: age.daysRemaining,
                full: `${age.years} years, ${age.months} months, ${age.days} days`,
            },
            github: "https://github.com/itzaymvn",
        }),
        {
            headers: {
                "content-type": "application/json;charset=UTF-8",
            },

            status: 200,
        }
    );
}
