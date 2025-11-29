import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <main className="home">
      <section className="hero">
        <div className="overlay"></div>

        <div className="hero-content">
          <h1 className="title">Krushimitra</h1>

          <div className="btn-group">
            <Link to="/farmer/login">
              <button className="btn">Farmer Login</button>
            </Link>

            <Link to="/company/login">
              <button className="btn">Company Login</button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
