import { ComponentType } from '@angular/cdk/portal';
import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ListBaseComponent } from 'src/app/shared/components/base';
import { FILTER_OPERATION } from 'src/app/shared/data';
import { CultureDTO, Filter, SearchParams } from 'src/app/shared/dto';
import { NavigateModel } from 'src/app/shared/models';
import { CultureService } from 'src/app/shared/services/culture.service';
import { CultureAddComponent } from '../culture-add/culture-add.component';
import { CultureEditComponent } from '../culture-edit/culture-edit.component';

@Component({
  selector: 'app-culture-list',
  templateUrl: './culture-list.component.html',
  styleUrls: ['./culture-list.component.scss']
})
export class CultureListComponent extends ListBaseComponent<CultureDTO> implements OnInit, AfterViewInit, OnDestroy {

  constructor(private cultureService: CultureService) {
    super(cultureService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() { 
    super.ngAfterViewInit();
  }

  initialSearchParams(): SearchParams {
    return new SearchParams();
  }

  @ViewChild('actions') actions: TemplateRef<any>;
  columns: any[];
  setColumns(): void {
    this.columns = [
      { prop: 'name' },
      { prop: 'actions', name: 'Actions', cellTemplate: this.actions }

    ]
  }

  setupFilters(searchTerm: string): string {
    const filter: Filter = {
      field: 'name',
      operator: FILTER_OPERATION.startWith,
      value: searchTerm
    }

    return JSON.stringify(filter);
  }

  openInPage(): false | NavigateModel {
    return false;
  }

  addComponentSolver(): ComponentType<any> {
    return CultureAddComponent;
  }

  editComponentSolver(): ComponentType<any> {
    return CultureEditComponent;
  }

  ngOnDestroy() { 
    super.ngOnDestroy();
  }
}