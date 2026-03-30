import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Lock, Mail, Shield } from "lucide-react";
import adminBg from "@/assets/admin-bg.jpg";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error("Invalid credentials");
    } else {
      toast.success("Welcome back!");
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background image */}
      <img
        src={adminBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/80 via-foreground/70 to-foreground/80" />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/90 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white">Boucher Campaign</h1>
          <p className="text-white/60 text-sm mt-1.5">Admin Portal</p>
        </div>

        {/* Login card */}
        <div className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-display font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground text-sm mt-1">Sign in to manage your website</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="pl-10 h-12 bg-background"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 h-12 bg-background"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          Jamie Boucher for Ellington &bull; Campaign Admin
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
