// admin-dashboard-reportedusers.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
interface ReportedUser {
  id: number;
  name: string;
  email: string;
  type: 'tourist' | 'guide' | 'company';
  reportCount: number;
  status: 'active' | 'suspended' | 'pending_review';
  lastReportedAt: Date;
}

interface ReportRequest {
  id: number;
  reporterId: number;
  reporterName: string;
  reportedUserId: number;
  reportedUserName: string;
  postId?: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

interface PostDetails {
  id: number;
  authorName: string;
  content: string;
  imageUrl?: SafeResourceUrl;
  createdAt: Date;
}
interface Blog{
    blogId : string;
    username : string;
    content : string;
    role : 'Tourist';
    createdAt : string;
    photo_path : string[];
  }
interface Report {
  report_id :number;
  reporting_user_username :string;
  reported_user_username : string;
  comment : string;
  createdAt : string;
  reporting_user_type : boolean;
  reported_user_type : boolean;
  blogId : number,
}

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardReportedusersService {
  private apiUrl = 'http://localhost:8080/auth/admin';
  private useFakeData = false;
  reportedUsers$!: Observable<ReportedUser[]>;
  postDetails$! : Observable<PostDetails>;
  reportRequest$! : Observable<ReportRequest[]>;
  private fakeReportedUsers: ReportedUser[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      type: 'tourist',
      reportCount: 3,
      status: 'active',
      lastReportedAt: new Date('2025-05-10')
    },
    {
      id: 2,
      name: 'Adventure Co.',
      email: 'contact@adventure.com',
      type: 'company',
      reportCount: 5,
      status: 'suspended',
      lastReportedAt: new Date('2025-05-15')
    },
    {
      id: 3,
      name: 'Sarah Guide',
      email: 'sarah@guide.com',
      type: 'guide',
      reportCount: 2,
      status: 'pending_review',
      lastReportedAt: new Date('2025-05-18')
    }
  ];

  private fakeReportRequests: ReportRequest[] = [
    {
      id: 1,
      reporterId: 10,
      reporterName: 'User A',
      reportedUserId: 1,
      reportedUserName: 'John Doe',
      postId: 101,
      comment: 'This user posted inappropriate content in the forum.',
      status: 'pending',
      createdAt: new Date('2025-05-10')
    },
    {
      id: 2,
      reporterId: 11,
      reporterName: 'User B',
      reportedUserId: 2,
      reportedUserName: 'Adventure Co.',
      comment: 'This company has been sending spam messages to users.',
      status: 'pending',
      createdAt: new Date('2025-05-12')
    },
    {
      id: 3,
      reporterId: 12,
      reporterName: 'User C',
      reportedUserId: 3,
      reportedUserName: 'Sarah Guide',
      postId: 102,
      comment: 'The guide was rude during our tour and provided false information.',
      status: 'pending',
      createdAt: new Date('2025-05-15')
    }
  ];

  private fakePosts: PostDetails[] = [
    {
      id: 101,
      authorName: 'John Doe',
      content: 'Check out this amazing place I visited last week! The scenery was breathtaking.',
      imageUrl: '/assets/images/sample-post-1.jpg',
      createdAt: new Date('2025-05-08')
    },
    {
      id: 102,
      authorName: 'Sarah Guide',
      content: 'Join my tour next weekend for a special discount! Limited spots available.',
      createdAt: new Date('2025-05-14')
    }
  ];

  constructor(private http: HttpClient,private sanitizer: DomSanitizer) {}

  getReportedUsers(): Observable<ReportedUser[]> {
    if (this.useFakeData) {
      return of([...this.fakeReportedUsers]).pipe(delay(500));
    }
    const reports : ReportedUser[]=[];
    let result : Report[]=[]; 
    this.http.get<Report[]>(`${this.apiUrl}/getReports`).subscribe({
              next : (response) =>{
                result=response;
                
                result.forEach(r => {
                  let reportedUserType = '';
                  if(r.reported_user_type)  reportedUserType = 'guide';
                  else reportedUserType = 'tourist';
                  const report : ReportedUser={
                    id: r.report_id,
                    name: r.reported_user_username,
                    email: r.reported_user_username,
                    type: reportedUserType as 'tourist' | 'guide' | 'company',
                    reportCount: result.filter(u => u.reported_user_username === r.reported_user_username).length,
                    status: 'pending_review',
                    lastReportedAt: new Date(r.createdAt),
                  }
                  reports.push(report);
                })
              },
        
              error: (err) => console.error('Failed to load chats', err)
            });
            
            this.reportedUsers$ = of(reports);
           return this.reportedUsers$;
  }

  getReportRequests(): Observable<ReportRequest[]> {
    if (this.useFakeData) {
      return of([...this.fakeReportRequests]).pipe(delay(500));
    }
    let reportRequests : ReportRequest[]=[];
    let reports : Report[] = [];
    this.http.get<Report[]>(`${this.apiUrl}/getReports`).subscribe({
              next : (response) =>{
                reports=response;                
                reports.forEach(r => {
                  const reportRequest : ReportRequest={
                      id: r.report_id,
                      reporterId : 1,
                      reportedUserId : 2,
                      status : 'pending',
                      reporterName: r.reporting_user_username,
                      reportedUserName: r.reported_user_username,
                      postId: r.blogId,
                      comment: r.comment,
                      createdAt: new Date(r.createdAt),
                  }
                  reportRequests.push(reportRequest);
                })
              },
        
              error: (err) => console.error('Failed to load chats', err)
            });
            this.reportRequest$! = of(reportRequests);
            return this.reportRequest$;
            
  }
  getUrl(path: string): SafeResourceUrl {
    
    const generatedUrl =
      'http://localhost:8080/auth/files/Blogs/' +
      path.substring(
        path.lastIndexOf('\\') + 1
      );
    const imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      generatedUrl
    );
    return imageUrl;
  }

   getPostDetails(postId: number) : Observable<Blog> {

    /*if (this.useFakeData) {
      const post = this.fakePosts.find(p => p.id === postId);
      return of(post ? {...post} : {
        id: postId,
        authorName: 'Unknown',
        content: 'Post content not available',
        createdAt: new Date()
      }).pipe(delay(300));
    }
    */
    let blog :Blog = {
          blogId : '',
          username : '',
          content : '',
          role : 'Tourist',
          createdAt : '',
          photo_path : [],

    }

 
    let postDetails : PostDetails = {
          id: 0,
          authorName: '',
          content: '',
          imageUrl:'',
          createdAt: new Date(''),
    };
     
  return this.http.get<Blog>(`http://localhost:8080/auth/blog/getBlog/${postId}`);
  

    //this.postDetails$ = of(postDetails);
    //return this.postDetails$;
  }

  approveReport(reportId: number): Observable<any> {
    if (this.useFakeData) {
      const report = this.fakeReportRequests.find(r => r.id === reportId);
      if (report) {
        report.status = 'approved';
        // Update the reported user status
        const user = this.fakeReportedUsers.find(u => u.id === report.reportedUserId);
        if (user) {
          user.status = 'suspended';
          user.reportCount += 1;
          user.lastReportedAt = new Date();
        }
      }
      return of(undefined).pipe(delay(500));
    }
    return this.http.post(`${this.apiUrl}/reports/${reportId}/approve`, null);
  }

  rejectReport(reportId: number): Observable<any> {
    if (this.useFakeData) {
      const report = this.fakeReportRequests.find(r => r.id === reportId);
      if (report) {
        report.status = 'rejected';
      }
      return of(undefined).pipe(delay(500));
    }
    return this.http.delete(`${this.apiUrl}/deleteReport/${reportId}`);
  }

  suspendUser(userId: number): Observable<any> {
    
    if (this.useFakeData) {
      const user = this.fakeReportedUsers.find(u => u.id === userId);
      if (user) {
        user.status = 'suspended';
      }
      return of(undefined).pipe(delay(500));
    }
    return this.http.post(`${this.apiUrl}/users/${userId}/suspend`, null);
  }

  unsuspendUser(userId: number): Observable<any> {
    if (this.useFakeData) {
      const user = this.fakeReportedUsers.find(u => u.id === userId);
      if (user) {
        user.status = 'active';
      }
      return of(undefined).pipe(delay(500));
    }
    return this.http.post(`${this.apiUrl}/users/${userId}/unsuspend`, null);
  }
}