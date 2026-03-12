import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import type { ComponentType } from 'react';
import { Button } from '../components/ui/button';

/** Args de la story: incluye dataState solo para el control (se pasa como data-state al botón). */
type ButtonStoryArgs = React.ComponentProps<typeof Button> & {
  dataState?: 'default' | 'hover' | 'active' | 'focus' | 'disabled';
};

/* Iconos para las stories */
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
      options: ['primary', 'secondary', 'delete', 'tertiary', 'primaryAlternative', 'primaryAlternativeNeutral', 'secondaryAlternative', 'tertiaryAlternative', 'tertiaryAlternativeDecorative'],
      description: 'Variante visual del botón',
    },
    size: {
      control: 'select',
      options: ['default'],
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
    return <Button {...rest} data-state={dataState === 'default' || dataState == null ? undefined : dataState} />;
  },
} as Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Delete: Story = {
  args: {
    variant: 'delete',
    children: 'Delete',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary',
  },
};

export const PrimaryAlternative: Story = {
  args: {
    variant: 'primaryAlternative',
    children: 'Primary Alternative',
  },
};

export const PrimaryAlternativeNeutral: Story = {
  args: {
    variant: 'primaryAlternativeNeutral',
    children: 'Primary Alternative Neutral',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="bg-[#1a1a1a] p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export const SecondaryAlternative: Story = {
  args: {
    variant: 'secondaryAlternative',
    children: 'Secondary Alternative',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="bg-[#1a1a1a] p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export const TertiaryAlternative: Story = {
  args: {
    variant: 'tertiaryAlternative',
    children: 'Tertiary Alternative',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="bg-[#2352D2] p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export const TertiaryAlternativeDecorative: Story = {
  args: {
    variant: 'tertiaryAlternativeDecorative',
    children: 'Tertiary Alternative Decorative',
  },
  decorators: [
    (Story) => (
      <div className="bg-[#FFEF85] p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled',
  },
};

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

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="delete">Delete</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="primaryAlternative">Primary Alternative</Button>
      <Button variant="primaryAlternativeNeutral">Primary Alt Neutral</Button>
      <Button variant="secondaryAlternative">Secondary Alternative</Button>
      <Button variant="tertiaryAlternative">Tertiary Alternative</Button>
      <Button variant="tertiaryAlternativeDecorative">Tertiary Alt Decorative</Button>
    </div>
  ),
};

export const WithIconsAllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary" iconLeft={IconLeft} iconRight={IconRight}>
        Primary
      </Button>
      <Button variant="secondary" iconLeft={IconLeft} iconRight={IconRight}>
        Secondary
      </Button>
      <Button variant="delete" iconLeft={IconLeft} iconRight={IconRight}>
        Delete
      </Button>
      <Button variant="tertiary" iconLeft={IconLeft} iconRight={IconRight}>
        Tertiary
      </Button>
      <Button variant="primaryAlternative" iconLeft={IconLeft} iconRight={IconRight}>
        Primary Alternative
      </Button>
      <Button variant="primaryAlternativeNeutral" iconLeft={IconLeft} iconRight={IconRight}>
        Primary Alt Neutral
      </Button>
      <Button variant="secondaryAlternative" iconLeft={IconLeft} iconRight={IconRight}>
        Secondary Alternative
      </Button>
      <Button variant="tertiaryAlternative" iconLeft={IconLeft} iconRight={IconRight}>
        Tertiary Alternative
      </Button>
      <Button variant="tertiaryAlternativeDecorative" iconLeft={IconLeft} iconRight={IconRight}>
        Tertiary Alt Decorative
      </Button>
    </div>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Button asChild>
      <a href="#as-child">Link as button</a>
    </Button>
  ),
};
