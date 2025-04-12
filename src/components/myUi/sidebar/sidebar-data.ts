import {
  LayoutDashboardIcon,
  BookCheckIcon,
  CalendarCheck2Icon,
  SettingsIcon,
  ClipboardIcon,
  SwatchBookIcon,
  ListChecksIcon,
  SheetIcon,
  GraduationCapIcon,
  Users2Icon,
  CheckSquareIcon,
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
    href: "/site/settings",
    Icon: SettingsIcon,
    text: "Settings",
  },
];

let categorizedLinks: CategorizedLinks[] = [
  {
    category: "Main",
    links: [
      {
        href: "/site",
        text: "Dashboard",
        Icon: LayoutDashboardIcon,
      },

      {
        href: "/site/courses",
        text: "Courses",
        Icon: BookCheckIcon,
      },

      {
        href: "/site/sessions",
        text: "Sessions",
        Icon: CalendarCheck2Icon,
      },
    ],
  },
];

const categorizedLinks_admin: CategorizedLinks[] = [
  {
    category: "Administration",
    links: [
      {
        href: "/site/programs",
        text: "Programs",
        Icon: GraduationCapIcon,
      },
      {
        href: "/site/users",
        text: "Users",
        Icon: Users2Icon,
      },
    ],
  },
];
const categorizedLinks_teacher: CategorizedLinks[] = [
  {
    category: "Classes",
    links: [
      {
        href: "/attendence",
        text: "Attendence",
        Icon: CheckSquareIcon,
      },
      {
        href: "/site/assignments",
        text: "Assignments",
        Icon: ListChecksIcon,
      },
    ],
  },
  {
    category: "Examination",
    links: [
      {
        href: "/site/exams/quizes",
        text: "Quizzes",
        Icon: ClipboardIcon,
      },
      {
        href: "/site/exams/oht",
        text: "OHT",
        Icon: SwatchBookIcon,
      },
    ],
  },
  {
    links: [
      {
        href: "/site/results",
        text: "Results",
        Icon: SheetIcon,
      },
    ],
  },
];

const categorizedLinks_student: CategorizedLinks[] = [
  {
    category: "Examination",
    links: [
      {
        href: "/site/exams/quizes",
        text: "Quizzes",
        Icon: ClipboardIcon,
      },
      {
        href: "/site/exams/oht",
        text: "OHT",
        Icon: SwatchBookIcon,
      },
    ],
  },
  {
    links: [
      {
        href: "/site/results",
        text: "Results",
        Icon: SheetIcon,
      },
    ],
  },
  {
    links: [
      {
        href: "/site/assignments",
        text: "Assignments",
        Icon: ListChecksIcon,
      },
    ],
  },
];

let role = "admin";

if (role === "admin")
  categorizedLinks = categorizedLinks.concat(categorizedLinks_admin);
else if (role === "teacher")
  categorizedLinks = categorizedLinks.concat(categorizedLinks_teacher);
else if (role === "student")
  categorizedLinks = categorizedLinks.concat(categorizedLinks_student);

export { categorizedLinks };
