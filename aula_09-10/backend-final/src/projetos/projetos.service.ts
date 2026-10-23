import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { Projeto } from './entities/projeto.entity';

@Injectable()
export class ProjetosService {
  private projetos: Projeto[] = [
    { id: 1, nome: 'Horta Comunitária', descricao: 'Plantar vegetais em escolas ou bairros, unindo ciências, matemática e alimentação saudável', cor: 'vermelho' },
    { id: 2, nome: 'Oficinas de Leitura e Cultura', descricao: 'Criar clubes do livro ou rodas de contação de histórias para crianças e jovens', cor: 'verde' },
  ];
  private proximoId = 3;

  create(createProjetoDto: CreateProjetoDto): Projeto {
    const nova: Projeto = {
      id: this.proximoId++,
      nome: createProjetoDto.nome,
      descricao: createProjetoDto.descricao,
      cor: createProjetoDto.cor,
    };
    this.projetos.push(nova);
    return nova;
  }

  findAll(): Projeto[] {
    return this.projetos;
  }

  findOne(id: number): Projeto {
    const projeto = this.projetos.find((p) => p.id === id);
    if (!projeto) {
      // NotFoundException vira automaticamente uma resposta HTTP 404.
      throw new NotFoundException('Projeto não encontrado');
    }
    return projeto;
  }

  update(id: number, updateProjetoDto: UpdateProjetoDto): Projeto {
    const projeto = this.findOne(id);
    Object.assign(projeto, updateProjetoDto);
    return projeto;
  }

  remove(id: number): void {
    const projeto = this.findOne(id);
    this.projetos = this.projetos.filter((p) => p.id !== projeto.id);
  }
}
