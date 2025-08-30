import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbToast, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { Propiedad } from '../interfaces/propiedad.interfaces';
import { PropiedadesService } from '../services/propiedades.service';
import { PropiedadesTableComponent } from '../propiedades-table/propiedades-table.component';
import { PropiedadFormComponent } from '../propiedad-form/propiedad-form.component';
import { PropiedadDetailComponent } from '../propiedad-detail/propiedad-detail.component';

type ViewMode = 'list' | 'form' | 'detail';

@Component({
  selector: 'app-propiedades-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbToastModule,
    PropiedadesTableComponent,
    PropiedadFormComponent,
    PropiedadDetailComponent
  ],
  templateUrl: './propiedades-page.component.html',
  styleUrls: ['./propiedades-page.component.scss']
})
export class PropiedadesPageComponent implements OnInit {
  propiedades: Propiedad[] = [];
  filteredPropiedades: Propiedad[] = [];
  loading = true;
  searchTerm = '';
  viewMode: ViewMode = 'list';
  selectedPropiedad: Propiedad | null = null;

  // Toast properties
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private propiedadesService: PropiedadesService
  ) {}

  ngOnInit() {
    this.loadPropiedades();
  }

  loadPropiedades() {
    this.loading = true;

    this.propiedadesService.getList().subscribe({
      next: (data) => {
        this.propiedades = data;
        this.filteredPropiedades = data;
        this.loading = false;
      },
      error: (error) => {
        this.showErrorToast('No se pudieron cargar las propiedades');
        this.loading = false;
      }
    });
  }

  filterPropiedades() {
    if (!this.searchTerm.trim()) {
      this.filteredPropiedades = this.propiedades;
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredPropiedades = this.propiedades.filter(propiedad =>
      propiedad.direccion.toLowerCase().includes(searchLower) ||
      propiedad.ciudad.toLowerCase().includes(searchLower) ||
      propiedad.provincia.toLowerCase().includes(searchLower) ||
      propiedad.codigoPostal.includes(this.searchTerm) ||
      propiedad.idPropietario_fk?.nombre.toLowerCase().includes(searchLower) ||
      propiedad.idPropietario_fk?.apellido.toLowerCase().includes(searchLower)
    );
  }

  handleNew() {
    this.selectedPropiedad = null;
    this.viewMode = 'form';
  }

  handleEdit(propiedad: Propiedad) {
    this.selectedPropiedad = propiedad;
    this.viewMode = 'form';
  }

  handleEditFromDetail() {
    this.viewMode = 'form';
  }

  handleView(propiedad: Propiedad) {
    this.selectedPropiedad = propiedad;
    this.viewMode = 'detail';
  }

  handleFormSuccess() {
    this.viewMode = 'list';
    this.loadPropiedades();

    const message = this.selectedPropiedad
      ? 'Propiedad actualizada correctamente'
      : 'Propiedad creada correctamente';

    this.selectedPropiedad = null;
    this.showSuccessToast(message);
  }

  handleCancel() {
    this.viewMode = 'list';
    this.selectedPropiedad = null;
  }

  handleBackToList() {
    this.viewMode = 'list';
    this.selectedPropiedad = null;
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
