import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
    // posts = [
    //     {title: 'First post', content: 'This is the first post\'s content'},
    //     {title: 'Second post', content: 'This is the second post\'s content'},
    //     {title: 'Third post', content: 'This is the third post\'s content'}
    // ];
    posts: Post[] = [];
    private postSub: Subscription;
    userId: string;
    isLoading = false;
    totalPosts = 0;
    postsPerPage = 10;
    currentPage = 1;
    pageSizeOptions = [1,2,5,10];

    private authStatusSub: Subscription;
    userIsAuthenticated = false;

    constructor(public postService: PostService, private authService: AuthService) {}

    ngOnInit(){
        this.isLoading = true;
        this.userId = this.authService.getUserId();
        this.postService.getPosts(this.postsPerPage,this.currentPage);
        this.postSub = this.postService.getPostUpdateListener()
        .subscribe((postData: {posts: Post[], postCount: number}) => {
            this.isLoading = false;
            this.totalPosts = postData.postCount;
            this.posts = postData.posts;
        });
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
            this.userId = this.authService.getUserId();
            this.userIsAuthenticated = isAuthenticated;
        });
    }

    ngOnDestroy() {
        this.postSub.unsubscribe();
        this.authStatusSub.unsubscribe();
    }

    onChangedPage(pageData: PageEvent){
        this.isLoading = true;
        this.currentPage = pageData.pageIndex + 1;
        this.postsPerPage = pageData.pageSize;
        this.postService.getPosts(this.postsPerPage,this.currentPage);
    }

    onDelete(postId: string){
        this.isLoading = true;
        this.postService.deletePost(postId).subscribe(() => {
            this.postService.getPosts(this.postsPerPage, this.currentPage)
        }, () => {
            this.isLoading = false;
        });
    }
}