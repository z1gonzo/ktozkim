import { useState, useEffect } from 'react';

interface Report {
  id: number;
  allegationType: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Mock data for now - replace with API call
    const mockReports: Report[] = [
      {
        id: 1,
        allegationType: 'conflict_of_interest',
        title: 'Potential Conflict in City Contract',
        description: 'The councilor appears to have connections to the company awarded the recent city contract.',
        status: 'pending',
        createdAt: '2024-01-02T00:00:00Z',
      },
    ];

    setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 500);
  }, []);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement report submission
    alert('Report submission not yet implemented');
    setShowForm(false);
  };

  if (loading) {
    return <div className="loading">Ładowanie raportów...</div>;
  }

  return (
    <div className="reports">
      <div className="reports-header">
        <h1>Raporty obywatelskie</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Anuluj' : 'Zgłoś raport'}
        </button>
      </div>

      {showForm && (
        <form className="report-form" onSubmit={handleSubmitReport}>
          <h3>Zgłoś nowy raport</h3>

          <div className="form-group">
            <label htmlFor="allegationType">Typ zarzutu</label>
            <select id="allegationType" required>
              <option value="">Wybierz typ...</option>
              <option value="nepotism">Nepotyzm</option>
              <option value="conflict_of_interest">Konflikt interesów</option>
              <option value="hypocrisy">Hipokryzja</option>
              <option value="corruption">Korupcja</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="officialId">ID urzędnika</label>
            <input
              type="number"
              id="officialId"
              placeholder="Wprowadź ID urzędnika"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Tytuł</label>
            <input
              type="text"
              id="title"
              placeholder="Krótki tytuł zarzutu"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Opis</label>
            <textarea
              id="description"
              placeholder="Szczegółowy opis zarzutu"
              rows={5}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="evidence">Dowody/Łącza</label>
            <textarea
              id="evidence"
              placeholder="Łącza do artykułów prasowych, dokumentów, itp."
              rows={3}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Zgłoś raport
          </button>
        </form>
      )}

      <div className="reports-list">
        {reports.map(report => (
          <div key={report.id} className="report-card">
            <div className="report-header">
              <h3>{report.title}</h3>
              <span className={`status status-${report.status}`}>
                {report.status}
              </span>
            </div>
            <p className="allegation-type">
              Typ: {report.allegationType.replace('_', ' ')}
            </p>
            <p className="description">{report.description}</p>
            <p className="date">
              Zgłoszono: {new Date(report.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
