const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Witaj w Kto z kim?</h1>
        <p>
          Platforma obywatelska do dokumentowania i eksploracji połączeń,
          znaków hipokryzji i podejrzeń o nepotyzm wśród osób publicznych
          w miastach i na całym kraju.
        </p>
        <div className="hero-actions">
          <a href="/officials" className="btn btn-primary">
            Przeglądaj urzędników
          </a>
          <a href="/reports" className="btn btn-secondary">
            Obejrzij raporty
          </a>
        </div>
      </div>

      <div className="features">
        <div className="feature">
          <h3>Profile urzędników</h3>
          <p>
            Kompletne profile osób publicznych, radnych miejskich,
            i liderów przedsiębiorstw komunałnych.
          </p>
        </div>
        <div className="feature">
          <h3>Mapowanie połączeń</h3>
          <p>
            Eksploruj relacje i połączenia między urzędnikami
            i firmami.
          </p>
        </div>
        <div className="feature">
          <h3>Raporty obywatelskie</h3>
          <p>
            Zgłaszaj i przeglądaj raporty o potencjalnych konfliktach interesów
            lub nepotyźmie.
          </p>
        </div>
      </div>

      <div className="mission">
        <h2>Nasza misja</h2>
        <p>
          Aby upoważnić obywateli do przejrzystości i odpowiedzialności w lokalnej
          rządowości. Poprzez dokumentowanie połączeń i potencjalnych konfliktów,
          pomagamy budować zaufanie do instytucji publicznych i promujemy etyczną
          rządy.
        </p>
      </div>
    </div>
  );
};

export default Home;
