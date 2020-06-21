import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';
import { FormGroupName } from '@angular/forms';

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
  public TeacherID: any = null;
  public dataGroup: any = null;

  constructor(private http: HttpService) {
    this.getMajor();
    this.getGroup();
  }

  ngOnInit(): void {}
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

  public namegroupch(acronym: any, code: any, name_th: any) {
    this.namegroup = acronym;
    this.branch_id = code;
    this.name_th = name_th;
    console.log(this.branch_id);
    this.getTeacher();
  }

  public getTeacher = async () => {
    branch: this.branch_id;
    let getData: any = await this.http.post(
      'admin/getStudy_group_User/' + this.branch_id
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

  public nameTeacher(code: any, name_th: any, groupPlus: any) {
    this.TeacherID = code;
    let g = this.namegroup + '.' + groupPlus;
    this.groupTH = g;
    console.log(this.groupTH);
    console.log(this.branch_id);
  }

  public insertGroup = async () => {
    let formData = new FormData();

    formData.append('group_name', this.groupTH);
    formData.append('branch',this.branch_id);
    formData.append('ID',this.TeacherID);

    console.log(formData.get('group_name'))
    console.log(formData.get('branch'))
    console.log(formData.get('ID'))

    let getData: any = await this.http.post('admin/AddGroup',formData);
      console.log(getData);
      if (getData.connect) {
        Swal.fire('เพิ่มข้อมูลเสร็จสิ้น', '', 'success');
      } else {
        Swal.fire('เพิ่มข้อมูลไม่ได้', '', 'error');
      }
      this.getGroup();
    };
    public getGroup = async () => {
      let getData: any = await this.http.post('admin/getStudy_group_User');
      console.log(getData.response);
      if (getData.connect) {
        if (getData.response.rowCount > 0) {
          this.dataGroup = getData.response.result;
        } else {
          this.dataGroup = null;
        }console.log(this.dataGroup);
      } else {
        Swal.fire('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้!', '', 'error');
      }
    };

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
}
