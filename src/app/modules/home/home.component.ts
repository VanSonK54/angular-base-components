import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { TokenService } from '../authentication/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthenticationService,
    private tokenService: TokenService) {
  }

  userIsLogedIn = false;

  ngOnInit(): void {
    this.checkUserIsLogin();
  }

  checkUserIsLogin() {
    this.userIsLogedIn = this.tokenService.isLoggedIn();
  }

  logout() {
    this.authService.logout().subscribe(result => {
      this.checkUserIsLogin();
    });
  }
}
