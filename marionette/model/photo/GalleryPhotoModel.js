/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 12.06.13 17:45
 */

define([
    'backbone'
], function (
    Backbone
) {
    "use strict";

    var GalleryPhotoModel = Backbone.Model.extend({

        idAttribute: '_id',
        user: null,
        postId: 0,

        setUser: function(user){
            this.user = user;
        },
        getUser: function(){
            return this.user;
        },
        getPlainUser: function(){
            var user = this.get("user");
            return {
                "user_id": user._id,
                "id": user.id,
                "firstname": user.profile.firstname,
                "lastname": user.profile.lastname,
                "nickname": user.profile.nickname,
                "avatar": user.profile.avatar
            };
        },
        fetchByPostId: function(id){
            this.postId = id;
            this.fetch({reset:true, remove:true});
        },
        parse: function(data){
            var data = Backbone.Model.prototype.parse.apply(this, arguments);
            return data;
        },

        setComments: function(comments){
            this.set("comments", comments);
        },

        getCommentById: function(id){
            var comments = this.get("comments");
            for(var i in comments){
                if(comments[i]._id == id){
                    return comments[i];
                }
            }
            return null;
        },
        getCommentByTempTimestamp: function(timestamp){
            var comments = this.get("comments");
            var comment;
            for(var i in comments){
                comment = comments[i];
                if(comment.tempTimestamp == timestamp){
                    return comment;
                }
            }
            return null;
        },
        replaceCommentWithTempTimestamp: function(timestamp, data){
            var comments = this.get("comments");
            for(var i in comments){
                if(comments[i].tempTimestamp == timestamp){
                    comments[i] = data;
                    break;
                }
            }
            this.set("comments", comments);
        },
        addTempComment: function(text, timestamp){
            var author = this.getPlainUser();
            var comments = this.get("comments") || [];
            var postId = this.get("_id");
            comments.push({
                body: text
                ,liked: 0
                ,post_id: postId
                ,author: author
                ,createdTime: timestamp/1000
                ,tempTimestamp: timestamp
            });
            this.set({
                "comm_cnt": parseInt(this.get("comm_cnt"))+1
                ,"comments": comments
            });
        },
        removeCommentWithTempTimestamp: function(timestamp){
            var comments = this.get("comments");
            var comment;
            var index = -1;
            for(var i in comments){
                comment = comments[i];
                if(comment.tempTimestamp == timestamp){
                    index = i;
                    break;
                }
            }
            if(index > 0){
                comments.splice(index,1);
            }
            this.set({
                "comm_cnt": parseInt(this.get("comm_cnt"))-1,
                "comments": comments
            });
        },
        removeComment: function(id){
            var comments = this.get("comments");
            var index = -1;
            for(var i in comments){
                if(comments[i]._id == id){
                    index = i;
                    break;
                }
            }
            if(i<0){
                return false;
            }
            comments.splice(i,1);
            this.set("comments", comments);
            return true;
        },
        tempRemoveComment: function(id){
            var comments = this.get("comments") || [];
            var index = -1;
            for(var i in comments){
                if(comments[i]._id == id){
                    // TODO: store temp removed comments to restore
                    index = i;
                }
            }
            if(index>-1){
                comments.splice(index,1);
            }
            this.set({
                "comm_cnt": parseInt(this.get("comm_cnt"))-1,
                "comments": comments
            });
        },
        restoreTempRemovedComment: function(id){
            // TODO: restore temp removed comment
        }
    });

    return GalleryPhotoModel;
});