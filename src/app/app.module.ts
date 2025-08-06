import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizListComponent } from './components/user/quiz-list/quiz-list-component.component';
import { QuizPlayerComponent } from './components/user/quiz-player/quiz-player-component.component';
import { ProgressTrackerComponent } from './components/user/progress-tracker/progress-tracker-component.component';
import { EnrollmentStatusComponent } from './components/user/enrollment-status/enrollment-status-component.component';
import { QuizResultComponent } from './components/user/quiz-result/quiz-result-component.component';
import { ResultHistoryComponent } from './components/user/result-history/result-history-component.component';
import { ReviewFormComponent } from './components/user/review-form/review-form-component.component';
import { ReviewListComponent } from './components/user/review-list/review-list-component.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuizFormComponent } from './components/Instructor/Quiz-form/uiz-form-component.component';
@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizFormComponent,
    QuizPlayerComponent,
    ProgressTrackerComponent,
    EnrollmentStatusComponent,
    QuizResultComponent,
    ResultHistoryComponent,
    ReviewFormComponent,
    ReviewListComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
