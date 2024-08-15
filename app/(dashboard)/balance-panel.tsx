
import navStyles from '@/styles/nav.module.css';
import clsx from 'clsx';

export default function BalancePanel(props: {}) {
  return (
    <div
      className={clsx(
        `${navStyles.navOverview} mr-auto flex flex-row p-3 gap-2 h-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-neutral-200 md:h-8`
      )}
    >
      <span className="flex h-5">{`Balance`}</span>
      <span className="flex h-5">{`$122,00`}</span>
      <span className="flex h-5">{`+`}</span>
    </div>
  );
}
