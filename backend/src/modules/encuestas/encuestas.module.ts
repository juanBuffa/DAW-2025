import { Module } from '@nestjs/common';
import { EncuestasController } from './controllers/encuestas.controller';
import { EncuestasService } from './services/encuestas.service';

@Module({
    imports:[],
    controllers:[EncuestasController],
    providers:[EncuestasService],
})
export class EncuestasModule{

}