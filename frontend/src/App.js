
import './App.css';
import { AllRouters } from './components/AllRoutes/AllRouters';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';


function App() {
  return (
    <>
    <Header/>
      <main>
        <AllRouters/>
      </main>
    <Footer/>
    </>
      
    
  );
}

export default App;
