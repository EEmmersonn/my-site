//src\App.tsx
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Biography from './components/sections/Biography';
import Portfolio from './components/sections/Portfolio';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen relative">
      <Header />
      <main>
        <Biography />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;