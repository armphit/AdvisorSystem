import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  public datamajor: any = null;
  public namegroup: any = '*ไม่ได้เลือก';
  public name_th: any = null;
  public branch_id: any = null;
  public dataTeacher: any = null;
  public groupTH: any = null;
  public dataGroup: any = null;
  public nameBH: any = null;
  public name_Group: any = null;
  public inGroup:FormGroup;


  constructor(private http: HttpService,private formBuilder: FormBuilder) {
    this.getMajor();
  }

  ngOnInit(): void {

    this.inGroup = this.formBuilder.group({

      group: ['', Validators.required],
      getTC: ['', Validators.required],

    });
  }
  public getMajor = async () => {
    let getData: any = await this.http.get('admin/branch');

    if (getData.connect) {
      if (getData.response.rowCount > 0) {
        this.datamajor = getData.response.result;
      } else {
        this.datamajor = null;
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
    this.namegroup = acronym;
    this.nameBH = titlename + fname + '  ' + lname;
    this.branch_id = code;
    this.name_th = name_th;
    this.getTeacher();
    this.getGroup();
    if (this.nameBH == '0  null') {
      this.nameBH = '';
    }
  }

  public getTeacher = async () => {
    branch: this.branch_id;
    let getData: any = await this.http.post(
      'admin/getTeacher_group_NULL/' + this.branch_id
    );
    console.log(getData);
    if (getData.connect) {
      if (getData.response.rowCount > 0) {
        this.dataTeacher = getData.response.result;
      } else {
        this.dataTeacher = null;
      }
    } else {
      alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    }
  };

  // public nameTeacher(code: any, name_th: any) {
  //   this.TeacherID = code;
  // }

  public insertGroup = async () => {
    this.groupTH = this.namegroup + '.'+this.inGroup.value.group ;

    console.log(this.inGroup.value.getTC)
    let formData = new FormData();

    formData.append('group_name', this.groupTH);
    formData.append('branch', this.branch_id);
    formData.append('ID', this.inGroup.value.getTC);


    let getData: any = await this.http.post('admin/AddGroup', formData);
    console.log(getData);
    if (getData.connect) {
      if (getData.response.result) {
        Swal.fire('เพิ่มข้อมูลเสร็จสิ้น', '', 'success');
        let win: any = window;
        win.$('#addTeacher').modal('hide');
        this.getGroup();
      } else {
        Swal.fire('เพิ่มข้อมูลไม่ได้', '', 'error');
      }
    } else {
      Swal.fire('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้!', '', 'error');
    }

  };
  public getGroup = async () => {

    branch: this.branch_id;
    let getData: any = await this.http.get(
      'admin/getStudy_group/' + this.branch_id
    );

    if (getData.connect) {
      if (getData.response.rowCount > 0) {
        this.dataGroup = getData.response.result;
      } else {
        this.dataGroup = null;
      }
    } else {
      Swal.fire('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้!', '', 'error');
    }
  };

  public clearFrom (){
    //data.resetForm();
    this.inGroup.reset();
      }

  public deleteGroup = async (group_id: any) => {
    delete_group: group_id;

    this.http.confirmAlert('ลบรายการนี้หรือไม่').then(async (value: any) => {
      if (value) {
        let getData: any = await this.http.post(
          'admin/delStudy_group/' + group_id
        );
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
            this.getGroup();
          } else {
            Swal.fire('ไม่สามารถลบข้อมูลได้!', '', 'error');
          }
        }
      }
    });
  };

  public getIDgroup = async (id: any,username:any,name:any) => {
    this.name_Group= name
    this.inGroup = this.formBuilder.group({
      group: [id, Validators.required],
      getTC: [username, Validators.required],
    })
  };

  public updateGroup = async () => {


    console.log(this.inGroup.value.group)
    let formData = new FormData();
    formData.append('ID', this.inGroup.value.getTC);
    formData.append('group', this.inGroup.value.group);

    let getData: any = await this.http.post('admin/updateGroup', formData);
    console.log(getData);
    if (getData.connect) {
      if (getData.response.rowCount > 0) {
        let win: any = window;
        win.$('#updateTeacher').modal('hide');
        Swal.fire('แก้ไขข้อมูลเสร็จสิ้น', '', 'success');
      } else {
        Swal.fire('แก้ไขข้อมูลไม่สำเร็จ', '', 'error');
      }
    } else {
      Swal.fire('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้!', '', 'error');
    }
    this.getGroup();
  };
}
