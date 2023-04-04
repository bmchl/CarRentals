import { Component } from '@angular/core';
import { Member } from '../../../../common/member';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent {
  query: string = '';
  displayedColumns = ['id', 'fname', 'lname'];
  data: Member[] = [];
  fetchResults(): void {
    // sql query
    this.data = [{ fname: this.query, lname: 'Appleseed', id: 1 }, { fname: 'Jane', lname: 'Doe', id: 2}]
  }
}
