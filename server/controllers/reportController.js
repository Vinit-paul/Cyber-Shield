const PDFDocument = require("pdfkit");
const Scan = require("../models/Scan");

exports.generateReport = async (req, res) => {

    try {

        const scan = await Scan.findById(req.params.id);

        if (!scan) {

            return res.status(404).json({
                message: "Scan not found"
            });

        }

        // Create PDF
        const doc = new PDFDocument();

        // Response headers
        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=CyberShield_Report.pdf`
        );

        doc.pipe(res);

        // Title
        doc
            .fontSize(22)
            .text("CyberShield Security Report", {
                align: "center"
            });

        doc.moveDown();

        // Scan Info
        doc.fontSize(14);

        doc.text(`URL: ${scan.url}`);
        doc.text(`HTTPS Status: ${scan.httpsStatus}`);
        doc.text(`Risk Level: ${scan.riskLevel}`);
        doc.text(`Missing Headers: ${scan.missingHeaders}`);
        doc.text(`Scan Date: ${scan.scanDate}`);

        doc.moveDown();

        // Headers
        doc
            .fontSize(18)
            .text("Security Headers");

        doc.moveDown(0.5);

        for (let key in scan.headers) {

            doc.fontSize(12)
               .text(`${key}: ${scan.headers[key]}`);

        }

        doc.moveDown();

        // Ports
        doc
            .fontSize(18)
            .text("Open Ports");

        doc.moveDown(0.5);

        scan.ports.forEach(port => {

            doc.fontSize(12)
               .text(
                  `${port.port} | ${port.state} | ${port.service}`
               );

        });

        doc.end();

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};