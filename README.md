# Modern Responsive Web Resume
**Thristan Jericho Tolentino — Senior Infrastructure Administrator / Full Stack Developer**

A modern, responsive, high-aesthetic web resume and executive portfolio built with semantic HTML5, vanilla CSS/Tailwind, and vanilla JavaScript. Zero framework overhead, zero build step required, 100% compatible with static hosting like GitHub Pages.

---

## 🌟 Key Features

- **Decoupled Resume Data (`resume-data.js`)**: All resume content (metrics, summary, skills, work history, certifications, awards, education) is cleanly stored in plain JavaScript objects. Update your resume without touching complex HTML tags or styles!
- **Modern Executive Portfolio Layout**: Sleek typography, KPI counter cards, interactive technology tags, company role progressions, and custom project badges (*SkriptSked*, *Defender Fixer*, *SnapLog*, *HireLines*, etc.).
- **Quick View Mode Switcher**:
  - **Executive View**: Rich interactive dashboard with metric counters and badges.
  - **Clean A4 View**: Recruiter-ready document format simulating clean paper.
- **Dedicated Print & PDF Export (`@media print`)**:
  - Click **"Print / PDF"** (or press `Ctrl+P`) to export directly to a clean, ink-friendly, recruiter-ready PDF.
  - Web chrome, action buttons, and filters are automatically hidden. Page-break-avoidance rules prevent awkward splits across job bullets.
- **Interactive Skill Search & Highlighting**:
  - Search any keyword (e.g., `Azure`, `PowerShell`, `C#`, `Disaster Recovery`) or click any competency chip.
  - Instantly highlights relevant experience bullets and dims unrelated items. Click the same chip again to reset!
- **Dark & Light Mode**: Smooth transition with system color scheme detection and persistent `localStorage` preference.
- **Quick-Copy Contact Helpers**: One-click copy for email and phone with animated toast feedback.
- **Live In-Page Edit Mode**: Click the pencil icon in the top toolbar to toggle in-browser editing on any text element to preview wording changes on the fly.

---

## 🚀 How to Run Locally

### Option 1: Using Bun (Recommended)
This repository includes a native Bun static server:

```bash
# Start the local development server
bun start
# or with hot watch:
bun dev
```
Open your browser at: **`http://localhost:3000`**

### Option 2: Direct File Opening
Because this project uses vanilla HTML, CSS, and JS with zero bundling requirements, you can also simply double-click **`index.html`** or open it directly in any browser (Chrome, Edge, Firefox, Safari).

---

## 🌐 Deploying to GitHub Pages (Free Static Hosting)

Because this is a completely static, plain HTML web application, hosting it on GitHub Pages takes under a minute:

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Responsive HTML resume"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. On GitHub, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder, then click **Save**.
5. Your live resume will be available at `https://<your-username>.github.io/<your-repo-name>/`!

---

## ✏️ How to Modify Resume Information

All content is centralized in **`resume-data.js`**:

1. Open `resume-data.js` in any text editor.
2. Edit any section:
   - **Personal details**: Phone, email, location, title.
   - **Metrics**: Change KPI numbers, labels, or descriptions.
   - **Competencies**: Add or remove skills from any category.
   - **Experience**: Add new bullet points, update dates, or add project badges.
   - **Certifications & Awards**: Add newly earned credentials.
3. Save the file. When you refresh the web page, your changes are immediately reflected!

---

## 📁 File Structure

```
resume/
├── index.html          # Main semantic HTML5 template & layout
├── styles.css          # Design tokens, dark/light theme, print (@media print) rules
├── resume-data.js      # Structured resume dataset (easy to edit)
├── app.js              # Vanilla JS application controller (theme, filters, search, views)
├── server.js           # Lightweight Bun static server
├── package.json        # Bun project scripts
└── README.md           # Documentation & GitHub Pages guide
```
