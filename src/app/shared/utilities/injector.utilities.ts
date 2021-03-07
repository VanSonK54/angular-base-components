import { Injector } from "@angular/core";

export class AppInjector {
    private static injector: any;

    static setInjector(_injector: Injector) {
        this.injector = _injector;
    }

    static getInjector() {
        return this.injector;
    }
}