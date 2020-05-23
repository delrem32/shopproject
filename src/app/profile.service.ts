import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {share, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Validators} from '@angular/forms';

export interface UserProfile {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumberPrefix?: string;
  phoneNumber?: string;
  gender?: string;
  address?: string;
  agree?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public profileSubject = new BehaviorSubject(null) as BehaviorSubject<UserProfile>;
  profile$: Observable<UserProfile> = this.profileSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  updateProfile = (profile: any) => {
    const {_id} = this.profileSubject.getValue();
    const updateProfile$ = this.http.put(`http://localhost:5000/profiles/${_id}`, profile).pipe(share());
    updateProfile$.pipe(tap((profileRaw: UserProfile) => this.profileSubject.next(profileRaw))).subscribe();
    return updateProfile$;
  }

  requestProfile(id: any) {
    const objectObservable = this.http.get(`http://localhost:5000/profiles/${id}`).pipe(share());
    objectObservable.pipe(tap((profile: UserProfile) => this.profileSubject.next(profile))).subscribe();
    return objectObservable;
  }

  clearProfile() {
    this.profileSubject.next(null);
  }

  setProfile(profile: any) {
    return this.profileSubject.next(profile);
  }

  searchProfiles(params: { [key: string]: any }) {
    return this.http.get('http://localhost:5000/profiles', {params}).pipe(share());
  }

  queryProfiles(query: { [key: string]: any }) {
    return this.http.post('http://localhost:5000/profiles/q', query).pipe(share());
  }

  patchProfile(params: { privacy: any }) {
    return this.http.patch(`http://localhost:5000/profiles/${this.profileSubject.getValue()._id}`, params).pipe(share());
  }
}
