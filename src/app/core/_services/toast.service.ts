import { Injectable } from "@angular/core";
import { Message, MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  messageOptions: Message = {
    life: 1500,
    
  }
  constructor(private messageService: MessageService) { }

  success(detail: string) {
    this.messageService.add({ ...this.messageOptions, severity: 'success', summary: 'Success', detail })
  }

  info(detail: string) {
    this.messageService.add({ ...this.messageOptions, severity: 'info', summary: 'Info', detail })
  }

  error(detail: string) {
    this.messageService.add({ ...this.messageOptions, severity: 'error', summary: 'Error', detail })
  }

  warning(detail: string) {
    this.messageService.add({ ...this.messageOptions, severity: 'warn', summary: 'Warning', detail })
  }
}