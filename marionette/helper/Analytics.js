/**
 * @project Blamper
 * @user front-end / delosgatos(a)gmail.com
 * @date 22.04.13 18:37
 */

define({

    V2:{
        SEARCH:{
            PREVIEW_RESULT_CLICK:{
                YANDEX: {
                    event: 'V2_Search_Preview_Result_Click'
                },
                GOOGLE: {
                    group: 'search',
                    event: 'V2_Search_Preview_Result_Click',
                    extra: 'searchV2'
                }
            }
            , RESULT_CLICK:{
                YANDEX: {
                    event: 'V2_Search_Result_Click'
                },
                GOOGLE: {
                    group: 'search',
                    event: 'V2_Search_Result_Click',
                    extra: 'searchV2'
                }
            }
            , ALL_RESULTS:{
                YANDEX: {
                    event: 'V2_Search_All_Results'
                },
                GOOGLE: {
                    group: 'search',
                    event: 'V2_Search_All_Results',
                    extra: 'searchV2'
                }
            }
        }
        , PROFILE:{
            CLICK_CLOSE: {
                YANDEX: {
                    event: 'V2_Profile_Close_Click'
                },
                GOOGLE: {
                    group: 'profile',
                    event: 'V2_Profile_Close_Click',
                    extra: 'profileV2'
                }
            }
        }
        , INDEX2:{
            SHOW: {
                YANDEX: {
                    event: 'V2_Index2_Show'
                },
                GOOGLE: {
                    group: 'index',
                    event: 'V2_Index2_Show',
                    extra: 'indexV2'
                }
            }
            , ASK_QUESTION: {
                YANDEX: {
                    event: 'V2_Index2_NewQuestion_Click'
                },
                GOOGLE: {
                    group: 'index',
                    event: 'V2_Index2_NewQuestion_Click',
                    extra: 'indexV2'
                }
            }
            , CATEGORY_SUBJECT_CLICK: {
                YANDEX:{
                    event: 'V2_Index2_Category_Subject_Click'
                },
                GOOGLE:{
                    group: 'index',
                    event: 'V2_Index2_Category_Subject_Click',
                    extra: 'indexV2'
                }
            }
        }
        , UNDER_ARTICLE:{
            SHOW: {
                YANDEX: {
                    event: 'V2_UnderArticle_Show'
                },
                GOOGLE: {
                    group: 'index',
                    event: 'V2_UnderArticle_Show',
                    extra: 'indexV2'
                }
            }
            , ASK_QUESTION: {
                YANDEX: {
                    event: 'V2_UnderArticle_NewQuestion_Click'
                },
                GOOGLE: {
                    group: 'index',
                    event: 'V2_UnderArticle_NewQuestion_Click',
                    extra: 'indexV2'
                }
            }
        }
        , SERVICE:{
            REGISTER_PHONE_FROM_WIKI:{
                YANDEX:{
                    event: 'V2_Service_RegisterPhoneFromWiki'
                },
                GOOGLE:{
                    group: 'service',
                    event: 'V2_Service_RegisterPhoneFromWiki',
                    extra: 'articleV2'
                }
            },
            SHOW_PAGE:{
                YANDEX:{
                    event: 'V2_Service_Pagee_Show'
                },
                GOOGLE:{
                    group: 'service',
                    event: 'V2_Service_Pagee_Show',
                    extra: 'autoservice'
                }
            },
            REGISTER_PHONE_TOP:{
                YANDEX:{
                    event: 'V2_Service_TopSubscribe_Click'
                },
                GOOGLE:{
                    group: 'service',
                    event: 'V2_Service_TopSubscribe_Click',
                    extra: 'autoservice'
                }
            },
            REGISTER_PHONE_BOTTOM:{
                YANDEX:{
                    event: 'V2_Service_BottomSubscribe_Click'
                },
                GOOGLE:{
                    group: 'service',
                    event: 'V2_Service_BottomSubscribe_Click',
                    extra: 'autoservice'
                }
            }
        }
        , ARTICLE: {
            CLICK_WIKI_SERVICE_BLOCK:{
                YANDEX:{
                    event: 'V2_Service_WikiServiceBlock_Click'
                },
                GOOGLE:{
                    group: 'service',
                    event: 'V2_Service_WikiServiceBlock_Click',
                    extra: 'articleV2'
                }
            }
            , SHOW_ARTICLE_LIST: {
                YANDEX: {
                    event: 'V2_ArticleList_Show'
                },
                GOOGLE: {
                    group: 'articleList',
                    event: 'V2_ArticleList_Show',
                    extra: 'articleV2'
                }
            }
            , CLICK_FROM_LIST: {
                YANDEX: {
                    event: 'V2_ArticleList_Article_Click'
                },
                GOOGLE: {
                    group: 'articleList',
                    event: 'V2_ArticleList_Article_Click',
                    extra: 'articleV2'
                }
            }
            , APPLY_CATEGORY_FILTER_CLICK: {
                YANDEX:{
                    event: 'V2_Article_Filter_Category_Apply'
                },
                GOOGLE:{
                    group: 'articleList',
                    event: 'V2_Article_Filter_Category_Apply',
                    extra: 'articleV2'
                }
            }
            , ASK_QUESTION_ARTICLE_LIST: {
                YANDEX: {
                    event: 'V2_ArticleList_NewQuestion_Click'
                },
                GOOGLE: {
                    group: 'articleList',
                    event: 'V2_ArticleList_NewQuestion_Click',
                    extra: 'articleV2'
                }
            }
            , SHOW_ARTICLE: {
                YANDEX: {
                    event: 'V2_Article_Show'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_Article_Show',
                    extra: 'articleV2'
                }
            }
            , CLICK_BREADCRUMBS: {
                YANDEX: {
                    event: 'V2_Article_Breadcrumbs_Click'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_Article_Breadcrumbs_Click',
                    extra: 'articleV2'
                }
            }
            , CLICK_BANNER_TOP: {
                YANDEX: {
                    event: 'topBannerClick'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'topBannerClick',
                    extra: 'articleV2'
                }
            }
            , CLICK_BANNER_TOP_RIGHT: {
                YANDEX: {
                    event: 'topRightBannerClick'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'topRightBannerClick',
                    extra: 'articleV2'
                }
            }
            , CLICK_BANNER_RIGHT: {
                YANDEX: {
                    event: 'rightBannerClick'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'rightBannerClick',
                    extra: 'articleV2'
                }
            }
            , CLICK_BANNER_RIGHT_STICK: {
                YANDEX: {
                    event: 'stickRightBannerClick'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'stickRightBannerClick',
                    extra: 'articleV2'
                }
            }
            , CLICK_BANNER_BOTTOM: {
                YANDEX: {
                    event: 'bottomBannerClick'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'bottomBannerClick',
                    extra: 'articleV2'
                }
            }
            , CLICK_PREV: {
                YANDEX: {
                    event: 'V2_Article_Prev_Click'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_Article_Prev_Click',
                    extra: 'articleV2'
                }
            }
            , CLICK_NEXT: {
                YANDEX: {
                    event: 'V2_Article_Next_Click'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_Article_Next_Click',
                    extra: 'articleV2'
                }
            }
            , CLICK_CLOSE: {
                YANDEX: {
                    event: 'V2_Article_Close_Click'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_Article_Close_Click',
                    extra: 'articleV2'
                }
            }
            , CLICK_MANUAL: {
                YANDEX: {
                    event: 'V2_Article_Manual_Click'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_Article_Manual_Click',
                    extra: 'articleV2'
                }
            }
            , CLICK_SIMILAR_QUESTIONS: {
                YANDEX: {
                    event: 'V2_SimilarQuestion_Click'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_SimilarQuestion_Click',
                    extra: 'articleV2'
                }
            }
            , CLICK_THIS_THEME: {
                YANDEX: {
                    event: 'V2_ThisThemeArticles_Click'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_ThisThemeArticles_Click',
                    extra: 'articleV2'
                }
            }
            , CLICK_DISCUSSION_LINK: {
                YANDEX: {
                    event: 'V2_Article_DiscussionLink_Click'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_Article_DiscussionLink_Click',
                    extra: 'articleV2'
                }
            }
            , CLICK_PROBLEM_SOLVED: {
                YANDEX: {
                    event: 'V2_Article_ProblemIsSolved_Click'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_Article_ProblemIsSolved_Click',
                    extra: 'articleV2'
                }
            }
            , CLICK_PROBLEM_NOT_SOLVED: {
                YANDEX: {
                    event: 'V2_Article_ProblemIsNotSolved_Click'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_Article_ProblemIsNotSolved_Click',
                    extra: 'articleV2'
                }
            }
            , CLICK_ASK_QUESTION: {
                YANDEX: {
                    event: 'V2_Article_AskQuestion_Click'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_Article_AskQuestion_Click',
                    extra: 'articleV2'
                }
            }
            , CLICK_SIMILAR_ARTICLES: {
                YANDEX: {
                    event: 'V2_SimilarArticles_Click'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_SimilarArticles_Click',
                    extra: 'articleV2'
                }
            }
            , CLICK_POPULAR: {
                YANDEX: {
                    event: 'V2_Popular_Click'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_Popular_Click',
                    extra: 'articleV2'
                }
            }
            , CLICK_POPULAR_ARTICLE: {
                YANDEX: {
                    event: 'V2_Popular_Article_Click'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_Popular_Article_Click',
                    extra: 'articleV2'
                }
            }
            , CLICK_POPULAR_QUESTION: {
                YANDEX: {
                    event: 'V2_Popular_Question_Click'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_Popular_Question_Click',
                    extra: 'articleV2'
                }
            }
            , CLICK_PHOTO: {
                YANDEX: {
                    event: 'V2_Photo_Click'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_Photo_Click',
                    extra: 'articleV2'
                }
            }
            , CLICK_VIDEO: {
                YANDEX: {
                    event: 'V2_Video_Click'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_Video_Click',
                    extra: 'articleV2'
                }
            }
            , PARTS_QUESTION: {
                YANDEX: {
                    event: 'V2_Article_Question_Parts'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_Article_Question_Parts',
                    extra: 'articleV2'
                }
            }
            , REPAIR_QUESTION: {
                YANDEX: {
                    event: 'V2_Article_Question_Repair'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_Article_Question_Repair',
                    extra: 'articleV2'
                }
            }
            , MODEL_QUESTION: {
                YANDEX: {
                    event: 'V2_Article_Question_Model'
                },
                GOOGLE: {
                    group: 'article',
                    event: 'V2_Article_Question_Model',
                    extra: 'articleV2'
                }
            }
            , CATEGORY_SUBJECT_CLICK: {
                YANDEX:{
                    event: 'V2_Article_Category_Subject_Click'
                },
                GOOGLE:{
                    group: 'article',
                    event: 'V2_Article_Category_Subject_Click',
                    extra: 'articleV2'
                }
            }
            , CATEGORY_TITLE_CLICK: {
                YANDEX:{
                    event: 'V2_Article_Category_Title_Click'
                },
                GOOGLE:{
                    group: 'article',
                    event: 'V2_Article_Category_Title_Click',
                    extra: 'articleV2'
                }
            }
        },
        ALL: {
            APPLY_CATEGORY_FILTER_CLICK: {
                YANDEX:{
                    event: 'V2_AllList_Filter_Category_Apply'
                },
                GOOGLE:{
                    group: 'questionList',
                    event: 'V2_AllList_Filter_Category_Apply',
                    extra: 'questionV2'
                }
            }
        },

        QUESTION: {
            PAYMENT:{
                TYPE_MOBILE_CLICK: {
                    YANDEX: {
                        event: 'V2_Question_PaySelection_Mobile_Click'
                    },
                    GOOGLE: {
                        group: 'payment',
                        event: 'V2_Question_PaySelection_Mobile_Click',
                        extra: 'questionV2'
                    }
                },
                TYPE_CARDS_CLICK: {
                    YANDEX: {
                        event: 'V2_Question_PaySelection_Cards_Click'
                    },
                    GOOGLE: {
                        group: 'payment',
                        event: 'V2_Question_PaySelection_Cards_Click',
                        extra: 'questionV2'
                    }
                },
                TYPE_YANDEX_CLICK: {
                    YANDEX: {
                        event: 'V2_Question_PaySelection_Yamoney_Click'
                    },
                    GOOGLE: {
                        group: 'payment',
                        event: 'V2_Question_PaySelection_Yamoney_Click',
                        extra: 'questionV2'
                    }
                },
                TYPE_OTHER_CLICK: {
                    YANDEX: {
                        event: 'V2_Question_PaySelection_Other_Click'
                    },
                    GOOGLE: {
                        group: 'payment',
                        event: 'V2_Question_PaySelection_Other_Click',
                        extra: 'questionV2'
                    }
                },
                TYPE_MOBILE_PAY_CLICK: {
                    YANDEX: {
                        event: 'V2_Question_Payment_Mobile_Click'
                    },
                    GOOGLE: {
                        group: 'payment',
                        event: 'V2_Question_Payment_Mobile_Click',
                        extra: 'questionV2'
                    }
                },
                TYPE_CARDS_PAY_CLICK: {
                    YANDEX: {
                        event: 'V2_Question_Payment_Cards_Click'
                    },
                    GOOGLE: {
                        group: 'payment',
                        event: 'V2_Question_Payment_Cards_Click',
                        extra: 'questionV2'
                    }
                },
                TYPE_YANDEX_PAY_CLICK: {
                    YANDEX: {
                        event: 'V2_Question_Payment_Yamoney_Click'
                    },
                    GOOGLE: {
                        group: 'payment',
                        event: 'V2_Question_Payment_Yamoney_Click',
                        extra: 'questionV2'
                    }
                },
                TYPE_OTHER_PAY_CLICK: {
                    YANDEX: {
                        event: 'V2_Question_Payment_Other_Click'
                    },
                    GOOGLE: {
                        group: 'payment',
                        event: 'V2_Question_Payment_Other_Click',
                        extra: 'questionV2'
                    }
                },
                TYPE_MOBILE_PAY_SUCCESS: {
                    YANDEX: {
                        event: 'V2_Question_Payment_Mobile_Success'
                    },
                    GOOGLE: {
                        group: 'payment',
                        event: 'V2_Question_Payment_Mobile_Success',
                        extra: 'questionV2'
                    }
                },
                TYPE_MOBILE_PAY_SUCCESS: {
                    YANDEX: {
                        event: 'V2_Question_Payment_Cards_Success'
                    },
                    GOOGLE: {
                        group: 'payment',
                        event: 'V2_Question_Payment_Cards_Success',
                        extra: 'questionV2'
                    }
                },
                TYPE_MOBILE_PAY_SUCCESS: {
                    YANDEX: {
                        event: 'V2_Question_Payment_Yamoney_Success'
                    },
                    GOOGLE: {
                        group: 'payment',
                        event: 'V2_Question_Payment_Yamoney_Success',
                        extra: 'questionV2'
                    }
                },
                TYPE_MOBILE_PAY_SUCCESS: {
                    YANDEX: {
                        event: 'V2_Question_Payment_Other_Success'
                    },
                    GOOGLE: {
                        group: 'payment',
                        event: 'V2_Question_Payment_Other_Success',
                        extra: 'questionV2'
                    }
                }
            },
            BUY_ANSWER: {
                YANDEX: {
                    event: 'V2_Answer_Buy'
                },
                GOOGLE: {
                    group: 'answer',
                    event: 'V2_Answer_Buy',
                    extra: 'questionV2'
                }
            }
            , SHOW_DONATE: {
                YANDEX: {
                    event: 'V2_Show_Donate'
                },
                GOOGLE: {
                    group: 'answer',
                    event: 'V2_Show_Donate',
                    extra: 'questionV2'
                }
            }
            , SHOW_LIST: {
                YANDEX: {
                    event: 'V2_QuestionList_Show'
                },
                GOOGLE: {
                    group: 'questionList',
                    event: 'V2_QuestionList_Show',
                    extra: 'questionV2'
                }
            }
            , CLICK_IN_LIST: {
                YANDEX: {
                    event: 'V2_QuestionList_Question_Click'
                },
                GOOGLE: {
                    group: 'questionList',
                    event: 'V2_QuestionList_Question_Click',
                    extra: 'questionV2'
                }
            }
            ,APPLY_CATEGORY_FILTER_CLICK: {
                YANDEX:{
                    event: 'V2_QuestionList_Filter_Category_Apply'
                },
                GOOGLE:{
                    group: 'questionList',
                    event: 'V2_QuestionList_Filter_Category_Apply',
                    extra: 'questionV2'
                }
            }
            , ASK_QUESTION_QUESTION_LIST: {
                YANDEX: {
                    event: 'V2_QuestionList_NewQuestion_Click'
                },
                GOOGLE: {
                    group: 'questionList',
                    event: 'V2_QuestionList_NewQuestion_Click',
                    extra: 'articleV2'
                }
            }
            , SHOW: {
                YANDEX: {
                    event: 'V2_Question_Show'
                },
                GOOGLE: {
                    group: 'question',
                    event: 'V2_Question_Show',
                    extra: 'questionV2'
                }
            }
            , CLICK_PREV: {
                YANDEX: {
                    event: 'V2_Question_Prev_Click'
                },
                GOOGLE: {
                    group: 'question',
                    event: 'V2_Question_Prev_Click',
                    extra: 'questionV2'
                }
            }
            , CLICK_NEXT: {
                YANDEX: {
                    event: 'V2_Question_Next_Click'
                },
                GOOGLE: {
                    group: 'question',
                    event: 'V2_Question_Next_Click',
                    extra: 'questionV2'
                }
            }
            , CLICK_CLOSE: {
                YANDEX: {
                    event: 'V2_Question_Close_Click'
                },
                GOOGLE: {
                    group: 'question',
                    event: 'V2_Question_Close_Click',
                    extra: 'questionV2'
                }
            }
            , CLICK_ASK_QUESTION: {
                YANDEX: {
                    event: 'V2_Question_AskQuestion_Click'
                },
                GOOGLE: {
                    group: 'question',
                    event: 'V2_Question_AskQuestion_Click',
                    extra: 'questionV2'
                }
            }
            , CLICK_SIMILAR_QUESTIONS: {
                YANDEX: {
                    event: 'V2_Question_SimilarQuestion_Click'
                },
                GOOGLE: {
                    group: 'question',
                    event: 'V2_Question_SimilarQuestion_Click',
                    extra: 'questionV2'
                }
            }
            , CLICK_SIMILAR_ARTICLES: {
                YANDEX: {
                    event: 'V2_Question_SimilarArticles_Click'
                },
                GOOGLE: {
                    group: 'question',
                    event: 'V2_Question_SimilarArticles_Click',
                    extra: 'questionV2'
                }
            }
            , CLICK_POPULAR: {
                YANDEX: {
                    event: 'V2_Question_Popular_Click'
                },
                GOOGLE: {
                    group: 'question',
                    event: 'V2_Question_Popular_Click',
                    extra: 'questionV2'
                }
            }
            , CLICK_POPULAR_ARTICLE: {
                YANDEX: {
                    event: 'V2_Question_Popular_Article_Click'
                },
                GOOGLE: {
                    group: 'question',
                    event: 'V2_Question_Popular_Article_Click',
                    extra: 'questionV2'
                }
            }
            , CLICK_POPULAR_QUESTION: {
                YANDEX: {
                    event: 'V2_Question_Popular_Question_Click'
                },
                GOOGLE: {
                    group: 'question',
                    event: 'V2_Question_Popular_Question_Click',
                    extra: 'questionV2'
                }
            }
            , CATEGORY_SUBJECT_CLICK: {
                YANDEX:{
                    event: 'V2_Question_Category_Subject_Click'
                },
                GOOGLE:{
                    group: 'question',
                    event: 'V2_Question_Category_Subject_Click',
                    extra: 'questionV2'
                }
            }
            , CATEGORY_TITLE_CLICK: {
                YANDEX:{
                    event: 'V2_Question_Category_Title_Click'
                },
                GOOGLE:{
                    group: 'question',
                    event: 'V2_Question_Category_Title_Click',
                    extra: 'questionV2'
                }
            }
        }
    },


    REGISTRATION:{
        FB:{
            YANDEX:{
                event: 'RegistrationFB'
            },
            GOOGLE:{
                group: 'Registration',
                event: 'RegFB',
                extra: 'Step1_FB'
            },
			OPTIMIZELY:{
				type: 'trackEvent',
				event: 'RegistrationFBLanding'
			}
        },
        VK:{
            YANDEX:{
                event: 'RegistrationVK'
            },
            GOOGLE:{
                group: 'Registration',
                event: 'RegVK',
                extra: 'Step1_VK'
            },
			OPTIMIZELY:{
				type: 'trackEvent',
				event: 'RegistrationVKLanding'
			}
        },
        OK:{
            YANDEX:{
                event: 'RegistrationOK'
            },
            GOOGLE:{
                group: 'Registration',
                event: 'RegOK',
                extra: 'Step1_OK'
            },
			OPTIMIZELY:{
				type: 'trackEvent',
				event: 'RegistrationOKLanding'
			}
        },
        GP:{
            YANDEX:{
                event: 'RegistrationGoogle'
            },
            GOOGLE:{
                group: 'Registration',
                event: 'RegGooglePlus',
                extra: 'Step1_Google'
            },
			OPTIMIZELY:{
				type: 'trackEvent',
				event: 'RegistrationGPLanding'
			}
        },
        TW:{
            YANDEX:{
                event: 'RegistrationTwitter'
            },
            GOOGLE:{
                group: 'Registration',
                event: 'RegTwitter',
                extra: 'Step1_Twitter'
            },
			OPTIMIZELY:{
				type: 'trackEvent',
				event: 'RegistrationTWLanding'
			}
        },
        MA:{
            YANDEX:{
                event: 'RegistrationMyWorld'
            },
            GOOGLE:{
                group: 'Registration',
                event: 'RegMyWorld',
                extra: 'Step1_MyWorld'
            },
			OPTIMIZELY:{
				type: 'trackEvent',
				event: 'RegistrationMALanding'
			}
        },
        STEP1:{
            YANDEX:{
                event: 'RegistrationSite'
            },
            GOOGLE:{
                group: 'Registration',
                event: 'RegSite',
                extra: 'Step1_fromSite'
            },
			OPTIMIZELY:{
				type: 'trackEvent',
				event: 'RegistrationFromLanding'
			}
        },
        STEP2:{
            YANDEX:{
                event: 'AddCar'
            },
            GOOGLE:{
                group: 'Registration',
                event: 'AddCar',
                extra: 'RegCar'
            },
			OPTIMIZELY:{
				type: 'trackEvent',
				event: 'AddCarFromLanding'
			}
        },
        SHOW_STEP2:{
			OPTIMIZELY:{
				type: 'trackEvent',
				event: 'RegisteredStep2'
			}
        },
        KEYBOARD_ACTIVITY:{
            YANDEX:{
                event: 'LandingInputFromKeyboard'
            },
			OPTIMIZELY:{
				type: 'trackEvent',
				event: 'LandingInputFromKeyboard'
			}
        },
        ARTICLE: {
            YANDEX:{
                event: 'RegArticle'
            },
            GOOGLE:{
                group: 'Registration',
                event: 'RegArticle',
                extra: 'Step1_fromArticle'
            }
        }
    },
    AUTH:{
        FB:{
            YANDEX:{
                event: 'AutorizeFB'
            },
            GOOGLE:{
                group: 'Autorization',
                event: 'AutorizeFB',
                extra: 'AutorizeFromFB'
            },
			OPTIMIZELY:{
				type: 'trackEvent',
				event: 'AutorizeFBLanding'
			}
        },
        VK:{
            YANDEX:{
                event: 'AutorizeVK'
            },
            GOOGLE:{
                group: 'Autorization',
                event: 'AutorizeVK',
                extra: 'AutorizeFromVK'
            },
			OPTIMIZELY:{
				type: 'trackEvent',
				event: 'AutorizeVKLanding'
			}
        },
        OK:{
            YANDEX:{
                event: 'AutorizeOK'
            },
            GOOGLE:{
                group: 'Autorization',
                event: 'AutorizeOK',
                extra: 'AutorizeFromOK'
            },
			OPTIMIZELY:{
				type: 'trackEvent',
				event: 'AutorizeOKLanding'
			}
        },
        GP:{
            YANDEX:{
                event: 'AutorizeGoogle'
            },
            GOOGLE:{
                group: 'Autorization',
                event: 'AutorizeGooglePlus',
                extra: 'AutorizeFromGoogle'
            },
			OPTIMIZELY:{
				type: 'trackEvent',
				event: 'AutorizeGPLanding'
			}
        },
        TW:{
            YANDEX:{
                event: 'AutorizeTwitter'
            },
            GOOGLE:{
                group: 'Autorization',
                event: 'AutorizeTwitter',
                extra: 'AutorizeFromTwitter'
            },
			OPTIMIZELY:{
				type: 'trackEvent',
				event: 'AutorizeTWLanding'
			}
        },
        MA:{
            YANDEX:{
                event: 'AutorizeMyWorld'
            },
            GOOGLE:{
                group: 'Autorization',
                event: 'AutorizeMyWorld',
                extra: 'AutorizeFromMyWorld'
            },
			OPTIMIZELY:{
				type: 'trackEvent',
				event: 'AutorizeMALanding'
			}
        },
        SITE:{
            YANDEX:{
                event: 'AutorizeSite'
            },
            GOOGLE:{
                group: 'Autorization',
                event: 'AutorizeSite',
                extra: 'AutorizeFromSite'
            },
			OPTIMIZELY:{
				type: 'trackEvent',
				event: 'AutorizeFromLanding'
			}
        }
    },
    SHARE:{
        FB:{
            YANDEX:{
                event: 'ShareFB'
            },
            GOOGLE:{
                type: 'social',
                group: 'facebook',
                event: 'share',
                extra: '#url#'
            }
        },
        VK:{
            YANDEX:{
                event: 'ShareVK'
            },
            GOOGLE:{
                type: 'social',
                group: 'vkontakte',
                event: 'share',
                extra: '#url#'
            }
        },
        TW:{
            YANDEX:{
                event: 'ShareTwitter'
            },
            GOOGLE:{
                type: 'social',
                group: 'twitter',
                event: 'tweet',
                extra: '#url#'
            }
        }
    },
    POST:{
        MY_WALL:{
            YANDEX:{
                event: 'PostOnMyWall'
            },
            GOOGLE:{
                group: 'Post',
                event: 'PostOnMyWall',
                extra: 'PostMyWall'
            }
        },
        MY_WALL_AUTO_EVENT:{
            YANDEX:{
                event: 'AutoEventMyWall'
            },
            GOOGLE:{
                group: 'Post',
                event: 'PostOnMyWall',
                extra: 'AutoEventMyWall'
            }
        },
        OTHER_WALL:{
            YANDEX:{
                event: 'PostOtherWall'
            },
            GOOGLE:{
                group: 'Post',
                event: 'PostOnMyWall',
                extra: 'PostOtherWall'
            }
        },
        CLUB_WALL:{
            YANDEX:{
                event: 'PostOnClubWall'
            },
            GOOGLE:{
                group: 'Post',
                event: 'PostOnClubWall',
                extra: 'PostInClub'
            }
        },
        CLUB_CONVERSATION:{
            YANDEX:{
                event: 'AnswerInConversation'
            },
            GOOGLE:{
                group: 'Post',
                event: 'AnswerInConversation',
                extra: 'PostInClub'
            }
        },
        FEED_ADD_POST:{
            YANDEX:{
                event: 'PostLenta'
            },
            GOOGLE:{}
        }
    },
    COMMENT:{
        FEED_COMMENT:{
            YANDEX:{
                event: 'CommentLenta'
            },
            GOOGLE:{}
        },
        WALL_COMMENT:{
            YANDEX:{
                event: 'CommentPostOnWall'
            },
            GOOGLE:{
                
                group: 'Comment',
                event: 'CommentOnWall',
                extra: 'CommentPostOnWall'
            }
        },
        SINGLE_POST_COMMENT:{
            YANDEX:{
                event: 'CommentPostOnPage'
            },
            GOOGLE:{
                group: 'Comment',
                event: 'CommentOnPage',
                extra: 'CommentPostOnPage'
            }
        },
        CLUB_COMMENT:{
            YANDEX:{
                event: 'CommentPostInClub'
            },
            GOOGLE:{
                group: 'Comment',
                event: 'CommentInClub',
                extra: 'CommentPostInClub'
            }
        },
        FORUM_COMMENT:{
            YANDEX:{
                event: 'CommentAnswerInClub'
            },
            GOOGLE:{
                
                group: 'Comment',
                event: 'CommentAnswerInClub',
                extra: 'CommentAnswerInClub'
            }
        },
        ARTICLE_COMMENT:{
            YANDEX:{
                event: 'CommentArticle'
            },
            GOOGLE:{
                group: 'Comment',
                event: 'CommentArticle',
                extra: 'CommentArticle'
            }
        },
        MOBILE_ARTICLE_COMMENT:{
            YANDEX:{
                event: 'MobileCommentArticle'
            },
            GOOGLE:{
                group: 'Comment',
                event: 'MobileCommentArticle',
                extra: 'CommentArticle'
            }
        }
    },
    COMMON:{
        HELP_BUTTON_CLICK: {
            YANDEX:{
                event: 'helpButtonClick'
            },
            GOOGLE:{
                group: 'common',
                event: 'helpButtonClick',
                extra: 'fakeChat'
            }
        },
        CLOSE_CHAT: {
            YANDEX:{
                event: 'closeFakeChat'
            },
            GOOGLE:{
                group: 'common',
                event: 'closeFakeChat',
                extra: 'fakeChat'
            }
        }
    },
    QA:{
        AUTH_COMPLETE_BEFORE_ASK: {
            YANDEX:{
                event: 'authCompleteBeforeAsk'
            },
            GOOGLE:{
                group: 'qa',
                event: 'authCompleteBeforeAsk',
                extra: 'questionForm'
            }
        },
        SHOW_LOGIN_BEFORE_ASK: {
            YANDEX:{
                event: 'showLoginBeforeAsk'
            },
            GOOGLE:{
                group: 'qa',
                event: 'showLoginBeforeAsk',
                extra: 'questionForm'
            }
        },
        SHOW_BOOST_ANSWER_POPUP: {
            YANDEX:{
                event: 'showBoostAnswerPopup'
            },
            GOOGLE:{
                group: 'qa',
                event: 'showBoostAnswerPopup',
                extra: 'boostPopup'
            }
        },
        CLOSE_BOOST_ANSWER_POPUP: {
            YANDEX:{
                event: 'closeBoostAnswerPopup'
            },
            GOOGLE:{
                group: 'qa',
                event: 'closeBoostAnswerPopup',
                extra: 'boostPopup'
            }
        },
        BOOST_ANSWER_BY_WAIT: {
            YANDEX:{
                event: 'boostAnswerByWait'
            },
            GOOGLE:{
                group: 'qa',
                event: 'boostAnswerByWait',
                extra: 'boostPopup'
            }
        },
        BOOST_ANSWER_BY_CALL: {
            YANDEX:{
                event: 'boostAnswerByCall'
            },
            GOOGLE:{
                group: 'qa',
                event: 'boostAnswerByCall',
                extra: 'boostPopup'
            }
        },
        BOOST_ANSWER_BY_PAY: {
            YANDEX:{
                event: 'boostAnswerByPay'
            },
            GOOGLE:{
                group: 'qa',
                event: 'boostAnswerByPay',
                extra: 'boostPopup'
            }
        },
        BOOST_ANSWER_BY_SHARE: {
            YANDEX:{
                event: 'boostAnswerByShare'
            },
            GOOGLE:{
                group: 'qa',
                event: 'boostAnswerByShare',
                extra: 'boostPopup'
            }
        },
        CLICK_QUESTION_BUTTON: {
            YANDEX:{
                event: 'clickQuestionButton'
            },
            GOOGLE:{
                group: 'qa',
                event: 'clickQuestionButton',
                extra: 'questionForm'
            }
        },
        CLICK_QUESTION_BUTTON_WITH_ERRORS: {
            YANDEX:{
                event: 'clickQuestionButtonWithErrors'
            },
            GOOGLE:{
                group: 'qa',
                event: 'clickQuestionButtonWithErrors',
                extra: 'questionForm'
            }
        },
        ASK_QUESTION: {
            YANDEX:{
                event: 'addQAQuestion'
            },
            GOOGLE:{
                group: 'qa',
                event: 'addQAQuestion',
                extra: 'addQuestion'
            }
        },
        ASK_QUESTION_UNREGISTERED: {
            YANDEX:{
                event: 'addQAQuestionNewUser'
            },
            GOOGLE:{
                group: 'qa',
                event: 'addQAQuestionNewUser',
                extra: 'addQuestion'
            }
        },
        ASK_QUESTION_FROM_POPUP: {
            YANDEX:{
                event: 'AddQAfromPopup'
            },
            GOOGLE:{
                group: 'qa',
                event: 'AddQAfromPopup',
                extra: 'askQuestion'
            }
        },
        ASK_QUESTION_FROM_QUESTION: {
            YANDEX:{
                event: 'askQuestionFromQuestionPage'
            },
            GOOGLE:{
                group: 'qa',
                event: 'askQuestionFromQuestionPage',
                extra: 'askQuestion'
            }
        },
        ASK_QUESTION_FROM_ARTICLE: {
            YANDEX:{
                event: 'askQuestionFromArticlePage'
            },
            GOOGLE:{
                group: 'qa',
                event: 'askQuestionFromArticlePage',
                extra: 'askQuestion'
            }
        },
        ASK_QUESTION_FROM_ARTICLE_LINKED_WITH_CAR: {
            YANDEX:{
                event: 'askQuestionFromArticlePageLinkedWithCar'
            },
            GOOGLE:{
                group: 'qa',
                event: 'askQuestionFromArticlePageLinkedWithCar',
                extra: 'askQuestion'
            }
        },
        ASK_QUESTION_FROM_MODEL_PAGE: {
            YANDEX:{
                event: 'askQuestionFromCarModelPage'
            },
            GOOGLE:{
                group: 'qa',
                event: 'askQuestionFromCarModelPage',
                extra: 'askQuestion'
            }
        },
        ASK_BUTTON_FROM_HELP_CHAT: {
            YANDEX:{
                event: 'askQuestionFromHelpChat'
            },
            GOOGLE:{
                group: 'qa',
                event: 'askQuestionFromHelpChat',
                extra: 'askQuestion'
            }
        },
        QA_FROM_TOP_MENU: {
            YANDEX:{
                event: 'qaButtonFromTopMenu'
            },
            GOOGLE:{
                group: 'qa',
                event: 'qaButtonFromTopMenu',
                extra: 'askQuestion'
            }
        },
        SHOW_QUESTION_FORM: {
            YANDEX:{
                event: 'showQuestionForm'
            },
            GOOGLE:{
                group: 'qa',
                event: 'showQuestionForm',
                extra: 'questionForm'
            }
        },
        BEST_ANSWER: {
            YANDEX:{
                event: 'bestAnswerSet'
            },
            GOOGLE:{
                group: 'qa',
                event: 'bestAnswerSet',
                extra: 'answer'
            }
        },
        NOT_BEST_ANSWER: {
            YANDEX:{
                event: 'bestAnswerUnset'
            },
            GOOGLE:{
                group: 'qa',
                event: 'bestAnswerUnset',
                extra: 'answer'
            }
        }
    },
    MESSAGE:{
        /** После клика на кнопку «Отправить»
         * и успешной публикации сообщения вызывать событие через JS */
        SEND: {
            YANDEX:{
                event: 'PrivateMessage'
            },
            GOOGLE:{
                group: 'Message',
                event: 'PrivateMessage',
                extra: 'SendMessage'
            }
        },
        /** После клика на кнопку «Начать новый диалог» вызывать событие через JS */
        CREATE_CONVERSATION: {
            YANDEX:{
                event: 'NewConversation'
            },
            GOOGLE:{

                group: 'Message',
                event: 'NewConversation',
                extra: 'NewConversation'
            }
        }
    },
    FRIEND:{
        /** Кнопка «В друзья» на странице Профиля.
         * После клика и успешной отправки заявки вызывать событие через JS */
        ADD_FROM_PROFILE:{
            YANDEX:{
                event: 'FriendsFromProfile'
            },
            GOOGLE:{
                group: 'FriendRequest',
                event: 'FriendsFromProfile',
                extra: 'SendFriendRequest'
            }
        },
        /** на странице Участники Клуба */
        ADD_FROM_CLUB:{
            YANDEX:{
                event: 'FriendsFromClub'
            },
            GOOGLE:{
                group: 'FriendRequest',
                event: 'FriendsFromClub',
                extra: 'SendFriendRequest'
            }
        },
        /** на странице Поиска */
        ADD_FROM_SEARCH:{
            YANDEX:{
                event: 'FriendsFromSearch'
            },
            GOOGLE:{
                group: 'FriendRequest',
                event: 'FriendsFromSearch',
                extra: 'SendFriendRequest'
            }
        },
        /** на странице друзей другого человека */
        ADD_FROM_FRIENDS:{
            YANDEX:{
                event: 'FriendsFromMyFriend'
            },
            GOOGLE:{
                group: 'FriendRequest',
                event: 'FriendsFromMyFriend',
                extra: 'SendFriendRequest'
            }
        },
        /** на странице в Профиле После клика на кнопку «В друзья»
         * вызывать событие через JS */
        ACCEPT_FROM_PROFILE:{
            YANDEX:{
                event: 'AcceptFriendProfile'
            },
            GOOGLE:{
                group: 'FriendRequest',
                event: 'FriendsAccept',
                extra: 'AcceptFriendProfile'
            }
        },
        /** Добавление друга в ответ на запрос из Уведомления в шапке */
        ACCEPT_FROM_NOTICE:{
            YANDEX:{
                event: 'AcceptFriendAlert'
            },
            GOOGLE:{
                group: 'FriendRequest',
                event: 'FriendsAccept',
                extra: 'AcceptFriendAlert'
            }
        }
    },
    CLUB:{
        /** Создание клуба из профиля
         * После клика на кнопку «Создать клуб» в поп-ап
         * и успешного создания клуба вызывать событие через JS */
        CREATE_FROM_PROFILE:{
            YANDEX:{
                event: 'CreateClubFromProfile'
            },
            GOOGLE:{
                group: 'Club',
                event: 'CreateClub',
                extra: 'CreateClubFromProfile'
            }
        },
        /** Создание клуба со страницы Все клубы */
        CREATE_FROM_SEARCH:{
            YANDEX:{
                event: 'CreateClubFromSearch'
            },
            GOOGLE:{
                group: 'Club',
                event: 'CreateClub',
                extra: 'CreateClubFromSearch'
            }
        },
        /** Вступление со страницы Всех Клубов */
        JOIN_FROM_SEARCH:{
            YANDEX:{
                event: 'JoinClubFromSearch'
            },
            GOOGLE:{
                group: 'JoinClub',
                event: 'JoinClubFromSearch',
                extra: 'JoinClub'
            }
        },
        /** Вступление со страницы Клуба */
        JOIN_FROM_CLUB:{
            YANDEX:{
                event: 'JoinClubFromClubPage'
            },
            GOOGLE:{
                group: 'JoinClub',
                event: 'JoinClubFromClubPage',
                extra: 'JoinClub'
            }
        },
        /** Вступление с профиля другого пользователя */
        JOIN_FROM_PROFILE:{
            YANDEX:{
                event: 'JoinClubFromOtherProfile'
            },
            GOOGLE:{
                group: 'JoinClub',
                event: 'JoinClubFromOtherProfile',
                extra: 'JoinClub'
            }
        },
        /** Вступление с виджета */
        JOIN_FROM_WIDGET:{
            YANDEX:{
                event: 'JoinClubFromWidget'
            },
            GOOGLE:{
                group: 'JoinClub',
                event: 'JoinClubFromWidget',
                extra: 'JoinClub'
            }
        },
        /** Вступление с виджета рекомендаций клубов и обсуждений */
        JOIN_FROM_WIDGET_CLUB_AND_THEME:{
            YANDEX:{
                event: 'RecClubForumClick'
            },
            GOOGLE:{}
        },
        /** Вступление с виджета */
        JOIN_FROM_WIDGET_LIST:{
            YANDEX:{
                event: 'RekClubListClick'
            },
            GOOGLE:{}
        },
        /** Вступление с виджета */
        JOIN_FROM_WIDGET_SINGLE:{
            YANDEX:{
                event: 'RekClubEskizClick'
            },
            GOOGLE:{}
        },
        /** Вступление с виджета */
        JOIN_FROM_WIDGET_POST:{
            YANDEX:{
                event: 'RekClubPostClick'
            },
            GOOGLE:{}
        },
        /** Принять приглашение в клуб */
        ACCEPT_INVITE:{
            YANDEX:{
                event: 'AcceptInvitationJoinClub'
            },
            GOOGLE:{
                group: 'JoinClub',
                event: 'AcceptInvitationJoinClub',
                extra: 'JoinClub'
            }
        },
        NEW_BADGE: {
            YANDEX:{
                event: 'GotNewBadge'
            },
            GOOGLE:{
                group: 'JoinClub',
                event: 'GotNewBadge',
                extra: 'JoinClub'
            }
        }
    },
    DISCUSSION:{
        /** После клика на кнопку «Опубликовать»
         * и успешной публикации обсуждения вызывать событие через JS */
        CREATE:{
            YANDEX:{
                event: 'MakeConversation'
            },
            GOOGLE:{
                group: 'Club',
                event: 'MakeConversation',
                extra: 'MakeConversation'
            }
        },
        LIKE:{
            YANDEX:{
                event: 'LikeConversation'
            },
            GOOGLE:{
                group: 'Club',
                event: 'LikeConversation',
                extra: 'LikeConversation'
            }
        },
        SUBSCRIBE:{
            YANDEX:{
                event: 'SubscribeConversation'
            },
            GOOGLE:{
                group: 'Club',
                event: 'SubscribeConversation',
                extra: 'SubscribeConversation'
            }
        }
    },
    ARTICLE:{
        /** После клика на кнопку «Опубликовать»
         * и успешной публикации вызывать событие через JS */
        CREATE:{
            YANDEX:{
                event: 'CreateArticle'
            },
            GOOGLE:{
                group: 'Article',
                event: 'CreateArticle',
                extra: 'Create'
            }
        }
    },
    PROFILE:{
        WIDGET:{
            SAVE_MMM: {
                YANDEX:{
                    event: 'CompleteMMP'
                },
                GOOGLE:{                    
                    group: 'EditPersonalInfo',
                    event: 'CompleteMMP',
                    extra: 'Edit'
                }
            },
            SAVE_MILEAGE: {
                YANDEX:{
                    event: 'CompleteMileage'
                },
                GOOGLE:{                    
                    group: 'EditPersonalInfo',
                    event: 'CompleteMileage',
                    extra: 'Edit'
                }
            },
            SAVE_WEEK_MILEAGE: {
                YANDEX:{
                    event: 'CompleteMileageWeek'
                },
                GOOGLE:{                    
                    group: 'EditPersonalInfo',
                    event: 'CompleteMileageWeek',
                    extra: 'Edit'
                }
            },
            SAVE_EXPERIENCE: {
                YANDEX:{
                    event: 'DrivingExperience'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'DrivingExperience',
                    extra: 'Edit'
                }
            },
            SAVE_CAR_PHOTO: {
                YANDEX:{
                    event: 'CompleteFotoAuto'
                },
                GOOGLE:{                    
                    group: 'EditPersonalInfo',
                    event: 'CompleteFotoAuto',
                    extra: 'Edit'
                }
            },
            SAVE_AVATAR: {
                YANDEX:{
                    event: 'CompleteFotoUser'
                },
                GOOGLE:{                    
                    group: 'EditPersonalInfo',
                    event: 'CompleteFotoUser',
                    extra: 'Edit'
                }
            }
        },
        TOP_WIDGET:{
            CLOSE_CLICK: {
                YANDEX:{
                    event: 'TopWidgetCloseClick'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'TopWidgetCloseClick',
                    extra: 'Edit'
                }
            },
            REVIEW_TOTAL_CLOSE: {
                YANDEX:{
                    event: 'ReviewTopWidgetTotalClose'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'ReviewTopWidgetTotalClose',
                    extra: 'Edit'
                }
            },
            TOTAL_CLOSE: {
                YANDEX:{
                    event: 'TopWidgetTotalClose'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'TopWidgetTotalClose',
                    extra: 'Edit'
                }
            },
            SHOW_NAME: {
                YANDEX:{
                    event: 'TopWidgetShowName'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'TopWidgetShowName',
                    extra: 'Edit'
                }
            },
            SHOW_EXPERIENCE: {
                YANDEX:{
                    event: 'TopWidgetShowExperience'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'TopWidgetShowExperience',
                    extra: 'Edit'
                }
            },
            SHOW_CAR_YEAR: {
                YANDEX:{
                    event: 'TopWidgetShowCarYear'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'TopWidgetShowCarYear',
                    extra: 'Edit'
                }
            },
            SHOW_MILEAGE: {
                YANDEX:{
                    event: 'TopWidgetShowMileage'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'TopWidgetShowMileage',
                    extra: 'Edit'
                }
            },
            SHOW_VIN: {
                YANDEX:{
                    event: 'TopWidgetShowVIN'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'TopWidgetShowVIN',
                    extra: 'Edit'
                }
            },
            SAVE_COLOR: {
                YANDEX:{
                    event: 'TopWidgetSaveColor'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'TopWidgetSaveColor',
                    extra: 'Edit'
                }
            },
            SAVE_NEGATIVE: {
                YANDEX:{
                    event: 'TopWidgetSaveNegative'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'TopWidgetSaveNegative',
                    extra: 'Edit'
                }
            },
            SAVE_POSITIVE: {
                YANDEX:{
                    event: 'TopWidgetSavePositive'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'TopWidgetSavePositive',
                    extra: 'Edit'
                }
            },
            SAVE_SERVICE: {
                YANDEX:{
                    event: 'TopWidgetSaveService'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'TopWidgetSaveService',
                    extra: 'Edit'
                }
            },
            SAVE_NAME: {
                YANDEX:{
                    event: 'TopWidgetSaveName'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'TopWidgetSaveName',
                    extra: 'Edit'
                }
            },
            SAVE_EXPERIENCE: {
                YANDEX:{
                    event: 'TopWidgetSaveExperience'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'TopWidgetSaveExperience',
                    extra: 'Edit'
                }
            },
            SAVE_CAR_YEAR: {
                YANDEX:{
                    event: 'TopWidgetSaveCarYear'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'TopWidgetSaveCarYear',
                    extra: 'Edit'
                }
            },
            SAVE_MILEAGE: {
                YANDEX:{
                    event: 'TopWidgetSaveMileage'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'TopWidgetSaveMileage',
                    extra: 'Edit'
                }
            },
            SAVE_WEEK_MILEAGE: {
                YANDEX:{
                    event: 'TopWidgetSaveMileageWeek'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'TopWidgetSaveMileageWeek',
                    extra: 'Edit'
                }
            },
            SAVE_VIN: {
                YANDEX:{
                    event: 'TopWidgetSaveVIN'
                },
                GOOGLE:{
                    group: 'EditPersonalInfo',
                    event: 'TopWidgetSaveVIN',
                    extra: 'Edit'
                }
            }
        },
        /** Личная информация После клика на кнопку «Сохранить личную информацию»
         * и успешном сохранении вызывать событие через JS */
        SAVE_PERSONAL_INFO:{
            YANDEX:{
                event: 'EditPersonalInfo'
            },
            GOOGLE:{
                group: 'EditPersonalInfo',
                event: 'EditPersonal',
                extra: 'Edit'
            }
        },
        /** Информация о работе */
        SAVE_WORK:{
            YANDEX:{
                event: 'EditWork'
            },
            GOOGLE:{
                group: 'EditPersonalInfo',
                event: 'EditWork',
                extra: 'Edit'
            }
        },
        /** Контактные данные и сайты */
        SAVE_CONTACTS:{
            YANDEX:{
                event: 'EditContacts'
            },
            GOOGLE:{
                group: 'EditPersonalInfo',
                event: 'EditContacts',
                extra: 'Edit'
            }
        },
        /** Добавление связанных аккаунтов FB */
        ADD_FB:{
            YANDEX:{
                event: 'AddFBaccount'
            },
            GOOGLE:{
                group: 'EditPersonalInfo',
                event: 'AddFB',
                extra: 'AddFBaccount'
            }
        },
        /** После клика на кнопку соцсети и успешном добавлении аккаунта
         * вызывать событие через JS Вконтакте */
        ADD_VK:{
            YANDEX:{
                event: 'AddVKaccount'
            },
            GOOGLE:{
                group: 'EditPersonalInfo',
                event: 'AddVK',
                extra: 'AddVKaccount'
            }
        },
        /** добавлении аккаунта Twitter */
        ADD_TW:{
            YANDEX:{
                event: 'AddTwitterAccount'
            },
            GOOGLE:{
                group: 'EditPersonalInfo',
                event: 'AddTwitter',
                extra: 'AddTwitterAccount'
            }
        },
        /** добавлении аккаунта Мой Мир */
        ADD_MA:{
            YANDEX:{
                event: 'AddMyWorldAccount'
            },
            GOOGLE:{
                group: 'EditPersonalInfo',
                event: 'AddMyWorld',
                extra: 'AddMyWorldAccount'
            }
        },
        /** добавлении аккаунта Google */
        ADD_GP:{
            YANDEX:{
                event: 'AddGoogleAccount'
            },
            GOOGLE:{
                group: 'EditPersonalInfo',
                event: 'AddGoogle',
                extra: 'AddGoogleAccount'
            }
        },
        /** добавлении аккаунта OK */
        ADD_OK:{
            YANDEX:{
                event: 'AddOKAccount'
            },
            GOOGLE:{
                group: 'EditPersonalInfo',
                event: 'AddOK',
                extra: 'AddOKAccount'
            }
        }
    }
    , CAR_PROFILE:{
        /** Добавление авто, если его не было в профиле */
        NEW_CAR:{
            YANDEX:{
                event: 'AddNewAvto'
            },
            GOOGLE:{
                group: 'EditPersonalInfo',
                event: 'AddAvto',
                extra: 'AddNewAvto'
            }
        },
        /** Добавление авто, запланированная покупка */
        WANT_TO_BUY:{
            YANDEX:{
                event: 'AvtoWantToBuy'
            },
            GOOGLE:{
                group: 'EditPersonalInfo',
                event: 'AddAvto',
                extra: 'AvtoWantToBuy'
            }
        },
        /** Изменение информации об авто */
        EDIT_INFO:{
            YANDEX:{
                event: 'EditAvtoInfo'
            },
            GOOGLE:{
                group: 'EditPersonalInfo',
                event: 'AddAvto',
                extra: 'EditAvtoInfo'
            }
        },
        /** Изменение технических характеристик авто */
        EDIT_TECH_INFO:{
            YANDEX:{
                event: 'EditAvtoTechInfo'
            },
            GOOGLE:{
                group: 'EditPersonalInfo',
                event: 'AddAvto',
                extra: 'EditAvtoTechInfo'
            }
        },
        /** Изменение общей информации */
        EDIT_CAR_INFO:{
            YANDEX:{
                event: 'EditAvtoCarInfo'
            },
            GOOGLE:{
                group: 'EditPersonalInfo',
                event: 'AddAvto',
                extra: 'EditAvtoCarInfo'
            }
        },
        /** Изменение общей информации */
        EDIT_REMOVE_CAR:{
            YANDEX:{
                event: 'EditAvtoRemove'
            },
            GOOGLE:{
                group: 'EditPersonalInfo',
                event: 'AddAvto',
                extra: 'EditAvtoRemove'
            }
        }
    },
    KB:{
        MODELS:{
            CLICK:{
                YANDEX:{
                    event: 'ClickCardDigestLinkBottom'
                }
            },
            SHOW:{
                YANDEX:{
                    event: 'ShowCardDigestLinkBottom'
                }
            }
        }
    },
    WIDGET:{
        KB:{
            SIMILAR:{
                RIGHT_BLOCK_SHOW:{
                    YANDEX:{
                        event: 'ContextRightBlockShow'
                    }
                },
                BOTTOM_BLOCK_SHOW:{
                    YANDEX:{
                        event: 'ContextBottomBlockShow'
                    }
                },
                RIGHT_BLOCK_CLICK:{
                    YANDEX:{
                        event: 'ContextRightBlockClick'
                    },
                    GOOGLE:{
                        group: 'link',
                        event: 'click',
                        extra: 'Similar Articles Block Right'
                    }
                },
                BOTTOM_BLOCK_CLICK:{
                    YANDEX:{
                        event: 'ContextBottomBlockClick'
                    },
                    GOOGLE:{
                        group: 'link',
                        event: 'click',
                        extra: 'Similar Articles Block Bottom'
                    }
                }
            }
        },
        WHEELS:{
            CLICK:{
                YANDEX:{
                    event: 'WidgetShiny'
                },
                GOOGLE:{
                }
            },
            CAR_SELECT:{
                YANDEX:{
                    event: 'MmpShiny'
                },
                GOOGLE:{
                }
            }
        },
        MANUAL:{
            CLICK:{
                YANDEX:{
                    event: 'InstDownload'
                },
                GOOGLE:{
                }
            }
        },
        TO:{
            SAVE:{
                YANDEX:{
                    event: 'ProbegTO'
                },
                GOOGLE:{
                }
            },
            CLICK:{
                YANDEX:{
                    event: 'WidgetTO'
                },
                GOOGLE:{
                }
            }
        },
        CLUB:{
            SHOW:{
                YANDEX:{
                    event: 'RecClubForumView'
                },
                GOOGLE:{
                }
            }
        }
    },
    COVER:{
        /** Изменение обложки с настроек авто */
        CHANGE_FROM_SETTINGS:{
            YANDEX:{
                event: 'AddWallpaper'
            },
            GOOGLE:{
                group: 'Wallpaper',
                event: 'AddWallpaper',
                extra: 'Add'
            }
        },
        /** Изменение обложки из профиля авто */
        CHANGE_FROM_CAR_PROFILE:{
            YANDEX:{
                event: 'AddWallpaperFromAuto'
            },
            GOOGLE:{
                group: 'Wallpaper',
                event: 'AddWallpaper',
                extra: 'AddFromAuto'
            }
        }
    },
    LIKE:{
        /** В label прописывать название статьи, которой был поставлен Лайк, либо окончание URL */
        CHANGE_FROM_SETTINGS:{
            YANDEX:{
                event: 'LikeArticle'
            },
            GOOGLE:{
                group: 'Like',
                event: 'LikeArticle',
                extra: '#label#'
            }
        }
    },
    CONVERSION:{
        /** Переход с виджета рекомендованных статей */
        RECOMENDED_ARTICLE:{
            YANDEX:{
                event: 'GoRecomendedArticle'
            },
            GOOGLE:{
                group: 'Сonversion',
                event: 'RecomendedArticle',
                extra: 'GoRecomendedArticle'
            }
        },
        RECOMENDED_CONVERSATIONS:{
            YANDEX:{
                event: 'GoRecomendedConversation'
            },
            GOOGLE:{
                group: 'Сonversion',
                event: 'RecomendedConversation',
                extra: 'GoRecomendedConversation'
            }
        }
    },
	RACE:{
		INVITE_SOCIAL:{
			YANDEX:{
				event: 'KbSocInvite'
			},
			GOOGLE:{
				
				group: 'race',
				event: 'KbSocInvite',
				extra: 'KbSocInvite'
			}
		},
		INVITE_EMAIL:{
			YANDEX:{
				event: 'KbMailInvite'
			},
			GOOGLE:{
				
				group: 'race',
				event: 'KbMailInvite',
				extra: 'KbMailInvite'
			}
		},
		INVITE_FRIEND:{
			YANDEX:{
				event: 'KbBlInvite'
			},
			GOOGLE:{
				
				group: 'race',
				event: 'KbBlInvite',
				extra: 'KbBlInvite'
			}
		},
		START:{
			YANDEX:{
				event: 'KbStart'
			},
			GOOGLE:{
				
				group: 'race',
				event: 'KbStart',
				extra: 'KbStart'
			}
		},
		SHARE:{
			YANDEX:{
				event: 'KbShare'
			},
			GOOGLE:{
				
				group: 'race',
				event: 'KbShare',
				extra: 'KbShare'
			}
		}
	},
    LOGIN:{
        SITE_PAGE:{
            YANDEX:{
                event: 'ViewInside'
            },
            GOOGLE:{
                group: 'login',
                event: 'ViewInside',
                extra: 'Create'
            }
        },
        WIKI_PAGE:{
            YANDEX:{
                event: 'WikiInsideView'
            },
            GOOGLE:{
                group: 'login',
                event: 'WikiInsideView',
                extra: 'Create'
            }
        },
        ERROR_PAGE:{
            YANDEX:{
                event: 'ShowMeNothing'
            },
            GOOGLE:{
                group: 'login',
                event: 'ShowMeNothing',
                extra: 'Create'
            }
        }
    },
    BAR: {
        BREADCRUMBS_VIEW: {
            YANDEX:{
                event: 'BreadcrumsView'
            },
            GOOGLE:{
                group: 'bar',
                event: 'BreadcrumsView',
                extra: 'BreadcrumsView'
            }
        },
        BREADCRUMBS_CLICK: {
            YANDEX:{
                event: 'BreadcrumsClick'
            },
            GOOGLE:{
                group: 'bar',
                event: 'BreadcrumsClick',
                extra: 'BreadcrumsClick'
            }
        }
    },
    LAST_HOPE: {
        SHOW:{
            YANDEX:{
                event: 'didyoufoundtheanswershow'
            }
        },
        YES:{
            YANDEX:{
                event: 'didyoufoundtheanswerclickyes'
            },
            OPTIMIZELY: {
                type: 'trackEvent',
                event: 'PopupClickYESorNO'
            }
        },
        NO:{
            YANDEX:{
                event: 'didyoufoundtheanswerclickno'
            },
            OPTIMIZELY: {
                type: 'trackEvent',
                event: 'PopupClickYESorNO'
            }
        },
        REGISTER:{
            YANDEX:{
                event: 'didyoufoundtheanswerclickreg'
            },
            OPTIMIZELY: {
                type: 'trackEvent',
                event: 'PopupGoSignUp'
            }
        }
    }
});