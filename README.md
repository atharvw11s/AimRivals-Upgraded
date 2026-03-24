# Zenith Aim

> Daily aim training routines, sensitivity converters, FOV calculators and live 3D warmup games — built for FPS players.

**Live site:** https://atharvw11s.github.io/Zenith Aim-Upgraded/  
**Author:** PurplsXD

---

## Features

### 📋 Daily Routines
Generates a 9-task training playlist weighted by your chosen split across **Flicking**, **Tracking**, and **Switching**. Pick your rank (Beginner / Intermediate / Advanced) and your platform (Aimlabs or KovaaK's).

Powered by the full **Voltaic S3** (Aimlabs) and **Voltaic S5** (KovaaK's) benchmark scenario sets — 108 scenarios total across all 9 subcategories:

- **Clicking** — Dynamic, Static, Linear
- **Tracking** — Precise, Reactive, Control
- **Switching** — Speed, Evasive, Stability

### 🖱️ Sensitivity Converter
Converts mouse sensitivity between any supported game using accurate yaw values. Supports independent From/To DPI fields with a lock button to sync them. Shows a full cross-platform reference table so every game feels identical.

| Game | Yaw |
|------|-----|
| Roblox Rivals | 0.37503 |
| Roblox Arsenal | 0.37503 |
| Aimlabs | 0.05 |
| KovaaK's | 0.022 |
| Valorant | 0.07 |

**Roblox Rivals note:** The converter outputs raw Camera Sensitivity. Set your Rivals In-Game Slider to 1 (or 100%) before applying the result.

### 🔭 FOV Converter
Converts Vertical and Horizontal FOV between any supported game. Automatically calculates equivalent HFOV for KovaaK's.

Formula: `HFOV = 2 × atan(tan(VFOV/2) × aspectRatio)`

### 🎮 3D Warmup Games
Three real-time Three.js games inside the browser — pointer-lock controls, live scoring:

- **Tracking** — follow a smoothly moving sphere through 3D space
- **Flicking** — snap between randomly spawning lit targets
- **Switching** — cycle through a sequence of targets in order

### 🏆 Global Leaderboard
Weekly leaderboard that resets every Monday. Scores saved per game mode. Personal bests tracked permanently. Sign in with Google or GitHub to sync your bests across devices — or stay anonymous and scores are saved to your device automatically.

---

## File Structure

```
index.html          Landing page
app.html            Main app (Routines / Converters / Warmup)
routines/           Clean URL folder → /routines/
converters/         Clean URL folder → /converters/
warmup/             Clean URL folder → /warmup/
styles.css          Shared design system (CSS variables, components)
landing.css         Landing page specific styles
script.js           App logic (routines, converters, 3D warmup)
landing.js          Landing page particles + scroll animations
auth.js             Firebase Authentication (Google + GitHub)
scores.js           Firebase Realtime Database leaderboard
config.js           Central config (game databases, defaults)
manifest.json       PWA manifest
404.html            GitHub Pages clean URL routing
README.md           This file
```

---

## Tech Stack

- **Vanilla JS** — no frameworks
- **Three.js r128** — 3D warmup games
- **Firebase Realtime Database** — weekly leaderboard + personal bests
- **Firebase Authentication** — Google + GitHub sign-in
- **Google Fonts** — Jost, Karla, Oswald
- **CSS Custom Properties** — full design token system

---

## Scenario Credits

Scenarios sourced from the **Voltaic** benchmark system (S3 for Aimlabs, S5 for KovaaK's) and the Aimlabs/KovaaK's community.

---

## License

Open source. Fork it, improve it, share it.
