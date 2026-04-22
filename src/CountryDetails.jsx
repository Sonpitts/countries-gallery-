import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CountryDetails() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => res.json())
      .then((data) => {
        setCountry(data[0]);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch country details');
        setLoading(false);
      });
  }, [code]);

  if (loading) return <div>Loading country details...</div>;
  if (error) return <div>{error}</div>;
  if (!country) return <div>Country not found.</div>;

  return (
    <div className="country-details">
      <Link to="/">← Back to list</Link>
      <h2>{country.name.common}</h2>
      <img src={country.flags.svg} alt={country.name.common} />
      <ul>
        <li><strong>Official Name:</strong> {country.name.official}</li>
        <li><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</li>
        <li><strong>Language(s):</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</li>
        <li><strong>Population:</strong> {country.population.toLocaleString()}</li>
        <li><strong>Region:</strong> {country.region}</li>
        <li><strong>Subregion:</strong> {country.subregion || 'N/A'}</li>
      </ul>
    </div>
  );
}

export default CountryDetails;
