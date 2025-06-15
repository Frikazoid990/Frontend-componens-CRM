import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TestDriveCard } from "./test-drive-card/test-drive-card"

interface TestDrive {
  id: string
  client: string
  employee?: string
  time?: string
  date: string
  car: string
}

interface TestDriveSectionProps {
  title: string
  testDrives: TestDrive[]
}

export function TestDriveSection({ title, testDrives }: TestDriveSectionProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="max-h-[300px] overflow-y-auto space-y-2">
          {testDrives.length > 0 ? (
            testDrives.map((testDrive) => (
              <TestDriveCard
                key={testDrive.id}
                client={testDrive.client}
                employee={testDrive.employee}
                date={testDrive.date}
                time={testDrive.time}
                car={testDrive.car}
              />
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">No test drives in this category</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
