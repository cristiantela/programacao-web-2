import dataSource from './data-source';
import { Tarefa } from './tarefas/entities/tarefa.entity';

async function seed() {
  await dataSource.initialize();
  const repo = dataSource.getRepository(Tarefa);

  await repo.clear();
  await repo.save([
    { titulo: 'Estudar ORM', descricao: 'TypeORM + PostgreSQL', concluida: false },
    { titulo: 'Preparar a aula de hoje', concluida: true },
  ]);

  console.log('Seed concluído!');
  await dataSource.destroy();
}

seed();
