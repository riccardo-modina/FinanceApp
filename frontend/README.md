# PiggyPath Frontend

This is the frontend for **PiggyPath**, built with **Vue 3**, **Vite**, and **Tailwind CSS**. It is configured as a **Progressive Web App (PWA)** using `vite-plugin-pwa`.

## Tech Stack

-   **Vue 3**: Composition API with `<script setup>`.
-   **Vite**: For fast development and optimized builds.
-   **Tailwind CSS**: For a premium and responsive design.
-   **Pinia**: State management.
-   **PrimeVue**: UI components.
-   **ECharts**: Data visualization.
-   **Vite PWA Plugin**: For PWA capabilities (Service Worker, Manifest, etc.).

## PWA Configuration

The app is configured to:
-   Automatically update the Service Worker.
-   Provide a high-quality manifest with multi-size icons.
-   Support offline access via precaching.

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
