import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Garante, CreateGaranteRequest } from '../interfaces/garante.interfaces';
import { GarantesService } from '../services/garantes.service';

@Component({
  selector: 'app-garante-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './garante-form.component.html',
  styleUrls: ['./garante-form.component.scss']
})
export class GaranteFormComponent implements OnInit, OnChanges {
  @Input() garante?: Garante | null;
  @Output() onSuccess = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  garanteForm!: FormGroup;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private garantesService: GarantesService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.loadFormData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['garante'] && this.garanteForm) {
      this.loadFormData();
    }
  }

  get isEditMode(): boolean {
    return !!this.garante?.id;
  }

  private initializeForm() {
    this.garanteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      dni: ['', [
        Validators.required,
        Validators.pattern(/^\d{8}$/)
      ]],
      cuit_cuil: ['', [
        Validators.required,
        Validators.pattern(/^\d{2}-\d{8}-\d{1}$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      telefono: ['', [
        Validators.required,
        Validators.pattern(/^[\+]?[\d\s\-\(\)]+$/)
      ]],
      direccion: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  private loadFormData() {
    if (this.garante) {
      this.garanteForm.patchValue({
        nombre: this.garante.nombre || '',
        apellido: this.garante.apellido || '',
        dni: this.garante.dni || '',
        cuit_cuil: this.garante.cuit_cuil || '',
        email: this.garante.email || '',
        telefono: this.garante.telefono || '',
        direccion: this.garante.direccion || ''
      });
    } else {
      // Reset form for new garante
      this.garanteForm.reset();
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.garanteForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.garanteForm.valid) {
      this.saving = true;

      const formData: CreateGaranteRequest = {
        ...this.garanteForm.value
      };

      const request = this.isEditMode
        ? this.garantesService.update(this.garante!.id, formData)
        : this.garantesService.create(formData);

      request.subscribe({
        next: (result) => {
          this.saving = false;
          this.onSuccess.emit();
        },
        error: (error) => {
          this.saving = false;
          console.error('Error saving garante:', error);
          // TODO: Show error message
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.garanteForm.controls).forEach(key => {
        this.garanteForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancelClick() {
    this.onCancel.emit();
  }
}