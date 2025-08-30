import { Component, Input, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import type { Inquilino } from "../interfaces/inquilino.interfaces"

@Component({
  selector: "app-inquilino-detail",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./inquilino-detail.component.html",
  styleUrls: ["./inquilino-detail.component.scss"],
})
export class InquilinoDetailComponent {
  @Input() inquilino!: Inquilino
  @Output() onEdit = new EventEmitter<void>()
  @Output() onBack = new EventEmitter<void>()
}
