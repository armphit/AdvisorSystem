import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { NodeWithI18n } from '@angular/compiler';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-counsel-data',
  templateUrl: './counsel-data.component.html',
  styleUrls: ['./counsel-data.component.scss'],
})
export class CounselDataComponent implements OnInit {
  public user: any = JSON.parse(localStorage.getItem('userLogin')).username;
  public dataStudent: any = null;
  public thDate: any = null;
  public thTime: any = null;
  public inAdvice: FormGroup;

  constructor(private http: HttpService, private formBuilder: FormBuilder) {
    this.getStudent();
    this.getYear();
  }

  ngOnInit(): void {
    this.inAdvice = this.formBuilder.group({
      subject: ['', Validators.required],
      details: ['', Validators.required],
    });
  }

  public getStudent = async () => {
    let formData = new FormData();
    formData.append('username', this.user);
    let getData: any = await this.http.post('student/getStudent', formData);
    if (getData.connect) {
      if (getData.response.rowCount > 0) {
        this.dataStudent = getData.response.result;
      } else {
        this.dataStudent = null;
      }
    } else {
      alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    }
  };
  public getYear = () => {
    var now = new Date();
    var thday = new Array(
      'อาทิตย์',
      'จันทร์',
      'อังคาร',
      'พุธ',
      'พฤหัส',
      'ศุกร์',
      'เสาร์'
    );
    var thmonth = new Array(
      'มกราคม',
      'กุมภาพันธ์',
      'มีนาคม',
      'เมษายน',
      'พฤษภาคม',
      'มิถุนายน',
      'กรกฎาคม',
      'สิงหาคม',
      'กันยายน',
      'ตุลาคม',
      'พฤศจิกายน',
      'ธันวาคม'
    );

    this.thDate =
      'วัน' +
      thday[now.getDay()] +
      'ที่' +
      ' ' +
      now.getDate() +
      ' ' +
      'เดือน' +
      thmonth[now.getMonth()] +
      ' ' +
      'พ.ศ.' +
      (0 + now.getFullYear() + 543);
    this.thTime =
      'เวลา' + ' ' + now.getHours() + ':' + now.getMinutes() + ' ' + 'น.';
  };

  public insertAdvice = async () => {
    let formData = new FormData();
    var utc = new Date().toJSON().slice(0, 10);

    formData.append('username', this.user);
    formData.append('subject', this.inAdvice.value.subject);
    formData.append('details', this.inAdvice.value.details);
    formData.append('timer', utc);
    formData.forEach((value,key) => {
      console.log(key+":"+value)
    });

    let getData: any = await this.http.post('student/addAdvice',formData);
    console.log(getData);
    if (getData.connect) {
      if (getData.response.rowCount > 0) {
        Swal.fire('เพิ่มข้อมูลเสร็จสิ้น', '', 'success');
        let win: any = window;
        win.$('#addCounsel').modal('hide');
      } else {
        Swal.fire('เพิ่มข้อมูลไม่ได้', '', 'error');
      }
    } else {
      Swal.fire('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้!', '', 'error');
    }
  };

  public clearFrom() {
    this.inAdvice.reset();
  }
}
