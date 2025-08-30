import { Component, Input, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import  { NgbModal } from "@ng-bootstrap/ng-bootstrap"
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap"
import  { Inquilino } from "../interfaces/inquilino.interfaces"
import  { InquilinosService } from "../services/inquilinos.service"
import { ConfirmDialogComponent } from "../../bootstrap/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-inquilinos-table",
  standalone: true,
  imports: [CommonModule, NgbTooltipModule],
  templateUrl: "./inquilinos-table.component.html",
  styleUrls: ["./inquilinos-table.component.scss"],
})
export class InquilinosTableComponent {
  @Input() inquilinos: Inquilino[] = []
  @Output() onEdit = new EventEmitter<Inquilino>()
  @Output() onView = new EventEmitter<Inquilino>()
  @Output() onRefresh = new EventEmitter<void>()

  deletingId: number | null = null

  constructor(
    private inquilinosService: InquilinosService,
    private modalService: NgbModal,
  ) {}

  confirmDelete(inquilino: Inquilino) {
    const modalRef = ConfirmDialogComponent.open(this.modalService, {
      title: "¿Estás seguro?",
      message: `Esta acción no se puede deshacer. Se eliminará permanentemente el inquilino "<strong>${inquilino.nombre} ${inquilino.apellido}</strong>".`,
      confirmText: "Eliminar",
      cancelText: "Cancelar",
    })

    modalRef.result
      .then((result) => {
        if (result === true) {
          this.deleteInquilino(inquilino.id)
        }
      })
      .catch(() => {
        // Modal dismissed
      })
  }

  private deleteInquilino(id: number) {
    this.deletingId = id

    this.inquilinosService.delete(id).subscribe({
      next: () => {
        // Toast success - implementar con NgbToast o similar
        console.log("Inquilino eliminado correctamente")
        this.onRefresh.emit()
      },
      error: (error) => {
        // Toast error - implementar con NgbToast o similar
        console.error("Error al eliminar el inquilino:", error)
      },
      complete: () => {
        this.deletingId = null
      },
    })
  }
}
