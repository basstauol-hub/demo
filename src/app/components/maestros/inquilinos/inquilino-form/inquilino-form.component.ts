import { Component, Input, Output, EventEmitter,  OnInit,  OnChanges,  SimpleChanges } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule,  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import  { Inquilino } from "../interfaces/inquilino.interfaces"
import  { InquilinosService } from "../services/inquilinos.service"

@Component({
  selector: "app-inquilino-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./inquilino-form.component.html",
  styleUrls: ["./inquilino-form.component.scss"],
})
export class InquilinoFormComponent implements OnInit, OnChanges {
  @Input() inquilino?: Inquilino | null
  @Output() onSuccess = new EventEmitter<void>()
  @Output() onCancel = new EventEmitter<void>()

  inquilinoForm!: FormGroup
  saving = false

  constructor(
    private fb: FormBuilder,
    private inquilinosService: InquilinosService,
  ) {
    this.initializeForm()
  }

  ngOnInit() {
    this.loadFormData()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["inquilino"] && this.inquilinoForm) {
      this.loadFormData()
    }
  }

  get isEditMode(): boolean {
    return !!this.inquilino?.id
  }

  private initializeForm() {
    this.inquilinoForm = this.fb.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      apellido: ["", [Validators.required, Validators.minLength(2)]],
      dni: ["", [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
      cuit_cuil: ["", [Validators.required, Validators.pattern(/^\d{2}-\d{8}-\d{1}$/)]],
      telefono: ["", [Validators.required, Validators.pattern(/^[\d\s\-+$$$$]+$/)]],
      email: ["", [Validators.required, Validators.email]],
      direccion: ["", [Validators.required, Validators.minLength(5)]],
    })
  }

  private loadFormData() {
    if (this.inquilino) {
      this.inquilinoForm.patchValue({
        nombre: this.inquilino.nombre || "",
        apellido: this.inquilino.apellido || "",
        dni: this.inquilino.dni || "",
        cuit_cuil: this.inquilino.cuit_cuil || "",
        telefono: this.inquilino.telefono || "",
        email: this.inquilino.email || "",
        direccion: this.inquilino.direccion || "",
      })
    } else {
      // Reset form for new inquilino
      this.inquilinoForm.reset()
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.inquilinoForm.get(fieldName)
    return !!(field && field.invalid && (field.dirty || field.touched))
  }

  getFieldError(fieldName: string): string {
    const field = this.inquilinoForm.get(fieldName)
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors["required"]) return `${this.getFieldLabel(fieldName)} es requerido`
      if (field.errors["minlength"])
        return `${this.getFieldLabel(fieldName)} debe tener al menos ${field.errors["minlength"].requiredLength} caracteres`
      if (field.errors["pattern"]) {
        switch (fieldName) {
          case "dni":
            return "DNI debe tener 7 u 8 dígitos"
          case "cuit_cuil":
            return "CUIT/CUIL debe tener formato XX-XXXXXXXX-X"
          case "telefono":
            return "Teléfono debe contener solo números, espacios, guiones, + y paréntesis"
          default:
            return "Formato inválido"
        }
      }
      if (field.errors["email"]) return "Email debe tener un formato válido"
    }
    return ""
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      nombre: "Nombre",
      apellido: "Apellido",
      dni: "DNI",
      cuit_cuil: "CUIT/CUIL",
      telefono: "Teléfono",
      email: "Email",
      direccion: "Dirección",
    }
    return labels[fieldName] || fieldName
  }

  onSubmit() {
    if (this.inquilinoForm.valid) {
      this.saving = true

      const formData = {
        ...this.inquilinoForm.value,
        id: this.inquilino?.id || undefined,
      }

      const request = this.isEditMode
        ? this.inquilinosService.update(formData.id, formData)
        : this.inquilinosService.create(formData)

      request.subscribe({
        next: (result) => {
          this.saving = false
          this.onSuccess.emit()
        },
        error: (error) => {
          this.saving = false
          console.error("Error saving inquilino:", error)
          // TODO: Show error message
        },
      })
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.inquilinoForm.controls).forEach((key) => {
        this.inquilinoForm.get(key)?.markAsTouched()
      })
    }
  }

  onCancelClick() {
    this.onCancel.emit()
  }
}
