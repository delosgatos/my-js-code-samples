/**
 * @project Blamper
 * @user o.kotov / delosgatos(a)gmail.com
 * @date 20.01.2015 19:03
 */

define({
    SOCKET:{
        DISCONNECT:                 "Event:Socket:disconnect"
        ,CONNECT:                   "Event:Socket:connect"
        ,SUBSCRIBE:                 "Event:Socket:subscribe"
        ,UNSUBSCRIBE:               "Event:Socket:unsubscribe"
        ,NOTIFICATION:              "Event:Socket:notification"
    }
    ,EVENT: {
        API: {
            CALL:                   'Event:Api:Call'
        }
        ,SOCKET:{
            SUBSCRIBE:              "Event:Socket:Subscribe"
            ,UNSUBSCRIBE:           "Event:Socket:Unsubscribe"
            ,CALL:                  "Event:Socket:Call"
            ,USER_NOTIFICATION:     "Event:Socket:UserNotification"
        }
        ,SYSTEM: {
            ALL_MODULES_LOADED:     'Event:System:AllModulesLoaded'
            ,WINDOW_FOCUS:          'Event:System:WindowFocus'
            ,WINDOW_BLUR:           'Event:System:WindowBlur'
            ,MOUSE_MOVE:            'Event:System:MouseMove'
            ,MOUSE_LEAVE:           'Event:System:MouseLeave'
            ,MOUSE_ENTER:           'Event:System:MouseEnter'
            ,CLICK:                 'Event:System:Click'
            ,SCROLL:                'Event:System:Scroll'
            ,NEED_PAGE_REFRESH:     'Event:System:NeedPageRefresh'
            ,RESIZE:                'Event:System:Resize'
            ,HISTORY_CHANGE:        'Event:System:HistoryChange'
            ,MANUAL_HISTORY_CHANGE: 'Event:System:ManualHistoryChange'
            ,INIT_MODULES_LOADED:   'Event:System:InitModulesLoaded'
            ,MODULES_LOADED:        'Event:System:ModulesLoaded'
            ,NEED_EXPORT_VIEWS:     'Event:System:NeedExportViews'
            ,EXPORT_VIEW:           'Event:System:ExportView'
            ,AFTER_DOM_READY:       'Event:System:AfterDomReady'
        }
        ,STATISTIC:{
            TRACK:                  'Event:Statistic:Track'
        }
        ,COMMON:{
            FAKE_CHAT_OPEN:  	    'Event:Common:FakeChatOpen'
            ,TOP_MENU_SCROLLABILITY:'Event:Common:TopMenuScrollability'
            ,SEARCH_STRING_UPDATED: 'Event:Common:SearchStringUpdated'
            ,FILTER_CATEGORY_TAG_REMOVED: 'Event:Common:FilterCategoryTagRemoved'
            ,DO_FILTER_SEARCH:      'Event:Common:DoFilterSearch'
            ,USER_NOTIFICATION:     'Event:Common:UserNotification'
        }
        ,AUTH:{
            SOCIAL_AUTH:            'Event:Auth:SocialAuth'
        }
        ,ARTICLE: {
            GET:                    'Event:Article:Get'
            ,SET_URL:               'Event:Article:SetUrl'
            ,PACKET_DATA:           'Event:Article:PacketData'
            ,SIMILAR_FILTER:        'Event:Article:SimilarFilter'
            ,SIMILAR_FILTER_ON_START:'Event:Article:SimilarFilterOnStart'
            ,THIS_THEME_ARTICLES:   'Event:Article:ThisThemeArticles'
            ,EXCLUDED_MATERIALS:    'Event:Article:ExcludedMaterials'
            ,CONTENT_RENDERED:      'Event:Article:ContentRendered'
            ,BLOCK_NEW_DATA:        'Event:Article:BlockNewData'
            ,UNBLOCK_NEW_DATA:      'Event:Article:UnblockNewData'
            ,SHOW_GALLERY:          'Event:Article:ShowGallery'
            ,NEXT_URL:              'Event:Article:NextUrl'
            ,NEED_NEXT:             'Event:Article:NeedNext'
            ,CHECK_CATEGORY_FILTER: 'Event:Article:CheckCategoryFilter'
            ,CATEGORY_FILTER:       'Event:Article:CategoryFilter'
            ,CATEGORY_INIT_FILTER:  'Event:Article:CategoryInitFilter'
            ,LIST_DATA:             'Event:Article:ListData'
        }
        ,QA:{
            EDIT_ANSWER:            'Event:QA:EditAnswer'
            ,SAVE_ANSWER_SUCCESS:   'Event:QA:SaveAnswerSuccess'
            ,EDIT_ANSWER_SUCCESS:   'Event:QA:EditAnswerSuccess'
        }
        ,CAR: {
            SELECTED:               'Event:Car:Selected'
            ,GLOBAL_MMM_UPDATE:     'Event:Car:GlobalMMMUpdate'
        }
        ,POPUP:{
            CATEGORY_SELECTED:      'Event:Popup:CategorySelected'
            ,SHOW_SIGNIN:           'Event:Popup:ShowSignin'
            ,SHOW_SIGNUP:           'Event:Popup:ShowSignup'
            ,SHOW_PASSWORD_RECOVERY:'Event:Popup:ShowPasswordRecovery'
        }
        ,LIST:{
            SET_URL:                'Event:List:SetUrl'
            ,GET:                   'Event:List:Get'
            ,FILTER:                'Event:List:Filter'
            ,INIT_FILTER:           'Event:List:InitFilter'
            ,BLOCK_NEW_DATA:        'Event:List:BlockNewData'
            ,UNBLOCK_NEW_DATA:      'Event:List:UnblockNewData'
            ,PACKET_DATA:           'Event:List:PacketData'
            ,NEED_FILTER:           'Event:List:NeedFilter'
            ,SET_TAB_URL:           'Event:List:SetTabUrl'
            ,RESULTS_AMOUNT:        'Event:List:ResultsAmount'
        }
        ,FILTER:{
            GET_FILTER_DATA:        'Event:Filter:GetFilterData'
        }
    }
    ,COOKIE: {
        FAKE_CHAT:{
            DONT_WORRY:             "FakeChat:DontWorry"
        }
    }
    ,TYPE:{
        MEDIA:{
            IMAGE_UPLOADED:         "image"
            ,IMAGE_FROM_ALBUM:      "album"
            ,IMAGE_FROM_LIBRARY:    "library"
            ,IMAGE_LINK:            "imageLink"
            ,VIDEO:                 "video"
        }
    },
});