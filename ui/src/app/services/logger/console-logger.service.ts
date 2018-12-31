import { Injectable } from '@angular/core';
import { Logger } from './logger.service';
import { PropertyService } from '../property/property.service';

const noop = (): any => undefined;

@Injectable()
export class ConsoleLoggerService implements Logger {
    isDebugMode: boolean = false;

    constructor(private propertyService: PropertyService) {
        this.isDebugMode = this.propertyService.isDebugEnabled();
        this.propertyService.propertiesChanged$.subscribe((res) => {
            this.info('updating props debug is now', this.propertyService.isDebugEnabled());
            this.isDebugMode = propertyService.isDebugEnabled();
        })
    }

    get info() {
        if (this.isDebugMode) {
            return console.info.bind(console);
        } else {
            return noop;
        }
    }

    get warn() {
        if (this.isDebugMode) {
            return console.warn.bind(console);
        } else {
            return noop;
        }
    }

    get error() {
        if (this.isDebugMode) {
            return console.error.bind(console);
        } else {
            return noop;
        }
    }

    invokeConsoleMethod(type: string, args?: any): void {
        const logFn: Function = (console)[type] || console.log || noop;
        logFn.apply(console, [args]);
    }
}
