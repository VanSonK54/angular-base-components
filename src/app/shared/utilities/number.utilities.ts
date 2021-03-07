import { Observable, timer } from "rxjs";
import { map, take } from "rxjs/operators";

export class NumberUtility {

    static countDown(max: number): Observable<number> {
        return timer(0, 1000).pipe(
            map(i => max - i),
            take(max + 1));
    }
}