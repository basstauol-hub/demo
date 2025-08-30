// propietario-detail.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Propietario } from '../interfaces/propietario.interfaces';

@Component({
  selector: 'app-propietario-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './propietario_detail.component.html',
  styleUrls: ['./propietario_detail.component.scss']
})
export class PropietarioDetailComponent {
  @Input() propietario!: Propietario;
  @Output() onEdit = new EventEmitter<void>();
  @Output() onBack = new EventEmitter<void>();
}
