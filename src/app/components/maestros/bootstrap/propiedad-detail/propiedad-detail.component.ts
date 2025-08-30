import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Propiedad } from '../interfaces/propiedad.interfaces';

@Component({
  selector: 'app-propiedad-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './propiedad-detail.component.html',
  styleUrls: ['./propiedad-detail.component.scss']
})
export class PropiedadDetailComponent {
  @Input() propiedad!: Propiedad;
  @Output() onEdit = new EventEmitter<void>();
  @Output() onBack = new EventEmitter<void>();
}
