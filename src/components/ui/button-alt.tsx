import { forwardRef, type ComponentType, type ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/utils';

const iconSizeClasses =
  'size-[22px] shrink-0 flex items-center justify-center [&_svg]:size-full [&_svg]:object-contain';

export type ButtonAltVariant = 'primary' | 'secondary' | 'delete';

/** For demo/showcase: force visual state without interaction (sets data-state). */
export type ButtonAltState = 'default' | 'hover' | 'active' | 'focus' | 'disabled';

export interface ButtonAltProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Render as child element (Radix Slot). Merges props onto the single child; child provides full content. */
  asChild?: boolean;
  /** Visual variant. */
  variant?: ButtonAltVariant;
  /** Force visual state for demos (e.g. state="hover" to show hover style). */
  state?: ButtonAltState;
  /** Optional icon before label. Ignored when asChild. */
  iconLeft?: ComponentType<{ className?: string }>;
  /** Optional icon after label (replaces default arrow). Ignored when asChild. */
  iconRight?: ComponentType<{ className?: string }>;
  /** Button label (or full content when asChild). */
  children?: ReactNode;
  /** Additional class names. */
  className?: string;
}

const variantClasses: Record<ButtonAltVariant, string> = {
  primary: [
    'bg-btn-primary text-white border border-transparent',
    'hover:bg-btn-primary-hover hover:text-white',
    'active:bg-btn-primary-active active:text-white',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-btn-primary-focus-ring',
    'disabled:bg-btn-primary-disabled-bg disabled:border-btn-primary-disabled-border disabled:text-btn-primary-disabled-text disabled:cursor-not-allowed',
    /* forced states for demo */
    'data-[state=hover]:bg-btn-primary-hover data-[state=hover]:text-white',
    'data-[state=active]:bg-btn-primary-active data-[state=active]:text-white',
    'data-[state=focus]:bg-btn-primary data-[state=focus]:outline data-[state=focus]:outline-2 data-[state=focus]:outline-offset-0 data-[state=focus]:outline-btn-primary-focus-ring',
    'data-[state=disabled]:bg-btn-primary-disabled-bg data-[state=disabled]:border-btn-primary-disabled-border data-[state=disabled]:text-btn-primary-disabled-text data-[state=disabled]:pointer-events-none',
  ].join(' '),
  secondary: [
    'bg-white text-btn-secondary-text border border-btn-secondary-border',
    'hover:bg-btn-secondary-hover-bg hover:border-btn-secondary-hover-border hover:text-btn-secondary-hover-text',
    'active:bg-btn-secondary-active-bg active:border-btn-secondary-active-border active:text-btn-secondary-hover-text',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-btn-secondary-focus-border focus-visible:bg-white focus-visible:text-btn-secondary-hover-text',
    'disabled:bg-white disabled:border-btn-secondary-disabled-border disabled:text-btn-secondary-disabled-text disabled:cursor-not-allowed',
    'data-[state=hover]:bg-btn-secondary-hover-bg data-[state=hover]:border-btn-secondary-hover-border data-[state=hover]:text-btn-secondary-hover-text',
    'data-[state=active]:bg-btn-secondary-active-bg data-[state=active]:border-btn-secondary-active-border data-[state=active]:text-btn-secondary-hover-text',
    'data-[state=focus]:outline data-[state=focus]:outline-2 data-[state=focus]:outline-offset-0 data-[state=focus]:outline-btn-secondary-focus-border data-[state=focus]:bg-white data-[state=focus]:text-btn-secondary-hover-text',
    'data-[state=disabled]:bg-white data-[state=disabled]:border-btn-secondary-disabled-border data-[state=disabled]:text-btn-secondary-disabled-text data-[state=disabled]:pointer-events-none',
  ].join(' '),
  delete: [
    'bg-btn-delete text-white border border-transparent',
    'hover:bg-btn-delete-hover hover:text-white',
    'active:bg-btn-delete-active active:text-white',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-btn-delete-focus-ring',
    'disabled:bg-btn-delete-disabled-bg disabled:border disabled:border-btn-delete-disabled-border disabled:text-btn-delete-disabled-text disabled:cursor-not-allowed',
    'data-[state=hover]:bg-btn-delete-hover data-[state=hover]:text-white',
    'data-[state=active]:bg-btn-delete-active data-[state=active]:text-white',
    'data-[state=focus]:bg-btn-delete data-[state=focus]:outline data-[state=focus]:outline-2 data-[state=focus]:outline-offset-0 data-[state=focus]:outline-btn-delete-focus-ring',
    'data-[state=disabled]:bg-btn-delete-disabled-bg data-[state=disabled]:border data-[state=disabled]:border-btn-delete-disabled-border data-[state=disabled]:text-btn-delete-disabled-text data-[state=disabled]:pointer-events-none',
  ].join(' '),
};

export const ButtonAlt = forwardRef<HTMLButtonElement, ButtonAltProps>(
  (
    {
      asChild = false,
      variant = 'primary',
      state,
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
    const isDisabled = disabled ?? state === 'disabled';
    const dataState = state && state !== 'default' ? state : undefined;

    const baseClasses = [
      'inline-flex items-center justify-center gap-2 min-w-[68px] px-[var(--spacing-btn-x)] py-[var(--spacing-btn-y)] rounded-[var(--radius-btn)]',
      'font-sans font-semibold text-base leading-normal',
      'cursor-pointer box-border',
    ].join(' ');

    const variantClass = variantClasses[variant];
    const mergedClassName = cn(baseClasses, variantClass, className);

    const content = (
      <>
        <span className="flex flex-1 items-center gap-2 min-w-0">
          {IconLeft && (
            <span className={iconSizeClasses}>
              <IconLeft />
            </span>
          )}
          <span className="truncate">{children}</span>
        </span>
        {IconRight && (
          <span className={iconSizeClasses}>
            <IconRight />
          </span>
        )}
      </>
    );

    if (asChild) {
      return (
        <Slot ref={ref} className={mergedClassName} data-state={dataState} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button ref={ref} type={type} disabled={isDisabled} className={mergedClassName} data-state={dataState} {...props}>
        {content}
      </button>
    );
  },
);

ButtonAlt.displayName = 'ButtonAlt';
