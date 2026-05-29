import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [url, setUrl] = useState("");

  const [scanResult, setScanResult] = useState(null);

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/scan",

        {
          headers: {
            Authorization: token,
          },
        },
      );

      setHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
    setLoading(false);
  }, []);

  const handleScan = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/scan/headers",

        { url },

        {
          headers: {
            Authorization: token,
          },
        },
      );

      setScanResult(res.data.savedScan);

      fetchHistory();
    } catch (error) {
      console.log(error);
      setLoading(false);

      alert("Scan Failed");
    }
  };

  const downloadReport = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/report/${id}`,

        {
          headers: {
            Authorization: token,
          },
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "CyberShield_Report.pdf");

      document.body.appendChild(link);

      link.click();
    } catch (error) {
      console.log(error);

      alert("PDF Download Failed");
    }
  };

  const getRiskColor = (risk) => {
    if (risk === "High") return "red";

    if (risk === "Medium") return "orange";

    return "lime";
  };
  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };
  const deleteScan = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/scan/${id}`,

        {
          headers: {
            Authorization: token,
          },
        },
      );

      fetchHistory();
    } catch (error) {
      console.log(error);

      alert("Delete Failed");
    }
  };
const totalScans = history.length;

const highRisk = history.filter(
    scan => scan.riskLevel === "High"
).length;

const mediumRisk = history.filter(
    scan => scan.riskLevel === "Medium"
).length;

const lowRisk = history.filter(
    scan => scan.riskLevel === "Low"
).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        padding: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
      <div
    style={{
        display:"grid",
        gridTemplateColumns:"repeat(4,1fr)",
        gap:"20px",
        marginBottom:"30px"
    }}
>

    <div
        style={{
            background:"#0f172a",
            padding:"20px",
            borderRadius:"15px",
            border:"1px solid cyan",
            textAlign:"center"
        }}
    >

        <h3>Total Scans</h3>

        <h1 style={{ color:"cyan" }}>
            {totalScans}
        </h1>

    </div>

    <div
        style={{
            background:"#0f172a",
            padding:"20px",
            borderRadius:"15px",
            border:"1px solid red",
            textAlign:"center"
        }}
    >

        <h3>High Risk</h3>

        <h1 style={{ color:"red" }}>
            {highRisk}
        </h1>

    </div>

    <div
        style={{
            background:"#0f172a",
            padding:"20px",
            borderRadius:"15px",
            border:"1px solid orange",
            textAlign:"center"
        }}
    >

        <h3>Medium Risk</h3>

        <h1 style={{ color:"orange" }}>
            {mediumRisk}
        </h1>

    </div>

    <div
        style={{
            background:"#0f172a",
            padding:"20px",
            borderRadius:"15px",
            border:"1px solid lime",
            textAlign:"center"
        }}
    >

        <h3>Low Risk</h3>

        <h1 style={{ color:"lime" }}>
            {lowRisk}
        </h1>

    </div>

</div>

      <h1
        style={{
          textAlign: "center",
          fontSize: "40px",
          marginBottom: "30px",
          color: "cyan",
          textShadow: "0 0 20px cyan",
        }}
      >
        CYBERSHIELD
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Enter Website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "400px",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid cyan",
            background: "#0f172a",
            color: "white",
            marginRight: "10px",
          }}
        />

        <button
          onClick={handleScan}
          disabled={loading}
          style={{
            padding: "15px 25px",
            background: "cyan",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",opacity: loading ? 0.7 : 1,
            fontWeight: "bold",
            
          }}
        >
          {loading ? "Scanning..." : "Scan Website"}
        </button>
      </div>

      {scanResult && (
        <div
          style={{
            background: "rgba(15,23,42,0.8)",
            backdropFilter: "blur(10px)",
            padding: "25px",
            borderRadius: "20px",
            border: "1px solid cyan",
            marginBottom: "30px",
            boxShadow: "0 0 20px rgba(0,255,255,0.3)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "cyan",
            }}
          >
            Scan Result
          </h2>

          <p>
            <strong>URL:</strong> {scanResult.url}
          </p>

          <p>
            <strong>HTTPS:</strong> {scanResult.httpsStatus}
          </p>

          <p>
            <strong>Risk Level:</strong>{" "}
            <span
              style={{
                color: getRiskColor(scanResult.riskLevel),
                fontWeight: "bold",
              }}
            >
              {scanResult.riskLevel}
            </span>
          </p>

          <h3
            style={{
              marginTop: "20px",
              color: "cyan",
            }}
          >
            Open Ports
          </h3>

          {scanResult.ports.map((port, index) => (
            <div key={index}>
              {port.port}
              {" | "}
              {port.service}
            </div>
          ))}

          <h3
            style={{
              marginTop: "20px",
              color: "cyan",
            }}
          >
            Vulnerabilities
          </h3>

          {scanResult.vulnerabilities.map((vuln, index) => (
            <div
              key={index}
              style={{
                marginTop: "10px",
                padding: "10px",
                background: "#111827",
                borderRadius: "10px",
              }}
            >
              ⚠ {vuln.issue}
              {" - "}
              <span
                style={{
                  color: getRiskColor(vuln.severity),
                  fontWeight: "bold",
                }}
              >
                {vuln.severity}
              </span>
            </div>
          ))}
        </div>
      )}

      <h2
        style={{
          marginBottom: "20px",
          color: "cyan",
        }}
      >
        Scan History
      </h2>

      {history.map((scan, index) => (
        <div
          key={index}
          style={{
            background: "rgba(15,23,42,0.8)",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "15px",
            border: "1px solid #1e293b",
          }}
        >
          <p>
            <strong>URL:</strong> {scan.url}
          </p>

          <p>
            <strong>Risk:</strong>{" "}
            <span
              style={{
                color: getRiskColor(scan.riskLevel),
                fontWeight: "bold",
              }}
            >
              {scan.riskLevel}
            </span>
          </p>

          <button
            onClick={() => downloadReport(scan._id)}
            style={{
              marginTop: "15px",
              padding: "10px 15px",
              background: "cyan",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Download PDF
          </button>
          <button
            onClick={() => deleteScan(scan._id)}
            style={{
              marginTop: "10px",
              marginLeft: "10px",
              padding: "10px 15px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Delete Scan
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
