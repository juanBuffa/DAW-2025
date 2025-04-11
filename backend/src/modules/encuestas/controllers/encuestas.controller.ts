import { Controller, Get, Post } from "@nestjs/common";
import { EncuestasService } from "../services/encuestas.service";

@Controller("/encuestas")
export class EncuestasController{

    constructor(private encuestasService: EncuestasService){
        
    }

    @Get(':id')
    async getEncuesta():Promise<void>{

    }

    @Post('')
    async crearEncuesta():Promise<void>{

    }
}