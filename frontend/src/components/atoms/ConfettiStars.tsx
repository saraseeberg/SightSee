import { useEffect } from "react";
import confetti from "canvas-confetti";

type ConfettiStarsProps = {
  trigger: boolean;
};

export function ConfettiStars({ trigger }: ConfettiStarsProps) {
  useEffect(() => {
    if (trigger) {
      const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
      };

      const shoot = () => {
        confetti({
          ...defaults,
          particleCount: 40,
          scalar: 1.2,
          shapes: ["star"],
        });

        confetti({
          ...defaults,
          particleCount: 10,
          scalar: 0.75,
          shapes: ["circle"],
        });
      };

      setTimeout(shoot, 0);
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);
    }
  }, [trigger]);

  return null; // This component only handles side effects (no visible UI).
}
