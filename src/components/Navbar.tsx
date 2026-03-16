import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Meet Jaime", to: "/meet-jaime" },
  { label: "Priorities", to: "/priorities" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

interface NavbarProps {
  transparent?: boolean;
}

const Navbar = ({ transparent = false }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  const isTransparent = transparent && !scrolled && !open;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent"
          : "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
      )}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link
          to="/"
          className={cn(
            "font-display font-bold transition-colors duration-200 flex items-center gap-3",
            isTransparent ? "text-primary-foreground" : "text-foreground"
          )}
        >
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">JB</span>
          </div>
          <div>
            <span className="text-lg leading-none block">Jamison Boucher</span>
            <span className={cn(
              "text-[10px] uppercase tracking-[0.15em] leading-none",
              isTransparent ? "text-primary-foreground/50" : "text-muted-foreground"
            )}>
              Selectman
            </span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                isTransparent
                  ? "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
                location.pathname === link.to && (isTransparent
                  ? "text-primary-foreground bg-primary-foreground/10"
                  : "text-foreground bg-muted")
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className={cn(
            "lg:hidden p-2 rounded-md transition-colors",
            isTransparent ? "text-primary-foreground" : "text-foreground"
          )}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 bg-background/95 backdrop-blur-md",
          open ? "max-h-[500px] border-b border-border" : "max-h-0"
        )}
      >
        <div className="container mx-auto py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                "text-foreground hover:bg-muted",
                location.pathname === link.to && "bg-muted text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
