import Header from './components/Header';
import Hero from './sections/Hero';
import About from './sections/About';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-6xl mx-auto px-6">
        <Hero />
        <About />
      </main>
    </div>
  );
}

export default App
