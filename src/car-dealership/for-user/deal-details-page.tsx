import { CarInfoCard } from "@/components/personal-ofice-deal-info-components/car-info-card"
import { ChatSection } from "@/components/personal-ofice-deal-info-components/chat-section"
import { DealDetailsCard } from "@/components/personal-ofice-deal-info-components/deal-details-card"
import { SiteHeader } from "@/components/personal-ofice-deal-info-components/site-header"
import HondaCivicImage from "@/img-car-page/HondaCivic.jpg"

export default function DealDetailsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container flex-1 py-8">
        <h1 className="mb-6 text-3xl font-bold">Deal Details Page</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="col-span-1 space-y-8 md:col-span-2">
            <DealDetailsCard startDate="20.07.2025" manager="Эдуард Евгеньевич Крылов" currentOffer="1.800.000(RUB)" />
            <div>
              <h2 className="mb-4 text-2xl font-bold">Заказ:</h2>
              <CarInfoCard
                carName="Honda civic"
                imageUrl={HondaCivicImage}
                color="purple"
                engine="V8"
                configuration="Premium"
                currentPrice="1.800.000(RUB)"
              />
            </div>
          </div>
          <div className="col-span-1">
            <ChatSection />
          </div>
        </div>
      </main>
    </div>
  )
}
