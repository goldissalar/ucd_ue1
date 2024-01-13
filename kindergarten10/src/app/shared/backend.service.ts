import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { StoreService } from './store.service';
import { Child, ChildResponse } from './interfaces/Child';
import { CHILDREN_PER_PAGE } from './constants';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient, private storeService: StoreService) {}

  public getKindergardens() {
    this.storeService.isLoading = true;
    this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens').subscribe((data) => {
      this.storeService.kindergardens = data;
      this.storeService.isLoading = false;
    });
  }

  public filterChildren(page: number, kindergardenId: number, sort: string, sortOrder: string) {
    this.storeService.isLoading = true;
    let filter = '';
    if (!!kindergardenId && kindergardenId != 0) {
      filter += `&kindergardenId=${kindergardenId}`;
    }
    if (!!sort) {
      filter += `&_sort=${sort}`;
      if (!!sortOrder) {
        filter += `&_order=${sortOrder}`;
      }
    }

    this.http
      .get<ChildResponse[]>(
        `http://localhost:5000/childs?_expand=kindergarden&_page=${page}${filter}&_limit=${CHILDREN_PER_PAGE}`,
        { observe: 'response' }
      )
      .subscribe((data) => {
        this.storeService.children = data.body!;
        this.storeService.childrenTotalCount = Number(data.headers.get('X-Total-Count'));
        this.storeService.isLoading = false;
      });
  }

  public addChildData(child: Child, page: number) {
    this.http.post('http://localhost:5000/childs', child).subscribe((_) => {
      this.filterChildren(page, 0, 'name', 'asc');
    });
  }

  public deleteChildData(childId: string, page: number) {
    this.storeService.isLoading = true;
    this.http.delete(`http://localhost:5000/childs/${childId}`).subscribe((_) => {
      this.filterChildren(page, 0, 'name', 'asc');
      this.storeService.isLoading = false;
    });
  }
}
