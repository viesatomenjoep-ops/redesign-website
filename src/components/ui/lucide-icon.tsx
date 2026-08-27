import {
  AppWindow,
  BarChart3,
  CalendarCheck,
  Gauge,
  Globe,
  Layers,
  LayoutDashboard,
  Link2,
  MessageCircle,
  PhoneCall,
  Plug,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Target,
  Users,
  Workflow,
  type LucideIcon as LucideIconType,
} from "lucide-react";

/**
 * Static registry of the lucide icons referenced by the content modules
 * (kebab-case names, matching the prototype's `data-lucide` attributes).
 * Explicit imports keep the bundle small — add here when new content needs it.
 */
const registry: Record<string, LucideIconType> = {
  "app-window": AppWindow,
  "bar-chart-3": BarChart3,
  "calendar-check": CalendarCheck,
  gauge: Gauge,
  globe: Globe,
  layers: Layers,
  "layout-dashboard": LayoutDashboard,
  "link-2": Link2,
  "message-circle": MessageCircle,
  "phone-call": PhoneCall,
  plug: Plug,
  search: Search,
  "settings-2": Settings2,
  "shield-check": ShieldCheck,
  "shopping-cart": ShoppingCart,
  smartphone: Smartphone,
  sparkles: Sparkles,
  target: Target,
  users: Users,
  workflow: Workflow,
};

type LucideIconProps = {
  name: string;
  className?: string;
  size?: number;
};

export function LucideIcon({ name, className, size }: LucideIconProps) {
  const Icon = registry[name] ?? Sparkles;
  return <Icon className={className} size={size} aria-hidden="true" />;
}
