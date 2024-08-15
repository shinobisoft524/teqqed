'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import navStyles from '@/styles/nav.module.css';

export function NavItem({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={clsx(
            'flex p-2 gap-2 h-9 w-48 items-center justify-start rounded-lg text-muted-foreground transition-colors hover:text-neutral-200 md:h-8 md:w-48',
            {
              [navStyles.selectedNavItem]: pathname === href
            }
          )}
        >
          {children}
          <span className="flex">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

export function NavOverview({ href, label, title }: { href: string; label: string; title?: string }) {
  const pathname = usePathname();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={clsx(
            `${navStyles.navOverview} flex flex-col p-3 gap-3 h-24 w-48 items-start justify-start rounded-lg text-muted-foreground transition-colors hover:text-neutral-200 md:h-24 md:w-48`
          )}
        >
          <span className="flex h-5">{label}</span>
          <span className={`flex flex-1 w-full items-center justify-center h-8 text-sm ${navStyles.navOverviewTitle}`}>{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}
