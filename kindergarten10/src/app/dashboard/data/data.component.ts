import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  constructor(public storeService: StoreService, private backendService: BackendService) {}
  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public page: number = 0;
  selectedKindergarden: any;
  filteredChildren: any[] = [];
  sortOrder: 'asc' | 'desc' = 'asc';
  sortColumn: string = 'name';
  public showNotification = false;


  ngOnInit(): void {
    this.backendService.filterChildren(this.currentPage, this.selectedKindergarden, this.sortColumn, this.sortOrder);
  }

  sort(column: string) {
    if (column == this.sortColumn) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortOrder = 'asc';
    }
    this.sortColumn = column;
    this.backendService.filterChildren(this.currentPage, this.selectedKindergarden, this.sortColumn, this.sortOrder);
  }

  getAge(birthDate: string) {
    var today = new Date();
    var birthDateTimestamp = new Date(birthDate);
    var age = today.getFullYear() - birthDateTimestamp.getFullYear();
    var m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
      age--;
    }
    return age;
  }

  selectPage(i: any) {
    this.currentPage = i;
    this.selectPageEvent.emit(this.currentPage);
    this.backendService.filterChildren(this.currentPage, this.selectedKindergarden, this.sortColumn, this.sortOrder);
  }

  cancelRegistration(childId: string) {
    this.backendService.deleteChildData(childId, this.currentPage);
    this.showNotification = true;
  }

  closeModal() {
    this.showNotification = false;
  }

  onSelect(): void {
    this.selectPage(0);
    this.backendService.filterChildren(this.currentPage, this.selectedKindergarden, this.sortColumn, this.sortOrder);
    this.resetPaginator();
  }

  resetPaginator() {
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
  }

}
