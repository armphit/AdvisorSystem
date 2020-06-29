import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-teacher-data',
  templateUrl: './teacher-data.component.html',
  styleUrls: ['./teacher-data.component.scss'],
})
export class TeacherDataComponent implements OnInit {
  public dataTeacher: any = null;

  constructor(private http: HttpService) {
    this.getTeacher();
  }

  ngOnInit(): void {}

  public getTeacher = async () => {
    let formData = new FormData();
    formData.append(
      'username',
      JSON.parse(localStorage.getItem('userLogin')).username
    );


    let getData: any = await this.http.post('teacher/getTeacher', formData);
    console.log(getData)
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
}
