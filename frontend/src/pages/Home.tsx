const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Kto z kim?</h1>
        <p>
          A civic watchdog platform for documenting and exploring connections,
          signs of hypocrisy, and suspicions of nepotism among public figures
          in cities and nationwide.
        </p>
        <div className="hero-actions">
          <a href="/officials" className="btn btn-primary">
            Browse Officials
          </a>
          <a href="/reports" className="btn btn-secondary">
            View Reports
          </a>
        </div>
      </div>

      <div className="features">
        <div className="feature">
          <h3>Official Profiles</h3>
          <p>
            Comprehensive profiles of public officials, city councilors,
            and municipal company leaders.
          </p>
        </div>
        <div className="feature">
          <h3>Connection Mapping</h3>
          <p>
            Explore relationships and connections between officials
            and companies.
          </p>
        </div>
        <div className="feature">
          <h3>Citizen Reports</h3>
          <p>
            Submit and review reports of potential conflicts of interest
            or nepotism.
          </p>
        </div>
      </div>

      <div className="mission">
        <h2>Our Mission</h2>
        <p>
          To empower citizens with transparency and accountability in local
          governance. By documenting connections and potential conflicts,
          we help build trust in public institutions and promote ethical
          governance.
        </p>
      </div>
    </div>
  );
};

export default Home;
