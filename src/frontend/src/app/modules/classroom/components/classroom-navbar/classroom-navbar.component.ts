import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WrapperComponent } from 'src/app/modules/classroom-creation/components/wrapper/wrapper.component';

@Component({
  selector: 'app-classroom-navbar',
  templateUrl: './classroom-navbar.component.html',
  styleUrls: ['./classroom-navbar.component.css']
})
export class ClassroomNavbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  createClassroomDialog(){
    this.dialog.open(WrapperComponent, {
      width: '90vw',
      height: '70vh',
      position: { top: '19vh'},
      data: {},
    });
  }

}
