import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  Bell,
  ChartPie,
  CreditCard,
  LayoutDashboard,
  LogOut,
  NotepadText,
  Settings,
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { getProfileAll, ProfileResponse } from "@/Services/auth.service";
import { toast } from "sonner";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileResponse | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfileAll();
        setProfile(profileData);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    Cookies.remove("tokens");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-accent/10">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="px-20 sm:px-6 lg:px-20">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="ml-2 text-xl font-semibold">KAIE</span>
            </div>

            {/* Middle - Navigation Menu */}
            <NavigationMenu className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="outline" className="text-xs">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </Button>
              </Link>

              <NavigationMenuList className="hidden sm:flex space-x-4">
                <NavigationMenuItem className="border rounded-md">
                  <NavigationMenuTrigger className="text-xs">
                    <ChartPie className="w-3.5 h-3.5 mr-2" /> Analytics
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px]">
                      <ListItem
                        href="/analytics/user-behavior"
                        title="User Behavior"
                      >
                        Understand how users interact with your platform
                      </ListItem>
                      <ListItem
                        href="/analytics/conversion"
                        title="Conversion Analysis"
                      >
                        Track conversion rates and optimization metrics
                      </ListItem>
                      <ListItem href="/analytics/retention" title="Retention">
                        Monitor user retention and engagement patterns
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem className="rounded-md">
                  <Link to="/billing">
                    <Button variant="outline" className="text-xs">
                      <CreditCard className="w-3.5 h-3.5" />
                      Billing
                    </Button>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem className="border rounded-md">
                  <NavigationMenuTrigger className="text-xs">
                    <NotepadText className="w-3.5 h-3.5 mr-2" /> Reports
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px]">
                      <ListItem href="/reports/custom" title="Custom Reports">
                        Create and save custom report templates
                      </ListItem>
                      <ListItem
                        href="/reports/scheduled"
                        title="Scheduled Reports"
                      >
                        Manage automated report generation
                      </ListItem>
                      <ListItem href="/reports/export" title="Export Options">
                        Configure report export settings
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem className="border rounded-md">
                  <NavigationMenuTrigger className="text-xs">
                    <Settings className="w-3.5 h-3.5 mr-2" /> API Settings
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px]">
                      <ListItem
                        href="/api/documentation"
                        title="API Documentation"
                      >
                        Access comprehensive API guides and references
                      </ListItem>
                      <ListItem href="/api/keys" title="API Keys">
                        Manage your API keys and access tokens
                      </ListItem>
                      <ListItem href="/api/usage" title="Usage & Limits">
                        Monitor API usage and rate limits
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right side - User Profile */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell />
              </Button>
              <Button variant="outline" size="sm">
                <Settings />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="bg-destructive">
                    <AvatarImage
                      src={profile?.data.name?.charAt(0).toUpperCase() || "U"}
                      alt={profile?.data.name || ""}
                    />
                    <AvatarFallback className="text-sm bg-destructive text-background font-bold">
                      {profile?.data.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {profile?.data.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {profile?.data.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-20 sm:px-6 lg:px-20 py-6">{children}</main>
    </div>
  );
};

// ListItem component
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Layout;
