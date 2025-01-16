import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva('inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2', {
  variants: {
    variant: {
      default: 'bg-primary-500 text-white hover:bg-primary-600',
      outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50',
      ghost: 'hover:bg-neutral-100 text-neutral-700',
      link: 'underline-offset-4 hover:underline text-primary-500'
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 px-3 text-xs',
      lg: 'h-12 px-6',
      icon: 'h-10 w-10'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});

interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>, 
  VariantProps<typeof buttonVariants> {
  className?: string;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      >
        {children}
      </button>
    );
  }
);
