import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Define la interfaz para los datos del modal
export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  public data!: ConfirmDialogData; // Se recibe desde el modalRef

  constructor(public activeModal: NgbActiveModal) {}

  onConfirm(): void {
    this.activeModal.close(true);
  }

  onCancel(): void {
    this.activeModal.dismiss(false);
  }

  // Método estático para abrir el modal y pasarle datos
  static open(modalService: NgbModal, data: ConfirmDialogData) {
    const modalRef = modalService.open(ConfirmDialogComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.data = data;
    return modalRef;
  }
}
