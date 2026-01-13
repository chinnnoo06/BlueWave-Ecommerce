import { forwardRef } from "react";

type THamburgerButtonProps = {
  open: boolean;
  onClick: () => void;
};

export const HamburgerButton = forwardRef<
  HTMLButtonElement,
  THamburgerButtonProps
>(({ open, onClick }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      aria-label="Toggle menu"
      className="relative flex items-center justify-center
                 w-6 h-6 header-limit:hidden
                 text-[#001F3F] hover:text-[#0C71E4]
                 transition-all duration-300"
    >
      <span
        className={`
          absolute bg-current transition-all duration-300
          h-0.5 w-5
          ${open ? "rotate-45" : "-translate-y-1.5 xl:-translate-y-2"}
        `}
      />

      <span
        className={`
          absolute bg-current transition-all duration-300
          h-0.5 w-5
          ${open ? "opacity-0" : "opacity-100"}
        `}
      />

      <span
        className={`
          absolute bg-current transition-all duration-300
          h-0.5 w-5
          ${open ? "-rotate-45" : "translate-y-1.5 xl:translate-y-2"}
        `}
      />
    </button>
  );
});

HamburgerButton.displayName = "HamburgerButton";
