import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-data-advice',
  templateUrl: './data-advice.component.html',
  styleUrls: ['./data-advice.component.scss']
})
export class DataAdviceComponent implements OnInit {
  public datamajor: any = null;
  public nameAD: any = null;
  public dataStudent: any = null;
  public name_th: any = null;
  public branch_id: any = null;
  public nameBH: any = null;
  public namegroup: any = null;
  public dataGroup: any = null;
  public groupID: any = null;
  public groupName: any = null;
  public status: any = 'กำลังศึกษา';

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

  public nameMajor = async (
    acronym: any,
    code: any,
    name_th: any,
    titlename: any,
    fname: any,
    lname: any
  ) => {
    this.nameAD = null;
    this.dataStudent = null;
    this.namegroup = acronym;
    this.branch_id = code;
    this.name_th = name_th;
    this.nameBH = titlename + fname + '  ' + lname;
    console.log(this.nameBH);
    this.getGroup();
  };

  public getGroup = async () => {
    branch: this.branch_id;

    let getData: any = await this.http.get(
      'admin/getStudy_group/' + this.branch_id
    );
    console.log(getData.response.result);
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

  public nameGroup_Student(
    branch_id: any,
    study_group_id: any,
    study_group_name: any,
    username: any,
    titlename: any,
    fname: any,
    lname: any
  ) {
    this.nameAD = titlename + fname + '  ' + lname;
    this.groupID = study_group_id;
    this.groupName = study_group_name;

    console.log(this.nameAD);
    this.getStudent();
  }

  public getStudent = async () => {
    let Data = new FormData();

    Data.append('groupID', this.groupID);

    let getData: any = await this.http.post('admin/getStudent', Data);

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
}
