import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

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
  public datagroup: any = null;
  public dataTeacher: any = null;
  public nameTh: any = null;



  constructor(private http: HttpService) {
    this.getGroup();
    this.getMajor();
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
    this.nameTeacher( this.nameTh)
  }

  public async nameTeacher(username: any) {

    // let formData = new FormData();
    //  formData.append('branch',this.branch_id);
    // let getData: any = await this.http.post('admin/AddGroup', formData)
    // this.dataTeacher = getData.response.result;
    // console.log(this.dataTeacher);
    // this.nameTh = username;
    // console.log (username)
    // if (getData.connect) {
    //   if (getData.response.rowCount > 0) {
    //     this.dataTeacher = getData.response.result;
    //   } else {
    //     this.dataTeacher = null;
    //   }
    // } else {
    //   alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    // }

  }

  public insertGroup = async (groupPlus) => {

    console.log(this.nameTh);

    let v = this.namegroup + '.' + groupPlus;
    console.log(v);
    let formData = new FormData();
    formData.append('groupName',v);
    formData.append('branch',"this.branch_id");
    formData.append('userID',"this.nameTh");


    let getData: any = await this.http.post('admin/AddGroup', formData)
 console.log(getData)
      if (getData.connect) {
        Swal.fire('เพิ่มข้อมูลเสร็จสิ้น', '', 'success');
      } else {
        Swal.fire('เพิ่มข้อมูลไม่ได้', '', 'error');
      }


  };

  public getGroup = async () => {
    let getData: any = await this.http.get('admin/getStudy_group');
    if (getData.connect) {
      if (getData.response.rowCount > 0) {
        this.datagroup = getData.response.result;
      } else {
        this.datagroup = null;
      }
    } else {
      Swal.fire('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้!', '', 'error');
    }
  };

  public onSearchgroup = (array: any, textsearch: string) => {
    if (textsearch.length > 0) {
      return [
        ...array.filter(
          (value) => value.study_group_name.indexOf(textsearch) > -1
        ),
        ...array.filter((value) => value.name.indexOf(textsearch) > -1),
      ];
    } else {
      return array;
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

  public test (Sushi){
    console.log(Sushi)
  }
}
