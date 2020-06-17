import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;

  constructor(public service : HttpService , private routes: Router,private formBuilder:FormBuilder) { }
  public msg: any = null;
  private oldPath: string = "/admin";
  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  public async submitlogin() {
    let a = await this.service.checkusernameandpassword(this.formLogin.controls['username'].value,this.formLogin.controls['password'].value)
  }
  public async onlogin() {
    let formData = new FormData();
    Object.keys(this.formLogin.value).forEach((key) => {
      //console.log(this.formLogin.value[key]);
      formData.append(key, this.formLogin.value[key]);
    });
    let httpRespon: any = await this.service.post("login", formData);

    console.log(httpRespon)
    if (httpRespon.connect) {
      if (httpRespon.response.success) {
        this.service.alertLog("success", "เข้าสู่ระบบสำเร็จ")
        //this.router.navigate(["/home"]);
        this.service.navRouter(this.oldPath);

        localStorage.setItem(
          "userLogin",
          JSON.stringify(httpRespon.response.data)
        );


      } else {
        this.service.alertLog("error", "ชื่อหรือรหัสผ่านไม่ถูกต้อง")

      }
    } else {
      alert("เชื่อมต่อเซิร์ฟเวอร์ผิดพลาด");
    }
  };


}

