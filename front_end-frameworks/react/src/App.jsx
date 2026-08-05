import Header from "./components/Header.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Features from "./sections/Features.jsx";
import Insights from "./sections/Insights.jsx";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto max-w-6xl px-6">
        <Hero />
        <About />
        <Features />
        <Insights />
      </main>
    </div>
  );
}

export default App;
