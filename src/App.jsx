import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

import CountryList from './CountryList';
import CountryDetails from './CountryDetails';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>
          <Link to="/">Countries Gallery</Link>
        </h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
