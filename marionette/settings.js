/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 21.01.2015 17:47
 */

var
    API_2           = window.jsDebug ? 'http://'+window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/api' : '/api'
   , API_HOST        = window.jsDebug ? 'https://'+window.location.hostname+'/api' : '/api'
   , ADMIN_API_HOST  = window.jsDebug ? 'http://'+window.location.hostname+':91/api' : '/api'
   , ADMIN_HOST      = window.jsDebug ? 'http://'+window.location.hostname+':91/' : '/'
;

define({
    API: {
        HOST:                       API_2
        ,ADMIN_HOST:                ADMIN_API_HOST
        ,SHOW_STATISTIC:            API_2 + '/teaser/statistic'
        ,ARTICLE: {
            VOTE:                   API_2 + '/auto/wiki/vote/'
            ,TAGS:                  API_2 + '/auto/wiki/tags/'
        }
        ,QA: {
            VOTE:                   API_2 + '/auto/qa/vote/'
            ,SAVE_QUESTION:         API_2 + '/auto/qa/save/'
            ,SAVE_ANSWER:           API_2 + '/auto/qa/save_answer/'
            ,REMOVE_ANSWER:         API_2 + '/auto/qa/remove_answer/'
        }
        ,PUBLICATION: {
            VOTE:                   API_2 + '/auto/all/vote/'
        }
        ,SERVICE:{
            ENROLL:                 '/auto/autoservices/request/'
        }
        ,CAR:{
            MARKS:                  '/auto/car/marks/'
            ,MODELS:                '/auto/car/models/'
            ,GENERATIONS:           '/auto/car/generations/'
            ,MODIFICATIONS:         '/auto/car/modifications/'
        }
        ,COMMON:{
            UPLOAD_IMAGE:           '/upload/default/index/'
            ,SEARCH:                '/auto/all/dropdown/'
            ,PARSE_LINK:            '/upload/url/index/'
        }
        ,ADMIN:{
            ARTICLE: {
                CATEGORIES:         '/articles/list/subjects?parent_id='
                ,APPLY_LIST_ACTION: '/articles/list/apply_action'
                ,SAVE_COVER:        '/articles/single/save_cover/'
                ,SAVE_IMAGE:        '/articles/single/save_image'
                ,REMOVE_COVER:      '/articles/single/remove_cover'
                ,TAGS:              ADMIN_HOST + '/articles/list/tags/'
            }
            , QUESTION:{
                SELECT_EXPERT:      '/auto/qa/switchexpert/'
                ,GET_QUESTION:      '/auto/qa/takeqa/'
                ,BAD_QUESTION:      '/auto/qa/setflag/'
                ,EXECUTE_QUESTIONS: '/auto/qa/executionqa/'
            }
        }
    }

    ,APP:{
        SOUND: {
            CHAT_MESSAGE:           '/sound/chat_message.mp3'
            ,NOTIFY:           '/sound/notify.mp3'
        }
    }
    ,statistic:{
        google:{
            id: 0
        },
        yandex:{
            id: 22217446
        },
        yandexPetrika:{
            id: 25535501
        }
    }
    ,api:{
        blamper:{
            utils: {
                keepAliveUrl:               API_HOST + "/user/ping"
            }
            ,auth:{
                signupUrl:                  API_HOST + "/user/registration"
                ,signinUrl:                 API_HOST + "/user/login"
                ,signoutUrl:                API_HOST + "/user/logout"
                ,passwordRecoveryUrl:       API_HOST + "/user/recovery/"
                ,socialServerAuthUrl:       "/user/socialLogin/?provider=#network#" // URL of social auth on server side
                ,socialUnbindUrl:           API_HOST + "/user/socialUnbind/"        // URL of unbinding social network from blamper account
                ,socialRegistrationUrl:     API_HOST + "/user/socialRegistration/"  // combined socialLogin and socialBind methods
                ,carRegistrationUrl:        API_HOST + "/user/step2/"
                ,signinStep2Url:            API_HOST + "/user/step2/"
                ,rareCarRegistrationUrl:    API_HOST + "/user/uniqueCar/"
                ,changePasswordUrl:         API_HOST + "/user/updateProfile/"
                ,collectEmailUrl:           API_HOST + "/collect/email/"
            }
            ,user:{
                saveUserDataUrl:            API_HOST + "/user/updateProfile/"
                ,closeProfileWidgetUrl:     API_HOST + "/user/closeStep/"
                ,badgeWidgetUrl:            API_HOST + "/badge/profile/"
            }
            ,geo:{
                region:                     API_HOST + "/geo/regions/"
                ,city:                      API_HOST + "/geo/cities/"
            }
            ,media:{
                uploadUrl:                  API_HOST + "/file/upload/index/?field=upload"
                ,deleteUrl:                 API_HOST + "/media/delete/"
                ,cropUrl:                   API_HOST + "/file/upload/steady/"
                ,grabYoutubeUrl:            API_HOST + "/media/youtube"
                ,grabTwitterUrl:            API_HOST + "/media/twitter"
                ,grabInstagramUrl:          API_HOST + "/media/instagram"
            }
            ,car:{
                brandListUrl:               API_HOST + "/catalog/auto/mark/"
                ,modelListUrl:              API_HOST + "/catalog/auto/model/"
                ,generationListUrl:         API_HOST + "/catalog/auto/generations/"
                ,yearListUrl:               API_HOST + "/catalog/auto/model/"
                ,modificationListUrl:       API_HOST + "/catalog/auto/modification/"
                ,modificationListByListUrl: API_HOST + "/catalog/auto/modifications/"
                ,wheelBrandListUrl:         API_HOST + "/tabletires/marks/"
                ,wheelModelListUrl:         API_HOST + "/tabletires/models/?mark=<%=mark%>"
                ,wheelYearListUrl:          API_HOST + "/tabletires/years/?mark=<%=mark%>&model=<%=model%>"
                ,wheelModificationListUrl:  API_HOST + "/tabletires/Modification/?mark=<%=mark%>&model=<%=model%>&year=<%=year%>"
                ,updateCarUrl:              API_HOST + "/usercar/updatecar/"
                ,updateCarTechUrl:          API_HOST + "/usercar/updatetech/"
                ,updateCarInfoUrl:          API_HOST + "/usercar/updatecommon/"
                ,removeCarUrl:              API_HOST + "/usercar/remove/"
                ,saveSelectedWheel:         API_HOST + "/tabletires/save"
                ,saveMileage:               API_HOST + "/manual/mileage"
                ,techModificationUrl:       API_HOST + "/manual/GetTechTable"

            }
            ,chat:{
                sendMessageUrl:             API_HOST + "/message/send/"
                ,conversationListUrl:       API_HOST + "/message/dialogs/"
                ,createConversationUrl:     API_HOST + "/message/to/"
                ,removeConversationUrl:     API_HOST + "/message/removedialog/"
                ,claimConversationUrl:      API_HOST + "/message/claimdialog/"
                ,banConversationUrl:        API_HOST + "/message/bandialog/"
                ,messageFeedUrl:            API_HOST + "/message/messagescursor/"
                ,lastMessagesUrl:           API_HOST + "/message/messages/"
                ,removeMessageUrl:          API_HOST + "/message/removemessage/"
                ,claimMessageUrl:           API_HOST + "/message/claimdialog/"
                ,readMessageUrl:            API_HOST + "/message/read/"
            }
            ,search:{
                generalUrl:                 API_HOST + "/search/common"
                ,usersUrl:                  API_HOST + "/search/users"
                ,clubsUrl:                  API_HOST + "/search/clubs"
                ,basesUrl:                  API_HOST + "/search/base"
                ,publicationsUrl:           API_HOST + "/search/publications"
                ,discussionsUrl:            API_HOST + "/search/discussions"
                ,autoUrl:                   API_HOST + "/search/auto"
            }
            , post:{
                sendUrl:                    API_HOST + "/post/post"
                ,listLineUrl:               API_HOST + "/post/line/"
                ,feedUrl:                   API_HOST + "/post/feedline/" // "https://io.blamper.ru/~feed/readFeed?type=feed"
                ,switchPostTopUrl:          API_HOST + "/post/switchtop/"
                ,removeUrl:                 API_HOST + "/post/PostRemove/"
                ,removeFromFeedUrl:         API_HOST + "/post/RemoveFeed/"
                ,hideAuthorsPostsUrl:       API_HOST + "/post/hide/"
                ,hideAuthorsFromFeedUrl:    API_HOST + "/post/hidefeed/"
                ,blockUrl:                  API_HOST + "/post/PostClose/"
                ,likeUrl:                   API_HOST + "/post/Like/"
                ,subscribeUrl:              API_HOST + "/post/subscribe"
                ,addCommentUrl:             API_HOST + "/post/Comment/"
                ,removeCommentUrl:          API_HOST + "/post/CommentRemove/"
                ,removeQaCommentUrl:        API_HOST + "/qa/CommentQaRemove/"
                ,likeCommentUrl:            API_HOST + "/post/LikeComment/"
                ,claimContentUrl:           API_HOST + "/post/Complain/"
                ,getCommentsUrl:            API_HOST + "/post/commentsline/"
                ,getCommentsQaUrl:          API_HOST + "/qa/comments/"
                ,getLikersUrl:              API_HOST + "/post/Likers/"
                ,getCommentLikersUrl:       API_HOST + "/post/CommentLikers/"
                ,getPostUrl:                API_HOST + "/post/one/"
                ,parseUrl:                  API_HOST + '/post/url/'
                ,feedAllUrl:                API_HOST + '/stream/'
            }
            ,friends:{
                banUrl:                    API_HOST + "/relation/blacklist/"
                ,addUrl:                   API_HOST + "/relation/friend/"
                ,rejectUrl:                API_HOST + "/relation/rejectFriend/"
                ,filterUrl:                API_HOST + "/relation/friendFilter/"
                ,getEmailFriendsUrl:       API_HOST + "/invite/collectemailcontacts"
                ,emailRequestUrl:          API_HOST + "/invite/invitefriendsbyemails"

                ,list:                     API_HOST + "/relation/friends"
                ,requests:                 API_HOST + "/relation/requests"
                ,blackList:                API_HOST + "/relation/blacklist"
            }
            ,
            club:{
                createClubUrl:             API_HOST + "/company/add/"
                ,updateProfileUrl:         API_HOST + "/clubs/editProfile/"
                ,updatePrivacyUrl:         API_HOST + "/clubs/editPrivacy/"
                ,postPublishUrl:           API_HOST + "/clubs/post/"
                ,postLineUrl:              API_HOST + "/clubs/line/"
                ,inviteUrl:                API_HOST + "/clubs/invite/"
                ,joinUrl:                  API_HOST + "/clubs/join/"
                ,leaveUrl:                 API_HOST + "/clubs/out/"
                ,banUrl:                   API_HOST + "/clubs/addBl/"
                ,approveUrl:               API_HOST + "/clubs/approve/"
                ,addParticipantUrl:        API_HOST + "/clubs/makeMember/"
                ,addModeratorUrl:          API_HOST + "/clubs/makeModer/"
                ,addAdminUrl:              API_HOST + "/clubs/makeAdmin/"
                ,removeFromClubUrl:        API_HOST + "/clubs/remove/"
                ,userFilter:               API_HOST + "/clubs/getUsers/"
                ,clubListWithAlbumsUrl:    API_HOST + "/clubs/getClubList/"
                ,clubFilter:               API_HOST + "/company/index/"
                ,saveMakeupUrl:            API_HOST + "/clubs/performtype/"
                ,removeMakeupUrl:          API_HOST + "/clubs/cleanperform"
                ,setMakeupUrl:             API_HOST + "/clubs/perform/"
                ,members:                  API_HOST + "/clubs/members"
                ,moderators:               API_HOST + "/clubs/moderators"
                ,admins:                   API_HOST + "/clubs/admins"
                ,badgeUrl:                 API_HOST + "/badge"
            }
            ,photo:{
                createAlbumUrl:            API_HOST + "/albums/create/"
                ,updateAlbumUrl:           API_HOST + "/albums/update/"
                ,removeAlbumUrl:           API_HOST + "/albums/delete/"
                ,getClubsAlbumsUrl:        API_HOST + "/albums/"
                ,getAlbumsUrl:             API_HOST + "/albums/"
                ,getAlbumImagesUrl:        API_HOST + "/albums/userview/"
                ,getClubAlbumImagesUrl:    API_HOST + "/albums/clubview/"
                ,getPrivacyTypesUrl:       API_HOST + "/albums/privacy"
                ,describeUrl:              API_HOST + "/photo/description/"
                ,getCommentsUrl:           API_HOST + "/photo/CommentLine/"
                ,removeCommentUrl:         API_HOST + "/photo/CommentRemove/"
                ,addCommentUrl:            API_HOST + "/photo/Comment/"
                ,photoLikersUrl:           API_HOST + "/photo/Likers/"
                ,commentLikersUrl:         API_HOST + "/photo/CommentLikers/"
                ,likeUrl:                  API_HOST + "/photo/Like/"
                ,removeUrl:                API_HOST + "/photo/delete/"
                ,likeCommentUrl:           API_HOST + "/photo/CommentLike/"
                ,blockCommentsUrl:         API_HOST + "/photo/close/"
                ,setAlbumCoverUrl:         API_HOST + "/photo/setcover"
                ,setProfileCoverUrl:       API_HOST + "/photo/setprofilecover"
            }
            , qa : {
                answerUrl:                 API_HOST + "/qa/answer"
                ,getAnswersUrl:            API_HOST + "/qa/answers"
                ,askQuestionUrl:           API_HOST + "/qa/question"
                ,getQuestionsUrl:          API_HOST + "/qa"
                ,answerCommentUrl:         API_HOST + "/qa/comment/"
                ,loadCommenstUrl:          API_HOST + "/qa/comments/"
                ,likersUrl:                API_HOST + "/qa/likers"
                ,likeUrl:                  API_HOST + "/qa/like"
                ,subscribeUrl:             API_HOST + "/qa/subscribe"
                ,bestUrl:                  API_HOST + "/qa/best"
                ,closeUrl:                 API_HOST + "/qa/close"
                ,removeUrl:                API_HOST + "/qa/remove"
                ,completeUrl:              API_HOST + "/qa/complete"
                ,setActiveExpertUrl:       API_HOST + "/user/ActiveExpert"
                ,referQuestionUrl:         API_HOST + "/user/ReferQuestion"
            }
            ,forum:{
                createDicussionUrl:        API_HOST + '/forum/post/'
                ,draftDicussionUrl:        API_HOST + '/forum/postTmp/'
                ,postPublishForumUrl:      API_HOST + "/forum/postAnswer/"
                ,getChilrenCategoriesUrl:  API_HOST + '/forum/cat/'
                ,hideCategoryUrl:          API_HOST + '/forum/catAct/'
                ,removeDiscussionUrl:      API_HOST + '/forum/remove/'
                ,blockCommentsUrl:         API_HOST + '/forum/CloseComments/'
                ,likeTopicUrl:             API_HOST + '/forum/like/'
                ,closeTopicUrl:            API_HOST + '/forum/close/'
                ,blockUrl:                 API_HOST + "/forum/PostClose/"
                ,getUserTopicListUrl:      API_HOST + '/forum/UserLine/'
                ,getTopicListUrl:          API_HOST + '/search/discussions/'
                ,getAnswersUrl:            API_HOST + "/forum/lineAnswer/"
                ,setBestAnswerUrl:         API_HOST + '/forum/answerGood/'
                ,removeAnswerUrl:          API_HOST + '/forum/answerRemove/'
                ,postAnswerUrl:            API_HOST + '/forum/postAnswer/'
                ,voteUrl:                  API_HOST + '/forum/poll/'
                ,getVotersUrl:             API_HOST + '/forum/pollLine/'
            }
            ,article:{
                editUrl:                   API_HOST + '/articles/post/'
                ,getArticlesUrl:           API_HOST + '/articles/line/'
                ,getUserArticlesUrl:       API_HOST + '/articles/line/'
                ,likeUrl:                  API_HOST + '/articles/like/'
                ,removeUrl:                API_HOST + '/articles/remove/'
                ,claimUrl:                 API_HOST + '/articles/claim/'
                ,blockUrl:                 API_HOST + '/articles/close/'
                ,switchVisibilityUrl:      API_HOST + '/articles/visible/'
                ,reportBugUrl:             API_HOST + '/articles/report/'
                ,getCommentsUrl:           API_HOST + '/articles/answerLine/'
                ,publishCommentUrl:        API_HOST + "/articles/postAnswer/"
                ,getLikersUrl:             API_HOST + "/articles/Likers/"
                ,getTitlesUrl:             API_HOST + "/articles/title/"
                ,getTagsUrl:               API_HOST + "/articles/list/tags/"
                ,saveManual:               API_HOST + "/manual/post/"
            },
            kb: {
                getArticlesUrl:            API_HOST + '/articles/wiki20/'
                ,getReviewsUrl:             API_HOST + '/auto/review/'
                ,modificationInfoUrl:       API_HOST + '/auto/switchBody'
            },
            notification:{
                getUrl:                    API_HOST + "/notify/"
                ,removeUrl:                API_HOST + "/notify/requestclear"
                ,clearUrl:                 API_HOST + "/notify/clear"
            },
            addon: {
                race: {
                    inviteUrl:             API_HOST + "/drag/invite"
                    ,syncUrl:              API_HOST + "/drag"
                    ,isWinUrl:             API_HOST + "/notify/requestclear"
                }
            },
            tests: {
                questions:                  API_HOST + "/tests"
            },
            common:{
                trackBannerUrl:             API_HOST + "/jserror/derectlog",
                saveShareUrl:               API_HOST + "/saveshare"
            }
        }
        ,facebook:{
            appId:          "644789902202852"
            ,channelUrl:    '/channel.html'
        },
        vkontakte:{
            apiId: 3601843
        },
        google:{
            apiKey:         'AIzaSyBM6nsID6HY07RTRR4LOnUIg7DbdiDOkEg'
            ,clientId:      '354275714469.apps.googleusercontent.com'
            ,scopes:        'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email' // https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.login
        },
        mailru:{
            reciever:       '/receiver.html'
            ,clientId:      '705531'
            ,privateKey:    'ea100b7e175c121849fc3385cc739b85'
            ,sdkUrl:        'http://cdn.connect.mail.ru/js/loader.js'
        },
        odnoklassniki:{
            host:           'www.odnoklassniki.ru',
            sdkUrl:         'http://www.odnoklassniki.ru/oauth/resources.do?type=js'
            ,reciever:       '/_ok_receiver.html'
            ,appId:         '173090048'
            ,privateKey:    'CBAGCCFLABABABABA'
        },
        twitter:{
            consumerKey:    '2aveI7TEk3xoISpxYXHGDw'
            ,requestUrl:    'https://api.twitter.com/oauth/request_token'
            ,authUrl:       'https://api.twitter.com/oauth/authorize'
            ,tokenUrl:      'https://api.twitter.com/oauth/access_token'
        }
    }
});