import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { ConfigService } from '../../services/config.service';
// import { HttpService } from '../../services/http.service';
import { MatSlideToggleComponent } from './slide-toggle/slide-toggle.component';

@Component({
    selector: 'app-ag-grid',
    templateUrl: './ag-grid.component.html',
    styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnInit, OnChanges {

    @Input() columnDefs: any[];
    @Input() dataSource: any;
    @Input() rowData: Array<any>;
    @Input() pageSize: number;
    @Input() viewButton: boolean;
    @Input() deleteButton: boolean;
    @Input() filters: any[];
    @Input() suppressColumnFit: boolean;
    @Output() rowClick = new EventEmitter();
    @Output() deleteClick = new EventEmitter();
    @Output() loadComplete = new EventEmitter();
    loading: boolean;
    loadDataSource: any;

    gridOptions: any = {
        columnDefs: this.columnDefs,
        rowData: this.rowData || null,
        rowModelType: 'infinite',
        cacheOverflowSize: 3,
        maxBlocksInCache: 3,
        enableColResize: true,
        pagination: true,
        rowHeight :30,
        // suppressPaginationPanel: true,
        enableSorting: true,
        enableServerSideSorting: true,
        defaultColDef: {
            suppressFilter: true
        },
        frameworkComponents: {
            slideToggleRenderer: MatSlideToggleComponent
        },
        components: {
            loadingRenderer: function (params) {
                if (params.value !== undefined) {
                    return params.value;
                } else {
                    return '<img src="img/loading.gif">';
                }
            },
            editIconRenderer: () => {
                return `<span style="cursor:pointer;" class="viewIcon"><center>
                <i class="fa fa-pencil-square-o" titlmaterial-icons" title="view" [matTooltip]="view/edit"></i></center></span>`;
            },
            deleteIconRenderer: () => {
                return `<span style="cursor:pointer;" class="deleteIcon"><center>
                <i class="material-icons" title="delete">delete_outline</i></center></span>`;
            }
        },
        onSortChanged: () => {
            const __this = this;
            const currentPage = this.gridOptions.currentPage;
            function sortChange() {
                if (__this.gridOptions.api.paginationGetTotalPages() < currentPage) {
                    setTimeout(sortChange);
                    return;
                }
                __this.gridOptions.api.paginationGoToPage(currentPage);
            }
            sortChange();
        },
        onPaginationChanged: () => {
            this.gridOptions.currentPage = this.gridOptions.api.paginationGetCurrentPage();
            if (!this.suppressColumnFit) { this.gridOptions.api.sizeColumnsToFit(); }
        }
    };

    constructor() { }

    ngOnInit() { }

    @HostListener('window:resize', ['$event']) onResize() {
        if (!this.suppressColumnFit) { this.gridOptions.api.sizeColumnsToFit(); }
    }

    ngOnChanges() {
        this.gridOptions.paginationPageSize = this.gridOptions.cacheBlockSize = this.pageSize = this.pageSize || 10;
        if (this.dataSource) {
            this.columnDefs = [];
            this.rowData = [];
            if (this.dataSource.lazyLoad) {
                this.initLazyGrid();
            } else {
                this.initGrid();
            }
        }
    }

    initGrid() {
        (this.dataSource.fields || []).forEach((field, idx) => {
            this.columnDefs.push({
                headerName: field.headerName, field: field.fieldName, suppressMovable: true, cellStyle: Object.assign({
                    border: 'none !important',
                    outline: 'none'
                }, field.cellStyle || {}), hide: field.hide, width: field.width, cellRenderer: field.cellRenderer || (params => {
                    if (params.value !== undefined) {
                        return '<span class="agGridList">' + field.headerName + ':</span>' +
                            (params.value.constructor === {}.constructor ? (params.value.data.constructor === {}.constructor ?
                                JSON.stringify(params.value.data) : JSON.stringify(params.value)) :
                                params.value);
                    } else if (idx === 0) {
                        return '<img src="img/loading.gif">';
                    }
                }), onCellClicked: params => field.onCellClicked ? field.onCellClicked(params.data) : null, functions: field.functions
            });
        });
        (this.dataSource.data || []).forEach(el => {
            if (el.data) {
                Object.assign(el, el.data);
                delete el.data;
            }
            this.rowData.push(el);
        });

        this.getEditDeleteButton();

        this.loadDataSource = this.getGridDataSource(this.rowData, this.gridOptions.paginationPageSize);
        this.onGridReady();
    }

    initLazyGrid() {
        this.dataSource.dataGrids.DataGrid.headers.forEach((column, idx) => {
            this.columnDefs.push({
                headerName: (column && column.headerNameInGrid ? column.headerNameInGrid : column.headerName), suppressFilter: true,
                field: column.fieldName, suppressMovable: true, hide: !column.retrievalField, width: column.width, cellStyle: {
                    border: 'none !important',
                    outline: 'none'
                }, cellClass: 'cell-wrap-text', cellRenderer: (params) => {
                    if (params.value !== undefined) {
                        return '<span class="agGridList">' + (column && column.headerNameInGrid ? column.headerNameInGrid :
                            column.headerName) + ':</span>' + params.value;
                    } else if (idx === 0) {
                        return '<img src="img/loading.gif">';
                    }
                }
            });
        });

        this.getEditDeleteButton();
        this.dataSource.referenceKey = this.dataSource.dataGrids.DataGrid.referenceKey;
    }

    getEditDeleteButton() {
        this.suppressColumnFit = this.suppressColumnFit ? this.columnDefs.filter(e => !e.hide).length < 6 ? false : true : false;
        this.columnDefs.splice(0, 0, {
            suppressMovable: true,
            width: 50,
            hide: !this.viewButton,
            pinned: this.suppressColumnFit ? 'left' : 'none',
            cellStyle: { border: 'none !important', outline: 'none' },
            cellRenderer: 'editIconRenderer',
            onCellClicked: params => {
                this.rowClick.emit(params.data);
            }
        });

        this.columnDefs.push({
            suppressMovable: true,
            width: 50,
            hide: !this.deleteButton,
            pinned: this.suppressColumnFit ? 'right' : 'none',
            cellStyle: { border: 'none !important', outline: 'none' },
            cellRenderer: 'deleteIconRenderer',
            onCellClicked: params => {
                this.deleteClick.emit(params.data);
            }
        });
        // this.columnDefs[1].cellRenderer = 'loadingRenderer';
    }

    getStatusPreview() {
        if (this.dataSource.writeStatus === 'InProgress') {
            
        } else if (this.dataSource.writeStatus === 'Completed') {
            this.loadComplete.emit(true);
        }
    }

    onGridReady() {
        if (!this.gridOptions.api) {
            setTimeout(() => this.onGridReady(), 1000);
            return;
        }
        this.gridOptions.api.setColumnDefs(this.columnDefs);
        if (!this.suppressColumnFit) { this.gridOptions.api.sizeColumnsToFit(); }
        this.gridOptions.api.setDatasource(this.loadDataSource);
    }

    changePageSize() {
        this.gridOptions.paginationPageSize = this.gridOptions.cacheBlockSize = this.pageSize;
        if (this.dataSource.lazyLoad) {
            this.loadDataSource = this.getLazyDataSource(this.dataSource, this.pageSize);
        } else {
            this.loadDataSource = this.getGridDataSource(this.rowData, this.pageSize);
        }
        this.gridOptions.api.setDatasource(this.loadDataSource);
    }

    getGridDataSource(data, pageSize) {
        const __this = this;
        if (!data || data === '') {
            data = [];
        }
        data = this.filterData(data.slice());

        const dataSource = {
            paginationPageSize: parseInt(pageSize, 10),
            getRows: params => {
                __this.gridOptions.api.showLoadingOverlay();
                setTimeout(() => {
                    const rowsThisPage = data.slice(params.startRow, params.endRow);
                    const lastRow = data.length;
                    params.successCallback(__this.sortData(params.sortModel, rowsThisPage), lastRow);
                    if (!lastRow) {
                        __this.gridOptions.api.showNoRowsOverlay();
                    } else {
                        __this.gridOptions.api.hideOverlay();
                    }
                    if (!__this.suppressColumnFit) { __this.gridOptions.api.sizeColumnsToFit(); }
                }, 100);
            }
        };
        return dataSource;
    }

    getLazyDataSource(pageDataSource: any, pageSize: any, cachePages?: number) {
        const __this = this;
        if (!pageDataSource) {
            return null;
        }

        if (!cachePages) {
            cachePages = 10;
        }

        const cache = {
            startRecord: 1,
            size: cachePages,
            pages: [],
            bufferPages: 3
        };

        function Page(startRecord) {
            this.startRecord = startRecord;
            this.data = null;
        }

        const dataSource = {
            paginationPageSize: parseInt(pageSize, 10),
            getRows: getRows
        };
        return dataSource;

        function relaceNullData(data) {
            for (const key in data) {
                if (data[key]) {
                    Object.keys(data[key]).forEach(field => {
                        if (data[key][field] == null) {
                            data[key][field] = '';
                        }
                    });
                }
            }
            return data;
        }

        function shiftCacheRight(by) {
            if (by <= 0) {
                return;
            }
            cache.startRecord -= by * pageSize;
            for (let i = cache.size - 1; i >= by; --i) {
                cache.pages[i] = cache.pages[i - by];
            }
        }
        function shiftCacheLeft(by) {
            if (by <= 0) {
                return;
            }
            cache.startRecord += by * pageSize;
            for (let i = 0; i < cache.size - by; ++i) {
                cache.pages[i] = cache.pages[i + by];
            }
        }

        function getRows(params) {
            const startRecord = params.startRow + 1;
            let cachePageIndex = (startRecord - cache.startRecord) / pageSize;
            const pageIndex = Math.ceil((startRecord - 1) / pageSize);
            let lastPageIndex;

            __this.gridOptions.api.showLoadingOverlay();
            if (pageDataSource.writeStatus === 'InProgress') {
                lastPageIndex = Math.floor(pageDataSource.totalCount / pageSize) - 1;
                if (lastPageIndex < 0) {
                    setTimeout(getRows, 2000, params);
                    return;
                }
            } else {
                if (pageDataSource.totalCount === 0) {
                    __this.gridOptions.api.showNoRowsOverlay();
                    params.successCallback([], pageDataSource.totalCount);
                    return;
                }
                lastPageIndex = Math.ceil(pageDataSource.totalCount / pageSize) - 1;
            }

            function fillCache(from, to) {
                for (let i = from; i <= to; ++i) {
                    const page = new Page(cache.startRecord + (i * pageSize));
                    const pageParams = {
                        referenceKey: pageDataSource.referenceKey,
                        startRecord: page.startRecord,
                        numberOfRecords: pageSize
                    };
                    
                    cache.pages[i] = page;
                }
            }

            if (cache.pages.length < cache.size && lastPageIndex >= cache.pages.length) {
                fillCache(cache.pages.length, (lastPageIndex >= cache.size ? cache.size - 1 : lastPageIndex));
            }

            if (cachePageIndex < cache.bufferPages) {
                let newCachePageIndex = Math.floor((cache.size - 1) / 2);
                if (pageIndex < newCachePageIndex) {
                    newCachePageIndex = pageIndex;
                }
                const shiftBy = newCachePageIndex - cachePageIndex;

                shiftCacheRight(shiftBy);
                fillCache(0, (shiftBy > cache.size ? cache.size : shiftBy) - 1);
                if (shiftBy > 0) {
                    cachePageIndex = newCachePageIndex;
                }
            } else if (cachePageIndex >= cache.size - cache.bufferPages) {
                let newCachePageIndex = Math.ceil((cache.size - 1) / 2);

                if (lastPageIndex - pageIndex < cache.size - newCachePageIndex - 1) {
                    newCachePageIndex = cache.size - 1 - (lastPageIndex - pageIndex);
                }

                const shiftBy = cachePageIndex - newCachePageIndex;
                shiftCacheLeft(shiftBy);
                fillCache((shiftBy > cache.size ? 0 : cache.size - shiftBy), cache.size - 1);
                if (shiftBy > 0) {
                    cachePageIndex = newCachePageIndex;
                }
            }

            setDataFrom(cache.pages[cachePageIndex]);

            function setDataFrom(page) {
                if (!page.subscriber.closed) {
                    console.log('waiting for data to arrive from record number: ', page.startRecord);
                    setTimeout(setDataFrom, 2000, page);
                    return;
                }
                __this.gridOptions.api.hideOverlay();
                params.successCallback(__this.sortData(params.sortModel, page.data),
                    (pageDataSource.writeStatus === 'Completed') ? pageDataSource.totalCount : undefined);

                if (!__this.suppressColumnFit) { __this.gridOptions.api.sizeColumnsToFit(); }
            }
        }
    }

    sortData(sortModel, data) {
        const sortPresent = sortModel && sortModel.length > 0;
        if (!sortPresent) {
            return data;
        }
        const resultOfSort = data.slice();
        resultOfSort.sort((a, b) => {
            for (let k = 0; k < sortModel.length; k++) {
                const sortColModel = sortModel[k];
                const valueA = a[sortColModel.colId];
                const valueB = b[sortColModel.colId];
                if (valueA === valueB) {
                    continue;
                }
                const sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
                if (valueA > valueB) {
                    return sortDirection;
                } else {
                    return sortDirection * -1;
                }
            }
            return 0;
        });
        return resultOfSort;
    }

    filterData(rowData) {
        return rowData.filter(rec => {
            let flag = true;
            if (Array.isArray(this.filters)) {
                this.filters.forEach(filter => {
                    if (filter) {
                        if (filter.constructor === {}.constructor) {
                            flag = flag && rec[filter.key] && rec[filter.key].includes(filter.value);
                        } else if (filter.constructor === ''.constructor) {
                            flag = flag && this.columnDefs.find(col => rec[col.field] &&
                                rec[col.field].toLowerCase().includes(filter.toLowerCase()));
                        }
                    }
                });
            }
            return flag;
        });
    }
}
