import Header from "./components/Header.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Features from "./sections/Features.jsx";
import Insights from "./sections/Insights.jsx";
import Contact from "./sections/Contact.jsx";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="">
        <Hero />
        <About />
        <Features />
        <Insights />
        <Contact />
      </main>
    </div>
  );
}

export default App;
