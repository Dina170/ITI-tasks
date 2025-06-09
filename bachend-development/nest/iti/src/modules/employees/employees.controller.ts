import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./dto";

@Controller('/employees')
export class EmployeesController {
    constructor(private readonly service: EmployeesService) {}

    @Get('/highest-paid')
    getHighestPaid() {
        return this.service.getHighestPaid();
    }

    @Get('/')
    getAllEmployees() {
        return this.service.getAllEmployees();
    }

    @Get('/:id')
    getEmployeeById(@Param('id', ParseIntPipe) id: number) {
        return this.service.getEmployeeById(id);
    }

    @Post()
    createEmployee(@Body() data: CreateEmployeeDto) {
        return this.service.createEmployee(data)
    }

    @Put('/:id')
    updateEmployee(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateEmployeeDto
    ) {
        return this.service.updateEmployee(id, data);
    }

    @Delete('/:id')
    deleteEmployee(@Param('id', ParseIntPipe) id: number) {
        return this.service.deleteEmployee(id);
    }
}