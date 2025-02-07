const cors = require("cors");

const corsOptions = {
    origin: "*",
    methods: "GET",
    allowedHeaders: ["Content-Type"]
};

module.exports = cors(corsOptions);
