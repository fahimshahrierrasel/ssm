import React from "react";
import { signOut } from "firebase/auth";
import assets from "../../../assets";
import firebaseApp from "../../../data/firebase";
import { useNavigationStore } from "../../../data/state/navigationStore";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { ArrowLeft, LogOut, User, Mail, Code2, Info, Palette } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { useTheme } from "../../../components/theme-provider";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const Preferences = () => {
  const snippetHome = useNavigationStore((state) => state.snippetHome);
  const { theme, setTheme } = useTheme();

  const logoutUser = async () => {
    await signOut(firebaseApp.auth);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="p-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              snippetHome();
            }}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Preferences</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Account Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account
              </CardTitle>
              <CardDescription>
                Manage your account information and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">
                      {firebaseApp.auth.currentUser?.displayName || "Not set"}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">
                      {firebaseApp.auth.currentUser?.email || "Not set"}
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="pt-2">
                <Button variant="destructive" onClick={logoutUser}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize the appearance of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose between light, dark, or system default theme
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Editor Settings Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                Editor Settings
              </CardTitle>
              <CardDescription>
                Configure code editor preferences and behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <p className="text-sm">
                  Editor settings coming soon...
                </p>
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                About
              </CardTitle>
              <CardDescription>
                Application information and credits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={assets.LOGO} alt="App Logo" className="h-16 w-16" />
                <div>
                  <h3 className="text-lg font-semibold">Simple Snippet Manager</h3>
                  <Badge variant="secondary" className="mt-1">
                    v0.5.0
                  </Badge>
                </div>
              </div>
              <Separator />
              <div className="text-sm text-muted-foreground">
                <p>
                  Icons made by{" "}
                  <a
                    href="http://www.freepik.com/"
                    title="Freepik"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Freepik
                  </a>{" "}
                  from{" "}
                  <a
                    href="https://www.flaticon.com/"
                    title="Flaticon"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.flaticon.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
