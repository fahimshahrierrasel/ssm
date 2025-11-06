import { useState, useRef, useEffect } from "react";
import { Code2, Lock, Mail } from "lucide-react";
import pb from "../../../data/pocketbase";
import Loader from "../../components/loader";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";

const SignIn = () => {
  const [waiting, setWaiting] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const isMounted = useRef<boolean>(false);

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email.length < 3 || password.length < 3) {
      setError("Email and Password too short");
      return;
    }

    setWaiting(true);
    try {
      await pb.collection('users').authWithPassword(email, password);
      if (!isMounted.current) {
        setWaiting(false);
      }
    } catch (err: any) {
      if (!isMounted.current) {
        setWaiting(false);
        setError(err.message || "Failed to sign in");
      }
      console.error("Error on sign in", err);
    }
  };

  useEffect(() => {
    return () => {
      isMounted.current = true;
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Code2 className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Simple Snippet Manager</CardTitle>
          <CardDescription className="text-base">
            Sign in to manage your code snippets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={loginUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={waiting}>
              {waiting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
      {waiting && <Loader />}
    </div>
  );
};

export default SignIn;
