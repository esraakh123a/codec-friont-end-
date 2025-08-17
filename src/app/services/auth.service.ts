import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userBehaviorSubject = new BehaviorSubject<User | null>(
    this.getUserFromLocalStorage()
  );
  user$ = this.userBehaviorSubject.asObservable();

  private readonly userKey = 'userData';
  private readonly tokenKey = 'token';

  constructor(private http: HttpClient) {
    // عشان مهما اعمل ريفرش الداتا مش تتمسح عشان كده بحطها فى الكنستركتور
    // عند تشغيل الخدمة نحاول نجيب اليوزر من الـ localStorage
    const savedUser = this.getUserFromLocalStorage();
    if (savedUser) {
      this.userBehaviorSubject.next(savedUser);
    }
  }
  //عشان مهما اعمل ريفرش الداتا مش تتمسح
  // Get User from localStorage
  getUserFromLocalStorage(): User | null {
    const userDataStr = localStorage.getItem(this.userKey);
    if (userDataStr) {
      return JSON.parse(userDataStr);
    }
    return null;
  }

  // Get Token from localStorage
  getTokenFromLocalStorage(): string | null {
    return localStorage.getItem(this.tokenKey);
  }


  register(user: User) {
  // لا داعي لجلب token هنا لأنه تسجيل جديد
  return this.http.post<User>('http://localhost:8000/Users', {
    name: user.name,
    email: user.email,
    password: user.password,
    phonenumber: user.phonenumber, // تأكد من توافق الرقم مع regex المصري
    city: user.city,
    role: user.role
  }).pipe(
    tap((response: any) => {
      console.log('✅ Register success:', response);
      // حفظ بيانات المستخدم بدون token
      this.userBehaviorSubject.next(response);
      localStorage.setItem(this.userKey, JSON.stringify(response));
    })
  );
}


  login(user: User) {
    const token = localStorage.getItem('token');

    //to call api
    return this.http
      .post<User>('http://localhost:8000/Users/login', {
         // مش user.username (خليه متوافق مع الموديل)
      email: user.email,
      password: user.password,

      })
      .pipe(
        tap((response: any) => {


          this.userBehaviorSubject.next(response);
          //بحفظ اليوزر داتا  فى اللوكل عشان لما باجى اعمل ريلود للصفحه الحاجه مش تتمسح
          localStorage.setItem(this.userKey, JSON.stringify(response));

        })
      );
  }

  // Logout function
  logout() {
    this.userBehaviorSubject.next(null);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.tokenKey);
  }
}
