# Domaine Take-Home Challenge
### Built on Shopify Dawn Theme

A customized [Shopify Dawn](https://github.com/Shopify/dawn) theme with **Tailwind CSS v4** integration, prepared as a technical assignment for Domaine Agency.

## Tech Stack

- **Shopify Dawn** — Shopify's default reference theme
- **Tailwind CSS v4** — utility-first CSS framework (using the `tw` prefix to avoid conflicts with Dawn's existing styles)
- **Shopify CLI** — for local theme development and deployment

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) installed globally
- A Shopify Partner account with access to a development store

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Hordii4uk/Domaine-task.git
cd Domaine-task
```

### 2. Install dependencies

```bash
npm install
```

This will install Tailwind CSS v4 and [concurrently](https://www.npmjs.com/package/concurrently) (used to run the Shopify dev server and Tailwind compiler in parallel).

### 3. Configure the store connection

Create a `shopify.theme.toml` file in the project root:

```toml
[environments.development]
store = "your-store-name"
```

Replace `your-store-name` with your Shopify development store domain (e.g. `my-dev-store` for `my-dev-store.myshopify.com`).

> **Note:** This file is intentionally excluded from version control via `.gitignore` as it contains store-specific configuration.

### 4. Start the development server

```bash
npm run dev
```

This single command runs two processes concurrently:

- **Shopify CLI** (`shopify theme dev`) — serves the theme locally with hot reload
- **Tailwind CLI** — watches for class changes across `.liquid`, `.json`, and `.js` files, and compiles `assets/tailwind.input.css` → `assets/tailwind.output.css`

### 5. Build for production (optional)

```bash
npm run build
```

Generates a minified `tailwind.output.css` for production use.

## Tailwind CSS Configuration

Tailwind v4 is configured in `assets/tailwind.input.css`:

- **Prefix:** All Tailwind utility classes use the `tw:` prefix (e.g. `tw:flex`, `tw:text-center`) to prevent conflicts with Dawn's native CSS classes.
- **Source paths:** Tailwind scans all `.liquid`, `.json`, and `.js` files in the project for class usage.

## Project Structure

```
├── assets/                 # Theme assets (CSS, JS, images)
│   ├── tailwind.input.css  # Tailwind source file
│   └── tailwind.output.css # Compiled Tailwind output (auto-generated)
├── config/                 # Theme settings
├── layout/                 # Theme layouts
├── locales/                # Translation files
├── sections/               # Theme sections
├── snippets/               # Reusable Liquid snippets
├── templates/              # Page templates
├── package.json            # Node.js dependencies & scripts
├── .gitignore              # Git ignore rules
├── .shopifyignore          # Files excluded from theme upload
└── shopify.theme.toml      # Store connection config (not in repo)
```

## Key Files

| File | Purpose |
|---|---|
| `shopify.theme.toml` | Connects the project to your Shopify store (create manually) |
| `assets/tailwind.input.css` | Tailwind source — configure prefix, sources, and custom styles here |
| `assets/tailwind.output.css` | Auto-generated compiled CSS — do not edit manually |
| `.shopifyignore` | Prevents dev-only files (`node_modules`, `package.json`, `tailwind.input.css`) from being uploaded to Shopify |
