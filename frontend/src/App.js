
import { useState } from 'react';
import './App.css';
import { AllRouters } from './components/AllRoutes/AllRouters';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';


function App() {
  const [search,setSearch] = useState("");

  return (
    <>
    <Header setSearch={setSearch} />
      <main>
        <AllRouters search={search} />
      </main>
    <Footer/>
    </>
      
    
  );
}

export default App;
