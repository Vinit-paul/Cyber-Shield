const checkHeaders = require("../scanners/headerScanner");
const scanPorts = require("../scanners/portScanner");
const Scan = require("../models/Scan");

exports.scanHeaders = async (req, res) => {

    try {

        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                message: "URL is required"
            });
        }

        const result = await checkHeaders(url);

        // Count missing headers
        let missingCount = 0;

        for (let key in result) {

            if (result[key] === "Missing") {
                missingCount++;
            }

        }

        // Risk analysis
        let riskLevel = "Low";

        if (missingCount >= 2) {
            riskLevel = "Medium";
        }

        if (missingCount >= 4) {
            riskLevel = "High";
        }

        // HTTPS Checker
        const httpsStatus = url.startsWith("https://")
            ? "Secure HTTPS"
            : "Not Secure (HTTP)";

const hostname = new URL(url).hostname;

const portData = await scanPorts(hostname);
// Vulnerability Detection
const vulnerabilities = [];

// Basic SQL Injection Pattern Detection

const sqlPatterns = [
    "'",
    "SELECT",
    "UNION",
    "DROP",
    "--",
    "INSERT",
    "DELETE",
    "UPDATE"
];

sqlPatterns.forEach(pattern => {

    if (url.toUpperCase().includes(pattern)) {

        vulnerabilities.push({
            issue: "Possible SQL Injection Pattern Detected",
            severity: "High"
        });

    }

});

// Header checks
if (result["Content-Security-Policy"] === "Missing") {

    vulnerabilities.push({
        issue: "Missing Content Security Policy",
        severity: "High"
    });

}

if (result["Strict-Transport-Security"] === "Missing") {

    vulnerabilities.push({
        issue: "Missing HSTS Header",
        severity: "Medium"
    });

}

if (result["X-Frame-Options"] === "Missing") {

    vulnerabilities.push({
        issue: "Missing X-Frame-Options",
        severity: "Medium"
    });

}

if (result["X-Content-Type-Options"] === "Missing") {

    vulnerabilities.push({
        issue: "Missing X-Content-Type-Options",
        severity: "Low"
    });

}

// Port checks
portData.forEach(port => {

    if (port.port.includes("22")) {

        vulnerabilities.push({
            issue: "SSH Port Open",
            severity: "Medium"
        });

    }

});

const savedScan = await Scan.create({
    url,
    httpsStatus,
    headers: result,
    missingHeaders: missingCount,
    riskLevel,
    vulnerabilities,
    ports: portData
});

        res.status(200).json({
           message: "Scan completed successfully",
           savedScan
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};
exports.getAllScans = async (req, res) => {

    try {

        const scans = await Scan.find().sort({ scanDate: -1 });

        res.status(200).json(scans);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};
exports.getSingleScan = async (req, res) => {

    try {

        const scan = await Scan.findById(req.params.id);

        if (!scan) {

            return res.status(404).json({
                message: "Scan not found"
            });

        }

        res.status(200).json(scan);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};
exports.deleteScan = async (req, res) => {

    try {

        const scan = await Scan.findByIdAndDelete(req.params.id);

        if (!scan) {

            return res.status(404).json({
                message: "Scan not found"
            });

        }

        res.status(200).json({
            message: "Scan deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};