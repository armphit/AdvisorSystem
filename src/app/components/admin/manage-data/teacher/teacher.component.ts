import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';
import {
  NgForm,
  FormBuilder,
  Validators,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent implements OnInit {
  public datamajor: any = null;
  public namegroup: any = null;
  public branch_id: any = null;
  public name_th: any = null;
  public checker: any = null;
  public status_name: any = 'อาจารย์';
  public datagroup: any = null;
  public study_group_id: any = null;
  public name_group_th: any = null;
  public getBranch_head: any = null;
  public dataTeacher: any = null;
  public BranchHead: any = null;
  public nameBH: any = 'ไม่มีอาจารย์';
  public data1: FormGroup;
  public data2: FormGroup;
  public data3: FormGroup;
  public major: any = null;
  public nameTC: any = null;
  username: any;
  id: any;
  public getBranch: any = null;

  constructor(private http: HttpService, private formBuilder: FormBuilder) {
    this.getMajor();
  }

  ngOnInit() {
    this.data1 = this.formBuilder.group({
      prefix: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      major: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', Validators.email],
    });

    this.data2 = this.formBuilder.group({
      code: ['', Validators.required],
      prefix: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', Validators.email],
    });

    this.data3 = this.formBuilder.group({
      BranchHead_id: ['', Validators.required],
    });
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

  public namegroupch(
    acronym: any,
    code: any,
    name_th: any,
    titlename: any,
    fname: any,
    lname: any
  ) {
    this.nameBH = titlename + fname + '  ' + lname;
    this.namegroup = acronym;
    this.branch_id = code;
    this.name_th = name_th;
    this.getTeacher();
    this.getbranchUser();

    console.log(this.nameBH);
    if (this.nameBH == '0  null') {
      this.nameBH = '';
    }
  }

  public addTeacher = async () => {
    console.log('hjghmmh');

    console.log(this.data2.value.prefix);

    let data = new FormData();

    data.append('code', this.data2.value.code);
    data.append('prefix', this.data2.value.prefix);
    data.append('fname', this.data2.value.fname);
    data.append('lname', this.data2.value.lname);
    data.append('tel', this.data2.value.tel);
    data.append('email', this.data2.value.email);
    data.append('name_status_name', this.status_name);
    data.append('branch', this.branch_id);

    // Object.keys(data.value).forEach((key) => {
    //   formData.append('' + key, data.value[key]);
    // });

    let getData: any = await this.http.post('admin/setTeacher', data);
    console.log(getData);
    if (getData.connect) {
      if (getData.response.success) {
        let win: any = window;
        win.$('#addTeacher').modal('hide');
        this.getTeacher();
        this.getbranchUser();

        Swal.fire('เพิ่มข้อมูลเสร็จสิ้น', '', 'success');
      } else {
        Swal.fire('เพิ่มข้อมูลไม่สำเร็จ', '', 'error');
      }
    } else {
      Swal.fire('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้!', '', 'error');
    }
  };

  public clearFrom(data: FormGroupDirective) {
    data.resetForm();
  }

  public getTeacher = async () => {
    branch_id: this.branch_id;
    let getData: any = await this.http.post(
      'admin/getUser_status/' + this.branch_id
    );

    if (getData.connect) {
      if (getData.response.rowCount > 0) {
        this.dataTeacher = getData.response.result;
      } else {
        this.dataTeacher = null;
      }
    } else {
      Swal.fire('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้!', '', 'error');
    }
  };

  public onSearchTeacher = (array: any, textsearch: string) => {
    if (textsearch.length > 0) {
      return [
        ...array.filter((value) => value.titlename.indexOf(textsearch) > -1),
        ...array.filter((value) => value.fname.indexOf(textsearch) > -1),
        ...array.filter((value) => value.lname.indexOf(textsearch) > -1),
        ...array.filter((value) => value.name.indexOf(textsearch) > -1),
      ];
    } else {
      return array;
    }
  };

  public deleteGroup = async (id: any) => {
    console.log(id);
    delete_Teacher: id;

    this.http.confirmAlert('ลบรายการนี้หรือไม่').then(async (value: any) => {
      if (value) {
        let getData: any = await this.http.post('admin/delTeacher/' + id);
        console.log(getData);
        if (getData.connect) {
          if (getData.response.rowCount > 0) {
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'ลบข้อมูลสำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            });
            this.getTeacher();
          } else {
            Swal.fire('ไม่สามารถลบข้อมูลได้!', '', 'error');
          }
        } else {
          Swal.fire('ไม่สามารถลบข้อมูลได้!', '', 'error');
        }
      }
    });
  };

  public getbranchUser = async () => {
    let formData = new FormData();

    formData.append('branch', this.branch_id);

    let getData: any = await this.http.post('admin/getBranchUser', formData);
    console.log(getData);
    if (getData.connect) {
      if (getData.response.rowCount > 0) {
        this.BranchHead = getData.response.result;
      } else {
        this.BranchHead = null;
      }
    } else {
      Swal.fire('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้!', '', 'error');
    }
  };

  public updateTC = (
    username: any,
    titlename: any,
    fname: any,
    lname: any,
    branch: any,
    tel: any,
    email: any
  ) => {
    this.nameTC = username;

    this.data1 = this.formBuilder.group({
      code: [username],
      prefix: [titlename, Validators.required],
      fname: [fname, Validators.required],
      lname: [lname, Validators.required],
      major: [branch, Validators.required],
      tel: [tel, Validators.required],
      email: [email, Validators.email],
    });
  };

  public updateTeacher = async () => {
    console.log('gkhgjk');
    let a = this.formBuilder.group({
      code: this.data1.value.code,
      prefix: this.data1.value.prefix,
      fname: this.data1.value.fname,
      lname: this.data1.value.lname,
      major: this.data1.value.major,
      tel: this.data1.value.tel,
      email: this.data1.value.email,
    });

    let data = new FormData();
    console.log(this.data1.value.code);
    data.append('code', this.data1.value.code);
    data.append('prefix', this.data1.value.prefix);
    data.append('fname', this.data1.value.fname);
    data.append('lname', this.data1.value.lname);
    data.append('major', this.data1.value.major);
    data.append('tel', this.data1.value.tel);
    data.append('email', this.data1.value.email);
    // Object.keys(a).forEach((key) => {
    //   data.append('' + key, a[key]);
    // });

    let getData: any = await this.http.post('admin/updateTeacher', data);
    console.log(this.data1.value);
    console.log(getData);
    if (getData.connect) {
      if (getData.response.result) {
        Swal.fire('เพิ่มข้อมูลเสร็จสิ้น', '', 'success');
        let win: any = window;
        win.$('#updateTC').modal('hide');
        this.getTeacher();
      } else {
        Swal.fire('เพิ่มข้อมูลไม่ได้', '', 'error');
      }
    } else {
      Swal.fire('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้!', '', 'error');
    }
  };

  public getIDBranchHead = async (e: any) => {
    this.getBranch=e

  };
  public Head = async (username: any) => {
    console.log(username)


  };

  public updateBranchHead = async () => {
    console.log(this.getBranch.username);
    console.log(this.getBranch.branch_code);
    // console.log(this.id);
    // console.log(this.branch_id);

    let formData = new FormData();
    formData.append('branch', this.getBranch.branch_code);
    formData.append('ID', this.getBranch.username);

    let getData: any = await this.http.post('admin/updateBranchUser', formData);
    console.log(getData);
    if (getData.connect) {
      if (getData.response.rowCount > 0) {
        Swal.fire('แก้ไขข้อมูลเสร็จสิ้น', '', 'success');
        let win: any = window;
        win.$('#updateBH').modal('hide');
        this.getbranchUser();
      } else {
        Swal.fire('แก้ไขข้อมูลไม่สำเร็จ', '', 'error');
      }
    } else {
      Swal.fire('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้!', '', 'error');
    }
  };
}
