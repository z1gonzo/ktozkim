import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>Kto z kim?</h1>
        </Link>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/officials">Officials</Link>
          <Link to="/reports">Reports</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
