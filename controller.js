const axios = require("axios");
const { isPrime, isPerfect, isArmstrong, digitSum } = require("./numberService");

exports.classifyNumber = async (req, res) => {
    const { number } = req.query;
    const num = Number(number);

    if (isNaN(num) || !Number.isInteger(num)) {
        return res.status(400).json({ number, error: true });
    }

    const properties = [];
    if (isArmstrong(num)) properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");

    try {
        const funFactResponse = await axios.get(`http://numbersapi.com/${num}/math?json`);
        const funFact = funFactResponse.data.text;

        res.json({
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfect(num),
            properties,
            digit_sum: digitSum(num),
            fun_fact: funFact
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch fun fact" });
    }
};
