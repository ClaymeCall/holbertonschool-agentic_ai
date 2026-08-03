import Header from './components/Header';
import Hero from './sections/Hero';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mt-20">
        <Hero />
      </main>
    </div>
  );
}

export default App
