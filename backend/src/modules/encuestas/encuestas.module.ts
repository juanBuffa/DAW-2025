import { Module } from '@nestjs/common';
import { EncuestasController } from './controllers/encuestas.controller';
import { EncuestasService } from './services/encuestas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encuesta } from './entities/encuesta.entity';
import { Pregunta } from './entities/pregunta.entity';
import { Opcion } from './entities/opcion.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Encuesta, Pregunta, Opcion])],
    controllers:[EncuestasController],
    providers:[EncuestasService],
})
export class EncuestasModule{

}