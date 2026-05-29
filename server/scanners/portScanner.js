const { exec } = require("child_process");

const scanPorts = (host) => {

    return new Promise((resolve, reject) => {

        const nmapPath = `"C:\\Program Files (x86)\\Nmap\\nmap.exe"`;

        exec(`${nmapPath} ${host}`, (error, stdout, stderr) => {

            if (error) {
                console.log(error);
                return reject(error.message);
            }

            const lines = stdout.split("\n");

            const ports = [];

            lines.forEach(line => {

                if (line.includes("/tcp")) {

                    const parts = line.trim().split(/\s+/);

                    ports.push({
                        port: parts[0],
                        state: parts[1],
                        service: parts[2]
                    });

                }

            });

            resolve(ports);

        });

    });

};

module.exports = scanPorts;