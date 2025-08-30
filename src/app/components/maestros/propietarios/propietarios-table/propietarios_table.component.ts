// propietarios-table.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Propietario } from '../interfaces/propietario.interfaces';
import { PropietariosService } from '../services/propietarios_service';
import { ConfirmDialogComponent } from '../../bootstrap/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-propietarios-table',
  standalone: true,
  imports: [
    CommonModule,
    NgbTooltipModule
  ],
  templateUrl: './propietarios_table.component.html',
  styleUrls: ['./propietarios_table.component.scss']
})
export class PropietariosTableComponent {
  @Input() propietarios: Propietario[] = [];
  @Output() onEdit = new EventEmitter<Propietario>();
  @Output() onView = new EventEmitter<Propietario>();
  @Output() onRefresh = new EventEmitter<void>();

  deletingId: number | null = null;

  constructor(
    private propietariosService: PropietariosService,
    private modalService: NgbModal
  ) {}

  confirmDelete(propietario: Propietario) {
    const modalRef = ConfirmDialogComponent.open(this.modalService, {
      title: '¿Estás seguro?',
      message: `Esta acción no se puede deshacer. Se eliminará permanentemente el propietario "<strong>${propietario.nombre} ${propietario.apellido}</strong>".`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar'
    });

    modalRef.result.then(result => {
      if (result === true) {
        this.deletePropietario(propietario.id);
      }
    }).catch(() => {
      // Modal dismissed
    });
  }

  private deletePropietario(id: number) {
    this.deletingId = id;

    this.propietariosService.delete(id).subscribe({
      next: () => {
        console.log('Propietario eliminado correctamente');
        this.onRefresh.emit();
      },
      error: (error) => {
        console.error('Error al eliminar el propietario:', error);
      },
      complete: () => {
        this.deletingId = null;
      }
    });
  }
}
