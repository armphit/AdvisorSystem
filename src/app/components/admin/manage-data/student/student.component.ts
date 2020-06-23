import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpService } from 'src/app/services/http.service';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { from } from 'rxjs';
import { JsonPipe } from '@angular/common';

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
  public dataGroup: any= null;
  public nameAD: any= null;
  public groupID: any= null;
  public groupName: any= null;
  public status_name: any= "นักศึกษา";
  public dataStudent: any= null;
  public status: any = 'กำลังศึกษา';
  public nameBH: any= null;
  public data1: FormGroup;




  constructor(private http:HttpService,private formBuilder: FormBuilder) {
    this.getMajor()


  }

  ngOnInit() {
    this.data1 = this.formBuilder.group({
      prefix: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required]
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

public namegroupch(acronym: any, code: any, name_th: any,titlename: any,fname: any,lname: any) {

  this.nameAD = null;
  this.dataStudent = null;
  this.namegroup = acronym;
  this.branch_id = code;
  this.name_th = name_th;
  this.nameBH = titlename+fname+'  '+lname

  if(this.nameBH == null){
    this.nameBH=" ";
  }

  this.getGroup();

}

public getGroup = async () => {
  branch:this.branch_id
  let getData: any = await this.http.get('admin/getStudy_group/'+this.branch_id);
  console.log(getData.response.result)
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

public nameGroup_Student(branch_id:any,study_group_id:any,study_group_name:any, username:any,titlename:any,fname:any,lname:any) {

  this.nameAD = titlename+fname+"  "+lname
  this.groupID = study_group_id
  this.groupName = study_group_name

  console.log( this.nameAD);
  this.getStudent();

}




public addStudent = async (data: NgForm) => {


  let formData = new FormData();

  formData.append('name_status_name', this.status_name);
  formData.append('branch',this.branch_id);
  formData.append('group_code',this.groupID);


  Object.keys(data.value).forEach((key) => {
    formData.append('' + key, data.value[key]);
  });
  let getData: any = await this.http.post('admin/setStudent', formData);
  console.log(getData)
  if (getData.connect) {
    if (getData.response.result) {
      Swal.fire('เพิ่มข้อมูลเสร็จสิ้น', '', 'success');
    } else {
      Swal.fire('เพิ่มข้อมูลไม่ได้', '', 'error');
    }
  } else {
    Swal.fire('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้!', '', 'error');
  }
  this.getStudent();

};

public getStudent = async () => {



  let Data= new FormData();
  Data.append('groupID', this.groupID);
  let getData: any = await this.http.post('admin/getStudent',Data );
  console.log(getData.response.result)
  if (getData.connect) {
    if (getData.response.rowCount > 0) {
      this.dataStudent = getData.response.result;
    } else {
      this.dataStudent = null;
    }
  } else {
    Swal.fire('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้!', '', 'error');
  }
};

public deleteStudent = async (id: any) => {
  console.log(id)

  this.http.confirmAlert('ลบรายการนี้หรือไม่').then(async (value: any) => {
    if (value) {

  let getData: any = await this.http.post('admin/delStudent/'+id);

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
          this.getStudent();
        } else {
          Swal.fire('ไม่สามารถลบข้อมูลได้!', '', 'error');
        }
      }else{
        Swal.fire('ไม่สามารถลบข้อมูลได้!', '', 'error');
      }
    }
  });
};

public updateST =  (username:any,titlename:any,fname:any,lname:any) => {
  this.data1 = this.formBuilder.group({
    code: username,
    prefix: [titlename, Validators.required],
    fname: [fname, Validators.required],
    lname: [lname, Validators.required],
  });
};
public updateStudent =  () => {




};
}
