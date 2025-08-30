// propietario-form.component.ts
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Propietario, CreatePropietarioRequest } from '../interfaces/propietario.interfaces';
import { PropietariosService } from '../services/propietarios_service';

@Component({
  selector: 'app-propietario-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './propietario_form.component.html',
  styleUrls: ['./propietario_form.component.scss']
})
export class PropietarioFormComponent implements OnInit, OnChanges {
  @Input() propietario?: Propietario | null;
  @Output() onSuccess = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  propietarioForm!: FormGroup;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private propietariosService: PropietariosService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.loadFormData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['propietario'] && this.propietarioForm) {
      this.loadFormData();
    }
  }

  get isEditMode(): boolean {
    return !!this.propietario?.id;
  }

  private initializeForm() {
    this.propietarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      dni: ['', [
        Validators.required,
        Validators.pattern(/^\d{8}$/)
      ]],
      cuit_cuil: ['', [
        Validators.pattern(/^\d{2}-\d{8}-\d{1}$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      telefono: ['', [
        Validators.pattern(/^[\+]?[\d\s\-\(\)]+$/)
      ]],
      direccion: ['']
    });
  }

  private loadFormData() {
    if (this.propietario) {
      this.propietarioForm.patchValue({
        nombre: this.propietario.nombre || '',
        apellido: this.propietario.apellido || '',
        dni: this.propietario.dni || '',
        cuit_cuil: this.propietario.cuit_cuil || '',
        email: this.propietario.email || '',
        telefono: this.propietario.telefono || '',
        direccion: this.propietario.direccion || ''
      });
    } else {
      // Reset form for new propietario
      this.propietarioForm.reset();
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.propietarioForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.propietarioForm.valid) {
      this.saving = true;

      const formData: CreatePropietarioRequest = {
        ...this.propietarioForm.value
      };

      const request = this.isEditMode
        ? this.propietariosService.update(this.propietario!.id, formData)
        : this.propietariosService.create(formData);

      request.subscribe({
        next: (result) => {
          this.saving = false;
          this.onSuccess.emit();
        },
        error: (error) => {
          this.saving = false;
          console.error('Error saving propietario:', error);
          // TODO: Show error message
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.propietarioForm.controls).forEach(key => {
        this.propietarioForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancelClick() {
    this.onCancel.emit();
  }
}
