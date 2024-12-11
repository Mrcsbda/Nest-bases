import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UpdateCarDto, CreateCarDto } from './dtos';
import { Car } from './interfaces/car.interface';
@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Wrangler'
        },
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Prius'
        },
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find(car => car.id === id);
        if (!car) throw new NotFoundException(`Car with id '${id}' not found`);
        return car
    }

    createCar(createCarDto: CreateCarDto) {
        const existingCar = this.cars.find(car => car.brand === createCarDto.brand && car.model === createCarDto.model);
        if (existingCar) throw new BadRequestException(`Car with brand '${createCarDto.brand}' and model '${createCarDto.model}' already exists`);
        const newCar = {
            id: uuid(),
            ...createCarDto
        }
        this.cars.push(newCar);
        return newCar;
    }

    updateCar(id: string, updateCarDto: UpdateCarDto) {
        let carDB = this.findOneById(id);

        this.cars = this.cars.map( car => {
            if (car.id === id){
                carDB = {
                    ...carDB,
                    ...updateCarDto,
                    id
                }
                return carDB
            }
            return car
        })

        return carDB
    }

    deleteCar(id:string) {
        // mi solución:

        // const carIndex = this.cars.findIndex(car => car.id === id )
        // if(carIndex !== -1) {
        //    this.cars.splice(carIndex, 1)
        // } else {
        //     throw new BadRequestException(`Car with id '${id}' doesn't exists`);
        // }
        // return {message: `Car with id '${id}' has been deleted`}

        this.findOneById(id);
        this.cars = this.cars.filter(car => car.id !== id);
        return {message: `Car with id '${id}' has been deleted`};
    }
}
