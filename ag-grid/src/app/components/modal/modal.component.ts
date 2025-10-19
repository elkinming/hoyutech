import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbModule ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @ViewChild('userModal') myInputRef!: ElementRef;

  @Input() userForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required])
  });

  @Output() saveUserDataEvent = new EventEmitter<number>();

  constructor(
    public activeModal: NgbActiveModal
  ) {}

  onSubmit(){
    if(this.userForm.valid){
      this.saveUserDataEvent.emit();
      this.activeModal.dismiss();
    }
  }

  closeModal(){
    this.activeModal.close('Close click')
  }

}
