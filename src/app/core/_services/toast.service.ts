import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private messageService: MessageService) { }

  success(detail: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail })
  }

  info(detail: string) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail })
  }

  error(detail: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail })
  }

  warning(detail: string) {
    this.messageService.add({ severity: 'warn', summary: 'Warning', detail })
  }
}