import { fetchCarsAction } from '@/actions/car.action';
// import HondaCivicImage from "@/img-car-page/HondaCivic.jpg"
// import Camry from "@/img-car-page/camry.jpg"
// import Focus from "@/img-car-page/focusrs.jpg"
import type { CarType } from '@/types/car.type';
import { useEffect, useState } from 'react';
import { CarCard } from '../items/CarCard/CarCard';

const Home = () => {
  const [cars, setCars] = useState<CarType[]>([]);

  useEffect(() => {
    fetchCarsAction().then(cars => {
      setCars(cars);
    });
  }, []);

  useEffect(() => {
    console.log('Cars: ', cars);
  }, [cars]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Каталог автомобилей</h1>
      <div className="grid gap-6">{cars && cars?.map((car, index) => <CarCard key={index} car={car} />)}</div>
    </div>
  );
};

export default Home;
