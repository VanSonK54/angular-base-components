import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from "@angular/core";
@Component({
    templateUrl: './validation-message.component.html',
    styleUrls: ['./validation-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationMessageComponent {
    _text: string = '';
    _hide = true;

    @Input() set text(value: string) {
        if (value !== this._text) {
            this._text = value;
            this._hide = !Boolean(value);
            this.cdr.detectChanges();
        }
    };

    constructor(private cdr: ChangeDetectorRef) { }
}