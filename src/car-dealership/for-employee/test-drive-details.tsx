import { SidebarNav } from "@/components/test-drive-details-for-manager/app-sidebar"
import { Header } from "@/components/test-drive-details-for-manager/header"
import { TestDriveDetailsCard } from "@/components/test-drive-details-for-manager/test-drive-details-card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function TestDriveDashboardPage() {
  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset>
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-3xl">Test Drive Manager Details Page</h1>
          </div>
          <div className="grid gap-6">
            <TestDriveDetailsCard />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
