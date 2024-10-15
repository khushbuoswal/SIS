import Sidebar from "@/components/ui/sidebar";
import { UserDropdown } from "@/components/ui/userDropdown";
import { Target, Mail, Eye, PenTool } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Support() {
  return (
    <main className="flex flex-col justify-center items-center size-full">
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar />

        <div className="flex flex-col">
          <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-6 lg:h-[70px]">
            <UserDropdown />
          </header>

          <main className="flex flex-1 flex-col gap-6 p-6 lg:gap-8 lg:p-8 items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full mt-5">
              {/* About Us Card */}
              <Card className="w-full max-w-md p-4">
                <CardHeader className="flex items-center space-x-4">
                  <PenTool className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm lg:text-base text-muted-foreground">
                        Email us at quizzly@outlook.com
                  </p>
                </CardContent>
              </Card>

              {/* Our Mission Card */}
              <Card className="w-full max-w-md p-4">
                <CardHeader className="flex items-center space-x-4">
                  <Target className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Phone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm lg:text-base text-muted-foreground">
                        Call us on 0478923461
                  </p>
                </CardContent>
              </Card>

              {/* Our Vision Card */}
              <Card className="w-full max-w-md p-4">
                <CardHeader className="flex items-center space-x-4">
                  <Eye className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Social Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm lg:text-base text-muted-foreground">
                       Find us on Instagram and Facebook  @quizzly_24

                  </p>
                </CardContent>
              </Card>

              {/* Get In Touch Card */}
              <Card className="w-full max-w-md p-4">
                <CardHeader className="flex items-center space-x-4">
                  <Mail className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm lg:text-base text-muted-foreground">
                  123 Harbour View Rd, Level 5, Sydney, NSW 2000, Australia
                  </p>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}
