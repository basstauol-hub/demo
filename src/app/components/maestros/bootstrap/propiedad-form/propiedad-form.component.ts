import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Propiedad, Propietario } from '../interfaces/propiedad.interfaces';
import { PropiedadesService } from '../services/propiedades.service';
import { PropietarioSelectorComponent } from '../propietario-selector/propietario-selector.component';

@Component({
  selector: 'app-propiedad-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PropietarioSelectorComponent
  ],
  templateUrl: './propiedad-form.component.html',
  styleUrls: ['./propiedad-form.component.scss']
})
export class PropiedadFormComponent implements OnInit, OnChanges {
  @Input() propiedad?: Propiedad | null;
  @Output() onSuccess = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  propiedadForm!: FormGroup;
  selectedPropietario: Propietario | null = null;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private propiedadesService: PropiedadesService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.loadFormData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['propiedad'] && this.propiedadForm) {
      this.loadFormData();
    }
  }

  get isEditMode(): boolean {
    return !!this.propiedad?.id;
  }

  private initializeForm() {
    this.propiedadForm = this.fb.group({
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required]],
      idTipoPropiedad: ['', [Validators.required]],
      superficie: ['', [Validators.required, Validators.min(1)]],
      cantidadAmbientes: ['', [Validators.required, Validators.min(1)]],
      idPropietario_fk: ['']
    });
  }

  private loadFormData() {
    if (this.propiedad) {
      this.propiedadForm.patchValue({
        direccion: this.propiedad.direccion || '',
        ciudad: this.propiedad.ciudad || '',
        provincia: this.propiedad.provincia || '',
        codigoPostal: this.propiedad.codigoPostal || '',
        idTipoPropiedad: this.propiedad.idTipoPropiedad || '',
        superficie: this.propiedad.superficie || '',
        cantidadAmbientes: this.propiedad.cantidadAmbientes || '',
        idPropietario_fk: this.propiedad.idPropietario_fk?.id || ''
      });

      // Set selected propietario
      if (this.propiedad.idPropietario_fk) {
        this.selectedPropietario = {
          ...this.propiedad.idPropietario_fk,
          cuit_cuil: this.propiedad.idPropietario_fk.dni || '',
          telefono: this.propiedad.idPropietario_fk.email || '',
          direccion: this.propiedad.idPropietario_fk.apellido || ''
        };
      }
    } else {
      // Reset form for new property
      this.propiedadForm.reset();
      this.selectedPropietario = null;
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.propiedadForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onPropietarioSelected(propietario: Propietario) {
    this.selectedPropietario = propietario;
    this.propiedadForm.patchValue({
      idPropietario_fk: propietario.id
    });
  }

  onPropietarioCleared() {
    this.selectedPropietario = null;
    this.propiedadForm.patchValue({
      idPropietario_fk: ''
    });
  }

  onSubmit() {
    if (this.propiedadForm.valid) {
      this.saving = true;

      const formData = {
        ...this.propiedadForm.value,
        id: this.propiedad?.id || undefined,
        idPropietario_fk: this.selectedPropietario?.id || null
      };

      const request = this.isEditMode
        ? this.propiedadesService.update(formData.id, formData)
        : this.propiedadesService.create(formData);

      request.subscribe({
        next: (result) => {
          this.saving = false;
          this.onSuccess.emit();
        },
        error: (error) => {
          this.saving = false;
          console.error('Error saving property:', error);
          // TODO: Show error message
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.propiedadForm.controls).forEach(key => {
        this.propiedadForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancelClick() {
    this.onCancel.emit();
  }
}
