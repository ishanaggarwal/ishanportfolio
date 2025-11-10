# Ishan Aggarwal - Portfolio Website

A modern, responsive portfolio website showcasing my work as a Software Engineer and Product Manager, specializing in AI/ML, Cloud Computing, and Full-Stack Development.

## 🌟 Features

- **Modern Design**: Clean, Apple-inspired design with smooth animations
- **Dark Mode**: Seamless dark/light mode toggle with system preference detection
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Sections**:
  - Hero section with professional introduction
  - About section highlighting experience and achievements
  - Projects showcase with detailed modal views
  - Professional experience timeline with visual tree structure
  - Contact form with validation
- **Performance Optimized**: Built with Next.js for optimal performance
- **Static Export**: Deployed as a static site on GitHub Pages

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Typography**: Geist Font Family
- **Deployment**: GitHub Pages via GitHub Actions

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ishanaggarwal/ishanportfolio.git
cd ishanportfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build & Deploy

### Local Build

To create a production build:
```bash
npm run build
```

The static files will be generated in the `out` directory.

### Deploy to GitHub Pages

This project is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

**Quick Setup:**

1. Go to your repository Settings → Pages
2. Under "Build and deployment":
   - **Source**: Select **"GitHub Actions"** (not "Deploy from a branch")
3. Push your changes to the `main` branch or manually trigger the workflow
4. Monitor the deployment in the Actions tab

Your site will be available at: `https://ishanaggarwal.github.io/ishanportfolio/`

**📖 For detailed setup instructions and troubleshooting, see [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md)**

## 📝 Customization

### Update Personal Information

1. **Profile Image**: Replace the image URL in `app/page.tsx` (line ~626)
2. **Resume Link**: Update the Google Drive link in the About section (line ~805)
3. **Contact Email**: Update the email in the contact form handler (line ~208)
4. **Social Links**: Update GitHub and LinkedIn URLs throughout the file
5. **Projects**: Edit the `projects` array (starting at line ~240)
6. **Experience**: Edit the `experiences` array (starting at line ~347)

### Modify Colors

The color scheme is defined in `tailwind.config.ts`. You can customize:
- Color palette
- Font families
- Spacing
- Border radius
- And more

## 🎨 Color Scheme

The portfolio uses a minimal black and white theme with:
- Primary: Black (#000000) / White (#FFFFFF)
- Background: White (#FFFFFF) / Dark Gray (#111827)
- Text: Gray scale variants
- Accent colors for experience timeline (Blue, Purple, Green, Orange)

## 📄 License

This project is open source and available for personal use. Please credit the original author if you use this template.

## 👤 Contact

**Ishan Aggarwal**
- Email: ishanaggarwal7775@gmail.com
- LinkedIn: [linkedin.com/in/ishanaggarwal1](https://www.linkedin.com/in/ishanaggarwal1/)
- GitHub: [github.com/ishanaggarwal](https://github.com/ishanaggarwal)
- Location: Boston, MA / Seattle, WA

---

© 2025 Ishan Aggarwal. Designed with precision and built with passion.
