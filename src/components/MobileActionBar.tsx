import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MobileActionBar = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border p-3 flex gap-3">
    <Button variant="default" className="flex-1" size="sm" asChild>
      <Link to="/volunteer">Volunteer</Link>
    </Button>
    <Button variant="outline" className="flex-1" size="sm" asChild>
      <Link to="/voting">Voting Info</Link>
    </Button>
  </div>
);

export default MobileActionBar;
