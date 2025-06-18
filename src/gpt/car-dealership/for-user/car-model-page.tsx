"use client"
import { CarCard } from "@/components/items/CarCard"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import HondaCivicImage from "@/img-car-page/HondaCivic.jpg"
import Camry from "@/img-car-page/camry.jpg"
import Focus from "@/img-car-page/focusrs.jpg"

import { User } from "lucide-react"
import { useState } from "react"

export default function CarDealershipPage() {
  const [userName] = useState("Андрей Николаевич Агапов") // Placeholder for user name

  const carData = [
    {
      brand: "Honda",
      model: "Civic",
      description:
        "Тип кузова — 4‑дверный седан (5‑местный). Компоновка — FWD, AWD (для США). Двигатель — ДВС, гибрид. Трансмиссия — АКПП, МКПП.",
      imageSrc: HondaCivicImage, // Исправлено: используем свойство .src импортированного изображения
      imageWidth: 200, // Добавлены явные параметры ширины
      imageHeight: 150, // Добавлены явные параметры высоты
      colors: [
        { name: "purple", hex: "#800080" },
        { name: "green", hex: "#008000" },
        { name: "blue", hex: "#0000FF" },
        { name: "red", hex: "#FF0000" },
      ],
      engineOptions: ["V8", "V6", "I4"],
      configurationOptions: ["Premium", "Sport", "Standard"],
    },
    {
      brand: "Toyota",
      model: "Camry",
      description: "Тип кузова — 4‑дверный седан (5‑местный). Компоновка — FWD, AWD (для США). Двигатель — ДВС, гибрид. Трансмиссия — АКПП, МКПП.",
      imageSrc: Camry,
      imageWidth: 200, // Добавлены явные параметры ширины
      imageHeight: 150, // Добавлены явные параметры высоты
      colors: [
        { name: "black", hex: "#000000" },
        { name: "white", hex: "#FFFFFF" },
        { name: "silver", hex: "#C0C0C0" },
      ],
      engineOptions: ["V6", "I4 Hybrid"],
      configurationOptions: ["LE", "SE", "XLE"],
    },
    {
      brand: "Ford",
      model: "Focus RS",
      description: 'Ford Focus RS (2016–2018) – это высокопроизводительная версия компактного хэтчбека Ford Focus, разработанная подразделением Ford Performance. Эта модель сочетает в себе агрессивный дизайн, мощный двигатель и полный привод с технологией Drift Mode, что делает её одной из самых впечатляющих "горячих" версий в своём классе.',
      imageSrc: Focus,
      // imageWidth: 200, // Добавлены явные параметры ширины
      // imageHeight: 150, // Добавлены явные параметры высоты
      colors: [
        { name: "red", hex: "#FF0000" },
        { name: "blue", hex: "#0000FF" },
        { name: "yellow", hex: "#FFFF00" },
      ],
      engineOptions: ["V8 GT", "EcoBoost"],
      configurationOptions: ["GT Premium", "EcoBoost Premium", "Mach 1"],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-4 py-4 border-b md:px-6">
        <div className="flex items-center gap-6">
          <a href="#" className="text-xl font-bold text-blue-600">
            Автосалон "Автоцентр XXI"
          </a>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <a href="#" className="hover:underline">
              Модели автомобилей
            </a>
            <a href="#" className="hover:underline">
              Личный кабинет
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-6 w-6" />
                <span className="sr-only">User account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <a href="#">Профиль</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#">Выйти</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Каталог автомобилей</h1>
        <div className="grid gap-6">
          {carData.map((car, index) => (
            <CarCard key={index} {...car} />
          ))}
        </div>
      </main>
    </div>
  )
}
