// propietarios-page.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbToast, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { Propietario } from '../interfaces/propietario.interfaces';
import { PropietariosService } from '../services/propietarios_service';
import { PropietariosTableComponent } from '../propietarios-table/propietarios_table.component';
import { PropietarioFormComponent } from '../propietario-form/propietario_form.component';
import { PropietarioDetailComponent } from '../propietario-detail/propietario_detail.component';

type ViewMode = 'list' | 'form' | 'detail';

@Component({
  selector: 'app-propietarios-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbToastModule,
    PropietariosTableComponent,
    PropietarioFormComponent,
    PropietarioDetailComponent
  ],
  templateUrl: './propietarios_page.component.html',
  styleUrls: ['./propietarios_page.component.scss']
})
export class PropietariosPageComponent implements OnInit {
  propietarios: Propietario[] = [];
  filteredPropietarios: Propietario[] = [];
  loading = true;
  searchTerm = '';
  viewMode: ViewMode = 'list';
  selectedPropietario: Propietario | null = null;

  // Toast properties
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private propietariosService: PropietariosService
  ) {}

  ngOnInit() {
    this.loadPropietarios();
  }

  loadPropietarios() {
    this.loading = true;

    this.propietariosService.getList().subscribe({
      next: (data) => {
        this.propietarios = data;
        this.filteredPropietarios = data;
        this.loading = false;
      },
      error: (error) => {
        this.showErrorToast('No se pudieron cargar los propietarios');
        this.loading = false;
      }
    });
  }

  filterPropietarios() {
    if (!this.searchTerm.trim()) {
      this.filteredPropietarios = this.propietarios;
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredPropietarios = this.propietarios.filter(propietario =>
      propietario.nombre.toLowerCase().includes(searchLower) ||
      propietario.apellido.toLowerCase().includes(searchLower) ||
      propietario.dni.includes(this.searchTerm) ||
      propietario.email.toLowerCase().includes(searchLower) ||
      propietario.cuit_cuil.includes(this.searchTerm) ||
      propietario.telefono.includes(this.searchTerm)
    );
  }

  handleNew() {
    this.selectedPropietario = null;
    this.viewMode = 'form';
  }

  handleEdit(propietario: Propietario) {
    this.selectedPropietario = propietario;
    this.viewMode = 'form';
  }

  handleEditFromDetail() {
    this.viewMode = 'form';
  }

  handleView(propietario: Propietario) {
    this.selectedPropietario = propietario;
    this.viewMode = 'detail';
  }

  handleFormSuccess() {
    this.viewMode = 'list';
    this.loadPropietarios();

    const message = this.selectedPropietario
      ? 'Propietario actualizado correctamente'
      : 'Propietario creado correctamente';

    this.selectedPropietario = null;
    this.showSuccessToast(message);
  }

  handleCancel() {
    this.viewMode = 'list';
    this.selectedPropietario = null;
  }

  handleBackToList() {
    this.viewMode = 'list';
    this.selectedPropietario = null;
  }

  private showSuccessToast(message: string) {
    this.toastMessage = message;
    this.toastType = 'success';
    this.showToast = true;
  }

  private showErrorToast(message: string) {
    this.toastMessage = message;
    this.toastType = 'error';
    this.showToast = true;
  }
}
