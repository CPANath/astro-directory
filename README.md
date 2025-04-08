# Directory Website Theme (Astro + Tailwind CSS)

A beautiful, modern directory website theme built with Astro and Tailwind CSS. This theme is perfect for creating directory listings, marketplace websites, or any catalog-based web application.

## Features

- 🚀 Built with Astro for ultra-fast performance
- 💅 Styled with Tailwind CSS for modern, responsive design
- 📁 Custom collections to organize directory listings
- 🏷️ Tag-based categorization system
- 🔍 Search functionality
- 🔄 Featured, Official, New, and Advertisement sections
- 📱 Fully responsive on all devices
- 🎨 Mint green accent color theme (easily customizable)

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/directory-site.git
cd directory-site
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:3000` to see the website.

## Project Structure

```
directory-site/
│
├── src/
│   ├── components/     # Reusable UI components
│   ├── layouts/        # Page layouts
│   ├── pages/          # Astro pages
│   ├── styles/         # Global styles
│   └── content/        # Content collections
│       └── directory/  # Directory listings
│
├── public/             # Static assets
├── astro.config.mjs    # Astro configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Content Collections

This theme uses Astro's content collections to manage directory listings. Each listing is defined as a Markdown file in the `src/content/directory/items/` directory with the following frontmatter:

```md
---
title: 'Listing Title'
description: 'Description of the listing'
logo: '/images/logos/logo.png'
author: 'Author Name'
createdAt: 2023-01-15
tags: ['tag1', 'tag2', 'tag3']
featured: true|false
official: true|false
new: true|false
advertisement: true|false
url: 'https://example.com'
---

# Additional content (optional)
```

## Customization

### Colors

You can customize the mint green accent color by editing the `tailwind.config.js` file. The main accent color is defined as `mint-400`.

### Adding New Pages

To add new pages, create new `.astro` files in the `src/pages/` directory.

### Modifying Components

All UI components are located in the `src/components/` directory and can be customized as needed.

## Building for Production

When you're ready to build your site for production, run:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory, ready to be deployed to your hosting provider.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
