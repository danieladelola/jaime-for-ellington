import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MobileActionBar = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-primary p-3 flex gap-3 shadow-lg">
    <Button variant="hero" className="flex-1" asChild>
      <Link to="/volunteer">Volunteer</Link>
    </Button>
    <Button variant="heroOutline" className="flex-1" asChild>
      <Link to="/voting">Voting Info</Link>
    </Button>
  </div>
);

export default MobileActionBar;
