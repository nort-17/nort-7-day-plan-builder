const fs = require("fs");
const path = require("path");

const dist = path.join(__dirname, "..", "dist");
const target = path.join(dist, "workout-planner");

fs.mkdirSync(target, { recursive: true });

for (const entry of ["index.html", "assets", "nort-logo.png"]) {
  const from = path.join(dist, entry);
  const to = path.join(target, entry);
  fs.cpSync(from, to, { recursive: true });
}

fs.copyFileSync(path.join(dist, "index.html"), path.join(dist, "404.html"));
