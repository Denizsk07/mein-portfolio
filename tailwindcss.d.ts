declare module 'tailwindcss/lib/util/flattenColorPalette' {
    import { ColorValue } from 'tailwindcss/types/config';
    export default function flattenColorPalette(colors: Record<string, ColorValue>): Record<string, string>;
  }
  