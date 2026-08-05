import Header from './components/Header.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Features from './sections/Features.jsx';
import Insights from './sections/Insights.jsx';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-6xl mx-auto px-6">
        <Hero />
        <About />
        <Features />
        <Insights />
      </main>
    </div>
  );
}

export default App
