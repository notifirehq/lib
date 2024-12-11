import { cn } from '@/utils/ui';
import { HTMLAttributes } from 'react';

type EmailTabsSectionProps = HTMLAttributes<HTMLDivElement>;
export const EmailTabsEditSection = (props: EmailTabsSectionProps) => {
  const { className, ...rest } = props;
  return <div className={cn('p-4', className)} {...rest} />;
};

type EmailTabsPreviewSectionProps = HTMLAttributes<HTMLDivElement>;
export const EmailTabsPreviewSection = (props: EmailTabsPreviewSectionProps) => {
  const { className, ...rest } = props;
  return <div className={cn('p-4', className)} {...rest} />;
};
