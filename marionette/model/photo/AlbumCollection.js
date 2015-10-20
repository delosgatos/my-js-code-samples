/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 02.07.13 16:50
 */

define([
    'abstract/model/AbstractBlamperApiCollection'
    ,'backbone'
    ,'settings'
], function (
    AbstractBlamperApiCollection
    ,Backbone
    ,Settings
) {
    "use strict";
    var AlbumModel = Backbone.Model.extend({

    });
    var AlbumCollection = AbstractBlamperApiCollection.extend({

        name: "AlbumCollection",

        model: AlbumModel,
        clubsUrl: Settings.api.blamper.photo.getClubsAlbumsUrl,
        baseUrl: Settings.api.blamper.photo.getAlbumsUrl,

        ownerId: 0,     // - int - Инкрементальный id пользователя для которого выводим альбомы (по умолчанию id авторизованного пользователя)
        limit: 0,       // - int - Количество подгружаемых альбомов (по умолчанию 20)
        sort: -1,       // - int (-1:1) (по умолчанию -1) (-1 = desc, 1 = asc)
                        //   Доп параметры для подгрузки альбомов (Обязательные lastId)
        lastId: 0,      // - int - Будут подгружаться альбомы меньше данного id

        clubId: 0,

        setClubId: function(id){
            this.clubId = id;
        },
        setOwnerId: function(id){
            this.ownerId = id;
        },
        url: function(){
            var url = this.baseUrl;
            url +="?limit="+this.limit;
            if(this.ownerId){
                url +="&userId="+this.ownerId;
            }
            if(this.clubId){
                url +="&clubId="+this.clubId;
            }
            return url;
        },
        initialize: function(params){
            AbstractBlamperApiCollection.prototype.initialize.apply(this, arguments);
            if(!params){
                return;
            }
            if(params.clubId){
                this.setClubId(params.clubId);
            }
        },
        fetchByOwnerId: function(id){
            this.setOwnerId(id);
            this.setClubId(0);
            return this.fetch({reset:true});
        },
        fetchByClubId: function(clubId){
            this.setClubId(clubId);
            this.setOwnerId(0);
            return this.fetch({reset:true});
        },
        fetchByClubAndOwnerId: function(clubId, ownerId){
            this.setClubId(clubId);
            this.setOwnerId(ownerId);
            return this.fetch({reset:true});
        },
        parse: function(data){
            data = AbstractBlamperApiCollection.prototype.parse.apply(this, arguments);
            if(!data || !data.albums){
                return [];
            }
            var result = [];
            for(var i in data.albums){
                result.push(data.albums[i]);
            }
            return result;
        }
    });

    return AlbumCollection;
});