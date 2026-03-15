import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Meet Jaime", to: "/meet-jaime" },
  { label: "Priorities", to: "/priorities" },
  { label: "Contact Jaime", to: "/contact" },
  { label: "Voting", to: "/voting" },
];

interface NavbarProps {
  transparent?: boolean;
}

const Navbar = ({ transparent = false }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const bgClass = transparent
    ? "absolute top-0 left-0 right-0 z-50 bg-transparent"
    : "sticky top-0 z-50 bg-primary shadow-md";

  const textClass = "text-primary-foreground";

  return (
    <nav className={bgClass}>
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className={`font-display text-xl font-bold ${textClass}`}>
          Jaime Boucher
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${textClass} hover:opacity-80 ${
                location.pathname === link.to ? "border-b-2 border-accent pb-0.5" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="hero" size="sm" asChild>
            <Link to="/volunteer">Volunteer</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className={`md:hidden ${textClass}`} onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-primary pb-4 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block py-2 text-sm font-medium ${textClass} hover:opacity-80`}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="hero" size="sm" className="mt-2 w-full" asChild>
            <Link to="/volunteer" onClick={() => setOpen(false)}>Volunteer</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
