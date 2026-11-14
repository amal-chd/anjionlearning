import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { tracksData, verifiedCredentials } from "./data/eventData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve assets folder statically
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// Registrations storage file path
const DATA_DIR = path.join(__dirname, "data");
const REGISTRATIONS_FILE = path.join(DATA_DIR, "registrations.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(REGISTRATIONS_FILE)) {
  fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify([], null, 2), "utf-8");
}

function getRegistrations() {
  try {
    const raw = fs.readFileSync(REGISTRATIONS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading registrations:", err);
    return [];
  }
}

function saveRegistrations(regs) {
  try {
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(regs, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving registrations:", err);
  }
}

// Helper to generate unique pass ID
function generatePassId(track) {
  const prefix = track && track.toLowerCase().includes("fci") ? "STRAT-FCI" : "STRAT-LDC";
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${randomNum}`;
}

// GET Event track info
app.get("/api/event/:track", (req, res) => {
  const trackKey = req.params.track === "fci" ? "fci" : "kerala-psc-ldc";
  const data = tracksData[trackKey];
  if (!data) {
    return res.status(404).json({ error: "Event track not found" });
  }
  res.json({ success: true, event: data });
});

// GET All tracks & verified credentials
app.get("/api/event-info", (req, res) => {
  res.json({
    success: true,
    campaign: {
      name: "THE STRATEGY DROP",
      tagline: "One Session. A Clearer Preparation Roadmap.",
      supporting: "Your next step towards smarter exam preparation starts here."
    },
    tracks: tracksData,
    credentials: verifiedCredentials
  });
});

// GET Anjion stats
app.get("/api/stats", (req, res) => {
  const regs = getRegistrations();
  res.json({
    success: true,
    credentials: verifiedCredentials,
    totalWebinarRegistrations: regs.length
  });
});

// Handle registration (handles both /api/register and /api/registrations)
const handleRegistration = (req, res) => {
  try {
    const {
      fullName,
      mobile,
      email,
      preparationStatus,
      webinar,
      consent,
      attribution
    } = req.body;

    // Basic validation
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ error: "Full name is required." });
    }

    if (!mobile || !mobile.toString().trim()) {
      return res.status(400).json({ error: "Mobile number is required." });
    }

    // Clean phone number
    const cleanPhone = mobile.toString().replace(/[^\d+]/g, "");
    if (cleanPhone.replace(/\D/g, "").length < 10) {
      return res.status(400).json({ error: "Please enter a valid 10-digit mobile number." });
    }

    const webinarSelection = webinar || "FCI";
    const passId = generatePassId(webinarSelection);

    const newRegistration = {
      id: passId,
      fullName: fullName.trim(),
      mobile: cleanPhone,
      email: email ? email.trim() : "",
      preparationStatus: preparationStatus || "Just getting started",
      webinar: webinarSelection,
      registeredAt: new Date().toISOString(),
      consent: !!consent,
      attribution: attribution || {}
    };

    const currentRegs = getRegistrations();
    currentRegs.unshift(newRegistration);
    saveRegistrations(currentRegs);

    console.log(`[REGISTRATION] New pass reserved: ${passId} for ${newRegistration.fullName} (${newRegistration.webinar})`);

    return res.status(201).json({
      success: true,
      message: "Your free pass is reserved successfully.",
      registrationId: passId,
      pass: {
        passId,
        attendeeName: newRegistration.fullName,
        webinar: newRegistration.webinar,
        registeredAt: newRegistration.registeredAt,
        sessionDetails: webinarSelection.toUpperCase().includes("FCI")
          ? {
              date: "Sunday, 24th November 2026",
              time: "7:00 PM IST",
              platform: "Private Live Stream"
            }
          : {
              date: "Saturday, 23rd November 2026",
              time: "7:30 PM IST",
              platform: "Private Live Stream"
            }
      }
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ error: "Registration could not be processed. Please try again." });
  }
};

app.post("/api/register", handleRegistration);
app.post("/api/registrations", handleRegistration);

// GET all registrations
app.get("/api/registrations", (req, res) => {
  const regs = getRegistrations();
  res.json({
    success: true,
    total: regs.length,
    registrations: regs.map(r => ({
      id: r.id,
      fullName: r.fullName,
      webinar: r.webinar,
      registeredAt: r.registeredAt,
      preparationStatus: r.preparationStatus
    }))
  });
});

// Serve frontend build if exists
const clientDist = path.join(__dirname, "../client/dist");
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Anjion Learning Webinar Server running on http://localhost:${PORT}`);
});
