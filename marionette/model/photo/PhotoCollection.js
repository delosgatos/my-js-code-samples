/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 02.07.13 16:50
 */

define([
    'abstract/model/AbstractBlamperApiCollection'
    ,'./GalleryPhotoModel'
    ,'backbone'
    ,'underscore'
    ,'settings'
], function (
    AbstractBlamperApiCollection
    ,GalleryPhotoModel
    ,Backbone
    ,_
    ,Settings
) {
    "use strict";

    var PhotoCollection = AbstractBlamperApiCollection.extend({

        model: GalleryPhotoModel,

        baseUrl: Settings.api.blamper.photo.getAlbumImagesUrl,
        clubUrl: Settings.api.blamper.photo.getClubAlbumImagesUrl,

        clubId: 0,
        albumId: 0,
        ownerId: 0,//       - int          - Инкрементальный id пользователя для которого выводим альбомы (по умолчанию id авторизованного пользователя)
        limit: 0,//        - int          - Количество подгружаемых альбомов (по умолчанию 20)
        //sort         - int (-1:1) (по умолчанию -1) (-1 = desc, 1 = asc)

        //Доп параметры для подгрузки альбомов (Обязательные lastId)
        //lastId       - int          - Будут подгружаться альбомы меньше данного id
        album:{},

        setClubId: function(id){
            this.clubId = id;
        },
        setOwnerId: function(id){
            this.ownerId = id;
        },
        setLimit: function(limit){
            this.limit = limit;
        },
        url: function(){
            var url;
            if(this.clubId){
                url = this.clubUrl + "?clubId=" + this.clubId + "&limit=" + this.limit;
            }else{
                url = this.baseUrl + "?limit=" + this.limit;
            }
            if(this.albumId){
                url += "&albumId=" + this.albumId;
            }
            if(this.ownerId){
                url += "&userId=" + this.ownerId;
            }
            var extra = this.getExtraParams();
            if(extra){
                url += "&"+extra;
            }
            return url;
        },
        initialize: function(param){

        },
        fetchByClubAndAlbumId: function(clubId, albumId){
            this.clubId = clubId;
            this.albumId = albumId;
            return this.fetch({reset:true});
        },
        fetchById: function(id){
            this.albumId = id;
            return this.fetch({reset:true, remove:true});
        },
        getByHash: function(hash){
            return this.where({fileId:hash});
        },
        removeByHash: function(hash){
            var model = this.getByHash(hash);
            if(model){
                this.remove(model);
                return true;
            }
            return false;
        },
        removeById: function(id){
            var model = this.get(id);
            if(model){
                this.remove(model);
                return true;
            }
            return false;
        },
        parse: function(data){
            data = AbstractBlamperApiCollection.prototype.parse.apply(this, arguments);
            if(!data || !data.photos){
                return [];
            }
            if(data.album){
                this.album = data.album;
            }else{
                this.album = {};
            }
            var result = [];
            for(var i in data.photos){
                result.push(data.photos[i]);
            }
            return result;
        }
    });
    return PhotoCollection;
});