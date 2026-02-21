import * as React from "react";
import { cn } from "@/lib/utils";


interface ReenviarProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  onReenviar: () => void;
  initialSeconds?: number;
}

export const Reenviar = React.forwardRef<HTMLButtonElement, ReenviarProps>(
  ({ className, onReenviar, initialSeconds = 60, ...props }, ref) => {
    const [seconds, setSeconds] = React.useState(initialSeconds);
    React.useEffect(() => {
        if(seconds === 0) return;

        const interval = setInterval(() => {
            setSeconds((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(interval);
    }, [seconds])

     const handleClick = () => {
      if (seconds > 0) return;

      onReenviar();
      setSeconds(initialSeconds); 
    };
    return(
        <button
        ref={ref}
        type="button"
        onClick={handleClick}
        disabled={seconds > 0}
        className={cn(
          "text-sm font-medium transition-colors",
          seconds > 0
            ? "cursor-not-allowed text-muted-foreground"
            : "text-zinc-800 hover:underline",
          className
        )}
        {...props}
      >
        {seconds > 0
          ? `Reenviar código em ${seconds}s`
          : "Reenviar código"}
      </button>
    );
  
})