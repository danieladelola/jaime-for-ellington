import { Link } from "react-router-dom";
import { Mail, MapPin, ArrowRight } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background">
    {/* Main Footer */}
    <div className="container mx-auto py-16">
      <div className="grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">JB</span>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold leading-none">Jamison Boucher</h3>
              <span className="text-background/40 text-xs uppercase tracking-wider">Selectman</span>
            </div>
          </div>
          <p className="text-sm text-background/50 leading-relaxed mt-4">
            Working for Our Town — advancing common-sense policies for Ellington, CT.
          </p>
          <div className="mt-6 space-y-3">
            <a href="mailto:jboucher@ellington-ct.gov" className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors">
              <Mail className="w-4 h-4" /> jboucher@ellington-ct.gov
            </a>
            <div className="flex items-center gap-2 text-sm text-background/60">
              <MapPin className="w-4 h-4" /> Ellington, Connecticut
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-background/40">Pages</h4>
          <div className="flex flex-col gap-3 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/meet-jaime", label: "Meet Jaime" },
              { to: "/priorities", label: "Priorities" },
              { to: "/blog", label: "Blog" },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="text-background/60 hover:text-background transition-colors flex items-center gap-1 group">
                <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-background/40">Get Involved</h4>
          <div className="flex flex-col gap-3 text-sm">
            {[
              { to: "/volunteer", label: "Volunteer" },
              { to: "/contact", label: "Contact Jaime" },
              { to: "/voting", label: "Voting Info" },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="text-background/60 hover:text-background transition-colors flex items-center gap-1 group">
                <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-background/40">Resources</h4>
          <div className="flex flex-col gap-3 text-sm">
            <a href="https://portal.ct.gov/sots" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors">
              CT Secretary of State
            </a>
            <a href="https://www.ellington-ct.gov" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors">
              Ellington Town Website
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-background/10">
      <div className="container mx-auto py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-background/35">
        <p>© {new Date().getFullYear()} Jamison Boucher for Ellington. All rights reserved.</p>
        <p>Paid for by Friends of Jamison Boucher</p>
      </div>
    </div>
  </footer>
);

export default Footer;
