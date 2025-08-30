import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { NgbToastModule } from "@ng-bootstrap/ng-bootstrap"
import  { Inquilino } from "../interfaces/inquilino.interfaces"
import  { InquilinosService } from "../services/inquilinos.service"
import { InquilinosTableComponent } from "../inquilinos-table/inquilinos-table.component"
import { InquilinoFormComponent } from "../inquilino-form/inquilino-form.component"
import { InquilinoDetailComponent } from "../inquilino-detail/inquilino-detail.component"

type ViewMode = "list" | "form" | "detail"

@Component({
  selector: "app-inquilinos-page",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbToastModule,
    InquilinosTableComponent,
    InquilinoFormComponent,
    InquilinoDetailComponent,
  ],
  templateUrl: "./inquilinos-page.component.html",
  styleUrls: ["./inquilinos-page.component.scss"],
})
export class InquilinosPageComponent implements OnInit {
  inquilinos: Inquilino[] = []
  filteredInquilinos: Inquilino[] = []
  loading = true
  searchTerm = ""
  viewMode: ViewMode = "list"
  selectedInquilino: Inquilino | null = null

  // Toast properties
  showToast = false
  toastMessage = ""
  toastType: "success" | "error" = "success"

  constructor(private inquilinosService: InquilinosService) {}

  ngOnInit() {
    this.loadInquilinos()
  }

  loadInquilinos() {
    this.loading = true

    this.inquilinosService.getList().subscribe({
      next: (data) => {
        this.inquilinos = data
        this.filteredInquilinos = data
        this.loading = false
      },
      error: (error) => {
        this.showErrorToast("No se pudieron cargar los inquilinos")
        this.loading = false
      },
    })
  }

  filterInquilinos() {
    if (!this.searchTerm.trim()) {
      this.filteredInquilinos = this.inquilinos
      return
    }

    const searchLower = this.searchTerm.toLowerCase()
    this.filteredInquilinos = this.inquilinos.filter(
      (inquilino) =>
        inquilino.nombre.toLowerCase().includes(searchLower) ||
        inquilino.apellido.toLowerCase().includes(searchLower) ||
        inquilino.dni.includes(this.searchTerm) ||
        inquilino.cuit_cuil.includes(this.searchTerm) ||
        inquilino.telefono.includes(this.searchTerm) ||
        inquilino.email.toLowerCase().includes(searchLower) ||
        inquilino.direccion.toLowerCase().includes(searchLower),
    )
  }

  handleNew() {
    this.selectedInquilino = null
    this.viewMode = "form"
  }

  handleEdit(inquilino: Inquilino) {
    this.selectedInquilino = inquilino
    this.viewMode = "form"
  }

  handleEditFromDetail() {
    this.viewMode = "form"
  }

  handleView(inquilino: Inquilino) {
    this.selectedInquilino = inquilino
    this.viewMode = "detail"
  }

  handleFormSuccess() {
    this.viewMode = "list"
    this.loadInquilinos()

    const message = this.selectedInquilino ? "Inquilino actualizado correctamente" : "Inquilino creado correctamente"

    this.selectedInquilino = null
    this.showSuccessToast(message)
  }

  handleCancel() {
    this.viewMode = "list"
    this.selectedInquilino = null
  }

  handleBackToList() {
    this.viewMode = "list"
    this.selectedInquilino = null
  }

  private showSuccessToast(message: string) {
    this.toastMessage = message
    this.toastType = "success"
    this.showToast = true
  }

  private showErrorToast(message: string) {
    this.toastMessage = message
    this.toastType = "error"
    this.showToast = true
  }
}
