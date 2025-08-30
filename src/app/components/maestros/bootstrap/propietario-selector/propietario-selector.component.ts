import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Propietario } from '../interfaces/propiedad.interfaces';
import { PropietariosService } from '../services/propietarios.service';
// Asumimos que existe un servicio de propietarios similar
// import { PropietariosService } from '../../services/propietarios.service';

@Component({
  selector: 'app-propietario-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './propietario-selector.component.html',
  styleUrls: ['./propietario-selector.component.scss']
})
export class PropietarioSelectorComponent implements OnInit, OnDestroy {
  @Input() selectedPropietario?: Propietario | null;
  @Input() error?: string | null;
  @Output() propietarioSelected = new EventEmitter<Propietario>();
  @Output() propietarioCleared = new EventEmitter<void>();

  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;

  isOpen = false;
  searchTerm = '';
  propietarios: Propietario[] = [];
  filteredPropietarios: Propietario[] = [];
  loading = false;

  constructor(
     private propietariosService: PropietariosService
  ) {}

  ngOnInit() {
    // Escuchar clicks fuera del componente para cerrar el dropdown
    document.addEventListener('click', this.onDocumentClick.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onDocumentClick.bind(this));
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.loadPropietarios();
      // Focus en el input de búsqueda después de que se renderice
      setTimeout(() => {
        if (this.searchInput) {
          this.searchInput.nativeElement.focus();
        }
      }, 100);
    }
  }

  private loadPropietarios() {
    if (this.propietarios.length === 0) {
      this.loading = true;


       this.propietariosService.getList().subscribe({
         next: (data) => {
           this.propietarios = data;
           this.filteredPropietarios = data;
           this.loading = false;
         },
         error: (error) => {
           console.error('Error loading propietarios:', error);
           this.loading = false;
         }
       });

/*       // Mock data para demostración
      setTimeout(() => {
        this.propietarios = [
          {
            id: 1,
            nombre: 'Juan',
            apellido: 'Pérez',
            dni: '12345678',
            email: 'juan.perez@email.com',
            cuit_cuil: '',
            telefono: '',
            direccion: ''
          },
          {
            id: 2,
            nombre: 'María',
            apellido: 'González',
            dni: '87654321',
            email: 'maria.gonzalez@email.com',
            cuit_cuil: '',
            telefono: '',
            direccion: ''
          }
        ];
        this.filteredPropietarios = this.propietarios;
        this.loading = false;
      }, 1000); */
    }
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
      propietario.email.toLowerCase().includes(searchLower)
    );
  }

  selectPropietario(propietario: Propietario) {
    this.propietarioSelected.emit(propietario);
    this.isOpen = false;
    this.searchTerm = '';
  }

  clearSelection() {
    this.propietarioCleared.emit();
  }

  private onDocumentClick(event: MouseEvent) {
    if (this.dropdownContainer && !this.dropdownContainer.nativeElement.contains(event.target as Node)) {
      this.isOpen = false;
    }
  }
}
