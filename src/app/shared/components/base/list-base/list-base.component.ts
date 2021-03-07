import { ComponentType } from '@angular/cdk/portal';
import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { matDialogConfig } from 'src/app/shared/configs';
import { NavigateModel } from 'src/app/shared/models';
import { SearchParams, SortModel } from 'src/app/shared/models/search-params.model';
import { DeleteDialogComponent } from 'src/app/shared/modules/dialogs/components/delete-dialog/delete-dialog.component';
import { BaseService } from 'src/app/shared/services/_base.service';
import { AppInjector } from 'src/app/shared/utilities/injector.utilities';

@Component({
  selector: 'app-list-base',
  template: ``,
})
export abstract class ListBaseComponent<T> {

  constructor(public baseService: BaseService<T>) {
    /**
     * @description Getting global injector to instatiate objects without DI
     */
    const injector: Injector = AppInjector.getInjector();
    this.dialog = injector.get(MatDialog);
    this.router = injector.get(Router);
  }

  router: Router;

  /**
   * @description To handle unsubscribing
   */
  subscriptions$: Subscription = new Subscription();

  /**
   * @description datatable options to use in HTML files in order to config datatable
   */
  datatableInputs: { [key: string]: any } = {
    loading: false,
    columnMode: "force",
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto',
    reorderable: true,
    externalPaging: true,
    count: 0,
    offset: 0,
    limit: 10,
  }

  /**
   * @description Rows of data will be stored in this array 
   */
  rows: T[] = [];

  /**
   * @description An object to store filtering items, that will be sent in getAll requests (list) to get filtered data.   
   */
  searchParams: SearchParams;

  /**
   * @description This fucntion initializes SearchParams object. 
   * @returns {SearchParams} An instance of SerchParams 
   */
  abstract initialSearchParams(): SearchParams;

  /**
   * @description MatDialog instance
   */
  dialog: MatDialog;


  /**
   * @description An abstract array to manage datatable comlumns
   */
  abstract columns: any[];

  /**
   * @description Usre must set up columns in this function
   */
  abstract setColumns(): void;

  /**
   * @description User must set up filter object in component. Prepared data is specific to each component
   * @param {string} searchTerm  Search input value, that user enters
   * @returns {string} stringified version filter(:Filter | DeepFilter) 
   */
  abstract setupFilters(searchTerm: string): string;

  /**
   * @description If the value this function returns is true, edit or add page will be opened in dialog
   */
  abstract openInPage(): NavigateModel | false;

  /**
   * @description This fucntion returns conceret class of Add component,  corresponded with List component. 
   * @returns {any} Conceret class of Add component; for example : DocumentTypeAddComponent
   */
  abstract addComponentSolver(): ComponentType<any>;

  /**
   * @description This fucntion returns conceret class of Edit component,  corresponded with List component. 
   * @returns {any} Conceret class of Edit component; for example : DocumentTypeEditComponent
   */
  abstract editComponentSolver(): ComponentType<any>;

  /**
   * @description Drived classes must call this function (super.ngAfterViewInit)
   */
  ngOnInit() {
    this.getData();
  }
  
  /**
   * @description Drived classes must call this function (super.ngAfterViewInit)
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.setColumns();
    });
  }

  /**
   * @description Getting list of data based on searchParams
   */
  getData() {
    const sub = this.baseService.getAll<any>(this.getSearchParams()).subscribe(result => {
      this.rows = [...result.items];
      this.datatableInputs.count = result.totalCount;
    });

    this.subscriptions$.add(sub);
  }

  getSearchParams(): string {
    return this.searchParams ? this.searchParams.stringify() : this.initialSearchParams().stringify();
  }

  /**
   * @description Fills searchParams.filter by what setupFilters returns (implemented by user)
   * @param {string} searchTerm Search input value, that user enters 
   */
  search(searchTerm: string) {
    this.searchParams.filter = this.setupFilters(searchTerm);

    this.getData();
  }

  /**
   * @description Open MatDialog for Add component
   */
  openAdd() {
    const openInPageResult = this.openInPage();
    if (openInPageResult) {
      this.router.navigate(openInPageResult.command, openInPageResult.extras);
    } else {
      const dialogRef = this.dialog.open(this.addComponentSolver(), matDialogConfig);
      const sub = dialogRef.afterClosed().subscribe(result => {
        this.getData();
      });

      this.subscriptions$.add(sub);
    }
  }

  /**
   * @description Open MatDialog for Edit component
   */
  openEdit(row: T) {
    const dialogRef = this.dialog.open(this.editComponentSolver(), { ...matDialogConfig, data: row });
    const sub = dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });

    this.subscriptions$.add(sub);
  }

  /**
   * @description Listener for pagination event in datatable
   * @param {Object} event A simple object contains data about pagination event : offset, limit, pageSize, pageIndex 
   */
  setPage(event: { [key: string]: any }) {
    this.searchParams.pageIndex = event.offset;
    this.searchParams.pageSize = event.limit;

    this.getData();
  }

  /**
   * @description Listener for sort event in datatable
   * @param {Object} event A simple object contains data about sort event : column, lastValue, newValue 
   */
  sortArray: SortModel[] = [];
  sort(event: { [key: string]: any }) {
    const sortItem = this.sortArray.find(item => item.field === event.column.prop);
    if (sortItem) {
      sortItem.type = event.newValue;
    } else {
      this.sortArray.push({ field: event.column.prop, type: event.newValue });
    }

    this.searchParams.sort = JSON.stringify(this.sortArray);
  }

  /**
   * @description Opens confirmation dialog for deletion
   * @param {string} id The id of entity, is going to be deleted
   */
  remove(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    const sub = dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.delete(id);
      }
    });
    this.subscriptions$.add(sub);
  }

  /**
   * @description Calls delete fucntions
   * @param {string} id The id of entity, is going to be deleted
   */
  delete(id: string) {
    const sub = this.baseService.delete(id).subscribe(result => {
      this.getData();
    });

    this.subscriptions$.add(sub);
  }

  /**
   * @description Unsubscribing observables. User must call this fucntions from ngOnDestroy in child component to unsubscribe
   */
  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }
}
