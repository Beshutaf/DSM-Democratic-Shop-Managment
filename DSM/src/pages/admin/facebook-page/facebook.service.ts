import { Injectable, EventEmitter } from "@angular/core";
import { Http } from "@angular/http";
import { FacebookModel } from "./facebook.model";

import { LoadingController } from "ionic-angular";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { BASE_SERVER_URL } from '../../../app/constants.ts';

@Injectable()
export class FacebookService{
    facebookPosted : {name, imageUrl, message, index}[] = [];
    facebooksChanged = new EventEmitter<FacebookModel[]>();
    facebookPostedChanged = new EventEmitter<{name,imageUrl,message,index}[]>();

    facebooks : FacebookModel[] = []

    constructor(private loadingController: LoadingController, private http: Http, private fb: Facebook) {}

    getallPosts() : FacebookModel[] {
        const loader = this.loadingController.create( {content: '...טוען פוסטים'} );
        loader.present();

        console.log('Logging facebook...');
        this.fb.getLoginStatus()
            .then(status => {
                if (status.status == 'connected') {
                    return null;
                } else {
                    return this.fb.login(['user_managed_groups']);
                }
            })
            .then((res: FacebookLoginResponse) => {
                if (res != null) {
                    console.log('Logged into Facebook!', res)
                }

                this.fb.api('/560493177341455/feed?fields=from,message,permalink_url', ['user_managed_groups'])
                    .then(array => {
                        console.log(array);

                        for (let facebookpost of array.data) {
                            this.fb.api('/' + facebookpost.from.id + '?fields=picture', [])
                                .then((data) => {
                                    console.log(data);
                                    this.facebooks.push(new FacebookModel(
                                        facebookpost.message, 
                                        facebookpost.id, 
                                        facebookpost.from.name, 
                                        facebookpost.permalink_url, 
                                        data.picture.data.url));
                                    this.facebooksChanged.emit(this.facebooks.slice());         
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }
                        loader.dismiss();
                    })
                    .catch(error => {
                        console.log(error);
                        loader.dismiss();
                    });
            })
            .catch(e => {
                console.log('Error logging into Facebook', e)
                loader.dismiss();
            });

        return this.facebooks;
    }

    addFacebook(facebook) {
      return  this.http.post(BASE_SERVER_URL + "/facebook/addFacebook",facebook);
    }

    getPosts() {
        this.http.get(BASE_SERVER_URL + "/facebook/getAll").subscribe((Response) => {
            var facebookPosts = Response.json();
            this.facebookPostedChanged.emit(facebookPosts);
        })
    }
}