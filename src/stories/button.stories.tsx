import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import type { ComponentType } from 'react';
import { Button } from '../components/ui/button';

/** Args de la story: incluye dataState solo para el control (se pasa como data-state al botón). */
type ButtonStoryArgs = React.ComponentProps<typeof Button> & {
  dataState?: 'default' | 'hover' | 'active' | 'focus' | 'disabled';
};

// -----------------------------------------------------------------------------
// Constantes (una sola fuente de verdad para variantes y tamaños)
// -----------------------------------------------------------------------------

const VARIANTS = [
  'primary',
  'secondary',
  'delete',
  'ghost',
  'ghostDelete',
  'tertiary',
  'primaryAlternative',
  'primaryAlternativeNeutral',
  'secondaryAlternative',
  'tertiaryAlternative',
  'tertiaryAlternativeDecorative',
  'deleteAlternative',
] as const;

const VARIANT_LABELS: Record<(typeof VARIANTS)[number], string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  delete: 'Delete',
  ghost: 'Ghost',
  ghostDelete: 'Ghost Delete',
  tertiary: 'Tertiary',
  primaryAlternative: 'Primary Alternative',
  primaryAlternativeNeutral: 'Primary Alt Neutral',
  secondaryAlternative: 'Secondary Alternative',
  tertiaryAlternative: 'Tertiary Alternative',
  tertiaryAlternativeDecorative: 'Tertiary Alt Decorative',
  deleteAlternative: 'Delete Alternative',
};

const SIZES = ['default', 'size100', 'iconDefault', 'icon200', 'icon100', 'icon50'] as const;

const ICON_SIZE_SPECS: Record<string, string> = {
  iconDefault: '48×48, 24px',
  icon200: '36×36, 20px',
  icon100: '24×24, 16px',
  icon50: '16×16, 12px',
};

// -----------------------------------------------------------------------------
// Iconos para las stories
// -----------------------------------------------------------------------------

const IconLeft = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" aria-hidden>
    <circle cx="5" cy="11" r="1.5" />
    <circle cx="11" cy="11" r="1.5" />
    <circle cx="17" cy="11" r="1.5" />
  </svg>
);

const IconRight = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M5 11h12M12 5l6 6-6 6" />
  </svg>
);

const IconSend = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M20 2L2 11l18 9-4-9 4-9z" />
    <path d="M20 2L10 13" />
  </svg>
);

// -----------------------------------------------------------------------------
// Decoradores reutilizables
// -----------------------------------------------------------------------------

const darkBackgroundDecorator = (Story: React.ComponentType) => (
  <div className="bg-[#1a1a1a] p-8 rounded-lg">
    <Story />
  </div>
);

// -----------------------------------------------------------------------------
// Meta
// -----------------------------------------------------------------------------

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [...VARIANTS],
      description: 'Variante visual del botón',
    },
    size: {
      control: 'select',
      options: [...SIZES],
      description: 'Tamaño',
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el botón',
    },
    dataState: {
      control: 'select',
      options: ['default', 'hover', 'active', 'focus', 'disabled'],
      mapping: {
        default: undefined,
        hover: 'hover',
        active: 'active',
        focus: 'focus',
        disabled: 'disabled',
      },
      description: 'Estado visual forzado (atributo data-state del botón)',
    },
    children: {
      control: 'text',
      description: 'Contenido del botón',
    },
    iconLeft: { table: { disable: true } },
    iconRight: { table: { disable: true } },
  },
  args: {
    onClick: fn(),
    children: 'Button',
    dataState: undefined,
  },
  render: (args: ButtonStoryArgs) => {
    const { dataState, ...rest } = args;
    return (
      <Button
        {...rest}
        data-state={dataState === 'default' || dataState == null ? undefined : dataState}
      />
    );
  },
} as Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Playground
// =============================================================================

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

// =============================================================================
// Variantes (una story por variante para documentación rápida)
// =============================================================================

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Delete: Story = {
  args: { variant: 'delete', children: 'Delete' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const GhostDelete: Story = {
  args: { variant: 'ghostDelete', children: 'Ghost Delete' },
};

export const Tertiary: Story = {
  args: { variant: 'tertiary', children: 'Tertiary' },
};

export const DeleteAlternative: Story = {
  args: { variant: 'deleteAlternative', children: 'Delete Alternative' },
};

export const PrimaryAlternative: Story = {
  args: { variant: 'primaryAlternative', children: 'Primary Alternative' },
};

export const PrimaryAlternativeNeutral: Story = {
  args: { variant: 'primaryAlternativeNeutral', children: 'Primary Alt Neutral' },
  parameters: { backgrounds: { default: 'dark' } },
  decorators: [darkBackgroundDecorator],
};

export const SecondaryAlternative: Story = {
  args: { variant: 'secondaryAlternative', children: 'Secondary Alternative' },
  parameters: { backgrounds: { default: 'dark' } },
  decorators: [darkBackgroundDecorator],
};

export const TertiaryAlternative: Story = {
  args: { variant: 'tertiaryAlternative', children: 'Tertiary Alternative' },
  parameters: { backgrounds: { default: 'dark' } },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="bg-[#2352D2] p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export const TertiaryAlternativeDecorative: Story = {
  args: { variant: 'tertiaryAlternativeDecorative', children: 'Tertiary Alt Decorative' },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="bg-[#FFEF85] p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

// =============================================================================
// Estados
// =============================================================================

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled',
  },
};

// =============================================================================
// Con iconos
// =============================================================================

export const WithIconLeft: Story = {
  args: {
    variant: 'primary',
    children: 'With icon left',
    iconLeft: IconLeft as ComponentType<{ className?: string }>,
  },
};

export const WithIconRight: Story = {
  args: {
    variant: 'primary',
    children: 'With icon right',
    iconRight: IconRight as ComponentType<{ className?: string }>,
  },
};

export const WithBothIcons: Story = {
  args: {
    variant: 'primary',
    children: 'Submit',
    iconLeft: IconSend as ComponentType<{ className?: string }>,
    iconRight: IconRight as ComponentType<{ className?: string }>,
  },
};

// =============================================================================
// Showcases (todas las variantes / tamaños)
// =============================================================================

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {VARIANTS.map((v) => (
        <Button key={v} variant={v}>
          {VARIANT_LABELS[v]}
        </Button>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      <Button variant="primary" size="default">
        Default
      </Button>
      <Button variant="primary" size="size100">
        Size 100
      </Button>
      <Button variant="primary" size="iconDefault" iconLeft={IconLeft} aria-label="Icon default" />
      <Button variant="ghost" size="icon200" iconLeft={IconLeft} aria-label="Icon 200" />
      <Button variant="ghost" size="icon100" iconLeft={IconLeft} aria-label="Icon 100" />
      <Button variant="ghost" size="icon50" iconLeft={IconLeft} aria-label="Icon 50" />
    </div>
  ),
};

export const IconSizesOnly: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      {(['iconDefault', 'icon200', 'icon100', 'icon50'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Button variant="ghost" size={size} iconLeft={IconLeft} aria-label={size} />
          <span className="text-xs text-gray-500">{size} ({ICON_SIZE_SPECS[size]})</span>
        </div>
      ))}
    </div>
  ),
};

export const WithIconsAllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {VARIANTS.map((v) => (
        <Button key={v} variant={v} iconLeft={IconLeft} iconRight={IconRight}>
          {VARIANT_LABELS[v]}
        </Button>
      ))}
    </div>
  ),
};

// =============================================================================
// Composición
// =============================================================================

export const AsChild: Story = {
  render: () => (
    <Button asChild>
      <a href="#as-child">Link as button</a>
    </Button>
  ),
};
