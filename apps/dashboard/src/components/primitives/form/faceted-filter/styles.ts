export const STYLES = {
  size: {
    default: {
      trigger: 'h-8',
      input: 'h-8',
      content: 'p-2',
      item: 'py-1.5 px-2',
      badge: 'px-2 py-0.5 text-xs',
      separator: 'h-4',
    },
    small: {
      trigger: 'h-7 px-1.5 py-1.5',
      input: 'h-7 px-2 py-1.5',
      content: 'p-1.5',
      item: 'py-1 px-1.5',
      badge: 'px-1.5 py-0 text-[11px]',
      separator: 'h-3.5 mx-1',
    },
  },
  input: {
    base: 'border-neutral-200 placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-0 focus:ring-offset-0',
    text: 'text-neutral-600',
  },
  clearButton: 'w-full justify-center px-2 text-xs text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
} as const;
