import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { extname } from 'path';

@Injectable()
export class StorageService {
  private readonly supabase: SupabaseClient | null;
  private readonly bucket: string;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY;

    this.supabase = url && key ? createClient(url, key) : null;
    this.bucket = process.env.SUPABASE_BUCKET || 'anexos';
  }

  async enviar(arquivo: Express.Multer.File): Promise<string> {
    if (!this.supabase) {
      throw new InternalServerErrorException(
        'SUPABASE_URL e SUPABASE_SERVICE_KEY precisam estar configuradas',
      );
    }

    const extensaoSegura = extname(arquivo.originalname).toLowerCase();
    const caminho = `tarefas/${randomUUID()}${extensaoSegura}`;

    const { error } = await this.supabase.storage
      .from(this.bucket)
      .upload(caminho, arquivo.buffer, { contentType: arquivo.mimetype });

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    const { data } = this.supabase.storage
      .from(this.bucket)
      .getPublicUrl(caminho);

    return data.publicUrl;
  }
}
