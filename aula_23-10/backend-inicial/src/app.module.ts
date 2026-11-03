import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TarefasModule } from './tarefas/tarefas.module';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TarefasModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
