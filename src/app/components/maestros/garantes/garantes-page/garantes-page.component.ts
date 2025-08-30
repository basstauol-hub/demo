import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbToast, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { Garante } from '../interfaces/garante.interfaces';
import { GarantesService } from '../services/garantes.service';
import { GarantesTableComponent } from '../garantes-table/garantes-table.component';
import { GaranteFormComponent } from '../garante-form/garante-form.component';
import { GaranteDetailComponent } from '../garante-detail/garante-detail.component';

type ViewMode = 'list' | 'form' | 'detail';

@Component({
  selector: 'app-garantes-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbToastModule,
    GarantesTableComponent,
    GaranteFormComponent,
    GaranteDetailComponent
  ],
  templateUrl: './garantes-page.component.html',
  styleUrls: ['./garantes-page.component.scss']
})
export class GarantesPageComponent implements OnInit {
  garantes: Garante[] = [];
  filteredGarantes: Garante[] = [];
  loading = true;
  searchTerm = '';
  viewMode: ViewMode = 'list';
  selectedGarante: Garante | null = null;

  // Toast properties
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private garantesService: GarantesService
  ) {}

  ngOnInit() {
    this.loadGarantes();
  }

  loadGarantes() {
    this.loading = true;

    this.garantesService.getList().subscribe({
      next: (data) => {
        this.garantes = data;
        this.filteredGarantes = data;
        this.loading = false;
      },
      error: (error) => {
        this.showErrorToast('No se pudieron cargar los garantes');
        this.loading = false;
      }
    });
  }

  filterGarantes() {
    if (!this.searchTerm.trim()) {
      this.filteredGarantes = this.garantes;
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredGarantes = this.garantes.filter(garante =>
      garante.nombre.toLowerCase().includes(searchLower) ||
      garante.apellido.toLowerCase().includes(searchLower) ||
      garante.dni.includes(this.searchTerm) ||
      garante.email.toLowerCase().includes(searchLower) ||
      garante.cuit_cuil.includes(this.searchTerm) ||
      garante.telefono.includes(this.searchTerm) ||
      garante.direccion.toLowerCase().includes(searchLower)
    );
  }

  handleNew() {
    this.selectedGarante = null;
    this.viewMode = 'form';
  }

  handleEdit(garante: Garante) {
    this.selectedGarante = garante;
    this.viewMode = 'form';
  }

  handleEditFromDetail() {
    this.viewMode = 'form';
  }

  handleView(garante: Garante) {
    this.selectedGarante = garante;
    this.viewMode = 'detail';
  }

  handleFormSuccess() {
    this.viewMode = 'list';
    this.loadGarantes();

    const message = this.selectedGarante
      ? 'Garante actualizado correctamente'
      : 'Garante creado correctamente';

    this.selectedGarante = null;
    this.showSuccessToast(message);
  }

  handleCancel() {
    this.viewMode = 'list';
    this.selectedGarante = null;
  }

  handleBackToList() {
    this.viewMode = 'list';
    this.selectedGarante = null;
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