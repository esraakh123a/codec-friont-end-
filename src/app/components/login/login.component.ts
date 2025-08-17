import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


 token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
  emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  roles = ['student', 'admin', 'instructor'];
    form: FormGroup;

    //   form = new FormGroup({
    // emailvar: new FormControl('',[Validators.email,
    //   Validators.required,
    //   Validators.pattern(this.emailPattern),
    //   this.noUppercaseValidator]),

  constructor(private fb: FormBuilder , private authService: AuthService, private router: Router) {
    // نقدر نستخدم this هنا بسهولة
    this.form = this.fb.group({
      emailvar: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailPattern),
        // noUppercaseValidator
      ]],
  passwordvar: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)
      ]]


    });
  }


get emailErrors(): string[] {
  const errors = this.form.get('emailvar')?.errors;
  if (!errors) return [];

  const errorMessages: string[] = [];

  if (errors['required']) errorMessages.push('Email is required.');
  if (errors['email']) errorMessages.push('Invalid email format.');
  if (errors['pattern']) errorMessages.push('Please enter a valid pattern.');
  if (errors['hasUppercase']) errorMessages.push('Email must be lowercase only.');

  return errorMessages;
}






  get email(){
    return this.form.get('emailvar')
  }
    get password() { return this.form.get('passwordvar'); }



onSubmit() {
  console.log("✅ الفورم اتبعت");

  if (this.form.valid) {
    console.log("📌 الفورم Valid والبيانات:", this.form.value);

    // تجهيز البيانات للـ API
    const loginData: any = {
      email: this.form.value.emailvar,
      password: this.form.value.passwordvar
    };

    console.log("🚀 البيانات اللي هتروح للـ API:", loginData);

    // استدعاء API
    //
    this.authService.login(loginData).subscribe({
  next: (res: any) => {
    console.log('✅ Login success (Mock Mode):', res);
    

    this.router.navigate(['/home']);
  },
  error: (err: any) => {
    console.error('❌ Login failed:', err);
  }
});



  } else {
    console.warn("⚠️ الفورم مش Valid. البيانات:", this.form.value);
  }
}
}


