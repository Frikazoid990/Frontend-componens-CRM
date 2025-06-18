import { fetchCarsAction } from '@/actions/car.action'
// import HondaCivicImage from "@/img-car-page/HondaCivic.jpg"
// import Camry from "@/img-car-page/camry.jpg"
// import Focus from "@/img-car-page/focusrs.jpg"
import type { CarType } from '@/types/car.type'
import { useEffect, useState } from 'react'
import { CarCard } from '../items/CarCard'


const Home = () => {

	const [cars, setCars] = useState<CarType[]>([]);

	useEffect(() =>{
		fetchCarsAction().then((cars) =>{
			setCars(cars);
		})
	},[])

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Каталог автомобилей</h1>
							<div className="grid gap-6">
								{cars.map((car, index) => (
									<CarCard key={index} car={car} />
								))}
				</div>
		</div>
	)
}

export default Home




//  const carData = [
//     {
//       brand: "Honda",
//       model: "Civic",
//       description:
//         "Тип кузова — 4‑дверный седан (5‑местный). Компоновка — FWD, AWD (для США). Двигатель — ДВС, гибрид. Трансмиссия — АКПП, МКПП.",
//       imageSrc: HondaCivicImage, // Исправлено: используем свойство .src импортированного изображения
//       imageWidth: 200, // Добавлены явные параметры ширины
//       imageHeight: 150, // Добавлены явные параметры высоты
//       colors: [
//         { name: "purple", hex: "#800080" },
//         { name: "green", hex: "#008000" },
//         { name: "blue", hex: "#0000FF" },
//         { name: "red", hex: "#FF0000" },
//       ],
//       engineOptions: ["V8", "V6", "I4"],
//       configurationOptions: ["Premium", "Sport", "Standard"],
//     },
//     {
//       brand: "Toyota",
//       model: "Camry",
//       description: "Тип кузова — 4‑дверный седан (5‑местный). Компоновка — FWD, AWD (для США). Двигатель — ДВС, гибрид. Трансмиссия — АКПП, МКПП.",
//       imageSrc: Camry,
//       imageWidth: 200, // Добавлены явные параметры ширины
//       imageHeight: 150, // Добавлены явные параметры высоты
//       colors: [
//         { name: "black", hex: "#000000" },
//         { name: "white", hex: "#FFFFFF" },
//         { name: "silver", hex: "#C0C0C0" },
//       ],
//       engineOptions: ["V6", "I4 Hybrid"],
//       configurationOptions: ["LE", "SE", "XLE"],
//     },
//     {
//       brand: "Ford",
//       model: "Focus RS",
//       description: 'Ford Focus RS (2016–2018) – это высокопроизводительная версия компактного хэтчбека Ford Focus, разработанная подразделением Ford Performance. Эта модель сочетает в себе агрессивный дизайн, мощный двигатель и полный привод с технологией Drift Mode, что делает её одной из самых впечатляющих "горячих" версий в своём классе.',
//       imageSrc: Focus,
//       // imageWidth: 200, // Добавлены явные параметры ширины
//       // imageHeight: 150, // Добавлены явные параметры высоты
//       colors: [
//         { name: "red", hex: "#FF0000" },
//         { name: "blue", hex: "#0000FF" },
//         { name: "yellow", hex: "#FFFF00" },
//       ],
//       engineOptions: ["V8 GT", "EcoBoost"],
//       configurationOptions: ["GT Premium", "EcoBoost Premium", "Mach 1"],
//     },
//   ]