require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");


// =====================================
// ROUTES
// =====================================

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const projectRoutes = require("./routes/projectRoutes");
const teamRoutes = require("./routes/teamRoutes");
const contactRoutes = require("./routes/contactRoutes");


// =====================================
// CREATE EXPRESS APP
// =====================================

const app = express();


// =====================================
// CONNECT DATABASE
// =====================================

connectDB();


// =====================================
// MIDDLEWARE
// =====================================

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


// =====================================
// SERVE UPLOADED FILES
// =====================================

app.use(
    "/uploads",
    express.static("uploads")
);


// =====================================
// HOME / SERVER TEST
// =====================================

app.get("/", (req, res) => {

    res.send(
        "🚀 HAM Club Backend is Running!"
    );

});


// =====================================
// API ROUTES
// =====================================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/events",
    eventRoutes
);

app.use(
    "/api/gallery",
    galleryRoutes
);

app.use(
    "/api/projects",
    projectRoutes
);

app.use(
    "/api/team",
    teamRoutes
);

app.use(
    "/api/contact",
    contactRoutes
);


// =====================================
// SERVER
// =====================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `🚀 Server is running on http://localhost:${PORT}`
    );

});