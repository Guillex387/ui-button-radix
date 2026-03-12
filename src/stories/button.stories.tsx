import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import type { ComponentType } from 'react';
import { Button } from '../components/ui/button';

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
      options: ['primary', 'secondary', 'delete', 'ghost'],
      description: 'Variante visual del botón',
    },
    size: {
      control: 'select',
      options: ['default', 'size100', 'iconDefault', 'iconGhost200', 'iconGhost100', 'iconGhost50'],
      description: 'Tamaño',
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el botón',
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
  },
} satisfies Meta<typeof Button>;

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

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
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
      <Button variant="ghost">Ghost</Button>
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
      <Button variant="ghost" size="iconGhost200" iconLeft={IconLeft} aria-label="Ghost 200" />
      <Button variant="ghost" size="iconGhost100" iconLeft={IconLeft} aria-label="Ghost 100" />
      <Button variant="ghost" size="iconGhost50" iconLeft={IconLeft} aria-label="Ghost 50" />
    </div>
  ),
};

export const IconSizesOnly: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <Button variant="primary" size="iconDefault" iconLeft={IconLeft} aria-label="Icon default" />
        <span className="text-xs text-gray-500">iconDefault (48×48, 24px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button variant="ghost" size="iconGhost200" iconLeft={IconLeft} aria-label="Ghost 200" />
        <span className="text-xs text-gray-500">iconGhost200 (36×36, 20px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button variant="ghost" size="iconGhost100" iconLeft={IconLeft} aria-label="Ghost 100" />
        <span className="text-xs text-gray-500">iconGhost100 (24×24, 16px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button variant="ghost" size="iconGhost50" iconLeft={IconLeft} aria-label="Ghost 50" />
        <span className="text-xs text-gray-500">iconGhost50 (16×16, 12px)</span>
      </div>
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
      <Button variant="ghost" iconLeft={IconLeft} iconRight={IconRight}>
        Ghost
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
