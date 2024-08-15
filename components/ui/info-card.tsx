import * as React from 'react';

import { cn } from '@/lib/utils';
import infoCardStyles from '@/styles/info-card.module.css';

const InfoCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex-1 rounded-lg border bg-card shadow-sm p-4',
      className,
      infoCardStyles.card
    )}
    {...props}
  />
));
InfoCard.displayName = 'InfoCard';

const InfoCardIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('w-10 h-10', className, infoCardStyles.cardIcon)}
    {...props}
  />
));
InfoCardIcon.displayName = 'InfoCardIcon';

const InfoCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm font-normal mt-3', className, infoCardStyles.cardTitle)}
    {...props}
  />
));
InfoCardTitle.displayName = 'InfoCardTitle';

const InfoCardContent = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-xl font-semibold mt-1', className, infoCardStyles.cardContent)}
    {...props}
  />
));
InfoCardContent.displayName = 'InfoCardContent';

export { InfoCard, InfoCardIcon, InfoCardTitle, InfoCardContent };
