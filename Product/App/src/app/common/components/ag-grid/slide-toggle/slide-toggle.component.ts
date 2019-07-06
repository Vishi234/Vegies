import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-slide-toggle-cell',
    template: `
        <span class="viewIcon" style="display:table;margin:0 auto;">
            <mat-slide-toggle [ngModel]="checked" [matTooltip]="'toggle to '+(checked?'undeploy':'deploy')+' workflow'"
            matTooltipPosition="left" (ngModelChange)="onChange($event)"></mat-slide-toggle>
        </span>
    `,
    styles: [
        `
            ::ng-deep
            .mat-slide-toggle-bar {
                width: 100%;
                display: inline-block !important;
                text-align: center;
                margin-top: -4px;
            }
        `
    ]
})
export class MatSlideToggleComponent implements ICellRendererAngularComp {
    private params: any;

    public checked: boolean;

    agInit(params: any): void {
        this.params = params;
        this.checked = !!this.params.value;
    }

    // demonstrates how you can do "inline" editing of a cell
    onChange(checked: boolean) {
        this.checked = checked;
        if (this.params.colDef.functions && this.params.colDef.functions.onSlideToggle) {
            this.params.colDef.functions.onSlideToggle(this.checked, this.params.data, flag => {
                setTimeout(() => { this.checked = flag; });
            });
        } else {
            this.params.node.setDataValue(this.params.colDef, this.checked);
        }
    }

    refresh(params: any): boolean {
        return false;
    }
}
