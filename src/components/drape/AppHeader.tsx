import Icon from "@/components/ui/icon";
import { Section, NAV_ITEMS } from "./data";

interface AppHeaderProps {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
}

export default function AppHeader({
  activeSection,
  setActiveSection,
  mobileMenuOpen,
  setMobileMenuOpen,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg grad-bg flex items-center justify-center animate-pulse-glow">
            <span className="text-white font-display font-bold text-sm">D</span>
          </div>
          <span className="font-display text-xl font-bold tracking-widest grad-text">DRAPE</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === item.key
                  ? "grad-bg text-white shadow-lg shadow-purple-500/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden glass-card p-2 rounded-xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} className="text-white" />
        </button>
      </div>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 px-4 py-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveSection(item.key); setMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeSection === item.key
                  ? "grad-bg text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
