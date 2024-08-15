import Link from 'next/link';
import {
  Home,
  Package,
  PanelLeft,
  ShoppingCart,
  User as UserIcon,
  Users2,
  CircleHelp
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { AlermIcon, TeqqedLogo } from '@/components/icons';
import layoutStyles from '@/styles/layout.module.css';
import navStyles from '@/styles/nav.module.css';
import Providers from './providers';
import { NavItem, NavOverview } from './nav-item';
import BalancePanel from './balance-panel';
import { User } from './user';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main
        className={`flex min-h-screen w-full flex-col ${layoutStyles.main}`}
      >
        <DesktopNav />
        <div
          className={`flex flex-col flex-1 sm:pl-14 ${layoutStyles.desktopLayout}`}
        >
          <header
            className={`sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-transparent p-3 sm:static sm:h-auto sm:border-0 sm:p-3 ${layoutStyles.dashboardHeader}`}
          >
            <MobileNav />
            <BalancePanel />
            <User/>
          </header>
          <main className="flex flex-1 items-start justify-center bg-transparent py-16 sm:px-0 sm:w-full">
            {children}
          </main>
        </div>
      </main>
    </Providers>
  );
}

function DesktopNav() {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex ${navStyles.desktopNav}`}
    >
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex shrink-0 items-center justify-center gap-x-32 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:text-base"
        >
          <TeqqedLogo />
          <AlermIcon className={'transition-all group-hover:scale-110'} />
        </Link>
        <NavOverview href="/" label="Dashboard" title="Dashboard" />

        <NavItem href="/" label="Dashboard">
          <Home className="h-5 w-5" />
        </NavItem>

        <NavItem href="/" label="My proxies">
          <ShoppingCart className="h-5 w-5" />
        </NavItem>

        <NavItem href="/" label="Top up balance">
          <Package className="h-5 w-5" />
        </NavItem>

        <NavItem href="/customers" label="Transactions">
          <Users2 className="h-5 w-5" />
        </NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-2 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className="flex h-9 w-48 gap-2 items-center justify-start rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-48"
            >
              <CircleHelp className="h-5 w-5" />
              <span className="flex">Support</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Support</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className="flex h-9 w-48 gap-2 items-center justify-start rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-48"
            >
              <UserIcon className="h-5 w-5" />
              <span className="flex">User</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">@userxyz</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className={`sm:hidden bg-transparent border-gray-300 hover:bg-grey-200 color:bg-grey-300 ${navStyles.mobileNavButton}`}
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className={`sm:max-w-xs p-0 ${navStyles.mobileNav}`}
      >
        <nav className="flex flex-col items-start gap-4 px-2 py-4">
          <Link
            href="/"
            className="group flex shrink-0 items-center justify-start gap-x-32 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:text-base"
          >
            <TeqqedLogo />
          </Link>
          <NavOverview href="#" label="Dashboard" title="Dashboard" />

          <NavItem href="#" label="Dashboard">
            <Home className="h-5 w-5" />
          </NavItem>

          <NavItem href="#" label="My proxies">
            <ShoppingCart className="h-5 w-5" />
          </NavItem>

          <NavItem href="/" label="Top up balance">
            <Package className="h-5 w-5" />
          </NavItem>

          <NavItem href="/customers" label="Transactions">
            <Users2 className="h-5 w-5" />
          </NavItem>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-2 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-48 gap-2 items-center justify-start rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-48"
              >
                <CircleHelp className="h-5 w-5" />
                <span className="flex">Support</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Support</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-48 gap-2 items-center justify-start rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-48"
              >
                <UserIcon className="h-5 w-5" />
                <span className="flex">User</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">@userxyz</TooltipContent>
          </Tooltip>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
