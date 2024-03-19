export const BaseClassComponent = () => {
  return (target: any) => {
    /* Object.defineProperty(target.prototype, 'dialog', {
         value: 'sdasdsad',
     });
     Object.defineProperty(target.prototype, 'exportDataService', {
         value: 'asd33333'
     });*/

    return target;
  };
};


/*export const BaseClassComponent = () => {
    return function <T extends { new(...args: any[]): any>(Base: T) {
        @Component({template: '', standalone: true})
        class BaseD implements AfterViewInit {
            /!**
             * View Child of Data Table component
             *!/
            @ViewChildren(DataTableComponent) datatable: QueryList<DataTableComponent>;
            /!**
             * Keep reference of dialog for use inside of component
             *!/
            dialog: DynamicDialogRef;
            /!**
             * Reference of Modal
             *!/
            modalContent: Type<any>;
            /!**
             * Array of {@link HeadersTable} elements used in datatable
             *!/
            headersTable: HeadersTable[];

            request: any;

            constructor(public dialogService: DialogService,
                        public exportDataService: ExportDataService) {
            }

            ngAfterViewInit(): void {
                this.datatable.map((table: DataTableComponent): void => {
                    table.create.subscribe(() => this.showModal());
                    table.edit.subscribe(data => this.showModal({data}));
                    table.export.subscribe(() => this.exportData());
                });
            }

            /!**
             * Show modal width default config
             * @param config dynamic object
             *!/
            showModal(config: object = {}): void {
                this.dialog = this.dialogService.open(this.modalContent, config);
            }

            exportData(): void {
                this.exportDataService.sourceFields = this.headersTable.filter(header => header?.export);
                if (this.request) {
                    const ref = this.dialogService.open(ExportDataModalComponent, {});
                    ref.onClose.pipe(
                        filter(data => {
                            if (!data) {
                                this.exportDataService.targetFields = [];
                            }
                            return data;
                        }),
                        tap(() => this.exportDataService.exportExcel(this.request))
                    ).subscribe();
                }
            }
        }

        return BaseD;
    };
}*/
