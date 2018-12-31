import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable ,  of as observableOf ,  BehaviorSubject ,  timer } from 'rxjs';
import { map ,  catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class PropertyService {
     props = {};

    /*we start of with whatever the setting is in environment, re. debugging info.*/
    private debug: boolean = environment.debug;
    private currentVersion: number = 0;
    public propertiesChanged$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(protected http: HttpClient) {
        timer(0, 120000).subscribe(() => {
            this.getBootstrapProperties().subscribe((data: any) => {
                const version = parseInt(data.version, 10);
                if (data.version && version && (version !== this.currentVersion)) {
                    this.currentVersion = +data.version;
                    this.debug = data.debug==='true' ? true : false;
                    this.props = {};
                    this.propertiesChanged$.next(true);
                }
            })
        });
    }

    isDebugEnabled(): boolean {
        return this.debug && this.debug==true;
    }

    getBootstrapProperties(): Observable<any> {
        return this.getProperty('frontend.bootstrap', '').pipe(
            map((data) => {
                const ret = {};
                data.split('\r\n').forEach((element: string) => {
                    const prop = element.split('=');
                    ret[prop[0]] = prop[1];
                })
                return ret
            }));
    }

    getProperty(name: string, defaultVal?: string): Observable<any> {
        if (name in this.props) {
            return observableOf(this.props[name]);
        } else {
            return this.http.request<any[]>('GET', `${environment.baseApiUrl}/properties/${name}`, { body: null, observe: 'response' }).pipe(
                map((data: any) => {
                    data = data.body;
                    if (name !== 'frontend.bootstrap') {
                        this.props[name] = data.value;
                    }
                    return data.value;
                }),
                catchError((err) => {
                    // this.logger.error('received error', err);
                    if (err instanceof (HttpErrorResponse)) {
                        switch((<HttpErrorResponse>err).status) {
                            case 404:
                                return observableOf(defaultVal);
                        }
                        return observableOf('');
                    }
                    return observableOf('');
                }),
            );
        }
    }


}
