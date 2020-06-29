import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root-nav',
  templateUrl: './root-nav.component.html',
  styleUrls: ['./root-nav.component.scss'],
})
export class RootNavComponent {
  public dataProfile = JSON.parse(localStorage.getItem("userLogin")).titlename+JSON.parse(localStorage.getItem("userLogin")).fname+"  "+JSON.parse(localStorage.getItem("userLogin")).lname;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

    public status:any=null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
     var data :any= JSON.parse(localStorage.userLogin);
     var json :any= data.status
     this.status=json
     console.log(this.status)
  }

  public onLogout = () => {
    this.router.navigate(['/login']);
    localStorage.clear();

  }
}
