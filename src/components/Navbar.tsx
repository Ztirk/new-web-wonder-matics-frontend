import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-[312px] h-full bg-white">
      <nav>
        <ul>
          <Link to="/customer">
            <li>Customer</li>
          </Link>
          <Link to="/person">
            <li>Person</li>
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>
          <Link to="/address">
            <li>Address</li>
          </Link>
          <Link to="/fleet">
            <li>Fleet</li>
          </Link>
          <Link to="/vehicle">
            <li>Vehicle</li>
          </Link>
          <Link to="/test">
            <li>Test</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
