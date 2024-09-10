import Link from "next/link";
import { Home, LineChart, Settings, PenTool, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <PenTool className="h-6 w-6" />
            <span className="">Quizzly AI</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-md font-medium lg:px-4">
            <Link
              href="http://localhost:3000/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-2 mb-4"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="http://localhost:3000/quiz"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mb-4"
            >
              <LineChart className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mb-4"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mb-4"
            >
              <Info className="h-4 w-4" />
              About
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4 mb-5">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4 mb-3">
              <CardTitle className="mb-2">Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
