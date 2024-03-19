import {NgModule} from '@angular/core';
import {AsyncBooleanPipe} from './async-boolean.pipe';
import {AsyncNumberPipe} from './async-number.pipe';
import {AsyncTablePipe} from './async-table.pipe';
import {DeepPipe} from './deep.pipe';
import {WrapTextPipe} from './wrap.text.pipe';
import {SeverityPipe} from './severity.pipe';
import {MemoizePipe} from './memoize.pipe';


@NgModule({
    declarations: [
        AsyncBooleanPipe,
        AsyncNumberPipe,
        AsyncTablePipe,
        SeverityPipe,
        DeepPipe,
        WrapTextPipe,
        MemoizePipe
    ],
    imports: [],
    exports: [
        AsyncBooleanPipe,
        AsyncNumberPipe,
        AsyncTablePipe,
        SeverityPipe,
        DeepPipe,
        WrapTextPipe,
        MemoizePipe
    ],
    providers: []
})
export class PipesModule {
}
