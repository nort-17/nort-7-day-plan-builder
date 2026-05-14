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

const eatingHacksSource = path.join(__dirname, "..", "eating-hacks");
const eatingHacksTarget = path.join(dist, "eating-hacks");

if (fs.existsSync(eatingHacksSource)) {
  fs.rmSync(eatingHacksTarget, { recursive: true, force: true });
  fs.cpSync(eatingHacksSource, eatingHacksTarget, { recursive: true });
}

const fatLossResetSource = path.join(__dirname, "..", "fat-loss-reset");
const fatLossResetTarget = path.join(dist, "fat-loss-reset");

if (fs.existsSync(fatLossResetSource)) {
  fs.rmSync(fatLossResetTarget, { recursive: true, force: true });
  fs.cpSync(fatLossResetSource, fatLossResetTarget, { recursive: true });
}
