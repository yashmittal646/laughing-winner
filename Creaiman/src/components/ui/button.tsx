import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-body",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-violet hover:shadow-[0_0_80px_hsl(251_100%_69%_/_0.5)] hover:-translate-y-1 active:translate-y-0 active:scale-95",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary/50 bg-transparent text-foreground hover:bg-primary/10 hover:border-primary hover:-translate-y-1",
        secondary: "bg-secondary text-secondary-foreground shadow-glow-pink hover:shadow-[0_0_80px_hsl(330_100%_65%_/_0.5)] hover:-translate-y-1 active:translate-y-0",
        ghost: "hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "relative overflow-hidden bg-gradient-to-r from-pink to-violet text-white font-semibold shadow-glow-pink hover:shadow-[0_0_100px_hsl(330_100%_65%_/_0.6)] hover:-translate-y-2 active:translate-y-0 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-violet before:to-pink before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        glass: "glass border-white/20 text-foreground hover:bg-white/10 hover:-translate-y-1 backdrop-blur-xl",
        holographic: "relative overflow-hidden bg-card text-foreground border-2 border-transparent hover:-translate-y-1 before:absolute before:inset-[-2px] before:rounded-xl before:bg-gradient-holographic before:opacity-60 before:-z-10 hover:before:opacity-100 before:transition-opacity",
        magnetic: "relative bg-primary text-primary-foreground hover:shadow-glow-violet transition-transform duration-200",
        gold: "bg-gold text-plum font-semibold hover:shadow-glow-orange hover:-translate-y-1",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-14 rounded-2xl px-10 text-base",
        xl: "h-16 rounded-2xl px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
