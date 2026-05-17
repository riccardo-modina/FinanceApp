# 🐷 PiggyPath - Personal Finance Tracker

**PiggyPath** is a modern, sleek, and premium personal finance application designed to help you track your path to savings with ease. Built with a powerful Python backend and a fast Vue 3 frontend, it is now a fully functional **Progressive Web App (PWA)**.

![PiggyPath Logo](/Users/riccardomodina/.gemini/antigravity/brain/2389fc29-6bce-4aac-aea2-32da46de7b15/piggypath_logo_new_1778433238705.png)

## Features

-   **Installable (PWA)**: Install PiggyPath on your iOS, Android, or Desktop device for a native-like experience.
-   **Offline Support**: Access your financial data even when you're offline.
-   **Beautiful Design**: A premium, minimalist interface built for clarity and speed.
-   **Self-Hosted**: Full control over your data with an easy Docker-based setup.

## Installation (Self-Hosted)

To install and set up the project instantly, run:

```bash
curl -sSL "https://raw.githubusercontent.com/riccardo-modina/FinanceApp/main/install.sh" | bash
```

This will download the necessary `docker-compose.yml` and `.env` files. Fill in the `.env` with your database credentials.

Once configured, start the application:

```bash
docker compose up -d
```

## Using PiggyPath as an App

Since PiggyPath is a PWA, you can add it to your home screen:

-   **iOS (Safari)**: Tap the **Share** icon and select **"Add to Home Screen"**.
-   **Android (Chrome)**: Tap the **three dots** menu and select **"Install app"** or **"Add to Home Screen"**.
-   **Desktop (Chrome/Edge)**: Click the **Install** icon in the address bar.

---

Built by [riccardomodina](https://github.com/riccardo-modina)