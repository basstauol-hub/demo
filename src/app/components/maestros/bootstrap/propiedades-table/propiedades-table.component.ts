import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Propiedad } from '../interfaces/propiedad.interfaces';
import { PropiedadesService } from '../services/propiedades.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-propiedades-table',
  standalone: true,
  imports: [
    CommonModule,
    NgbTooltipModule // ✅ Usa el módulo, no la directiva
  ],
  templateUrl: './propiedades-table.component.html',
  styleUrls: ['./propiedades-table.component.scss']
})
export class PropiedadesTableComponent {
  @Input() propiedades: Propiedad[] = [];
  @Output() onEdit = new EventEmitter<Propiedad>();
  @Output() onView = new EventEmitter<Propiedad>();
  @Output() onRefresh = new EventEmitter<void>();

  deletingId: number | null = null;

  constructor(
    private propiedadesService: PropiedadesService,
    private modalService: NgbModal
  ) {}

  confirmDelete(propiedad: Propiedad) {
    const modalRef = ConfirmDialogComponent.open(this.modalService, {
      title: '¿Estás seguro?',
      message: `Esta acción no se puede deshacer. Se eliminará permanentemente la propiedad "<strong>${propiedad.direccion}</strong>".`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar'
    });

    modalRef.result.then(result => {
      if (result === true) {
        this.deletePropiedad(propiedad.id);
      }
    }).catch(() => {
      // Modal dismissed
    });
  }

  private deletePropiedad(id: number) {
    this.deletingId = id;

    this.propiedadesService.delete(id).subscribe({
      next: () => {
        // Toast success - implementar con NgbToast o similar
        console.log('Propiedad eliminada correctamente');
        this.onRefresh.emit();
      },
      error: (error) => {
        // Toast error - implementar con NgbToast o similar
        console.error('Error al eliminar la propiedad:', error);
      },
      complete: () => {
        this.deletingId = null;
      }
    });
  }
}
