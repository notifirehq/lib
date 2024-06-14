import { ButtonStylesNames } from '@mantine/core';
import { defineSlotRecipe } from '@pandacss/dev';
import { colorPaletteGradient } from '../ingredients';

const SLOTS: ButtonStylesNames[] = ['root', 'inner', 'label', 'loader', 'section'];

export const BUTTON_RECIPE = defineSlotRecipe({
  className: 'button',
  jsx: ['Button'],
  slots: SLOTS,
  base: {
    root: {
      // default color palette
      colorPalette: 'mode.cloud',
      _disabled: {
        opacity: 'disabled',
      },
      '&:hover:not(:disabled)': {
        opacity: 'hover',
      },
      display: 'inline !important',
      width: '[fit-content !important]',
    },
    label: {
      color: 'typography.text.main',
      width: '[fit-content]',
      lineClamp: 1,
    },
  },
  defaultVariants: { variant: 'filled' },
  variants: {
    variant: {
      filled: {
        root: { ...colorPaletteGradient, border: '[none !important]' },
        label: {
          color: 'button.text.filled',
        },
        section: {
          '& svg': {
            color: 'button.text.filled !important',
          },
        },
      },
      outline: {
        root: {
          border: 'solid !important',
          borderColor: 'colorPalette.start !important',
          bg: 'button.secondary.background',

          boxShadow: 'medium',
          _disabled: {
            bg: '[transparent !important]',
          },
        },
        label: {
          color: 'typography.text.main !important',
        },
        section: {
          '& svg': {
            color: 'typography.text.main !important',
          },
        },
      },
      transparent: {
        root: {
          border: 'none !important',
          bg: '[transparent !important]',
          px: '0 !important',
        },
        label: {
          color: 'colorPalette.start',
        },
        section: {
          '& svg': {
            fill: 'colorPalette.start',
          },
        },
      },
    },
  },
});
