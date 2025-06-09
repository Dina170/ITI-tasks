import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./dto";

@Injectable()
export class EmployeesService{
    private readonly DATA = [
        {id: 1, name: 'dina', age: 24, salary: 10000},
        {id: 2, name: 'sara', age: 25, salary: 20000},
        {id: 3, name: 'test', age: 26, salary: 30000},
    ]

    getAllEmployees() {
        return this.DATA;
    }

    getEmployeeById(id: number) {
        const employee = this.DATA.find((emp) => emp.id === id);

        if (!employee) {
            throw new NotFoundException('emp not found')
        }

        return employee;
    }

    createEmployee(data: CreateEmployeeDto) {
        const newId = this.DATA[this.DATA.length - 1].id + 1;

        const newEmp = {
            id: newId,
            ...data
        }

        this.DATA.push(newEmp);

        return newEmp;
    }

    updateEmployee(id: number, data: UpdateEmployeeDto) {
        const index = this.DATA.findIndex((emp) => emp.id === id);
        
        if (index === -1) {
            throw new NotFoundException('emp not found');
        }

        this.DATA[index] = {
            ...this.DATA[index],
            ...data
        };

        return this.DATA[index];
    }

    deleteEmployee(id: number) {
        const index = this.DATA.findIndex((emp) => emp.id === id);
        
        if (index === -1) {
            throw new NotFoundException('emp not found');
        }

        const deletedEmployee = this.DATA[index];
        this.DATA.splice(index, 1);

        return deletedEmployee;
    }

    getHighestPaid() {
        const highestSalary = Math.max(...this.DATA.map(emp => emp.salary));
        return this.DATA.find(emp => emp.salary === highestSalary);
    }
}