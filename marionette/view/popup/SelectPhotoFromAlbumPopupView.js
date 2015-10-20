/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 29.04.13 15:39
 */

define([
    'backbone'
    ,'abstract/view/popup/StandardTemplatePopupView'
    ,'jquery'
    ,'underscore'
    ,'settings'
    ,'helper/AppConsts'
    ,'abstract/model/AbstractBlamperApiCollection'
    //,'model/club/ClubCollection'
    ,'model/photo/AlbumCollection'
    ,'model/photo/PhotoCollection'
    ,'view/form/BasicSelectorView'
    ,'jquery.form'
    ,'data.utils'
], function (
    Backbone
    ,StandardTemplatePopupView
    ,$
    ,_
    ,Settings
    ,AppConsts
    ,AbstractBlamperApiCollection
    //,ClubCollection
    ,AlbumCollection
    ,PhotoCollection
    ,BasicSelectorView
) {

    "use strict";


    var SelectPhotoFromAlbumPopupView = StandardTemplatePopupView.extend({

        showParams: {},
        photoCollection: null,
        clubId: 0,
        content: {},
        currentAlbumId: 0,
        // TODO: parse template like selector and add data from asset
        templateUIAssetId:                      'basic-mini',
        templateDataAssetId:                    'photoFromAlbum',

        userList: {},
        collectionEvents:{
            'sync':                             'onAlbumResult'
        },
        events:{
            'change input[name=album-type]':    'onClubTypeSelected'
            ,'click .back-to-albums':           'onBackToAlbum'
            ,'click .album-list>div>a':         'onSelectAlbum'
            ,'click .photo-list>a':             'onSelectPhoto'
            ,'click .js-popup-close':              'onCloseClick'
        },

        triggers: {
        },

        ui: {
            form:                               'form'
            ,albumsScrollZone:                  '.album-area .jscroll'
            ,photosScrollZone:                  '.photo-area .jscroll'
            ,albumArea:                         '.album-area'
            ,photoArea:                         '.photo-area'
            ,albumScroll:                       '.album-scroll'
            ,albumList:                         '.album-list'
            ,photoList:                         '.photo-list'
            ,albumDescription:                  '.album-description'
            ,noAlbums:                          '.no-albums'
            ,noPhoto:                           '.no-photo'
            ,clubSelector:                      'select.club-selector'
            ,clubSelectorBlock:                 '.club-selector-block'
        },
        views: {},

		photosScrollApi: null,
		albumsScrollApi: null,
		jscrollSettings: {
			autoReinitialise: true,
			verticalDragMinHeight: 20
		},

        initialize: function (params) {
            StandardTemplatePopupView.prototype.initialize.apply(this, arguments);
            if(params.userId){
                this.collection.setOwnerId(params.userId);
            }
            this.photoCollection = new PhotoCollection(),
            this.collection = new AlbumCollection(),
            this.photoCollection.on('sync', this.onPhotoResult, this);
        },

        init: function () {
            StandardTemplatePopupView.prototype.init.call(this);

            /*this.views.clubAlbumsSelector = new BasicSelectorView({
                collection: new ClubCollection()
                ,el: this.ui.clubSelector
                ,templateId: 'clubSelector'
            });
            this.views.clubAlbumsSelector.on('changed', this.onClubChanged, this);
            this.views.clubAlbumsSelector.collection.fetch();*/
        },

        start: function () {
            StandardTemplatePopupView.prototype.start.apply(this, arguments);
        },

        show: function (params) {
            StandardTemplatePopupView.prototype.show.apply(this, arguments);
            //this.ui.searchField.focus();
            this.showParams = params;
            this.showLoading();
            this.updateMyAlbums();
        },

        destroy: function () {
            this.clearPhotoList();
            StandardTemplatePopupView.prototype.destroy.apply(this, arguments);
        },

        clearPhotoList: function(){
            this.photoCollection.reset({silent:true});
            this.ui.photoList.html("");
        },

        showAlbumList: function(){
            this.ui.albumArea.removeClass("hide");
            this.ui.photoArea.addClass("hide");
            this.setTitle(this.dataForAsset.title);
        },

        showAlbum: function(id){
            this.ui.albumArea.addClass("hide");
            this.ui.photoArea.removeClass("hide");
            this.setTitle(this.dataForAsset.title2);
            this.showLoading();
            this.currentAlbumId = id;
            this.photoCollection.fetchById(id);
        },

        onPhotoResult: function(collection, result){
            var viewData = {
                count: this.photoCollection.length
                ,privacy: this.photoCollection.album.privacy
                ,date: $.timestampToString(this.photoCollection.album.createdTime, 'ru')
                ,description: this.photoCollection.album.descr
            };
            var desc = _.template( this.dataForAsset.album_description_template, {item:viewData} );
            this.ui.albumDescription.html(desc);
            var imageList = this.photoCollection.toJSON();
            var list = _.template( this.dataForAsset.image_list_template, {items: imageList} );
            this.ui.photoList.html(list);
			this.photosScrollApi = this.ui.albumScroll.data('jsp');

			var photoCount = this.photoCollection.length,
				photoLineHeight = photoCount < 3 ?
					"139px" :
					photoCount > 12 ?
						"445px" :
						(139 * (photoCount%4 + 1) - 11) + "px";

            if(photoCount){
				this.ui.noPhoto.addClass("hide");
				this.ui.photosScrollZone
					.css('height', photoLineHeight)
					.jScrollPane(this.jscrollSettings);
            }else{
				this.ui.noPhoto.removeClass("hide");
            }
			$.fancybox.update();
            this.hideLoading();
        },

        onClubTypeSelected: function(e){
            var val = parseInt($(e.currentTarget).val());
            if(val == 1){
                this.ui.clubSelectorBlock.removeClass('hide');
                this.updateClubAlbums();
            }else{
                this.ui.clubSelectorBlock.addClass('hide');
                this.updateMyAlbums();
            }
        },

        updateMyAlbums: function(){
            this.collection.fetchByOwnerId(0);
        },

        updateClubAlbums: function(){
            var clubId = this.ui.clubSelector.val();
            this.collection.fetchByClubId(clubId);
			$.fancybox.update();
        },

        onClubChanged: function(objects){
            this.updateClubAlbums();
        },

        onSelectAlbum: function(e){
            e.preventDefault();
            var $el = $(e.currentTarget);
            var id = $el.data('id');
            this.showAlbum(id);
			$.fancybox.update();
        },

        onSelectPhoto: function(e){
            e.preventDefault();
            var $el = $(e.currentTarget);
            var id = $el.data('id');
            var hash = $el.data('hash');
            this.trigger("Selected", id, hash);
            if(!this.showParams || !this.showParams.preventAutoHide){
                this.hide();
            }
        },

        onAlbumResult: function (collection, results) {
            this.hideLoading();
            console.log("ALBUMS SYNC");
            var list = _.template(this.dataForAsset.album_list_template, {items:this.collection.toJSON()});
            this.ui.albumList.html(list);
			this.albumsScrollApi = this.ui.albumScroll.data('jsp');

			var albumCount = this.collection.length,
				albumLineHeight = albumCount > 3 ? "445px" : "270px";

            if(albumCount){
				this.ui.noAlbums.addClass("hide");
				this.ui.albumsScrollZone
					.css('height', albumLineHeight)
					.jScrollPane({autoReinitialise:true});
            }else{
                this.ui.noAlbums.removeClass("hide");
            }
			$.fancybox.update();
        },

        onBackToAlbum: function(e){
            e.preventDefault();
            this.showAlbumList();
            this.clearPhotoList();
			$.fancybox.update();
        }


    });

    return SelectPhotoFromAlbumPopupView;
});