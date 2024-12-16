"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BookOpen, 
  LineChart,
  TestTube2,
  FileText
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "Courses",
    href: "/",
    icon: BookOpen
  },
  {
    title: "Stocks",
    href: "/stocks",
    icon: LineChart
  },
  {
    title: "API Tester",
    href: "/api-tester",
    icon: TestTube2
  },
  {
    title: "API Docs",
    href: "/docs",
    icon: FileText
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r bg-card h-screen fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-primary/10 p-2 rounded-lg">
            <div className="w-6 h-6 text-primary">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
          <span className="font-semibold text-lg">ShareVest</span>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
                pathname === item.href && "bg-accent text-accent-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="absolute bottom-8 left-6 right-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>ShareVest Admin</span>
          <span className="text-xs">v1.0.0</span>
        </div>
      </div>
    </div>
  );
} 