import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-lg font-bold mb-3">Jaime Boucher</h3>
          <p className="text-sm opacity-80">Working for Our Town — Ellington, CT</p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-1 text-sm opacity-80">
            <Link to="/meet-jaime" className="hover:opacity-100">Meet Jaime</Link>
            <Link to="/priorities" className="hover:opacity-100">Priorities</Link>
            <Link to="/contact" className="hover:opacity-100">Contact</Link>
            <Link to="/voting" className="hover:opacity-100">Voting Info</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Get Involved</h4>
          <div className="flex flex-col gap-1 text-sm opacity-80">
            <Link to="/volunteer" className="hover:opacity-100">Volunteer</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-sm text-center opacity-60">
        © {new Date().getFullYear()} Jaime Boucher for Ellington. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
