import { forwardRef, type ComponentProps, type ComponentType } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const iconSlotClasses =
  'shrink-0 flex items-center justify-center [&_svg]:size-[22px] [&_svg]:shrink-0 [&_svg]:pointer-events-none';

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-btn)]',
    'font-sans font-semibold text-base leading-normal cursor-pointer box-border',
    'transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-[22px]',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'min-w-[68px] px-[var(--spacing-btn-x)] py-[var(--spacing-btn-y)]',
          'bg-btn-primary text-white border border-transparent',
          'hover:bg-btn-primary-hover hover:text-white',
          'active:bg-btn-primary-active active:text-white',
          'focus-visible:outline-btn-primary-focus-ring',
          'disabled:bg-btn-primary-disabled-bg disabled:border-btn-primary-disabled-border disabled:text-btn-primary-disabled-text disabled:opacity-100',
          'data-[state=hover]:bg-btn-primary-hover data-[state=hover]:text-white',
          'data-[state=active]:bg-btn-primary-active data-[state=active]:text-white',
          'data-[state=focus]:bg-btn-primary data-[state=focus]:outline data-[state=focus]:outline-2 data-[state=focus]:outline-offset-0 data-[state=focus]:outline-btn-primary-focus-ring',
          'data-[state=disabled]:bg-btn-primary-disabled-bg data-[state=disabled]:border-btn-primary-disabled-border data-[state=disabled]:text-btn-primary-disabled-text data-[state=disabled]:pointer-events-none',
        ].join(' '),
        secondary: [
          'min-w-[68px] px-[var(--spacing-btn-x)] py-[var(--spacing-btn-y)]',
          'bg-white text-btn-secondary-text border border-btn-secondary-border',
          'hover:bg-btn-secondary-hover-bg hover:border-btn-secondary-hover-border hover:text-btn-secondary-hover-text',
          'active:bg-btn-secondary-active-bg active:border-btn-secondary-active-border active:text-btn-secondary-hover-text',
          'focus-visible:outline-btn-secondary-focus-border focus-visible:bg-white focus-visible:text-btn-secondary-hover-text',
          'disabled:bg-white disabled:border-btn-secondary-disabled-border disabled:text-btn-secondary-disabled-text disabled:opacity-100',
          'data-[state=hover]:bg-btn-secondary-hover-bg data-[state=hover]:border-btn-secondary-hover-border data-[state=hover]:text-btn-secondary-hover-text',
          'data-[state=active]:bg-btn-secondary-active-bg data-[state=active]:border-btn-secondary-active-border data-[state=active]:text-btn-secondary-hover-text',
          'data-[state=focus]:outline data-[state=focus]:outline-2 data-[state=focus]:outline-offset-0 data-[state=focus]:outline-btn-secondary-focus-border data-[state=focus]:bg-white data-[state=focus]:text-btn-secondary-hover-text',
          'data-[state=disabled]:bg-white data-[state=disabled]:border-btn-secondary-disabled-border data-[state=disabled]:text-btn-secondary-disabled-text data-[state=disabled]:pointer-events-none',
        ].join(' '),
        delete: [
          'min-w-[68px] px-[var(--spacing-btn-x)] py-[var(--spacing-btn-y)]',
          'bg-btn-delete text-white border border-transparent',
          'hover:bg-btn-delete-hover hover:text-white',
          'active:bg-btn-delete-active active:text-white',
          'focus-visible:outline-btn-delete-focus-ring',
          'disabled:bg-btn-delete-disabled-bg disabled:border disabled:border-btn-delete-disabled-border disabled:text-btn-delete-disabled-text disabled:opacity-100',
          'data-[state=hover]:bg-btn-delete-hover data-[state=hover]:text-white',
          'data-[state=active]:bg-btn-delete-active data-[state=active]:text-white',
          'data-[state=focus]:bg-btn-delete data-[state=focus]:outline data-[state=focus]:outline-2 data-[state=focus]:outline-offset-0 data-[state=focus]:outline-btn-delete-focus-ring',
          'data-[state=disabled]:bg-btn-delete-disabled-bg data-[state=disabled]:border data-[state=disabled]:border-btn-delete-disabled-border data-[state=disabled]:text-btn-delete-disabled-text data-[state=disabled]:pointer-events-none',
        ].join(' '),
      },
      size: {
        default: 'h-auto min-h-[48px]',
        size100: [
          'h-[var(--size-button-100-h)] min-h-0',
          'px-[var(--spacing-button-100-x)] py-[var(--spacing-button-100-y)]',
          'gap-[var(--spacing-button-100-gap)]',
          'text-[length:var(--font-size-button-100)]',
          '[&_svg]:size-[var(--size-button-icon-100)]',
        ].join(' '),
        // size200: '',
        // size50: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** Icon always aligned to the left. Ignored when asChild. */
    iconLeft?: ComponentType<{ className?: string }>;
    /** Icon always aligned to the right. Ignored when asChild. */
    iconRight?: ComponentType<{ className?: string }>;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      variant,
      size,
      iconLeft: IconLeft,
      iconRight: IconRight,
      children,
      className,
      disabled,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const hasIconSlots = Boolean(IconLeft || IconRight);
    const mergedClassName = cn(
      buttonVariants({ variant, size, className }),
      hasIconSlots ? 'justify-between' : 'justify-center'
    );

    if (asChild) {
      return (
        <Slot ref={ref} className={mergedClassName} {...props}>
          {children}
        </Slot>
      );
    }

    if (!hasIconSlots) {
      return (
        <button ref={ref} type={type} disabled={disabled} className={mergedClassName} {...props}>
          {children}
        </button>
      );
    }

    return (
      <button ref={ref} type={type} disabled={disabled} className={mergedClassName} {...props}>
        <span className="flex min-w-0 flex-1 items-center justify-start gap-2">
          {IconLeft && (
            <span className={iconSlotClasses} aria-hidden>
              <IconLeft />
            </span>
          )}
          <span className="truncate text-left">{children}</span>
        </span>
        {IconRight && (
          <span className={iconSlotClasses} aria-hidden>
            <IconRight />
          </span>
        )}
      </button>
    );
  },
);

// Debug name
Button.displayName = 'ButtonCustom';
