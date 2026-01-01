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
    return <div className="loading">Loading reports...</div>;
  }

  return (
    <div className="reports">
      <div className="reports-header">
        <h1>Citizen Reports</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Submit Report'}
        </button>
      </div>

      {showForm && (
        <form className="report-form" onSubmit={handleSubmitReport}>
          <h3>Submit New Report</h3>

          <div className="form-group">
            <label htmlFor="allegationType">Allegation Type</label>
            <select id="allegationType" required>
              <option value="">Select type...</option>
              <option value="nepotism">Nepotism</option>
              <option value="conflict_of_interest">Conflict of Interest</option>
              <option value="hypocrisy">Hypocrisy</option>
              <option value="corruption">Corruption</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="officialId">Official ID</label>
            <input
              type="number"
              id="officialId"
              placeholder="Enter official ID"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Brief title of the allegation"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Detailed description of the allegation"
              rows={5}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="evidence">Evidence/Links</label>
            <textarea
              id="evidence"
              placeholder="Links to news articles, documents, etc."
              rows={3}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Report
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
              Type: {report.allegationType.replace('_', ' ')}
            </p>
            <p className="description">{report.description}</p>
            <p className="date">
              Submitted: {new Date(report.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
