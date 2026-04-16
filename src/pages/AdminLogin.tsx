import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Lock, LogIn } from "lucide-react";

const AdminLogin = () => {
  const { user, isAdmin, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="mx-auto w-16 h-16 bg-muted rounded-2xl animate-pulse" />
        <div className="h-6 w-32 bg-muted rounded animate-pulse mx-auto" />
        <div className="h-4 w-40 bg-muted rounded animate-pulse mx-auto" />
        <div className="h-12 bg-muted rounded-lg animate-pulse mt-4" />
        <div className="h-12 bg-muted rounded-lg animate-pulse" />
        <div className="h-12 bg-muted rounded-lg animate-pulse" />
      </div>
    </div>
  );
  if (user && isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signIn(email, password);
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground">Admin Login</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">2 IC Catering Dashboard</p>
        </div>

        {!loading && user && !isAdmin && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-4 font-body text-center">
            You don't have admin access.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg font-body">{error}</div>
          )}
          <input
            type="email" placeholder="Email" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
          />
          <input
            type="password" placeholder="Password" required value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
          />
          <button
            type="submit" disabled={submitting}
            className="w-full bg-gradient-warm text-primary-foreground py-3 rounded-lg font-semibold font-body flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <a href="/" className="block text-center text-sm text-muted-foreground font-body mt-6 hover:text-primary transition-colors">
          ← Back to Website
        </a>
      </div>
    </div>
  );
};

export default AdminLogin;
