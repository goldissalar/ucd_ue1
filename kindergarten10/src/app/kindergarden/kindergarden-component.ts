import {Component, OnInit} from '@angular/core';
import { StoreService } from 'src/app/shared/store.service';
import {Kindergarden, Typ} from "../shared/interfaces/Kindergarden";

@Component({
  selector: 'kindergarden-page',
  templateUrl: './kindergarden-component.html',
  styleUrls: ['./kindergarden-component.scss']
})
export class KindergardenComponent implements OnInit {
  constructor(public storeService: StoreService) {}
  selectedKindergarden: Kindergarden = {
    id: 0,
    name: '',
    address: '',
    betreiber: '',
    typ: Typ.oeffentlich,
  };
  showDetailPage: boolean = false;

  ngOnInit(): void {
    console.log(this.storeService.kindergardens);
  }

  getType(type: number) {
    return type == 1 ? "Privat": "Öffentlich";
  }
  showDetails(id: number) {
    let found = this.storeService.kindergardens.find( o => o.id === id);
    if (!!found) {
      this.selectedKindergarden = found;
    }
    if (!!found) {
      this.showDetailPage = true;
    }
  }

}
