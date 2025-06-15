import { TestDriveDetailsCard } from "./test-drive-details-card"

export function TestDriveManagerDetailsPage()

{
  return (
  <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-10">
    <div className="max-w-6xl w-full mx-auto grid gap-2">
      <h1 className="font-semibold text-3xl">Test Drive Manager Details Page</h1>
    </div>
    <TestDriveDetailsCard />
  </div>
)
  
}
