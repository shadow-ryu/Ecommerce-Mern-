
import './App.css';


import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
   
    <div  className="app">
           <Navbar/>   
    
    </div>
    </BrowserRouter>
  );
}

export default App;
