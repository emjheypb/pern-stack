import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constants/index.ts";
import { useThemeStore } from "../store/useThemeStore.ts";

function ThemeSelector() {
  const { theme, setTheme } = useThemeStore() as {
    theme: string;
    setTheme: (theme: string) => void;
  };

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </button>
      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10">
        {THEMES.map((option) => (
          <button
            key={option.name}
            className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
              theme === option.name
                ? "bg-primary/10 text-primary"
                : "hover:bg-base-content/5"
            }`}
            onClick={() => setTheme(option.name)}>
            <PaletteIcon className="size-4" />
            {option.label}
            <div className="ml-auto flex gap-1">
              {option.colors.map((color, i) => (
                <span
                  key={i}
                  className="size-2 rounded-full"
                  style={{ backgroundColor: color }}></span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;
