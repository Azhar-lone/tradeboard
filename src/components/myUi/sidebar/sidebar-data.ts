import {
  LayoutDashboardIcon,
  PackageIcon,
  FileTextIcon,
  WarehouseIcon,
  CreditCardIcon,
  LineChartIcon,
  XCircleIcon,
  AlarmClockIcon,
  Undo2Icon,
  CalendarCheck2Icon,
  ClipboardListIcon,
  TruckIcon,
  ListOrderedIcon,
  SettingsIcon,
  LucideIcon,
} from "lucide-react";

export interface Links {
  href: string;
  text: string;
  Icon: LucideIcon;
}

export interface CategorizedLinks {
  category?: string;
  links: Links[];
}

export const secondlinks: Links[] = [
  {
    href: "/settings",
    Icon: SettingsIcon,
    text: "Settings",
  },
];

const categorizedLinks: CategorizedLinks[] = [
  {
    category: "Overview",
    links: [
      {
        href: "/dashboard",
        text: "Dashboard",
        Icon: LayoutDashboardIcon,
      },
      {
        href: "/items",
        text: "Items / SKUs",
        Icon: PackageIcon,
      },
    ],
  },
  {
    category: "Stock Management",
    links: [
      {
        href: "/stock/new",
        text: "New Stock",
        Icon: WarehouseIcon,
      },
      {
        href: "/stock/current",
        text: "Current Stock",
        Icon: ClipboardListIcon,
      },
      {
        href: "/stock/damaged",
        text: "Damaged Stock",
        Icon: XCircleIcon,
      },
      {
        href: "/stock/expired",
        text: "Expired Stock",
        Icon: AlarmClockIcon,
      },
      {
        href: "/stock/returned",
        text: "Returned Stock",
        Icon: Undo2Icon,
      },
    ],
  },
  {
    category: "Sales & Invoicing",
    links: [
      {
        href: "/sales/customer-invoices",
        text: "Customer Invoices",
        Icon: FileTextIcon,
      },
      {
        href: "/sales/monthly",
        text: "Monthly Sales",
        Icon: CalendarCheck2Icon,
      },
      {
        href: "/sales/sku-wise",
        text: "SKU-wise Sales",
        Icon: ListOrderedIcon,
      },
      {
        href: "/sales/report",
        text: "Sales Report",
        Icon: LineChartIcon,
      },
    ],
  },
  {
    category: "Finance",
    links: [
      {
        href: "/finance/ledger",
        text: "Ledger",
        Icon: CreditCardIcon,
      },
    ],
  },
  {
    category: "Logistics",
    links: [
      {
        href: "/logistics/van-load-sheet",
        text: "Van Load Sheet",
        Icon: TruckIcon,
      },
    ],
  },
];

export { categorizedLinks };
