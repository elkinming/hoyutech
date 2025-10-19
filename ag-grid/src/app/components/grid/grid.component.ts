import { Component, EventEmitter, OnInit, signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { AllCommunityModule, ModuleRegistry, ColDef, GridApi, GridReadyEvent, RowSelectionOptions } from 'ag-grid-community'; // Column Definition Type Interface

import userData from '../../../../public/users.json';
import { ModalComponent } from '../modal/modal.component';
import { User } from '../../interfaces/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbAlert, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [AgGridAngular, ModalComponent, NgbModule, CommonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
      ])
    ])
  ]
})
export class GridComponent {

  private api!: GridApi;

  rowData = [...userData];
  rowIndex = Number(userData[userData.length - 1].id);

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef[] = [
    { field: "id", filter: true},
    { field: "name", filter: true },
    { field: "email", filter: true },
    { field: "role", filter: true },
  ];

  defaultColDef = {
    flex: 1,
    enableCellChangeFlash: true
  };

  rowSelection: RowSelectionOptions = { 
    mode: 'multiRow'
  };

  userForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
  });

  showSaveAlert = false;

  constructor (
    public modalService: NgbModal
  ) {}

  getRowId = (params: any) => params.data.id;

  onGridReady = (event: GridReadyEvent) => {
    this.api = event.api;
  }

  onCellDoubleClicked = (event: any) => {
    this.userForm.patchValue(event.data);
    console.log(event.data);
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.userForm = this.userForm;
    modalRef.componentInstance.saveUserDataEvent.subscribe(() => {
      this.updateUserData();
    })
  }

  updateUserData = () => {
    const rowNode = this.api.getRowNode(this.userForm.controls['id'].value!)!;
    rowNode.updateData(this.userForm.value);
  }

  deleteSelectedUsers() {
    let selectedRows = this.api.getSelectedRows();
    this.api.applyTransaction({ remove: selectedRows })!;
  }

  addUser(){

    this.userForm.setValue({
      id: String(this.rowIndex + 1),
      name: '',
      email: '',
      role: ''
    })

    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.userForm = this.userForm;
    modalRef.componentInstance.saveUserDataEvent.subscribe(() => {
      const addSet = [this.userForm.value];
      this.api.applyTransaction({ add: addSet });
      this.rowIndex = this.rowIndex + 1;
    })

  }

  saveUsers(){
    this.showSaveAlert = true;
    setTimeout(() => {
      this.showSaveAlert = false;
    }, 2000);
  }



}
