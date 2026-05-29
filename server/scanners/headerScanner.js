const axios = require("axios");

const checkHeaders = async (url) => {

    try {

        const response = await axios.get(url);

        const headers = response.headers;

        const securityHeaders = {

            "X-Frame-Options": headers["x-frame-options"] || "Missing",

            "Content-Security-Policy":
                headers["content-security-policy"] || "Missing",

            "Strict-Transport-Security":
                headers["strict-transport-security"] || "Missing",

            "X-Content-Type-Options":
                headers["x-content-type-options"] || "Missing"
        };

        return securityHeaders;

    } catch (error) {

        return {
            error: "Unable to scan website"
        };

    }

};

module.exports = checkHeaders;