import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex justify-end p-8 bg-accent-foreground">
      <NavigationMenu>
        <NavigationMenuList className="space-x-4">
          <NavigationMenuItem>
            <Link href="/" passHref>
              <Button variant="default" className="bg-transparent shadow-none">
                Store
              </Button>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/orders" passHref>
              <Button variant="default" className="bg-transparent shadow-none">
                Orders
              </Button>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white">
              Login
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Sign In</NavigationMenuLink>
              <NavigationMenuLink>Sign Up</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
