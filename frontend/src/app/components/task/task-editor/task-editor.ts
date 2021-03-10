import { Component, EventEmitter, Output } from "@angular/core"
import { FormGroup } from "@angular/forms"

@Component({ template: '' })
export abstract class TaskEditorComponent {
  @Output() public readonly onSubmit = new EventEmitter()
  public readonly taskForm!: FormGroup
}