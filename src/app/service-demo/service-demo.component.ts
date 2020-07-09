import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posts, Users, Address, Company, GEO } from '../post.model';

@Component({
  selector: 'app-service-demo',
  templateUrl: './service-demo.component.html',
  styleUrls: ['./service-demo.component.css']
})

export class ServiceDemoComponent implements OnInit {
  
  loadedPosts: Posts[] = [];
  loadedUsers: Users[] = [];
  selectedPosts = [];
  name: string;
  searchText: string = "";
  selected_count: number = 0;
  cols: any[];
  userCols: any[];
  posts: Posts[];
  showPost = false
  showUser = false
  selectedPost: Posts
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'userId', header: 'User ID' },
      { field: 'title', header: 'Title' },
      { field: 'completed', header: 'Completed' }
    ];

    this.userCols = [
      { field: 'id', header: 'ID'},
      { field: 'name', header: 'Name'},
      { field: 'username', header: 'UserName'},
      { field: 'email', header: 'Email'},
      { field: 'phone', header: 'Phone'},
      { field: 'website', header: 'Website'}
    ]
    this.fetchPosts();
    this.fetchUsers();
  }

  private fetchPosts() {
    this.http.get('https://www.cadfolio.uk/it-tests/todosJSON.txt').subscribe(response => {
      this.loadedPosts = <Posts[]>response
    })
  }

  private fetchUsers() {
    this.http.get('https://www.cadfolio.uk/it-tests/users.txt').subscribe(response => {
      let tmp = <Users[]>response
      tmp.forEach(serverData => {
        let localData = new Users
        localData.id = serverData.id
        localData.name = serverData.name
        localData.username = serverData.username
        localData.email = serverData.email
        localData.phone = serverData.phone
        localData.website = serverData.website

        let company = new Company
        company.name = serverData.company.name
        company.bs = serverData.company.bs
        company.catchPhrase = serverData.company.catchPhrase

        
        localData.company = JSON.parse(JSON.stringify(company))

        let tmpAddress = new Address
        tmpAddress.city = serverData.address.city
        tmpAddress.street = serverData.address.street
        tmpAddress.suite = serverData.address.suite
        tmpAddress.zipcode = serverData.address.zipcode
        
        let geo = new GEO
        geo.lat =  serverData.address.geo.lat
        geo.lng = serverData.address.geo.lng
        tmpAddress.geo = geo

        localData.address = tmpAddress

        this.loadedUsers.push(localData)
      })
    })
  }

  getRowData(rowData) {
    this.selectedPosts = rowData;
  }

  deletePost() {
    if (this.selectedPosts == undefined || this.selectedPosts == null) 
      return;

    let tmp: Posts[] = []
    this.loadedPosts.forEach(post=> {
      if (post.id != this.selectedPosts['id']) {
        tmp.push(post);
      }
    })
    this.loadedPosts = tmp
  }
}
