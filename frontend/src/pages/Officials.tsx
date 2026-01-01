import { useState, useEffect } from 'react';

interface Official {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  city?: string;
  bio?: string;
  verified: boolean;
}

const Officials = () => {
  const [officials, setOfficials] = useState<Official[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    // Mock data for now - replace with API call
    const mockOfficials: Official[] = [
      {
        id: 1,
        firstName: 'Jan',
        lastName: 'Kowalski',
        position: 'City Councilor',
        city: 'Warsaw',
        bio: 'Elected representative serving the community.',
        verified: true,
      },
      {
        id: 2,
        firstName: 'Anna',
        lastName: 'Nowak',
        position: 'CEO',
        city: 'Warsaw',
        bio: 'Executive director of public transportation services.',
        verified: false,
      },
    ];

    setTimeout(() => {
      setOfficials(mockOfficials);
      setLoading(false);
    }, 500);
  }, []);

  const filteredOfficials = officials.filter(official => {
    const matchesSearch = `${official.firstName} ${official.lastName} ${official.position}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCity = !cityFilter || official.city === cityFilter;
    return matchesSearch && matchesCity;
  });

  if (loading) {
    return <div className="loading">Loading officials...</div>;
  }

  return (
    <div className="officials">
      <h1>Public Officials</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search officials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="city-select"
        >
          <option value="">All Cities</option>
          <option value="Warsaw">Warsaw</option>
        </select>
      </div>

      <div className="officials-grid">
        {filteredOfficials.map(official => (
          <div key={official.id} className="official-card">
            <div className="official-header">
              <h3>{official.firstName} {official.lastName}</h3>
              {official.verified && <span className="verified-badge">✓ Verified</span>}
            </div>
            <p className="position">{official.position}</p>
            {official.city && <p className="city">{official.city}</p>}
            {official.bio && <p className="bio">{official.bio}</p>}
            <button className="btn btn-primary">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Officials;
