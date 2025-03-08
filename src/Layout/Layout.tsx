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
  Workflow,
} from "lucide-react";
import { ReactNode } from "react";
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
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("tokens");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-20 sm:px-6 lg:px-20">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="ml-2 text-xl font-semibold">KAIE</span>
            </div>

            {/* Middle - Navigation Menu */}
            <NavigationMenu>
              <NavigationMenuList className="hidden sm:flex space-x-4">
                <NavigationMenuItem className="border rounded-md">
                  <NavigationMenuTrigger className="text-xs">
                    <LayoutDashboard className="w-3.5 h-3.5 mr-2" /> Dashboard
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px]">
                      <ListItem href="/dashboard/overview" title="Overview">
                        Monitor real-time data and key performance indicators
                      </ListItem>
                      <ListItem href="/dashboard/analytics" title="Analytics">
                        Track user behavior and engagement metrics
                      </ListItem>
                      <ListItem href="/dashboard/reports" title="Reports">
                        Generate and export custom reports
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

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

                <NavigationMenuItem className="border rounded-md">
                  <NavigationMenuTrigger className="text-xs">
                    <Workflow className="w-3.5 h-3.5 mr-2" /> Integration
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px]">
                      <ListItem
                        href="/integration/apis"
                        title="API Integration"
                      >
                        Connect and manage third-party APIs
                      </ListItem>
                      <ListItem href="/integration/webhooks" title="Webhooks">
                        Set up and monitor webhook endpoints
                      </ListItem>
                      <ListItem href="/integration/plugins" title="Plugins">
                        Browse and install platform plugins
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
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
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
