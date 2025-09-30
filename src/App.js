import { BrowserRouter, Route,  Routes } from "react-router-dom";

import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { Main } from "./layout/Main";
import { BookItem } from './components/BookItem';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    
    <Routes>
    <Route exact path="/" element={<Main/>}/>
    <Route  path="/book/:id" element={<BookItem/>}/>
    
    </Routes>
   
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
