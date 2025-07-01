'use client';

import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Car, ChartNoAxesColumnIncreasing, ChevronLeft, ChevronRight, LayoutDashboard, Users } from 'lucide-react';

export function AppSidebar() {
  const { open, toggleSidebar } = useSidebar();

  const navItems = [
    {
      title: 'Рабочий стол',
      href: '#',
      icon: LayoutDashboard,
    },
    {
      title: 'Сделки',
      href: '#',
      icon: Car,
    },
    {
      title: 'Тест-драйвы',
      href: '#',
      icon: Users,
    },
    {
      title: 'Отчеты',
      href: '#',
      icon: ChartNoAxesColumnIncreasing,
    },
  ];

  return (
    <Sidebar
      className={cn(
        'transition-all duration-200 ease-in-out',
        open ? 'w-[200px]' : 'w-[80px]', // Adjust widths to match prototype's collapsed state
      )}
      collapsible="none" // Manually control collapse behavior
    >
      <SidebarHeader className="flex items-center justify-between border-b p-4">
        <h2 className={cn('text-lg font-semibold', !open && 'sr-only')}>Панель управления</h2>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleSidebar} aria-label="Toggle Sidebar">
          {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-auto p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.title === 'Deals'}>
                    <a href={item.href} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span className={cn('transition-opacity duration-200', !open && 'sr-only opacity-0')}>
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
