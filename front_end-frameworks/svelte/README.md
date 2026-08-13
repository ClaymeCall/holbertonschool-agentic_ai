# Agentic AI - Svelte Version

A modern, responsive website about Agentic AI, built with Svelte, Tailwind CSS, and Lucide Icons.

This is the Svelte implementation of the Agentic AI project, originally built with React and Vue.js.

## Features

- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Modern UI**: Clean, professional design with smooth animations
- **Form Validation**: Interactive contact form with real-time validation
- **Dynamic Content**: Asynchronous data loading for insights section
- **Component-Based Architecture**: Well-organized Svelte components

## Sections

1. **Header**: Navigation bar with brand and menu links
2. **Hero**: Introduction with statistics and call-to-action buttons
3. **About**: Explanation of Agentic AI with comparison to Traditional AI
4. **Features**: Grid of feature cards highlighting AI capabilities
5. **Insights**: Dynamic insights loaded asynchronously
6. **Contact**: Interactive contact form with validation
7. **Footer**: Links and social media icons

## Tech Stack

- **Framework**: [Svelte](https://svelte.dev/) 5.x
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4.x
- **Icons**: [Lucide Svelte](https://lucide.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## Project Structure

```
svelte/
├── src/
│   ├── components/
│   │   ├── cards/
│   │   │   ├── FeatureCard.svelte
│   │   │   ├── InsightCard.svelte
│   │   │   └── StatCard.svelte
│   │   ├── layout/
│   │   │   ├── Footer.svelte
│   │   │   └── Header.svelte
│   │   ├── sections/
│   │   │   ├── About.svelte
│   │   │   ├── Contact.svelte
│   │   │   ├── Features.svelte
│   │   │   ├── Hero.svelte
│   │   │   └── Insights.svelte
│   │   └── ui/
│   │       ├── Brand.svelte
│   │       ├── Button.svelte
│   │       ├── CoolBackground.svelte
│   │       ├── Highlight.svelte
│   │       ├── LinkList.svelte
│   │       ├── SectionBadge.svelte
│   │       ├── SectionTitle.svelte
│   │       └── SocialLink.svelte
│   ├── data/
│   │   ├── features.js
│   │   ├── insights.js
│   │   └── steps.js
│   ├── services/
│   │   └── insightsService.js
│   ├── App.svelte
│   ├── app.css
│   └── main.js
├── package.json
├── svelte.config.js
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the svelte directory:
   ```bash
   cd front_end-frameworks/svelte
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

Create a production build:
```bash
npm run build
```

### Lint

Run ESLint to check for code quality issues:
```bash
npm run lint
```

### Fix & Format

Automatically fix linting issues and format code:
```bash
npm run quality
```

## React to Svelte Migration Notes

This project was migrated from a React application to Svelte. Key conversions:

- **Components**: `.jsx` files → `.svelte` files
- **State Management**: `useState` → Reactive variables with `let` and `$:`
- **Lifecycle**: `useEffect` → `onMount`, `onDestroy`, etc.
- **Event Handling**: `onClick` → `on:click`
- **Form Binding**: `value={state}` + `onChange` → `bind:value={state}`
- **Conditional Rendering**: `&&` operator → `{#if}` blocks
- **Lists**: `.map()` → `{#each}` blocks
- **Class Names**: `className` → `class`
- **Icons**: `lucide-react` → `@lucide/svelte`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

Clément Callejon

Built for the Holberton School Front-end Framework curriculum.
