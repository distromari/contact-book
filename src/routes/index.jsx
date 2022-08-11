import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from "../pages/Home/index";
import { NewContact } from "../pages/NewContact";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/novo-contato" element={<NewContact />} />
            </Routes>
        </BrowserRouter>
    )
}