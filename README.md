# Intalos Bot Builder Documentation

This directory contains the help documentation for the Intalos Bot Builder platform.

## 📁 Structure

```
documentation/
├── help/                           # Main help content
│   ├── index.md                    # Main index page
│   ├── USER_DOCUMENTATION_APIREQUEST.md
│   ├── USER_DOCUMENTATION_MEDIA.md
│   └── USER_DOCUMENTATION_QUESTIONMEDIA.md
├── mkdocs.yml                     # MkDocs configuration
└── README.md                      # This file
```

## 🚀 Getting Started with MkDocs

### Prerequisites
- Python 3.7+
- pip (Python package manager)

### Installation

1. **Install MkDocs and Material theme**:
   ```bash
   pip install mkdocs mkdocs-material
   ```

2. **Navigate to documentation directory**:
   ```bash
   cd documentation
   ```

3. **Start the development server**:
   ```bash
   mkdocs serve
   ```

4. **Open your browser** to `http://localhost:8000`

### Building the Site

To build the static site:

```bash
mkdocs build
```

The built site will be in the `site/` directory.

### Deployment

#### GitHub Pages
```bash
mkdocs gh-deploy
```

#### Netlify
1. Connect your repository to Netlify
2. Set build command: `mkdocs build`
3. Set publish directory: `site`

#### Custom Server
Upload the contents of the `site/` directory to your web server.

## 📝 Adding New Content

### 1. Create New Help Files
Add new `.md` files to the `help/` directory.

### 2. Update Navigation
Edit `mkdocs.yml` to add new pages to the navigation:

```yaml
nav:
  - Home: index.md
  - New Section:
    - New Page: help/new-page.md
```

### 3. Update Index
Modify `help/index.md` to include links to new content.

## 🎨 Customization

### Theme Configuration
Edit the `theme` section in `mkdocs.yml` to customize:
- Colors and palettes
- Navigation features
- Icons and branding

### Plugins
Add plugins in the `plugins` section:
- `search` - Built-in search functionality
- `git-revision-date-localized` - Show last updated dates
- `minify` - Minify HTML/CSS/JS

### Markdown Extensions
Configure markdown features in the `markdown_extensions` section:
- Code highlighting
- Tables
- Admonitions (callouts)
- Emoji support
- Math equations

## 📚 Content Guidelines

### Writing Style
- Use clear, concise language
- Include practical examples
- Add screenshots where helpful
- Use consistent formatting

### File Naming
- Use descriptive filenames
- Use kebab-case for multi-word files
- Keep filenames short but meaningful

### Structure
- Start with an overview
- Include step-by-step instructions
- Add troubleshooting sections
- End with related resources

## 🔧 Development

### Local Development
```bash
# Start development server with auto-reload
mkdocs serve

# Build and serve from a specific directory
mkdocs serve --dev-addr 0.0.0.0:8000
```

### Testing
```bash
# Check for broken links
mkdocs build --strict

# Validate configuration
mkdocs config
```

## 📞 Support

For documentation issues:
- Check MkDocs documentation: https://www.mkdocs.org/
- Material theme docs: https://squidfunk.github.io/mkdocs-material/
- Create an issue in the repository

---

*This documentation is built with MkDocs and the Material theme.*
