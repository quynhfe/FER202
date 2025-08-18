import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StudentsPage from './pages/StudentsPage';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
   return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Navbar />
      <Hero />
      <main>
        <StudentsPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
