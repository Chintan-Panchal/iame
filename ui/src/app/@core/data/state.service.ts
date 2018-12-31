
import { of as observableOf, Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export class UserStateData {
  loggedIn: boolean;
  userId: number;
  organisationId: number;
  organisationName: string;
  organisationDomain: string;
  email: string;
  firstName: string;
  lastName: string;
  numberOfUsers: number;
  name: string;
}

@Injectable()
export class StateService {

  protected userstateData: UserStateData = new UserStateData();

  protected layouts: any = [
    {
      name: 'One Column',
      icon: 'nb-layout-default',
      id: 'one-column',
      selected: true,
    },
    {
      name: 'Two Column',
      icon: 'nb-layout-two-column',
      id: 'two-column',
    },
    {
      name: 'Center Column',
      icon: 'nb-layout-centre',
      id: 'center-column',
    },
  ];

  protected sidebars: any = [
    {
      name: 'Left Sidebar',
      icon: 'nb-layout-sidebar-left',
      id: 'left',
      selected: true,
    },
    {
      name: 'Right Sidebar',
      icon: 'nb-layout-sidebar-right',
      id: 'right',
    },
  ];

  protected layoutState$ = new BehaviorSubject(this.layouts[0]);
  protected sidebarState$ = new BehaviorSubject(this.sidebars[0]);
  public userStateData$ = new BehaviorSubject(this.userstateData);
  public paymentModalData: any = null;

  get state$(): Observable<UserStateData> {
    return this.userStateData$;
  }

  get state(): UserStateData {
    return this.userStateData$.getValue();
  }

  setState(nextState: UserStateData) {
    this.userStateData$.next(nextState);
  }

  setLayoutState(state: any): any {
    this.layoutState$.next(state);
  }

  getLayoutStates(): Observable<any[]> {
    return observableOf(this.layouts);
  }

  getPaymentModalData() {
    return this.paymentModalData;
  }

  onLayoutState(): Observable<any> {
    return this.layoutState$.asObservable();
  }

  setSidebarState(state: any): any {
    this.sidebarState$.next(state);
  }

  getSidebarStates(): Observable<any[]> {
    return observableOf(this.sidebars);
  }

  onSidebarState(): Observable<any> {
    return this.sidebarState$.asObservable();
  }

  // getStateData(): Observable<UserStateData> {
  //   return observableOf(this.userstateData);
  // }

  // onStateData(): Observable<any> {
  //   return observableOf(this.userStateData$);
  // }

  // getLatestStateData(): UserStateData {
  //   return this.userStateData$.getValue();
  // }

  // updateUserStateData() {
  //   this.userStateData$.next(this.userstateData);
  // }

  // setUserId(userId: number) {
  //   this.userstateData.userId = userId;
  // }

  // setOrganisationId(organisationId: number) {
  //   this.userstateData.organisationId = organisationId;
  // }

  // setEmail(email: string): any {
  //   this.userstateData.email = email;
  // }

  // setOrganisationName(name: string): any {
  //   this.userstateData.organisationName = name;
  // }
  // setLastName(name: string): any {
  //   this.userstateData.lastName = name;
  // }
  // setfirstName(name: string): any {
  //   this.userstateData.firstName = name;
  // }

  // setOrganisationDomain(domain: string) {
  //   this.userstateData.organisationDomain = domain;
  // }

  // setOrganisationWalletId(walletId: number) {
  //   this.userstateData.organisationWalletId = walletId;
  // }

  // setOrganisationAccountId(accountId: number) {
  //   this.userstateData.organisationAccountId = accountId;
  // }

  // setOrganisationWalletBalance(walletBalance: number) {
  //   this.userstateData.organisationWalletBalance = walletBalance;
  // }

  // setOrgnisationUserCount(count: number): any {
  //   this.userstateData.numberOfUsers = count;
  // }

  // setNumberOfPstnUsers(count: number): any {
  //   this.userstateData.numberOfPstnUsers = count;
  //   this.userStateData$.next(this.userstateData);
  // }

  setPaymentModalData(data: any): any {
    this.paymentModalData = data;
  }

}
