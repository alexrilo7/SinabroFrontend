import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../login/services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  
  private loginSubscription!: Subscription;
  loggedIn!: boolean;
  constructor(private readonly loginService: LoginService) { }
  ngOnInit(): void {
    this.loginSubscription = this.loginService.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        this.loggedIn = isLoggedIn;
      }
    );
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

}
