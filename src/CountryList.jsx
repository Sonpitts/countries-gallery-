import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca2')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch countries');
        setLoading(false);
      });
  }, []);

  const filtered = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading countries...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="country-list">
        {filtered.map((country) => (
          <Link
            key={country.cca2}
            to={`/country/${country.cca2}`}
            className="country-card"
          >
            <img
              src={country.flags.svg}
              alt={country.name.common}
            />
            <div className="country-name">{country.name.common}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CountryList;
