# Project status
For now, I am putting this project on hold. I like the concept still, but I do not have the free time to fully develop it. Also, I am not happy with the stack (specifically, Electron), and would like to refactor (or rather, rebuild) the app using a Vite and Expo or something or rather.

# Medication Tracker

A cross-platform desktop application for tracking benzodiazepine medication usage and monitoring plasma levels. Built with Electron and React.

## Features

- Real-time medication tracking
- Plasma level visualization
- Stacked area charts for psychoactive and plasma levels
- Medication logging with timestamps
- Configurable settings
- Cross-platform support (Windows, macOS, Linux)

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/FransAris/taper_React.git
cd taper_React
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Building

To create a production build:

```bash
npm run build
```

## Project Structure

```
src/
├── main/           # Electron main process
├── preload/        # Preload scripts
└── renderer/       # React application
    ├── components/ # React components
    ├── context/    # React context providers
    ├── utils/      # Utility functions
    └── styles.css  # Global styles
```

## Technologies

- Electron
- React
- Recharts
- Electron Store
- Webpack

## License

MIT License

## Author

Frans Aris (@FransAris) 
