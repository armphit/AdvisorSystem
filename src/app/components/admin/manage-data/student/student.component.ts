import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpService } from 'src/app/services/http.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  public datamajor: any = null;
  public namegroup: any = null;
  public branch_id: any = null;
  public name_th: any = null;

  constructor(private http:HttpService) {
    this.getMajor()

  }

  ngOnInit(): void {
  }

public getMajor = async () => {
  let getData: any = await this.http.get('admin/branch');

  if (getData.connect) {
    if (getData['response']['rowCount'] > 0) {
      this.datamajor = getData['response']['result'];
    } else {
      this.datamajor = [];
    }
  } else {
    alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
  }
};

public namegroupch(acronym: any, code: any, name_th: any) {
  this.namegroup = acronym;
  this.branch_id = code;
  this.name_th = name_th;

  console.log(this.branch_id)
}
public addStudent = async (data: NgForm) => {


  let formData = new FormData();

  // formData.append('name_status_name', this.status_name);
  formData.append('branch',this.branch_id);

  Object.keys(data.value).forEach((key) => {
    formData.append('' + key, data.value[key]);
  });

  let getData: any = await this.http.post('admin/setStudent', formData);
  console.log( getData);
  if (getData.connect) {
    if (getData.connect == true) {
      Swal.fire('เพิ่มข้อมูลเสร็จสิ้น', '', 'success');
    } else {
      Swal.fire('เพิ่มข้อมูลไม่ได้', '', 'error');
    }
  } else {
    Swal.fire('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้!', '', 'error');
  }
  // this.getTeacher();

};
}
