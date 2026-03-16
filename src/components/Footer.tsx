import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container mx-auto py-12">
      <div className="grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display text-lg font-bold mb-2">Jaime Boucher</h3>
          <p className="text-sm text-background/60">
            Working for Our Town — Ellington, CT
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-sm uppercase tracking-wider text-background/50">Pages</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/meet-jaime" className="text-background/70 hover:text-background transition-colors">Meet Jaime</Link>
            <Link to="/priorities" className="text-background/70 hover:text-background transition-colors">Priorities</Link>
            <Link to="/contact" className="text-background/70 hover:text-background transition-colors">Contact</Link>
            <Link to="/voting" className="text-background/70 hover:text-background transition-colors">Voting Info</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-sm uppercase tracking-wider text-background/50">Get Involved</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/volunteer" className="text-background/70 hover:text-background transition-colors">Volunteer</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 mt-10 pt-6 text-xs text-center text-background/40">
        © {new Date().getFullYear()} Jaime Boucher for Ellington. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
