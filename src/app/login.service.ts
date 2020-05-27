import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {catchError, distinctUntilChanged, partition, pluck, share, tap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ProfileService} from './profile.service';

interface RegisterCredentials {
  login: string;
  password: string;
}
interface UserProfile {
  contacts: any[];
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  photo: string[];
  securitySettings: {
    additionalInfo: string;
    autoResume: string;
    company: string;
    fio: string;
    phone: string;
    position: string;
    receiveMessagesFrom: string;
    trackMyChanges: string;
  };
  skills: any[];
  _id: string;
}

const httpResponseOrErrorPartition = partition((httpResponse) => httpResponse instanceof HttpErrorResponse === false);
const shareWithError = <T>(src: Observable<T>) => src.pipe(share(), catchError((err) => of(err)));
const postWithErrors = (http: HttpClient, url, body: any, options: any = {}) => http
  .post(url, body, options).pipe((observable) => shareWithError(observable));
// const putWithErrors = (http: HttpClient, url, body: any, options: any = {}) => http.put(url, body, options)
// .pipe((observable) => shareWithError(observable));
const getWithErrors = (http: HttpClient, url, options: any = {}) => http.get(url, options)
  .pipe((observable) => shareWithError(observable));


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authorizedSubject = new BehaviorSubject(null);
  isAuthorized$ = this.authorizedSubject.asObservable().pipe(distinctUntilChanged());
  private userSubject = new Subject();
  user$ = this.userSubject.asObservable().pipe(distinctUntilChanged());
  private apiURL = 'http://localhost:5000/users';

  constructor(private router: Router, private http: HttpClient, private profileService: ProfileService) {
  }

  login(credentials: RegisterCredentials | UserProfile) {
    const safeLogin$ = postWithErrors(this.http, 'http://localhost:5000/users/login', credentials);
    const [success$, error$] = httpResponseOrErrorPartition(safeLogin$);
    success$.pipe(
      tap(() => this.authorizedSubject
        .next(true)),
      tap(({token}) => localStorage.setItem('token', token)))
      .subscribe();
    error$.pipe(
      tap(() => this.authorizedSubject.next(false)))
      .subscribe();
    return [success$, error$];
  }
  logout() {
    this.authorizedSubject.next(false);
    this.profileService.clearProfile();
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  register(newUser: any) {
    const source$ = postWithErrors(this.http, 'http://localhost:5000/users', newUser);
    const [success$, error$] = httpResponseOrErrorPartition(source$);
    success$
      .pipe(
        tap(() => this.authorizedSubject.next(true)),
        tap(({ token }) => localStorage.setItem('token', token))
      ).subscribe();

    error$.pipe(tap(() => this.authorizedSubject.next(false)), tap(console.error)).subscribe();
    return [success$, error$];
  }

  check() {
    const [success$, error$] = httpResponseOrErrorPartition(getWithErrors(this.http, 'http://localhost:5000/users/authorized'));
    success$.pipe(
      pluck('authorized'),
      tap((authStatus: boolean) => this.authorizedSubject.next(authStatus))
    ).subscribe();
    error$.pipe(
      tap(() => this.profileService.clearProfile()),
      tap(() => this.userSubject.next(null)),
      tap(() => this.authorizedSubject.next(false)),
      tap(() => localStorage.removeItem('token'))
    ).subscribe();
    return [success$, error$];
  }

  info() {
    const [success$, error$] = httpResponseOrErrorPartition(this.http.get('http://localhost:5000/users/info').pipe(share()));
    success$.pipe(
      tap((user) => this.userSubject.next(user)),
      tap(({ profile }) => {
        debugger;
        return this.profileService.requestProfile(profile);
      })
    ).subscribe();
    error$.pipe(
      tap(() => this.profileService.clearProfile()),
      tap(() => this.authorizedSubject.next(false)),
      tap(() => this.userSubject.next(false))
    ).subscribe();
    return [success$, error$];
  }
}
