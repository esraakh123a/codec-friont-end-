import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
  emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  NAME_REGEX = /^(?=.{2,50}$)(?!.*\s{2,})(?!.*[-']{2,})(?!.*^[\s'-])(?!.*[\s'-]$)[A-Za-z\u0600-\u06FF\s'-]+$/;
  roles = ['student', 'admin', 'instructor'];
  form: FormGroup;



  //   form = new FormGroup({
  // emailvar: new FormControl('',[Validators.email,
  //   Validators.required,
  //   Validators.pattern(this.emailPattern),
  //   this.noUppercaseValidator]),

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // نقدر نستخدم this هنا بسهولة
    this.form = this.fb.group({
      name: ['', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(50),
    Validators.pattern(this.NAME_REGEX)
  ]],

      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(this.emailPattern),
          // noUppercaseValidator
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/
          ),
        ],
      ],
      phonenumber: ['', [Validators.required, this.phoneNumberValidator]],
      city: ['', [Validators.required, this.cityValidator]],
      role: ['', [Validators.required]],
    });
  }

 phoneNumberValidator(control: FormControl) {
  const value = control.value;
  // Regex للأرقام المصرية: 010, 011, 012, 015 + 8 أرقام
  const phonePattern = /^01[0-2,5]{1}[0-9]{8}$/;

  if (value && !phonePattern.test(value)) {
    return { invalidPhone: true };
  }
  return null;
}

  get emailErrors(): string[] {
    const errors = this.form.get('email')?.errors;
    if (!errors) return [];

    const errorMessages: string[] = [];

    if (errors['required']) errorMessages.push('Email is required.');
    if (errors['email']) errorMessages.push('Invalid email format.');
    if (errors['pattern']) errorMessages.push('Please enter a valid pattern.');
    if (errors['hasUppercase'])
      errorMessages.push('Email must be lowercase only.');

    return errorMessages;
  }

  cityValidator(control: FormControl) {
    const value = control.value;
    const cityPattern = /^[A-Za-z\u0600-\u06FF\s]{3,}$/;
    // يسمح بحروف انجليزي وعربي + مسافات، 3 حروف على الأقل
    if (value && !cityPattern.test(value)) {
      return { invalidCity: true };
    }
    return null;
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get phonenumber() {
    return this.form.get('phonenumber');
  }
  get city() {
    return this.form.get('city');
  }
  get role() {
    return this.form.get('role');
  }
  get name() {
  return this.form.get('name');
}
onSubmit() {
  console.log('✅ الفورم اتبعت');

  if (this.form.valid) {
    const registerData = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      phonenumber: this.form.value.phonenumber,
      city: this.form.value.city,
      role: this.form.value.role,
    };

    console.log('🚀 البيانات اللي هتروح للـ API:', registerData);

    this.authService.register(registerData).subscribe({
      next: (res) => {
        console.log('✅ Register success:', res);
        this.router.navigate(['/home']); // تحويل بعد التسجيل
      },
      error: (err) => {
        console.error('❌ Register failed:', err);

        // معالجة حالة البريد مستخدم مسبقًا
        if (err.status === 400 && err.error?.message === 'Email already exists') {
          this.form.get('email')?.setErrors({
            emailTaken: 'هذا البريد الإلكتروني مستخدم بالفعل. حاول بريد آخر.'
          });
        }
      }
    });

  } else {
    console.warn('⚠️ الفورم مش Valid. البيانات:', this.form.value);
  }
}
}
