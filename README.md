# LU YUNG-CHIEH Portfolio

A clean, responsive, and bilingual (English / Traditional Chinese) personal portfolio website documenting selected architecture and Building Information Modeling (BIM) projects and experience.

## Deployed URL

- **Live Website**: [https://luyung1240.github.io/Luyung-portfolio-website/](https://luyung1240.github.io/Luyung-portfolio-website/)

## Site Structure

The website consists of three main pages with dynamic data rendering and language switching support:

- `index.html` — About Me / Hero landing page
- `resume.html` — Work experience and organized skills showcase
- `projects.html` — Showcase of architectural design & BIM projects

All core dynamic contents (projects, work experience, and skills) are decoupled from HTML structure and loaded dynamically from JSON files via standard JavaScript `fetch` calls.

## Tools Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Data Format**: JSON (Structured with `en` and `zh` internationalization)
- **Version Control & Hosting**: Git, GitHub, GitHub Pages
- **Design Accent**: Sage Green accent with modern asymmetric layout

## File Architecture

- `index.html` — Main homepage (About Me)
- `resume.html` — Resume page
- `projects.html` — Static project showcase page
- `css/style.css` — Visual styling and layout definitions
- `js/main.js` — Core site logic (dynamic JSON rendering, language switcher, and `getI18nText` safety parser)
- `data/`
  - `projects.json` — Projects metadata (titles, descriptions, categories, images)
  - `experience.json` — Work experience timeline
  - `skills.json` — Categorized skills and software proficiency
- `assets/` — Image resources for profile and projects (`.png`, `.jpg`)

## Content Update Workflow

To update your portfolio content without altering HTML structure:

1. **Modify JSON Data**:
   - Edit `data/projects.json`, `data/experience.json`, or `data/skills.json` to add or modify items.
   - Ensure bilingual fields contain both `"en"` and `"zh"` keys where appropriate.
2. **Add Assets**:
   - Save new images in the `assets/` directory and reference their exact paths in your JSON files (e.g., `"assets/your-image.png"`).
3. **Deploy Updates via Git**:
   ```bash
   git add .
   git commit -m "feat: update portfolio content"
   git push
   ```
   GitHub Actions will automatically build and publish the changes to your GitHub Pages site within 1–2 minutes.
