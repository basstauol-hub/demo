import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Garante } from '../interfaces/garante.interfaces';
import { GarantesService } from '../services/garantes.service';
import { ConfirmDialogComponent } from '../../bootstrap/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-garantes-table',
  standalone: true,
  imports: [
    CommonModule,
    NgbTooltipModule
  ],
  templateUrl: './garantes-table.component.html',
  styleUrls: ['./garantes-table.component.scss']
})
export class GarantesTableComponent {
  @Input() garantes: Garante[] = [];
  @Output() onEdit = new EventEmitter<Garante>();
  @Output() onView = new EventEmitter<Garante>();
  @Output() onRefresh = new EventEmitter<void>();

  deletingId: number | null = null;

  constructor(
    private garantesService: GarantesService,
    private modalService: NgbModal
  ) {}

  confirmDelete(garante: Garante) {
    const modalRef = ConfirmDialogComponent.open(this.modalService, {
      title: '¿Estás seguro?',
      message: `Esta acción no se puede deshacer. Se eliminará permanentemente el garante "<strong>${garante.nombre} ${garante.apellido}</strong>".`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar'
    });

    modalRef.result.then(result => {
      if (result === true) {
        this.deleteGarante(garante.id);
      }
    }).catch(() => {
      // Modal dismissed
    });
  }

  private deleteGarante(id: number) {
    this.deletingId = id;

    this.garantesService.delete(id).subscribe({
      next: () => {
        console.log('Garante eliminado correctamente');
        this.onRefresh.emit();
      },
      error: (error) => {
        console.error('Error al eliminar el garante:', error);
      },
      complete: () => {
        this.deletingId = null;
      }
    });
  }
}