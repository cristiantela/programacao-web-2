import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly resend: Resend | null;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    this.resend = apiKey ? new Resend(apiKey) : null;

    if (!this.resend) {
      this.logger.warn('RESEND_API_KEY não configurada; e-mails não serão enviados');
    }
  }

  async tarefaCriada(para: string, titulo: string) {
    await this.resend.emails.send({
      from: process.env.MAIL_FROM || 'Tarefas <onboarding@resend.dev>',
      to: para,
      subject: 'Nova tarefa criada',
      html: `<p>Sua tarefa <b>${titulo}</b> foi criada.</p>`,
    });
  }
}
