import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Garante } from '../interfaces/garante.interfaces';

@Component({
  selector: 'app-garante-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './garante-detail.component.html',
  styleUrls: ['./garante-detail.component.scss']
})
export class GaranteDetailComponent {
  @Input() garante!: Garante;
  @Output() onEdit = new EventEmitter<void>();
  @Output() onBack = new EventEmitter<void>();
}