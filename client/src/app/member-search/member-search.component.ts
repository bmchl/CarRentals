import { Component } from '@angular/core';
import { Member } from '../../../../common/member';
import { OnInit } from '@angular/core';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent implements OnInit {
  query: string = '';
  displayedColumns = ['nummembre', 'prenom', 'nomfamille'];
  data: Member[] = [];

  constructor(private comunicationService: CommunicationService){}

  fetchResults(): void {
    if(this.query === '') {
      this.comunicationService.getAllMembers().subscribe((res:Member[]) => {
        this.data = res;
      })
    }else {
      this.comunicationService.getMembers(this.query).subscribe((res:Member[]) => {
        this.data = res;
      })
    }
  }

  ngOnInit(): void {
    this.comunicationService.getAllMembers().subscribe((res:Member[]) => {
      this.data = res;
    })
  }
  
}
