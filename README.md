# Intalos Bot Builder Documentation

This directory contains the help documentation for the Intalos Bot Builder platform.

## 📁 Structure

```
documentation/
├── help/                           # Component help documentation
│   ├── index.md                    # Main index page
│   ├── api-request.md
│   ├── email.md
│   ├── custom-code.md
│   └── ... (all component docs)
├── mkdocs.yml                     # MkDocs configuration
├── deploy-docs.sh                 # Deployment script
└── README.md                      # This file
```

## 🌐 Live Documentation

- **Live Site**: https://help.intalos.de
- **Public Repository**: https://github.com/intalos-ai/intalos-help-docs

Documentation source is maintained here in the private repo and deployed to the public repo for GitHub Pages hosting.

## 🚀 Quick Start

### View Locally

```bash
cd documentation
mkdocs serve
```

Open http://localhost:8000 in your browser.

### Deploy to Production

```bash
cd documentation
./deploy-docs.sh
```

This automatically:
1. Copies documentation to public repository
2. Commits and pushes changes
3. Deploys to GitHub Pages at https://help.intalos.de

## 📝 Editing Documentation

### 1. Edit Files
Modify markdown files in the `help/` directory.

### 2. Test Locally
```bash
mkdocs serve
```

### 3. Deploy
```bash
./deploy-docs.sh
```

### 4. Commit to This Repo
```bash
git add documentation/
git commit -m "Update documentation"
git push origin feature/help_docs
```

## 📋 Adding New Components

### 1. Create New Documentation File
```bash
touch help/new-component.md
```

### 2. Add to Navigation
Edit `mkdocs.yml` and add to the `nav` section:

```yaml
nav:
  - Home: index.md
  - Your Category:
    - New Component: new-component.md
```

### 3. Update Index
Add a link to the new component in `help/index.md`.

### 4. Deploy
```bash
./deploy-docs.sh
```

## 🎨 Theme

We use the **Landing** theme for MkDocs with:
- Poppins font for all text
- Clean, modern design
- Mobile-responsive layout

## 🔧 Manual Deployment (If Needed)

If the automated script doesn't work:

```bash
# 1. Copy files to public repo
cp -r help /path/to/intalos-help-docs/
cp mkdocs.yml /path/to/intalos-help-docs/

# 2. Deploy from public repo
cd /path/to/intalos-help-docs
mkdocs gh-deploy --force
```

## 📚 Documentation Guidelines

### Writing Style
- Clear, concise language
- Practical examples
- Step-by-step instructions
- Visual aids where helpful

### File Organization
- One component per file
- Consistent structure across all docs
- Use headings for easy navigation

### Standard Structure
1. Overview
2. Configuration
3. Use Cases & Examples
4. Best Practices
5. Error Handling
6. Troubleshooting

## 🛠️ Technical Details

### Build Process
1. MkDocs reads `mkdocs.yml` configuration
2. Processes markdown files from `help/` directory
3. Applies Landing theme
4. Generates static HTML in `site/` directory
5. Pushes to `gh-pages` branch in public repo

### Custom Domain
The site is configured for `help.intalos.de` via:
- CNAME file in `gh-pages` branch
- DNS CNAME record pointing to `intalos-ai.github.io`
- GitHub Pages custom domain setting

## 📞 Support

For documentation issues:
- Check MkDocs docs: https://www.mkdocs.org/
- Create an issue in the repository
- Contact: contact@intalos.de

---

**Last Updated**: October 20, 2025
