import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

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
  public name_group_th: any= null;
  public getBranch_head:any= null;
  public dataTeacher: any=null;
  public BranchHead: any=null;


  constructor(private http: HttpService) {
    this.getMajor();




  }

  ngOnInit(): void {}

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
    this.getTeacher();

    console.log(this.branch_id)
  }
  // public checkTeacher(e) {

  //   if(e){
  //     this.getBranch_head = this.branch_id
  //      console.log(this.getBranch_head)
  //   }else{
  //     this.getBranch_head;
  //     console.log(this.getBranch_head)
  //   }


  // }

  public addTeacher = async (data: NgForm) => {


    let formData = new FormData();

    formData.append('name_status_name', this.status_name);
    formData.append('branch',this.branch_id);

    Object.keys(data.value).forEach((key) => {
      formData.append('' + key, data.value[key]);
    });

    let getData: any = await this.http.post('admin/setTeacher', formData);
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
    this.getTeacher();

  };

  // public getGroup = async () => {
  //   group:this.branch_id;
  //   let getData: any = await this.http.get('admin/getStudy_group_branch/'+this.branch_id);
  //   if (getData.connect) {
  //     if (getData.response.rowCount > 0) {
  //       this.datagroup = getData.response.result;
  //     } else {
  //       this.datagroup = null;
  //     }
  //   } else {
  //     Swal.fire('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้!', '', 'error');
  //   }
  // };

  public getTeacher = async () => {

    branch_id:this.branch_id;
    let getData: any = await this.http.post('admin/getUser_status/'+this.branch_id);

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
        ...array.filter(
          (value) => value.titlename.indexOf(textsearch) > -1
        ),
        ...array.filter((value) => value.fname.indexOf(textsearch) > -1
        ),
        ...array.filter((value) => value.lname.indexOf(textsearch) > -1
        ),
        ...array.filter((value) => value.name.indexOf(textsearch) > -1
        ),

      ];
    } else {
      return array;
    }
  };
  public getBranchHead = async () => {

    branch_head:this.branch_id;
    console.log(await this.http.post('admin/getUser_branch_head/'+this.branch_id))
    //let getData: any = await this.http.post('admin/getUser_branch_head/'+this.branch_id);

    // if (getData.connect) {
    //   if (getData.response.rowCount > 0) {
    //     this.BranchHead = getData.response.result;
    //   } else {
    //     this.BranchHead = null;
    //   }
    // } else {
    //   Swal.fire('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้!', '', 'error');
    // }
  };
}
