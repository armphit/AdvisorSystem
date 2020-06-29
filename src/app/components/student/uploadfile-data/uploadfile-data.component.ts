import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-uploadfile-data',
  templateUrl: './uploadfile-data.component.html',
  styleUrls: ['./uploadfile-data.component.scss'],
})
export class UploadfileDataComponent implements OnInit {
  public dataStudent: any = null;
  public range: Array<any> = [];
  term: any = null;
  selected = '';
  filename: any;
  base64File: any;
  file:File;
 public dataUsername:any= JSON.parse(localStorage.getItem("userLogin")).username;



  constructor(private http: HttpService) {
    this.getStudent();
    this.getYear();

  }

  ngOnInit(): void {}

  public getStudent = async () => {
    let formData = new FormData();
    formData.append(
      'username',
      JSON.parse(localStorage.getItem('userLogin')).username
    );
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
    var year = new Date().getFullYear();

    for (var i = 0; i < 10; i++) {
      this.range[i] = { value: year - i };
    }
  };

  uploadFile(file:File) {
    if(file){
      this.file = file;
      // if(name=='profile'){
      //   this.formData.append('profile',file);
      // }else if(name=='results'){
      //   this.formData.append('results',file);
      // }else if(name=='schedule'){
      //   this.formData.append('schedule',file);
      // }
    }
  }
  onClickupload = async ()=> {
    let formData = new FormData();
    formData.append('profile',this.file);
    console.log('yoyo',formData.get('profile'));
    let getData: any = await this.http.post('student/addUploadfile',formData);
    console.log(getData);
    if (getData.connect) {
      if (getData.connect) {
        let win: any = window;
        win.$('#updateTeacher').modal('hide');
        Swal.fire('แก้ไขข้อมูลเสร็จสิ้น', '', 'success');
      } else {
        Swal.fire('แก้ไขข้อมูลไม่สำเร็จ', '', 'error');
      }
    } else {
      Swal.fire('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้!', '', 'error');
    }
  }
}
