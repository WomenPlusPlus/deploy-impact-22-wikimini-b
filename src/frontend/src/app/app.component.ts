import { Component } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { ClassroomCodes } from 'src/services/Classroom.model';
import { ClassroomsServices } from 'src/services/classrooms.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public classroomsServices: ClassroomsServices) {}
  title = 'angular-frontend';

  classroomCodes: ClassroomCodes[] = [];

  downloadCSV() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      useBom: true,
      headers: ['Code', 'Class Id', 'Student'],
    };
    new ngxCsv(this.classroomCodes, 'StudentCodes', options);
  }

  getClassroomById(classroomId: string) {
    this.classroomsServices
      .getClassroomById(classroomId)
      .subscribe((res: ClassroomCodes[]) => {
        this.classroomCodes = res;
        this.downloadCSV();
      });
  }
}
