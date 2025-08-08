require("dotenv").config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const { crossOriginResourcePolicy, contentSecurityPolicy } = require("helmet");

const mongodb = require("./database/db");
const v1 = require("./routes/v1");

const app = express();

// ----------------- Security Middlewares ----------------- //
app.use(
    helmet({
        contentSecurityPolicy: false,
        xDownloadOptions: false,
    })
);


app.use(crossOriginResourcePolicy({ policy: "cross-origin" }));

app.disable("x-powered-by");


app.use(cors());
app.use(express.json());

mongodb();


app.use("/v1", v1);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// ----------------- Server ----------------- //
const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`🚀 Server listening on port ${port}`)
);
