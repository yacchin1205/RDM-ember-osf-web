import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import $ from 'jquery';
import dsconfig from './dsconfig';

var wayf_overwrite_submit_button_text = dsconfig['wayf_overwrite_submit_button_text'];
var wayf_overwrite_checkbox_label_text = dsconfig['wayf_overwrite_checkbox_label_text'];

var wayf_sp_entityID = dsconfig['wayf_sp_entityID'];
var wayf_URL = dsconfig['wayf_URL'];
var wayf_return_url = dsconfig['wayf_return_url'];
var wayf_sp_handlerURL = dsconfig['wayf_sp_handlerURL'];

var wayf_use_discovery_service = dsconfig['wayf_use_discovery_service'];
var wayf_use_small_logo = dsconfig['wayf_use_small_logo'];
var wayf_width = dsconfig['wayf_width'];
var wayf_height = dsconfig['wayf_height'];
var wayf_background_color = dsconfig['wayf_background_color'];
var wayf_border_color = dsconfig['wayf_border_color'];
var wayf_font_color = dsconfig['wayf_font_color'];
var wayf_font_size = dsconfig['wayf_font_size'];
var wayf_hide_logo = dsconfig['wayf_hide_logo'];
var wayf_auto_login = dsconfig['wayf_auto_login'];
var wayf_logged_in_messsage = dsconfig['wayf_logged_in_messsage'];
var wayf_hide_after_login = dsconfig['wayf_hide_after_login'];
var wayf_most_used_idps = dsconfig['wayf_most_used_idps'];
var wayf_show_categories = dsconfig['wayf_show_categories'];
var wayf_hide_categories = dsconfig['wayf_hide_categories'];
var wayf_hide_idps = dsconfig['wayf_hide_idps'];
var wayf_unhide_idps = dsconfig['wayf_unhide_idps'];
var wayf_show_remember_checkbox = dsconfig['wayf_show_remember_checkbox'];
var wayf_force_remember_for_session = dsconfig['wayf_force_remember_for_session'];
var wayf_additional_idps = dsconfig['wayf_additional_idps'];
var wayf_discofeed_url = dsconfig['wayf_discofeed_url'];
var wayf_sp_cookie_path = dsconfig['wayf_sp_cookie_path'];
var wayf_list_height = dsconfig['wayf_list_height'];
var wayf_sp_samlDSURL = dsconfig['wayf_sp_samlDSURL'];
var wayf_sp_samlACURL = dsconfig['wayf_sp_samlACURL'];

var wayf_html = "";

var wayf_idps = { 
  "https://shib-idp01.iic.hokudai.ac.jp/idp/shibboleth":{
    type:"hokkaido",
    name:"北海道大学",
    search:["https://shib-idp01.iic.hokudai.ac.jp/idp/shibboleth", "北海道", "北海道大学", "Hokkaido University", "北海道大学"],
    SAML1SSOurl:"https://shib-idp01.iic.hokudai.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.asahikawa-med.ac.jp/idp/shibboleth":{
    type:"hokkaido",
    name:"旭川医科大学",
    search:["https://idp.asahikawa-med.ac.jp/idp/shibboleth", "北海道", "旭川医科大学", "Asahikawa Medical University", "旭川医科大学"],
    SAML1SSOurl:"https://idp.asahikawa-med.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.msls.kushiro-ct.ac.jp/idp/shibboleth":{
    type:"hokkaido",
    name:"釧路工業高等専門学校",
    search:["https://idp.msls.kushiro-ct.ac.jp/idp/shibboleth", "北海道", "釧路工業高等専門学校", "National Institute of Technology,Kushiro College", "釧路工業高等専門学校"],
    SAML1SSOurl:"https://idp.msls.kushiro-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://shibboleth.lib.kitami-it.ac.jp/idp/shibboleth":{
    type:"hokkaido",
    name:"北見工業大学",
    search:["https://shibboleth.lib.kitami-it.ac.jp/idp/shibboleth", "北海道", "北見工業大学", "Kitami Institute of Technology", "北見工業大学"],
    SAML1SSOurl:"https://shibboleth.lib.kitami-it.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://sso.sapmed.ac.jp/idp/shibboleth":{
    type:"hokkaido",
    name:"札幌医科大学",
    search:["https://sso.sapmed.ac.jp/idp/shibboleth", "北海道", "札幌医科大学", "Sapporo Medical University", "札幌医科大学"],
    SAML1SSOurl:"https://sso.sapmed.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.tomakomai-ct.ac.jp/idp/shibboleth":{
    type:"hokkaido",
    name:"苫小牧工業高等専門学校",
    search:["https://kidp.tomakomai-ct.ac.jp/idp/shibboleth", "北海道", "苫小牧工業高等専門学校", "National Institute of Technology,Tomakomai College", "苫小牧工業高等専門学校"],
    SAML1SSOurl:"https://kidp.tomakomai-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.hakodate-ct.ac.jp/idp/shibboleth":{
    type:"hokkaido",
    name:"函館工業高等専門学校",
    search:["https://kidp.hakodate-ct.ac.jp/idp/shibboleth", "北海道", "函館工業高等専門学校", "National Institute of Technology,Hakodate College", "函館工業高等専門学校"],
    SAML1SSOurl:"https://kidp.hakodate-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.asahikawa-nct.ac.jp/idp/shibboleth":{
    type:"hokkaido",
    name:"旭川工業高等専門学校",
    search:["https://kidp.asahikawa-nct.ac.jp/idp/shibboleth", "北海道", "旭川工業高等専門学校", "National Institute of Technology,Asahikawa College", "旭川工業高等専門学校"],
    SAML1SSOurl:"https://kidp.asahikawa-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.sgu.ac.jp/idp/shibboleth":{
    type:"hokkaido",
    name:"札幌学院大学",
    search:["https://idp.sgu.ac.jp/idp/shibboleth", "北海道", "札幌学院大学", "Sapporo Gakuin University", "札幌学院大学"],
    SAML1SSOurl:"https://idp.sgu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://gakunin-idp01.mmm.muroran-it.ac.jp/idp/shibboleth":{
    type:"hokkaido",
    name:"室蘭工業大学",
    search:["https://gakunin-idp01.mmm.muroran-it.ac.jp/idp/shibboleth", "北海道", "室蘭工業大学", "Muroran Institute of Technology", "室蘭工業大学"],
    SAML1SSOurl:"https://gakunin-idp01.mmm.muroran-it.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.fun.ac.jp/idp/shibboleth":{
    type:"hokkaido",
    name:"公立はこだて未来大学",
    search:["https://idp.fun.ac.jp/idp/shibboleth", "北海道", "公立はこだて未来大学", "Future University Hakodate", "公立はこだて未来大学"],
    SAML1SSOurl:"https://idp.fun.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.hokkyodai.ac.jp/idp/shibboleth":{
    type:"hokkaido",
    name:"北海道教育大学",
    search:["https://idp.hokkyodai.ac.jp/idp/shibboleth", "北海道", "北海道教育大学", "Hokkaido University of Education", "北海道教育大学"],
    SAML1SSOurl:"https://idp.hokkyodai.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://sib-idp.obihiro.ac.jp/idp/shibboleth":{
    type:"hokkaido",
    name:"帯広畜産大学",
    search:["https://sib-idp.obihiro.ac.jp/idp/shibboleth", "北海道", "帯広畜産大学", "Obihiro University of Agriculture and Veterinary Medicine", "帯広畜産大学"],
    SAML1SSOurl:"https://sib-idp.obihiro.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://upki.yamagata-u.ac.jp/idp/shibboleth":{
    type:"tohoku",
    name:"山形大学",
    search:["https://upki.yamagata-u.ac.jp/idp/shibboleth", "東北", "山形大学", "Yamagata University", "山形大学"],
    SAML1SSOurl:"https://upki.yamagata-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.miyakyo-u.ac.jp/idp/shibboleth":{
    type:"tohoku",
    name:"宮城教育大学",
    search:["https://idp.miyakyo-u.ac.jp/idp/shibboleth", "東北", "宮城教育大学", "Miyagi University of Education", "宮城教育大学"],
    SAML1SSOurl:"https://no.saml1.sso.url.defined.com/error"
    },
  "https://kidp.ichinoseki.ac.jp/idp/shibboleth":{
    type:"tohoku",
    name:"一関工業高等専門学校",
    search:["https://kidp.ichinoseki.ac.jp/idp/shibboleth", "東北", "一関工業高等専門学校", "National Institute of Technology,Ichinoseki College", "一関工業高等専門学校"],
    SAML1SSOurl:"https://kidp.ichinoseki.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.hachinohe-ct.ac.jp/idp/shibboleth":{
    type:"tohoku",
    name:"八戸工業高等専門学校",
    search:["https://kidp.hachinohe-ct.ac.jp/idp/shibboleth", "東北", "八戸工業高等専門学校", "National Institute of Technology,Hachinohe College", "八戸工業高等専門学校"],
    SAML1SSOurl:"https://kidp.hachinohe-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://ksidp.sendai-nct.ac.jp/idp/shibboleth":{
    type:"tohoku",
    name:"仙台高等専門学校　広瀬キャンパス",
    search:["https://ksidp.sendai-nct.ac.jp/idp/shibboleth", "東北", "仙台高等専門学校　広瀬キャンパス", "National Institute of Technology,Sendai College,Hirose", "仙台高等専門学校　広瀬キャンパス"],
    SAML1SSOurl:"https://ksidp.sendai-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.akita-nct.ac.jp/idp/shibboleth":{
    type:"tohoku",
    name:"秋田工業高等専門学校",
    search:["https://kidp.akita-nct.ac.jp/idp/shibboleth", "東北", "秋田工業高等専門学校", "National Institute of Technology,Akita College", "秋田工業高等専門学校"],
    SAML1SSOurl:"https://kidp.akita-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.auth.tohoku.ac.jp/idp/shibboleth":{
    type:"tohoku",
    name:"東北大学",
    search:["https://idp.auth.tohoku.ac.jp/idp/shibboleth", "東北", "東北大学", "Tohoku University", "東北大学"],
    SAML1SSOurl:"https://idp.auth.tohoku.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.tsuruoka-nct.ac.jp/idp/shibboleth":{
    type:"tohoku",
    name:"鶴岡工業高等専門学校",
    search:["https://kidp.tsuruoka-nct.ac.jp/idp/shibboleth", "東北", "鶴岡工業高等専門学校", "National Institute of Technology,Tsuruoka College", "鶴岡工業高等専門学校"],
    SAML1SSOurl:"https://kidp.tsuruoka-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.fukushima-nct.ac.jp/idp/shibboleth":{
    type:"tohoku",
    name:"福島工業高等専門学校",
    search:["https://kidp.fukushima-nct.ac.jp/idp/shibboleth", "東北", "福島工業高等専門学校", "National Institute of Technology,Fukushima College", "福島工業高等専門学校"],
    SAML1SSOurl:"https://kidp.fukushima-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://knidp.sendai-nct.ac.jp/idp/shibboleth":{
    type:"tohoku",
    name:"仙台高等専門学校 名取キャンパス",
    search:["https://knidp.sendai-nct.ac.jp/idp/shibboleth", "東北", "仙台高等専門学校 名取キャンパス", "National Institute of Technology,Sendai College,Natori", "仙台高等専門学校 名取キャンパス"],
    SAML1SSOurl:"https://knidp.sendai-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.tohtech.ac.jp/idp/shibboleth":{
    type:"tohoku",
    name:"東北工業大学",
    search:["https://idp.tohtech.ac.jp/idp/shibboleth", "東北", "東北工業大学", "Tohoku Institute of Technology", "東北工業大学"],
    SAML1SSOurl:"https://idp.tohtech.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://auas.akita-u.ac.jp/idp/shibboleth":{
    type:"tohoku",
    name:"秋田大学",
    search:["https://auas.akita-u.ac.jp/idp/shibboleth", "東北", "秋田大学", "Akita University", "秋田大学"],
    SAML1SSOurl:"https://auas.akita-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp01.gn.hirosaki-u.ac.jp/idp/shibboleth":{
    type:"tohoku",
    name:"弘前大学",
    search:["https://idp01.gn.hirosaki-u.ac.jp/idp/shibboleth", "東北", "弘前大学", "Hirosaki University", "弘前大学"],
    SAML1SSOurl:"https://idp01.gn.hirosaki-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.u-aizu.ac.jp/idp/shibboleth":{
    type:"tohoku",
    name:"会津大学",
    search:["https://idp.u-aizu.ac.jp/idp/shibboleth", "東北", "会津大学", "The University of Aizu", "会津大学"],
    SAML1SSOurl:"https://idp.u-aizu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://axl.aiu.ac.jp/idp/shibboleth":{
    type:"tohoku",
    name:"国際教養大学",
    search:["https://axl.aiu.ac.jp/idp/shibboleth", "東北", "国際教養大学", "Akita International University", "国際教養大学"],
    SAML1SSOurl:"https://axl.aiu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.fmu.ac.jp/idp/shibboleth":{
    type:"tohoku",
    name:"福島県立医科大学",
    search:["https://idp.fmu.ac.jp/idp/shibboleth", "東北", "福島県立医科大学", "Fukushima Medical University", "福島県立医科大学"],
    SAML1SSOurl:"https://idp.fmu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://tg.ex-tic.com/auth/gakunin/saml2/assertions":{
    type:"tohoku",
    name:"東北学院大学",
    search:["https://tg.ex-tic.com/auth/gakunin/saml2/assertions", "東北", "東北学院大学", "Tohoku Gakuin University", "東北学院大学"],
    SAML1SSOurl:"https://no.saml1.sso.url.defined.com/error"
    },
  "https://idp.nii.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"国立情報学研究所",
    search:["https://idp.nii.ac.jp/idp/shibboleth", "関東", "国立情報学研究所", "National Institute of Informatics", "国立情報学研究所"],
    SAML1SSOurl:"https://idp.nii.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://upki-idp.chiba-u.jp/idp/shibboleth":{
    type:"kanto",
    name:"千葉大学",
    search:["https://upki-idp.chiba-u.jp/idp/shibboleth", "関東", "千葉大学", "Chiba University", "千葉大学"],
    SAML1SSOurl:"https://upki-idp.chiba-u.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.account.tsukuba.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"筑波大学",
    search:["https://idp.account.tsukuba.ac.jp/idp/shibboleth", "関東", "筑波大学", "University of Tsukuba", "筑波大学"],
    SAML1SSOurl:"https://idp.account.tsukuba.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://asura.seijo.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"成城大学",
    search:["https://asura.seijo.ac.jp/idp/shibboleth", "関東", "成城大学", "Seijo University", "成城大学"],
    SAML1SSOurl:"https://asura.seijo.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://upki.toho-u.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"東邦大学",
    search:["https://upki.toho-u.ac.jp/idp/shibboleth", "関東", "東邦大学", "Toho University", "東邦大学"],
    SAML1SSOurl:"https://upki.toho-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://shibboleth.nihon-u.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"日本大学",
    search:["https://shibboleth.nihon-u.ac.jp/idp/shibboleth", "関東", "日本大学", "Nihon University", "日本大学"],
    SAML1SSOurl:"https://shibboleth.nihon-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://upki-idp.rikkyo.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"立教大学",
    search:["https://upki-idp.rikkyo.ac.jp/idp/shibboleth", "関東", "立教大学", "Rikkyo University", "立教大学"],
    SAML1SSOurl:"https://upki-idp.rikkyo.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://servs.lib.meiji.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"明治大学",
    search:["https://servs.lib.meiji.ac.jp/idp/shibboleth", "関東", "明治大学", "Meiji University", "明治大学"],
    SAML1SSOurl:"https://servs.lib.meiji.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://ws1.jichi.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"自治医科大学",
    search:["https://ws1.jichi.ac.jp/idp/shibboleth", "関東", "自治医科大学", "Jichi Medical University", "自治医科大学"],
    SAML1SSOurl:"https://ws1.jichi.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://gakunin-idp.ynu.ac.jp/":{
    type:"kanto",
    name:"横浜国立大学",
    search:["https://gakunin-idp.ynu.ac.jp/", "関東", "横浜国立大学", "Yokohama National University", "横浜国立大学"],
    SAML1SSOurl:"https://gakunin-idp.ynu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://saml-2.tmd.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"東京医科歯科大学",
    search:["https://saml-2.tmd.ac.jp/idp/shibboleth", "関東", "東京医科歯科大学", "Tokyo Medical and Dental University", "東京医科歯科大学"],
    SAML1SSOurl:"https://saml-2.tmd.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.kosen-k.go.jp/idp/shibboleth":{
    type:"kanto",
    name:"国立高等専門学校機構",
    search:["https://kidp.kosen-k.go.jp/idp/shibboleth", "関東", "国立高等専門学校機構", "National Institute of Technology", "国立高等専門学校機構"],
    SAML1SSOurl:"https://kidp.kosen-k.go.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.tdc.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"東京歯科大学",
    search:["https://idp.tdc.ac.jp/idp/shibboleth", "関東", "東京歯科大学", "Tokyo Dental College", "東京歯科大学"],
    SAML1SSOurl:"https://idp.tdc.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://shib.ap.showa-u.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"昭和大学",
    search:["https://shib.ap.showa-u.ac.jp/idp/shibboleth", "関東", "昭和大学", "Showa University", "昭和大学"],
    SAML1SSOurl:"https://shib.ap.showa-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://ill.lib.kth.isp.ntt-east.co.jp/idp/shibboleth":{
    type:"kanto",
    name:"NTT東日本関東病院",
    search:["https://ill.lib.kth.isp.ntt-east.co.jp/idp/shibboleth", "関東", "NTT東日本関東病院", "NTT Medical Center Tokyo", "NTT東日本関東病院"],
    SAML1SSOurl:"https://ill.lib.kth.isp.ntt-east.co.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp01.ipc.kaiyodai.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"東京海洋大学",
    search:["https://idp01.ipc.kaiyodai.ac.jp/idp/shibboleth", "関東", "東京海洋大学", "Tokyo University of Marine Science and Technology", "東京海洋大学"],
    SAML1SSOurl:"https://idp01.ipc.kaiyodai.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.soka.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"創価大学",
    search:["https://idp.soka.ac.jp/idp/shibboleth", "関東", "創価大学", "Soka University", "創価大学"],
    SAML1SSOurl:"https://idp.soka.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.igakuken.or.jp/idp/shibboleth":{
    type:"kanto",
    name:"東京都医学総合研究所",
    search:["https://idp.igakuken.or.jp/idp/shibboleth", "関東", "東京都医学総合研究所", "Tokyo Metropolitan Institute of Medical Science", "東京都医学総合研究所"],
    SAML1SSOurl:"https://idp.igakuken.or.jp/idp/profile/Shibboleth/SSO"
    },
  "https://gakuninidp.sic.shibaura-it.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"芝浦工業大学",
    search:["https://gakuninidp.sic.shibaura-it.ac.jp/idp/shibboleth", "関東", "芝浦工業大学", "Shibaura Institute of Technology", "芝浦工業大学"],
    SAML1SSOurl:"https://gakuninidp.sic.shibaura-it.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://tgu.u-gakugei.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"東京学芸大学",
    search:["https://tgu.u-gakugei.ac.jp/idp/shibboleth", "関東", "東京学芸大学", "Tokyo Gakugei University", "東京学芸大学"],
    SAML1SSOurl:"https://no.saml1.sso.url.defined.com/error"
    },
  "https://idp.musashi.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"武蔵学園",
    search:["https://idp.musashi.ac.jp/idp/shibboleth", "関東", "武蔵学園", "Musashi Academy", "武蔵学園"],
    SAML1SSOurl:"https://idp.musashi.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.it-chiba.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"千葉工業大学",
    search:["https://idp.it-chiba.ac.jp/idp/shibboleth", "関東", "千葉工業大学", "Chiba Institute of Technology", "千葉工業大学"],
    SAML1SSOurl:"https://idp.it-chiba.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://shibboleth.tama.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"多摩大学",
    search:["https://shibboleth.tama.ac.jp/idp/shibboleth", "関東", "多摩大学", "Tama University", "多摩大学"],
    SAML1SSOurl:"https://shibboleth.tama.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://upkishib.cc.ocha.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"お茶の水女子大学",
    search:["https://upkishib.cc.ocha.ac.jp/idp/shibboleth", "関東", "お茶の水女子大学", "Ochanomizu University", "お茶の水女子大学"],
    SAML1SSOurl:"https://upkishib.cc.ocha.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.tokyo-ct.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"東京工業高等専門学校",
    search:["https://kidp.tokyo-ct.ac.jp/idp/shibboleth", "関東", "東京工業高等専門学校", "National Institute of Technology,Tokyo College", "東京工業高等専門学校"],
    SAML1SSOurl:"https://kidp.tokyo-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.gunma-u.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"群馬大学",
    search:["https://idp.gunma-u.ac.jp/idp/shibboleth", "関東", "群馬大学", "Gunma University", "群馬大学"],
    SAML1SSOurl:"https://idp.gunma-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.oyama-ct.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"小山工業高等専門学校",
    search:["https://kidp.oyama-ct.ac.jp/idp/shibboleth", "関東", "小山工業高等専門学校", "National Institute of Technology,Oyama College", "小山工業高等専門学校"],
    SAML1SSOurl:"https://kidp.oyama-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://gakunin1.keio.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"慶應義塾大学",
    search:["https://gakunin1.keio.ac.jp/idp/shibboleth", "関東", "慶應義塾大学", "Keio University", "慶應義塾大学"],
    SAML1SSOurl:"https://gakunin1.keio.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.gunma-ct.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"群馬工業高等専門学校",
    search:["https://kidp.gunma-ct.ac.jp/idp/shibboleth", "関東", "群馬工業高等専門学校", "National Institute of Technology,Gunma College", "群馬工業高等専門学校"],
    SAML1SSOurl:"https://kidp.gunma-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://shibboleth-idp.dokkyomed.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"獨協医科大学",
    search:["https://shibboleth-idp.dokkyomed.ac.jp/idp/shibboleth", "関東", "獨協医科大学", "Dokkyo Medical University", "獨協医科大学"],
    SAML1SSOurl:"https://shibboleth-idp.dokkyomed.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://iccoam.tufs.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"東京外国語大学",
    search:["https://iccoam.tufs.ac.jp/idp/shibboleth", "関東", "東京外国語大学", "Tokyo University of Foreign Studies", "東京外国語大学"],
    SAML1SSOurl:"https://iccoam.tufs.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.ibaraki-ct.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"茨城工業高等専門学校",
    search:["https://kidp.ibaraki-ct.ac.jp/idp/shibboleth", "関東", "茨城工業高等専門学校", "National Institute of Technology,Ibaraki College", "茨城工業高等専門学校"],
    SAML1SSOurl:"https://kidp.ibaraki-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://shibboleth.cc.uec.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"電気通信大学",
    search:["https://shibboleth.cc.uec.ac.jp/idp/shibboleth", "関東", "電気通信大学", "The University of Electro-Communications", "電気通信大学"],
    SAML1SSOurl:"https://shibboleth.cc.uec.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.sys.affrc.go.jp/idp/shibboleth":{
    type:"kanto",
    name:"AFFRIT/MAFFIN",
    search:["https://idp.sys.affrc.go.jp/idp/shibboleth", "関東", "AFFRIT/MAFFIN", "AFFRIT/MAFFIN", "AFFRIT/MAFFIN"],
    SAML1SSOurl:"https://idp.sys.affrc.go.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.kisarazu.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"木更津工業高等専門学校",
    search:["https://kidp.kisarazu.ac.jp/idp/shibboleth", "関東", "木更津工業高等専門学校", "National Institute of Technology,Kisarazu College", "木更津工業高等専門学校"],
    SAML1SSOurl:"https://kidp.kisarazu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://gakunin-idp.c.chuo-u.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"中央大学",
    search:["https://gakunin-idp.c.chuo-u.ac.jp/idp/shibboleth", "関東", "中央大学", "Chuo University", "中央大学"],
    SAML1SSOurl:"https://no.saml1.sso.url.defined.com/error"
    },
  "https://gidp.adm.u-tokyo.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"東京大学",
    search:["https://gidp.adm.u-tokyo.ac.jp/idp/shibboleth", "関東", "東京大学", "The University of Tokyo", "東京大学"],
    SAML1SSOurl:"https://gidp.adm.u-tokyo.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.dendai.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"東京電機大学",
    search:["https://idp.dendai.ac.jp/idp/shibboleth", "関東", "東京電機大学", "Tokyo Denki University", "東京電機大学"],
    SAML1SSOurl:"https://idp.dendai.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.cc.seikei.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"成蹊大学",
    search:["https://idp.cc.seikei.ac.jp/idp/shibboleth", "関東", "成蹊大学", "Seikei University", "成蹊大学"],
    SAML1SSOurl:"https://idp.cc.seikei.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.teikyo-u.ac.jp/AccessManager/shibboleth":{
    type:"kanto",
    name:"帝京大学",
    search:["https://idp.teikyo-u.ac.jp/AccessManager/shibboleth", "関東", "帝京大学", "Teikyo University", "帝京大学"],
    SAML1SSOurl:"https://idp.teikyo-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.tau.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"東京有明医療大学",
    search:["https://idp.tau.ac.jp/idp/shibboleth", "関東", "東京有明医療大学", "Tokyo Ariake University of Medical and Health Sciences", "東京有明医療大学"],
    SAML1SSOurl:"https://idp.tau.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.tokyo-kasei.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"東京家政大学",
    search:["https://idp.tokyo-kasei.ac.jp/idp/shibboleth", "関東", "東京家政大学", "Tokyo Kasei University", "東京家政大学"],
    SAML1SSOurl:"https://idp.tokyo-kasei.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.grips.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"政策研究大学院大学",
    search:["https://idp.grips.ac.jp/idp/shibboleth", "関東", "政策研究大学院大学", "National Graduate Institute for Policy Studies", "政策研究大学院大学"],
    SAML1SSOurl:"https://idp.grips.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://gakuninshib.tmu.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"首都大学東京",
    search:["https://gakuninshib.tmu.ac.jp/idp/shibboleth", "関東", "首都大学東京", "Tokyo Metropolitan University", "首都大学東京"],
    SAML1SSOurl:"https://gakuninshib.tmu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp-gakunin.nap.gsic.titech.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"東京工業大学",
    search:["https://idp-gakunin.nap.gsic.titech.ac.jp/idp/shibboleth", "関東", "東京工業大学", "Tokyo Institute of Technology", "東京工業大学"],
    SAML1SSOurl:"https://idp-gakunin.nap.gsic.titech.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.tsurumi-u.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"鶴見大学",
    search:["https://idp.tsurumi-u.ac.jp/idp/shibboleth", "関東", "鶴見大学", "Tsurumi University", "鶴見大学"],
    SAML1SSOurl:"https://idp.tsurumi-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://sidp.ibaraki.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"茨城大学",
    search:["https://sidp.ibaraki.ac.jp/idp/shibboleth", "関東", "茨城大学", "Ibaraki University", "茨城大学"],
    SAML1SSOurl:"https://sidp.ibaraki.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.nims.go.jp/idp/shibboleth":{
    type:"kanto",
    name:"物質・材料研究機構",
    search:["https://idp.nims.go.jp/idp/shibboleth", "関東", "物質・材料研究機構", "National Institute for Materials Science", "物質・材料研究機構"],
    SAML1SSOurl:"https://idp.nims.go.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.toyaku.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"東京薬科大学",
    search:["https://idp.toyaku.ac.jp/idp/shibboleth", "関東", "東京薬科大学", "Tokyo University of Pharmacy and Life Sciences", "東京薬科大学"],
    SAML1SSOurl:"https://idp.toyaku.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://gakunin2.tuat.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"東京農工大学",
    search:["https://gakunin2.tuat.ac.jp/idp/shibboleth", "関東", "東京農工大学", "Tokyo University of Agriculture and Technology", "東京農工大学"],
    SAML1SSOurl:"https://gakunin2.tuat.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://gakunin-idp.shodai.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"横浜商科大学",
    search:["https://gakunin-idp.shodai.ac.jp/idp/shibboleth", "関東", "横浜商科大学", "Yokohama College of Commerce", "横浜商科大学"],
    SAML1SSOurl:"https://gakunin-idp.shodai.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://koma-sso.komazawa-u.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"駒澤大学",
    search:["https://koma-sso.komazawa-u.ac.jp/idp/shibboleth", "関東", "駒澤大学", "Komazawa University", "駒澤大学"],
    SAML1SSOurl:"https://koma-sso.komazawa-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp3.qst.go.jp/idp/shibboleth":{
    type:"kanto",
    name:"量子科学技術研究開発機構",
    search:["https://idp3.qst.go.jp/idp/shibboleth", "関東", "量子科学技術研究開発機構", "National Institutes for Quantum and Radiological Science and Technology", "量子科学技術研究開発機構"],
    SAML1SSOurl:"https://idp3.qst.go.jp/idp/profile/Shibboleth/SSO"
    },
  "https://rprx.rku.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"流通経済大学",
    search:["https://rprx.rku.ac.jp/idp/shibboleth", "関東", "流通経済大学", "Ryutsu Keizai University", "流通経済大学"],
    SAML1SSOurl:"https://rprx.rku.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.kanagawa-u.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"神奈川大学",
    search:["https://idp.kanagawa-u.ac.jp/idp/shibboleth", "関東", "神奈川大学", "Kanagawa University", "神奈川大学"],
    SAML1SSOurl:"https://no.saml1.sso.url.defined.com/error"
    },
  "https://idp.ide.go.jp/idp/shibboleth":{
    type:"kanto",
    name:"アジア経済研究所",
    search:["https://idp.ide.go.jp/idp/shibboleth", "関東", "アジア経済研究所", "IDE-JETRO", "アジア経済研究所"],
    SAML1SSOurl:"https://idp.ide.go.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.senshu-u.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"専修大学",
    search:["https://idp.senshu-u.ac.jp/idp/shibboleth", "関東", "専修大学", "Senshu University", "専修大学"],
    SAML1SSOurl:"https://idp.senshu-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.geidai.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"東京藝術大学",
    search:["https://idp.geidai.ac.jp/idp/shibboleth", "関東", "東京藝術大学", "Tokyo University of the Arts", "東京藝術大学"],
    SAML1SSOurl:"https://idp.geidai.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.aoyama.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"青山学院大学",
    search:["https://idp.aoyama.ac.jp/idp/shibboleth", "関東", "青山学院大学", "Aoyama Gakuin University", "青山学院大学"],
    SAML1SSOurl:"https://idp.aoyama.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://sso.internet.ac.jp":{
    type:"kanto",
    name:"東京通信大学",
    search:["https://sso.internet.ac.jp", "関東", "東京通信大学", "Tokyo Online University", "東京通信大学"],
    SAML1SSOurl:"https://no.saml1.sso.url.defined.com/error"
    },
  "https://idp.itc.saitama-u.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"埼玉大学",
    search:["https://idp.itc.saitama-u.ac.jp/idp/shibboleth", "関東", "埼玉大学", "Saitama University", "埼玉大学"],
    SAML1SSOurl:"https://idp.itc.saitama-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://lib.nmct.ntt-east.co.jp/idp/shibboleth":{
    type:"kanto",
    name:"NTT東日本関東病院図書館",
    search:["https://lib.nmct.ntt-east.co.jp/idp/shibboleth", "関東", "NTT東日本関東病院図書館", "NTT Medical Center Tokyo Library", "NTT東日本関東病院図書館"],
    SAML1SSOurl:"https://lib.nmct.ntt-east.co.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.my-pharm.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"明治薬科大学",
    search:["https://idp.my-pharm.ac.jp/idp/shibboleth", "関東", "明治薬科大学", "Meiji Pharmaceutical University", "明治薬科大学"],
    SAML1SSOurl:"https://idp.my-pharm.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://gakunin.st.daito.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"大東文化大学",
    search:["https://gakunin.st.daito.ac.jp/idp/shibboleth", "関東", "大東文化大学", "Daito Bunka University", "大東文化大学"],
    SAML1SSOurl:"https://gakunin.st.daito.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.kiryu-u.ac.jp/idp/shibboleth":{
    type:"kanto",
    name:"桐生大学",
    search:["https://idp.kiryu-u.ac.jp/idp/shibboleth", "関東", "桐生大学", "Kiryu University", "桐生大学"],
    SAML1SSOurl:"https://idp.kiryu-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://fed.mie-u.ac.jp/idp":{
    type:"chubu",
    name:"三重大学",
    search:["https://fed.mie-u.ac.jp/idp", "中部", "三重大学", "Mie University", "三重大学"],
    SAML1SSOurl:"https://fed.mie-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://gakunin.ealps.shinshu-u.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"信州大学",
    search:["https://gakunin.ealps.shinshu-u.ac.jp/idp/shibboleth", "中部", "信州大学", "Shinshu University", "信州大学"],
    SAML1SSOurl:"https://gakunin.ealps.shinshu-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://gknidp.ict.nitech.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"名古屋工業大学",
    search:["https://gknidp.ict.nitech.ac.jp/idp/shibboleth", "中部", "名古屋工業大学", "Nagoya Institute of Technology", "名古屋工業大学"],
    SAML1SSOurl:"https://gknidp.ict.nitech.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.yamanashi.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"山梨大学",
    search:["https://idp.yamanashi.ac.jp/idp/shibboleth", "中部", "山梨大学", "University of Yamanashi", "山梨大学"],
    SAML1SSOurl:"https://idp.yamanashi.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.suzuka-ct.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"鈴鹿工業高等専門学校",
    search:["https://idp.suzuka-ct.ac.jp/idp/shibboleth", "中部", "鈴鹿工業高等専門学校", "National Institute of Technology,Suzuka College", "鈴鹿工業高等専門学校"],
    SAML1SSOurl:"https://idp.suzuka-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.imc.tut.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"豊橋技術科学大学",
    search:["https://idp.imc.tut.ac.jp/idp/shibboleth", "中部", "豊橋技術科学大学", "Toyohashi University of Technology", "豊橋技術科学大学"],
    SAML1SSOurl:"https://idp.imc.tut.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.fukui-nct.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"福井工業高等専門学校",
    search:["https://kidp.fukui-nct.ac.jp/idp/shibboleth", "中部", "福井工業高等専門学校", "National Institute of Technology,Fukui College", "福井工業高等専門学校"],
    SAML1SSOurl:"https://kidp.fukui-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.shizuoka.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"静岡大学",
    search:["https://idp.shizuoka.ac.jp/idp/shibboleth", "中部", "静岡大学", "Shizuoka University", "静岡大学"],
    SAML1SSOurl:"https://idp.shizuoka.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://wagner.isc.chubu.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"中部大学",
    search:["https://wagner.isc.chubu.ac.jp/idp/shibboleth", "中部", "中部大学", "CHUBU UNIVERSITY", "中部大学"],
    SAML1SSOurl:"https://wagner.isc.chubu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.nagaoka-ct.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"長岡工業高等専門学校",
    search:["https://kidp.nagaoka-ct.ac.jp/idp/shibboleth", "中部", "長岡工業高等専門学校", "National Institute of Technology,Nagaoka College", "長岡工業高等専門学校"],
    SAML1SSOurl:"https://kidp.nagaoka-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.numazu-ct.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"沼津工業高等専門学校",
    search:["https://kidp.numazu-ct.ac.jp/idp/shibboleth", "中部", "沼津工業高等専門学校", "National Institute of Technology,Numazu College", "沼津工業高等専門学校"],
    SAML1SSOurl:"https://kidp.numazu-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.nagano-nct.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"長野工業高等専門学校",
    search:["https://kidp.nagano-nct.ac.jp/idp/shibboleth", "中部", "長野工業高等専門学校", "National Institute of Technology,Nagano College", "長野工業高等専門学校"],
    SAML1SSOurl:"https://kidp.nagano-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.ishikawa-nct.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"石川工業高等専門学校",
    search:["https://kidp.ishikawa-nct.ac.jp/idp/shibboleth", "中部", "石川工業高等専門学校", "National Institute of Technology,Ishikawa College", "石川工業高等専門学校"],
    SAML1SSOurl:"https://kidp.ishikawa-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kiidp.nc-toyama.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"富山高等専門学校",
    search:["https://kiidp.nc-toyama.ac.jp/idp/shibboleth", "中部", "富山高等専門学校", "National Institute of Technology,Toyama College", "富山高等専門学校"],
    SAML1SSOurl:"https://kiidp.nc-toyama.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.toba-cmt.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"鳥羽商船高等専門学校",
    search:["https://kidp.toba-cmt.ac.jp/idp/shibboleth", "中部", "鳥羽商船高等専門学校", "National Institute of Technology,Toba College", "鳥羽商船高等専門学校"],
    SAML1SSOurl:"https://kidp.toba-cmt.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.gifu-nct.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"岐阜工業高等専門学校",
    search:["https://kidp.gifu-nct.ac.jp/idp/shibboleth", "中部", "岐阜工業高等専門学校", "National Institute of Technology,Gifu College", "岐阜工業高等専門学校"],
    SAML1SSOurl:"https://kidp.gifu-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://sso.sugiyama-u.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"椙山女学園大学",
    search:["https://sso.sugiyama-u.ac.jp/idp/shibboleth", "中部", "椙山女学園大学", "Sugiyama Jogakuen University", "椙山女学園大学"],
    SAML1SSOurl:"https://sso.sugiyama-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.toyota-ct.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"豊田工業高等専門学校",
    search:["https://kidp.toyota-ct.ac.jp/idp/shibboleth", "中部", "豊田工業高等専門学校", "National Institute of Technology,Toyota College", "豊田工業高等専門学校"],
    SAML1SSOurl:"https://kidp.toyota-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://shib.nagoya-u.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"名古屋大学",
    search:["https://shib.nagoya-u.ac.jp/idp/shibboleth", "中部", "名古屋大学", "Nagoya University", "名古屋大学"],
    SAML1SSOurl:"https://shib.nagoya-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://islwpi01.auecc.aichi-edu.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"愛知教育大学",
    search:["https://islwpi01.auecc.aichi-edu.ac.jp/idp/shibboleth", "中部", "愛知教育大学", "Aichi University of Education", "愛知教育大学"],
    SAML1SSOurl:"https://islwpi01.auecc.aichi-edu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://ams.juen.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"上越教育大学",
    search:["https://ams.juen.ac.jp/idp/shibboleth", "中部", "上越教育大学", "Joetsu University of Education", "上越教育大学"],
    SAML1SSOurl:"https://no.saml1.sso.url.defined.com/error"
    },
  "https://idp1.b.cii.u-fukui.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"福井大学",
    search:["https://idp1.b.cii.u-fukui.ac.jp/idp/shibboleth", "中部", "福井大学", "University of Fukui", "福井大学"],
    SAML1SSOurl:"https://idp1.b.cii.u-fukui.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://gakunin.gifu-u.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"岐阜大学",
    search:["https://gakunin.gifu-u.ac.jp/idp/shibboleth", "中部", "岐阜大学", "Gifu University", "岐阜大学"],
    SAML1SSOurl:"https://gakunin.gifu-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.iamas.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"情報科学芸術大学院大学",
    search:["https://idp.iamas.ac.jp/idp/shibboleth", "中部", "情報科学芸術大学院大学", "Institute of Advanced Media Arts and Sciences", "情報科学芸術大学院大学"],
    SAML1SSOurl:"https://idp.iamas.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://gakunin.aitech.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"愛知工業大学",
    search:["https://gakunin.aitech.ac.jp/idp/shibboleth", "中部", "愛知工業大学", "Aichi Institute of Technology", "愛知工業大学"],
    SAML1SSOurl:"https://gakunin.aitech.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://ipcm2.nagaokaut.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"長岡技術科学大学",
    search:["https://ipcm2.nagaokaut.ac.jp/idp/shibboleth", "中部", "長岡技術科学大学", "Nagaoka University of Technology", "長岡技術科学大学"],
    SAML1SSOurl:"https://ipcm2.nagaokaut.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://shibboleth.niigata-cn.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"新潟県立看護大学",
    search:["https://shibboleth.niigata-cn.ac.jp/idp/shibboleth", "中部", "新潟県立看護大学", "Niigata College of Nursing", "新潟県立看護大学"],
    SAML1SSOurl:"https://shibboleth.niigata-cn.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.nifs.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"核融合科学研究所",
    search:["https://idp.nifs.ac.jp/idp/shibboleth", "中部", "核融合科学研究所", "National Institute for Fusion Science", "核融合科学研究所"],
    SAML1SSOurl:"https://idp.nifs.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://shib.chukyo-u.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"中京大学",
    search:["https://shib.chukyo-u.ac.jp/idp/shibboleth", "中部", "中京大学", "CHUKYO UNIVERSITY", "中京大学"],
    SAML1SSOurl:"https://shib.chukyo-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.cais.niigata-u.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"新潟大学学認IdP",
    search:["https://idp.cais.niigata-u.ac.jp/idp/shibboleth", "中部", "新潟大学学認IdP", "Niigata University Gakunin IdP", "新潟大学学認IdP"],
    SAML1SSOurl:"https://idp.cais.niigata-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.fujita-hu.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"藤田医科大学",
    search:["https://idp.fujita-hu.ac.jp/idp/shibboleth", "中部", "藤田医科大学", "Fujita Health University", "藤田医科大学"],
    SAML1SSOurl:"https://idp.fujita-hu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://ku-sso.cis.kanazawa-u.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"金沢大学",
    search:["https://ku-sso.cis.kanazawa-u.ac.jp/idp/shibboleth", "中部", "金沢大学", "Kanazawa University", "金沢大学"],
    SAML1SSOurl:"https://ku-sso.cis.kanazawa-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.gifu.shotoku.ac.jp/idp/shibboleth":{
    type:"chubu",
    name:"岐阜聖徳学園大学",
    search:["https://idp.gifu.shotoku.ac.jp/idp/shibboleth", "中部", "岐阜聖徳学園大学", "Gifu Shotoku Gakuen University", "岐阜聖徳学園大学"],
    SAML1SSOurl:"https://idp.gifu.shotoku.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://authidp1.iimc.kyoto-u.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"京都大学",
    search:["https://authidp1.iimc.kyoto-u.ac.jp/idp/shibboleth", "近畿", "京都大学", "Kyoto University", "京都大学"],
    SAML1SSOurl:"https://authidp1.iimc.kyoto-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://gakunin.kyoto-su.ac.jp/idp":{
    type:"kinki",
    name:"京都産業大学",
    search:["https://gakunin.kyoto-su.ac.jp/idp", "近畿", "京都産業大学", "Kyoto Sangyo University", "京都産業大学"],
    SAML1SSOurl:"https://gakunin.kyoto-su.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://fed.center.kobe-u.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"神戸大学",
    search:["https://fed.center.kobe-u.ac.jp/idp/shibboleth", "近畿", "神戸大学", "Kobe University", "神戸大学"],
    SAML1SSOurl:"https://fed.center.kobe-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.naist.jp/idp/shibboleth":{
    type:"kinki",
    name:"奈良先端科学技術大学院大学",
    search:["https://idp.naist.jp/idp/shibboleth", "近畿", "奈良先端科学技術大学院大学", "Nara Institute of Science and Technology", "奈良先端科学技術大学院大学"],
    SAML1SSOurl:"https://idp.naist.jp/idp/profile/Shibboleth/SSO"
    },
  "https://shib-idp.nara-edu.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"奈良教育大学",
    search:["https://shib-idp.nara-edu.ac.jp/idp/shibboleth", "近畿", "奈良教育大学", "Nara University of Education", "奈良教育大学"],
    SAML1SSOurl:"https://shib-idp.nara-edu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.ritsumei.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"立命館大学",
    search:["https://idp.ritsumei.ac.jp/idp/shibboleth", "近畿", "立命館大学", "Ritsumeikan University", "立命館大学"],
    SAML1SSOurl:"https://idp.ritsumei.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp1.itc.kansai-u.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"関西大学",
    search:["https://idp1.itc.kansai-u.ac.jp/idp/shibboleth", "近畿", "関西大学", "Kansai University", "関西大学"],
    SAML1SSOurl:"https://idp1.itc.kansai-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://shib.osaka-kyoiku.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"大阪教育大学",
    search:["https://shib.osaka-kyoiku.ac.jp/idp/shibboleth", "近畿", "大阪教育大学", "Osaka Kyoiku University", "大阪教育大学"],
    SAML1SSOurl:"https://shib.osaka-kyoiku.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp1.kyokyo-u.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"京都教育大学",
    search:["https://idp1.kyokyo-u.ac.jp/idp/shibboleth", "近畿", "京都教育大学", "Kyoto University of Education", "京都教育大学"],
    SAML1SSOurl:"https://idp1.kyokyo-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://authsv.kpu.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"京都府立大学",
    search:["https://authsv.kpu.ac.jp/idp/shibboleth", "近畿", "京都府立大学", "Kyoto Prefectural University", "京都府立大学"],
    SAML1SSOurl:"https://authsv.kpu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.tezukayama-u.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"帝塚山大学",
    search:["https://idp.tezukayama-u.ac.jp/idp/shibboleth", "近畿", "帝塚山大学", "TEZUKAYAMA UNIVERSITY", "帝塚山大学"],
    SAML1SSOurl:"https://idp.tezukayama-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.tieskun.net/idp/shibboleth":{
    type:"kinki",
    name:"CCC-TIES",
    search:["https://idp.tieskun.net/idp/shibboleth", "近畿", "CCC-TIES", "CCC-TIES", "CCC-TIES"],
    SAML1SSOurl:"https://idp.tieskun.net/idp/profile/Shibboleth/SSO"
    },
  "https://idp.ouhs.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"大阪体育大学",
    search:["https://idp.ouhs.ac.jp/idp/shibboleth", "近畿", "大阪体育大学", "Osaka University of Health and Sport Sciences", "大阪体育大学"],
    SAML1SSOurl:"https://idp.ouhs.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.maizuru-ct.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"舞鶴工業高等専門学校",
    search:["https://kidp.maizuru-ct.ac.jp/idp/shibboleth", "近畿", "舞鶴工業高等専門学校", "National Institute of Technology,Maizuru College", "舞鶴工業高等専門学校"],
    SAML1SSOurl:"https://kidp.maizuru-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.wakayama-nct.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"和歌山工業高等専門学校",
    search:["https://kidp.wakayama-nct.ac.jp/idp/shibboleth", "近畿", "和歌山工業高等専門学校", "National Institute of Technology,Wakayama College", "和歌山工業高等専門学校"],
    SAML1SSOurl:"https://kidp.wakayama-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.akashi.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"明石工業高等専門学校",
    search:["https://kidp.akashi.ac.jp/idp/shibboleth", "近畿", "明石工業高等専門学校", "National Institute of Technology,Akashi College", "明石工業高等専門学校"],
    SAML1SSOurl:"https://kidp.akashi.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://g-shib.auth.oit.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"大阪工業大学",
    search:["https://g-shib.auth.oit.ac.jp/idp/shibboleth", "近畿", "大阪工業大学", "Osaka Institute of Technology", "大阪工業大学"],
    SAML1SSOurl:"https://g-shib.auth.oit.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.nara-k.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"奈良工業高等専門学校",
    search:["https://kidp.nara-k.ac.jp/idp/shibboleth", "近畿", "奈良工業高等専門学校", "National Institute of Technology,Nara College", "奈良工業高等専門学校"],
    SAML1SSOurl:"https://kidp.nara-k.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.kobe-cufs.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"神戸市外国語大学",
    search:["https://idp.kobe-cufs.ac.jp/idp/shibboleth", "近畿", "神戸市外国語大学", "Kobe City University of Foreign Studies", "神戸市外国語大学"],
    SAML1SSOurl:"https://idp.kobe-cufs.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://sumsidp.shiga-med.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"滋賀医科大学",
    search:["https://sumsidp.shiga-med.ac.jp/idp/shibboleth", "近畿", "滋賀医科大学", "Shiga University of Medical Science", "滋賀医科大学"],
    SAML1SSOurl:"https://sumsidp.shiga-med.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.kobe-tokiwa.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"神戸常盤大学",
    search:["https://idp.kobe-tokiwa.ac.jp/idp/shibboleth", "近畿", "神戸常盤大学", "Kobe Tokiwa University", "神戸常盤大学"],
    SAML1SSOurl:"https://idp.kobe-tokiwa.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://gakunin.osaka-cu.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"大阪市立大学",
    search:["https://gakunin.osaka-cu.ac.jp/idp/shibboleth", "近畿", "大阪市立大学", "Osaka City University", "大阪市立大学"],
    SAML1SSOurl:"https://gakunin.osaka-cu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.doshisha.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"同志社大学",
    search:["https://idp.doshisha.ac.jp/idp/shibboleth", "近畿", "同志社大学", "Doshisha University", "同志社大学"],
    SAML1SSOurl:"https://idp.doshisha.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.center.wakayama-u.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"和歌山大学",
    search:["https://idp.center.wakayama-u.ac.jp/idp/shibboleth", "近畿", "和歌山大学", "Wakayama University", "和歌山大学"],
    SAML1SSOurl:"https://idp.center.wakayama-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.kpu-m.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"京都府立医科大学",
    search:["https://idp.kpu-m.ac.jp/idp/shibboleth", "近畿", "京都府立医科大学", "Kyoto Prefectural University of Medicine", "京都府立医科大学"],
    SAML1SSOurl:"https://idp.kpu-m.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.otani.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"大谷大学",
    search:["https://idp.otani.ac.jp/idp/shibboleth", "近畿", "大谷大学", "Otani University", "大谷大学"],
    SAML1SSOurl:"https://idp.otani.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://gidp.ryukoku.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"龍谷大学",
    search:["https://gidp.ryukoku.ac.jp/idp/shibboleth", "近畿", "龍谷大学", "Ryukoku University", "龍谷大学"],
    SAML1SSOurl:"https://gidp.ryukoku.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://naraidp.cc.nara-wu.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"奈良女子大学",
    search:["https://naraidp.cc.nara-wu.ac.jp/idp/shibboleth", "近畿", "奈良女子大学", "Nara Women\'s University", "奈良女子大学"],
    SAML1SSOurl:"https://naraidp.cc.nara-wu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://gk-idp.auth.osaka-u.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"大阪大学",
    search:["https://gk-idp.auth.osaka-u.ac.jp/idp/shibboleth", "近畿", "大阪大学", "Osaka University", "大阪大学"],
    SAML1SSOurl:"https://gk-idp.auth.osaka-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://heimdall.osaka-aoyama.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"大阪青山大学",
    search:["https://heimdall.osaka-aoyama.ac.jp/idp/shibboleth", "近畿", "大阪青山大学", "Osaka Aoyama University", "大阪青山大学"],
    SAML1SSOurl:"https://heimdall.osaka-aoyama.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.kindai.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"近畿大学",
    search:["https://idp.kindai.ac.jp/idp/shibboleth", "近畿", "近畿大学", "Kindai University", "近畿大学"],
    SAML1SSOurl:"https://idp.kindai.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.cis.kit.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"京都工芸繊維大学",
    search:["https://idp.cis.kit.ac.jp/idp/shibboleth", "近畿", "京都工芸繊維大学", "Kyoto Institute of Technology", "京都工芸繊維大学"],
    SAML1SSOurl:"https://idp.cis.kit.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.andrew.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"桃山学院大学",
    search:["https://idp.andrew.ac.jp/idp/shibboleth", "近畿", "桃山学院大学", "Momoyama Gakuin University", "桃山学院大学"],
    SAML1SSOurl:"https://idp.andrew.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.kobe-ccn.ac.jp/idp/shibboleth":{
    type:"kinki",
    name:"神戸市看護大学",
    search:["https://idp.kobe-ccn.ac.jp/idp/shibboleth", "近畿", "神戸市看護大学", "Kobe City College of Nursing", "神戸市看護大学"],
    SAML1SSOurl:"https://idp.kobe-ccn.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.hiroshima-u.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"広島大学",
    search:["https://idp.hiroshima-u.ac.jp/idp/shibboleth", "中国", "広島大学", "Hiroshima University", "広島大学"],
    SAML1SSOurl:"https://idp.hiroshima-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://odidp.cc.okayama-u.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"岡山大学",
    search:["https://odidp.cc.okayama-u.ac.jp/idp/shibboleth", "中国", "岡山大学", "Okayama University", "岡山大学"],
    SAML1SSOurl:"https://odidp.cc.okayama-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://fed.ipc.hiroshima-cu.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"広島市立大学",
    search:["https://fed.ipc.hiroshima-cu.ac.jp/idp/shibboleth", "中国", "広島市立大学", "Hiroshima City University", "広島市立大学"],
    SAML1SSOurl:"https://fed.ipc.hiroshima-cu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.it-hiroshima.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"広島工業大学",
    search:["https://idp.it-hiroshima.ac.jp/idp/shibboleth", "中国", "広島工業大学", "Hiroshima Institute of Technology", "広島工業大学"],
    SAML1SSOurl:"https://idp.it-hiroshima.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.shudo-u.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"広島修道大学",
    search:["https://idp.shudo-u.ac.jp/idp/shibboleth", "中国", "広島修道大学", "Hiroshima Shudo University", "広島修道大学"],
    SAML1SSOurl:"https://idp.shudo-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.oshima-k.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"大島商船高等専門学校",
    search:["https://kidp.oshima-k.ac.jp/idp/shibboleth", "中国", "大島商船高等専門学校", "National Institute of Technology,Oshima College", "大島商船高等専門学校"],
    SAML1SSOurl:"https://kidp.oshima-k.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.kure-nct.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"呉工業高等専門学校",
    search:["https://kidp.kure-nct.ac.jp/idp/shibboleth", "中国", "呉工業高等専門学校", "National Institute of Technology,Kure College", "呉工業高等専門学校"],
    SAML1SSOurl:"https://kidp.kure-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.hiroshima-cmt.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"広島商船高等専門学校",
    search:["https://kidp.hiroshima-cmt.ac.jp/idp/shibboleth", "中国", "広島商船高等専門学校", "National Institute of Technology,Hiroshima College", "広島商船高等専門学校"],
    SAML1SSOurl:"https://kidp.hiroshima-cmt.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.yonago-k.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"米子工業高等専門学校",
    search:["https://kidp.yonago-k.ac.jp/idp/shibboleth", "中国", "米子工業高等専門学校", "National Institute of Technology,Yonago College", "米子工業高等専門学校"],
    SAML1SSOurl:"https://kidp.yonago-k.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.tsuyama-ct.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"津山工業高等専門学校",
    search:["https://kidp.tsuyama-ct.ac.jp/idp/shibboleth", "中国", "津山工業高等専門学校", "National Institute of Technology,Tsuyama College", "津山工業高等専門学校"],
    SAML1SSOurl:"https://kidp.tsuyama-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.ube-k.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"宇部工業高等専門学校",
    search:["https://kidp.ube-k.ac.jp/idp/shibboleth", "中国", "宇部工業高等専門学校", "National Institute of Technology,Ube College", "宇部工業高等専門学校"],
    SAML1SSOurl:"https://kidp.ube-k.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.tokuyama.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"徳山工業高等専門学校",
    search:["https://kidp.tokuyama.ac.jp/idp/shibboleth", "中国", "徳山工業高等専門学校", "National Institute of Technology,Tokuyama College", "徳山工業高等専門学校"],
    SAML1SSOurl:"https://kidp.tokuyama.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.matsue-ct.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"松江工業高等専門学校",
    search:["https://idp.matsue-ct.ac.jp/idp/shibboleth", "中国", "松江工業高等専門学校", "National Institute of Technology,Matsue College", "松江工業高等専門学校"],
    SAML1SSOurl:"https://idp.matsue-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.tottori-u.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"鳥取大学",
    search:["https://idp.tottori-u.ac.jp/idp/shibboleth", "中国", "鳥取大学", "Tottori University", "鳥取大学"],
    SAML1SSOurl:"https://idp.tottori-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.shimane-u.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"島根大学",
    search:["https://idp.shimane-u.ac.jp/idp/shibboleth", "中国", "島根大学", "Shimane University", "島根大学"],
    SAML1SSOurl:"https://idp.shimane-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.oka-pu.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"岡山県立大学",
    search:["https://idp.oka-pu.ac.jp/idp/shibboleth", "中国", "岡山県立大学", "Okayama Prefectural University", "岡山県立大学"],
    SAML1SSOurl:"https://idp.oka-pu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.pu-hiroshima.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"県立広島大学",
    search:["https://idp.pu-hiroshima.ac.jp/idp/shibboleth", "中国", "県立広島大学", "Prefectural University of Hiroshima", "県立広島大学"],
    SAML1SSOurl:"https://idp.pu-hiroshima.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://auth.tusy.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"山陽小野田市立山口東京理科大学",
    search:["https://auth.tusy.ac.jp/idp/shibboleth", "中国", "山陽小野田市立山口東京理科大学", "Sanyo-Onoda City University", "山陽小野田市立山口東京理科大学"],
    SAML1SSOurl:"https://auth.tusy.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.cc.yamaguchi-u.ac.jp/idp/shibboleth":{
    type:"chugoku",
    name:"山口大学",
    search:["https://idp.cc.yamaguchi-u.ac.jp/idp/shibboleth", "中国", "山口大学", "Yamaguchi University", "山口大学"],
    SAML1SSOurl:"https://idp.cc.yamaguchi-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.cc.ehime-u.ac.jp/idp/shibboleth":{
    type:"shikoku",
    name:"愛媛大学",
    search:["https://idp.cc.ehime-u.ac.jp/idp/shibboleth", "四国", "愛媛大学", "Ehime University", "愛媛大学"],
    SAML1SSOurl:"https://idp.cc.ehime-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://gidp.ait230.tokushima-u.ac.jp/idp/shibboleth":{
    type:"shikoku",
    name:"徳島大学",
    search:["https://gidp.ait230.tokushima-u.ac.jp/idp/shibboleth", "四国", "徳島大学", "Tokushima University", "徳島大学"],
    SAML1SSOurl:"https://gidp.ait230.tokushima-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.kochi-ct.ac.jp/idp/shibboleth":{
    type:"shikoku",
    name:"高知工業高等専門学校",
    search:["https://kidp.kochi-ct.ac.jp/idp/shibboleth", "四国", "高知工業高等専門学校", "National Institute of Technology,Kochi College", "高知工業高等専門学校"],
    SAML1SSOurl:"https://kidp.kochi-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://ktidp.kagawa-nct.ac.jp/idp/shibboleth":{
    type:"shikoku",
    name:"香川高等専門学校",
    search:["https://ktidp.kagawa-nct.ac.jp/idp/shibboleth", "四国", "香川高等専門学校", "National Institute of Technology,Kagawa College", "香川高等専門学校"],
    SAML1SSOurl:"https://ktidp.kagawa-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.yuge.ac.jp/idp/shibboleth":{
    type:"shikoku",
    name:"弓削商船高等専門学校",
    search:["https://kidp.yuge.ac.jp/idp/shibboleth", "四国", "弓削商船高等専門学校", "National Institute of Technology,Yuge College", "弓削商船高等専門学校"],
    SAML1SSOurl:"https://kidp.yuge.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.niihama-nct.ac.jp/idp/shibboleth":{
    type:"shikoku",
    name:"新居浜工業高等専門学校",
    search:["https://kidp.niihama-nct.ac.jp/idp/shibboleth", "四国", "新居浜工業高等専門学校", "National Institute of Technology,Niihama College", "新居浜工業高等専門学校"],
    SAML1SSOurl:"https://kidp.niihama-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.anan-nct.ac.jp/idp/shibboleth":{
    type:"shikoku",
    name:"阿南工業高等専門学校",
    search:["https://kidp.anan-nct.ac.jp/idp/shibboleth", "四国", "阿南工業高等専門学校", "National Institute of Technology,Anan College", "阿南工業高等専門学校"],
    SAML1SSOurl:"https://kidp.anan-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.kochi-tech.ac.jp/idp/shibboleth":{
    type:"shikoku",
    name:"高知工科大学",
    search:["https://idp.kochi-tech.ac.jp/idp/shibboleth", "四国", "高知工科大学", "Kochi University of Technology", "高知工科大学"],
    SAML1SSOurl:"https://idp.kochi-tech.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://aries.naruto-u.ac.jp/idp/shibboleth":{
    type:"shikoku",
    name:"鳴門教育大学",
    search:["https://aries.naruto-u.ac.jp/idp/shibboleth", "四国", "鳴門教育大学", "Naruto University of Education", "鳴門教育大学"],
    SAML1SSOurl:"https://aries.naruto-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp1.matsuyama-u.ac.jp/idp/shibboleth":{
    type:"shikoku",
    name:"松山大学",
    search:["https://idp1.matsuyama-u.ac.jp/idp/shibboleth", "四国", "松山大学", "Matsuyama University", "松山大学"],
    SAML1SSOurl:"https://idp1.matsuyama-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.kochi-u.ac.jp/idp/shibboleth":{
    type:"shikoku",
    name:"高知大学",
    search:["https://idp.kochi-u.ac.jp/idp/shibboleth", "四国", "高知大学", "Kochi University", "高知大学"],
    SAML1SSOurl:"https://idp.kochi-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.itc.kagawa-u.ac.jp/idp/shibboleth":{
    type:"shikoku",
    name:"香川大学",
    search:["https://idp.itc.kagawa-u.ac.jp/idp/shibboleth", "四国", "香川大学", "Kagawa University", "香川大学"],
    SAML1SSOurl:"https://idp.itc.kagawa-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://ssoidp.cc.saga-u.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"佐賀大学",
    search:["https://ssoidp.cc.saga-u.ac.jp/idp/shibboleth", "九州", "佐賀大学", "Saga University", "佐賀大学"],
    SAML1SSOurl:"https://ssoidp.cc.saga-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.isc.kyutech.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"九州工業大学",
    search:["https://idp.isc.kyutech.ac.jp/idp/shibboleth", "九州", "九州工業大学", "Kyushu Institute of Technology", "九州工業大学"],
    SAML1SSOurl:"https://idp.isc.kyutech.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.kyushu-u.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"九州大学",
    search:["https://idp.kyushu-u.ac.jp/idp/shibboleth", "九州", "九州大学", "Kyushu University", "九州大学"],
    SAML1SSOurl:"https://idp.kyushu-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://um-idp.cc.miyazaki-u.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"宮崎大学",
    search:["https://um-idp.cc.miyazaki-u.ac.jp/idp/shibboleth", "九州", "宮崎大学", "University of Miyazaki", "宮崎大学"],
    SAML1SSOurl:"https://um-idp.cc.miyazaki-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://fed.u-ryukyu.ac.jp/shibboleth":{
    type:"kyushu",
    name:"琉球大学",
    search:["https://fed.u-ryukyu.ac.jp/shibboleth", "九州", "琉球大学", "University of the Ryukyus", "琉球大学"],
    SAML1SSOurl:"https://fed.u-ryukyu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.kct.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"北九州工業高等専門学校",
    search:["https://kidp.kct.ac.jp/idp/shibboleth", "九州", "北九州工業高等専門学校", "National Institute of Technology,Kitakyushu College", "北九州工業高等専門学校"],
    SAML1SSOurl:"https://kidp.kct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://shibboleth-idp.bene.fit.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"福岡工業大学",
    search:["https://shibboleth-idp.bene.fit.ac.jp/idp/shibboleth", "九州", "福岡工業大学", "Fukuoka Institute of Technology", "福岡工業大学"],
    SAML1SSOurl:"https://shibboleth-idp.bene.fit.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://shib.kumamoto-u.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"熊本大学",
    search:["https://shib.kumamoto-u.ac.jp/idp/shibboleth", "九州", "熊本大学", "Kumamoto University", "熊本大学"],
    SAML1SSOurl:"https://shib.kumamoto-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.oita-ct.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"大分工業高等専門学校",
    search:["https://kidp.oita-ct.ac.jp/idp/shibboleth", "九州", "大分工業高等専門学校", "National Institute of Technology,Oita College", "大分工業高等専門学校"],
    SAML1SSOurl:"https://kidp.oita-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.sasebo.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"佐世保工業高等専門学校",
    search:["https://kidp.sasebo.ac.jp/idp/shibboleth", "九州", "佐世保工業高等専門学校", "National Institute of Technology,Sasebo College", "佐世保工業高等専門学校"],
    SAML1SSOurl:"https://kidp.sasebo.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.kagoshima-ct.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"鹿児島工業高等専門学校",
    search:["https://kidp.kagoshima-ct.ac.jp/idp/shibboleth", "九州", "鹿児島工業高等専門学校", "National Institute of Technology,Kagoshima College", "鹿児島工業高等専門学校"],
    SAML1SSOurl:"https://kidp.kagoshima-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.kurume-nct.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"久留米工業高等専門学校",
    search:["https://kidp.kurume-nct.ac.jp/idp/shibboleth", "九州", "久留米工業高等専門学校", "National Institute of Technology,Kurume College", "久留米工業高等専門学校"],
    SAML1SSOurl:"https://kidp.kurume-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.miyakonojo-nct.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"都城工業高等専門学校",
    search:["https://kidp.miyakonojo-nct.ac.jp/idp/shibboleth", "九州", "都城工業高等専門学校", "National Institute of Technology,Miyakonojo College", "都城工業高等専門学校"],
    SAML1SSOurl:"https://kidp.miyakonojo-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.ariake-nct.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"有明工業高等専門学校",
    search:["https://kidp.ariake-nct.ac.jp/idp/shibboleth", "九州", "有明工業高等専門学校", "National Institute of Technology,Ariake College", "有明工業高等専門学校"],
    SAML1SSOurl:"https://kidp.ariake-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.kumamoto-nct.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"熊本高等専門学校",
    search:["https://kidp.kumamoto-nct.ac.jp/idp/shibboleth", "九州", "熊本高等専門学校", "National Institute of Technology,Kumamoto College", "熊本高等専門学校"],
    SAML1SSOurl:"https://kidp.kumamoto-nct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.okinawa-ct.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"沖縄工業高等専門学校",
    search:["https://kidp.okinawa-ct.ac.jp/idp/shibboleth", "九州", "沖縄工業高等専門学校", "National Institute of Technology,Okinawa College", "沖縄工業高等専門学校"],
    SAML1SSOurl:"https://kidp.okinawa-ct.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://shibboleth-idp.kyusan-u.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"九州産業大学",
    search:["https://shibboleth-idp.kyusan-u.ac.jp/idp/shibboleth", "九州", "九州産業大学", "Kyushu Sangyo University", "九州産業大学"],
    SAML1SSOurl:"https://shibboleth-idp.kyusan-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://logon.oist.jp/idp/shibboleth":{
    type:"kyushu",
    name:"沖縄科学技術大学院大学",
    search:["https://logon.oist.jp/idp/shibboleth", "九州", "沖縄科学技術大学院大学", "Okinawa Institute of Science and Technology Graduate University", "沖縄科学技術大学院大学"],
    SAML1SSOurl:"https://logon.oist.jp/idp/profile/Shibboleth/SSO"
    },
  "https://nuidp.nagasaki-u.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"長崎大学",
    search:["https://nuidp.nagasaki-u.ac.jp/idp/shibboleth", "九州", "長崎大学", "Nagasaki University", "長崎大学"],
    SAML1SSOurl:"https://nuidp.nagasaki-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.seinan-gu.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"西南学院大学",
    search:["https://idp.seinan-gu.ac.jp/idp/shibboleth", "九州", "西南学院大学", "Seinan Gakuin University", "西南学院大学"],
    SAML1SSOurl:"https://idp.seinan-gu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.net.oita-u.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"大分大学",
    search:["https://idp.net.oita-u.ac.jp/idp/shibboleth", "九州", "大分大学", "Oita University", "大分大学"],
    SAML1SSOurl:"https://idp.net.oita-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://kidp.cc.kagoshima-u.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"鹿児島大学",
    search:["https://kidp.cc.kagoshima-u.ac.jp/idp/shibboleth", "九州", "鹿児島大学", "Kagoshima University", "鹿児島大学"],
    SAML1SSOurl:"https://kidp.cc.kagoshima-u.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.nifs-k.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"鹿屋体育大学",
    search:["https://idp.nifs-k.ac.jp/idp/shibboleth", "九州", "鹿屋体育大学", "National Institute of Fitness and Sports in KANOYA", "鹿屋体育大学"],
    SAML1SSOurl:"https://idp.nifs-k.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://ss.fukuoka-edu.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"福岡教育大学",
    search:["https://ss.fukuoka-edu.ac.jp/idp/shibboleth", "九州", "福岡教育大学", "University of Teacher Education Fukuoka", "福岡教育大学"],
    SAML1SSOurl:"https://ss.fukuoka-edu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.sun.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"長崎県立大学",
    search:["https://idp.sun.ac.jp/idp/shibboleth", "九州", "長崎県立大学", "University of Nagasaki", "長崎県立大学"],
    SAML1SSOurl:"https://idp.sun.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.okiu.ac.jp/idp/shibboleth":{
    type:"kyushu",
    name:"沖縄国際大学",
    search:["https://idp.okiu.ac.jp/idp/shibboleth", "九州", "沖縄国際大学", "Okinawa International University", "沖縄国際大学"],
    SAML1SSOurl:"https://idp.okiu.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.gakunin.nii.ac.jp/idp/shibboleth":{
    type:"others",
    name:"学認IdP",
    search:["https://idp.gakunin.nii.ac.jp/idp/shibboleth", "その他", "学認IdP", "GakuNin IdP", "学認IdP"],
    SAML1SSOurl:"https://idp.gakunin.nii.ac.jp/idp/profile/Shibboleth/SSO"
    },
  "https://idp.sojo-u.ac.jp/idp/shibboleth":{
    type:"unknown",
    name:"崇城大学",
    search:["https://idp.sojo-u.ac.jp/idp/shibboleth", "Unknown", "崇城大学", "SOJO University", "崇城大学"],
    SAML1SSOurl:"https://idp.sojo-u.ac.jp/idp/profile/Shibboleth/SSO"
    } };
var wayf_hint_list = [  ];
var inc_search_list = [];
var favorite_list = [];
var hint_list = [];
var submit_check_list = [];
var safekind = '2';
var allIdPList = '';
var initdisp = '所属している機関を選択';
var dispDefault = '';
var dispidp = '';
var hiddenKeyText = '';
var dropdown_up = 'https://ds.gakunin.nii.ac.jp/GakuNinDS/images/dropdown_up.png';
var dropdown_down = 'https://ds.gakunin.nii.ac.jp/GakuNinDS/images/dropdown_down.png';
var favorite_idp_group = "Most often used Home Organisations";
var hint_idp_group = 'ヒント！所属機関';

// Define functions
var submit = function submitForm(){
  var NonFedEntityID;
  var idp_name = document.getElementById('keytext').value.toLowerCase();
  var chkFlg = false;
  if (hiddenKeyText != '') idp_name = hiddenKeyText.toLowerCase();

  if (inc_search_list.length > 0) {
    submit_check_list = inc_search_list;
  }
  if (favorite_list.length > 0) {
    submit_check_list = favorite_list.concat(submit_check_list);
  }
  if (hint_list.length > 0) {
    submit_check_list = hint_list.concat(submit_check_list);
  }
  
  for (var i=0; i<submit_check_list.length; i++){
    for (var j = 3, len2 = submit_check_list[i].length; j < len2; j++) {
      var list_idp_name = submit_check_list[i][j].toLowerCase();
      if (idp_name == list_idp_name){
        NonFedEntityID = submit_check_list[i][0];
        document.getElementById('user_idp').value = submit_check_list[i][0];
        chkFlg = true;
        if (safekind > 0 && safekind != 3){
          // Store SAML domain cookie for this foreign IdP
          setCookie('_saml_idp', encodeBase64(submit_check_list[i][0]) , 100);
        }
        break;
                  }
    }
    if (chkFlg) {
      break;
    }
        }
        if (!chkFlg){
                alert('正しい所属機関を選んで下さい');
                return false;
        }

        // User chose non-federation IdP
        // TODO: FIX windows error
        // 4 >= (8 - 3/4)
        if (
                i >= (submit_check_list.length - wayf_additional_idps.length)){

                var redirect_url;

                // Store SAML domain cookie for this foreign IdP
                setCookie('_saml_idp', encodeBase64(NonFedEntityID) , 100);

                // Redirect user to SP handler
                if (wayf_use_discovery_service){
                        redirect_url = wayf_sp_samlDSURL + (wayf_sp_samlDSURL.indexOf('?')>=0?'&':'?')+'entityID='
                        + encodeURIComponent(NonFedEntityID)
                        + '&target=' + encodeURIComponent(wayf_return_url);

                        // Make sure the redirect always is being done in parent window
                        if (window.parent){
                                window.parent.location = redirect_url;
                        } else {
                                window.location = redirect_url;
                        }

                } else {
                        redirect_url = wayf_sp_handlerURL + '?providerId='
                        + encodeURIComponent(NonFedEntityID)
                        + '&target=' + encodeURIComponent(wayf_return_url);

                        // Make sure the redirect always is being done in parent window
                        if (window.parent){
                                window.parent.location = redirect_url;
                        } else {
                                window.location = redirect_url;
                        }

                }

                // If input type button is used for submit, we must return false
                return false;
        } else {
    if (safekind == 0 || safekind == 3){
      // delete local cookie
      setCookie('_saml_idp', encodeBase64(submit_check_list[i][0]), -1);
    }
                // User chose federation IdP entry
                document.IdPList.submit();
        }
        return false;
}

function writeHTML(a){
  wayf_html += a;
}

function pushIncSearchList(IdP){
  inc_search_list.push(wayf_idps[IdP].search.slice());
  for(var i in wayf_hint_list){
    if (wayf_hint_list[i] == IdP) {
      hint_list.push(wayf_idps[IdP].search.slice());
      hint_list[hint_list.length - 1][1] = hint_idp_group;
    }
  }
}

function isAllowedType(IdP, type){
  for ( var i=0; i<= wayf_hide_categories.length; i++){
    
    if (wayf_hide_categories[i] == type || wayf_hide_categories[i] == "all" ){
      
      for ( var i=0; i <= wayf_unhide_idps.length; i++){
        // Show IdP if it has to be unhidden
        if (wayf_unhide_idps[i] == IdP){
          return true;
        }
      }
      // If IdP is not unhidden, the default applies
      return false;
    }
  }
  
  // Category was not hidden
  return true;
}

function isAllowedCategory(category){
  
  if (!category || category == ''){
    return true;
  }
  
  for ( var i=0; i<= wayf_hide_categories.length; i++){
    
    if (wayf_hide_categories[i] == category || wayf_hide_categories[i] == "all" ){
      return false;
    }
  }
  
  // Category was not hidden
  return true;
}

function isAllowedIdP(IdP){
  
  for ( var i=0; i<=wayf_hide_idps.length; i++){
    if (wayf_hide_idps[i] == IdP){
      return false;
    }
  }
  // IdP was not hidden
  return true;
}

function setCookie(c_name, value, expiredays){
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie=c_name + "=" + escape(value) +
  ((expiredays==null) ? "" : "; expires=" + exdate.toGMTString()) +
  ((wayf_sp_cookie_path=="") ? "" : "; path=" + wayf_sp_cookie_path) + "; secure";
}

function getCookie(check_name){
  // First we split the cookie up into name/value pairs
  // Note: document.cookie only returns name=value, not the other components
  var a_all_cookies = document.cookie.split( ';' );
  var a_temp_cookie = '';
  var cookie_name = '';
  var cookie_value = '';
  
  for ( var i = 0; i < a_all_cookies.length; i++ )
  {
    // now we'll split apart each name=value pair
    a_temp_cookie = a_all_cookies[i].split( '=' );
    
    
    // and trim left/right whitespace while we're at it
    cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
  
    // if the extracted name matches passed check_name
    if ( cookie_name == check_name )
    {
      // We need to handle case where cookie has no value but exists (no = sign, that is):
      if ( a_temp_cookie.length > 1 )
      {
        cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
      }
      // note that in cases where cookie is initialized but no value, null is returned
      return cookie_value;
      break;
    }
    a_temp_cookie = null;
    cookie_name = '';
  }
  
  return null;
}

// Checks if there exists a cookie containing check_name in its name
function isCookie(check_name){
  // First we split the cookie up into name/value pairs
  // Note: document.cookie only returns name=value, not the other components
  var a_all_cookies = document.cookie.split( ';' );
  var a_temp_cookie = '';
  var cookie_name = '';
  
  for ( var i = 0; i < a_all_cookies.length; i++ ){
    // now we'll split apart each name=value pair
    a_temp_cookie = a_all_cookies[i].split( '=' );
    
    // and trim left/right whitespace while we're at it
    cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
    
    // if the extracted name matches passed check_name
    
    if ( cookie_name.search(check_name) >= 0){
      return true;
    }
  }
  
  // Shibboleth session cookie has not been found
  return false;
}

function encodeBase64(input) {
  var base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "", c1, c2, c3, e1, e2, e3, e4;
  
  for ( var i = 0; i < input.length; ) {
    c1 = input.charCodeAt(i++);
    c2 = input.charCodeAt(i++);
    c3 = input.charCodeAt(i++);
    e1 = c1 >> 2;
    e2 = ((c1 & 3) << 4) + (c2 >> 4);
    e3 = ((c2 & 15) << 2) + (c3 >> 6);
    e4 = c3 & 63;
    if (isNaN(c2)){
      e3 = e4 = 64;
    } else if (isNaN(c3)){
      e4 = 64;
    }
    output += base64chars.charAt(e1) + base64chars.charAt(e2) + base64chars.charAt(e3) + base64chars.charAt(e4);
  }
  
  return output;
}

function decodeBase64(input) {
  var base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;

  // Remove all characters that are not A-Z, a-z, 0-9, +, /, or =
  var base64test = /[^A-Za-z0-9\+\/\=]/g;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  
  do {
    enc1 = base64chars.indexOf(input.charAt(i++));
    enc2 = base64chars.indexOf(input.charAt(i++));
    enc3 = base64chars.indexOf(input.charAt(i++));
    enc4 = base64chars.indexOf(input.charAt(i++));

    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);

    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }
    
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
    
  } while (i < input.length);
  
  return output;
}

export function dispDs(disp) {
    console.log(dsconfig);
  if(disp != 'true'){
    start();
    $("#IdPList").on('submit', submit);
    return;
  }
  
  var config_ok = true; 
  
  // First lets make sure properties are available
  if(
    typeof(wayf_use_discovery_service)  == "undefined"  
    || typeof(wayf_use_discovery_service) != "boolean"
  ){
    wayf_use_discovery_service = true;
  }
  
  if(typeof(wayf_sp_entityID) == "undefined"){
    alert('The mandatory parameter \'wayf_sp_entityID\' is missing. Please add it as a javascript variable on this page.');
    config_ok = false;
  }
  
  if(typeof(wayf_URL) == "undefined"){
    alert('The mandatory parameter \'wayf_URL\' is missing. Please add it as a javascript variable on this page.');
    config_ok = false;
  }
  
  if(typeof(wayf_return_url) == "undefined"){
    alert('The mandatory parameter \'wayf_return_url\' is missing. Please add it as a javascript variable on this page.');
    config_ok = false;
  }

  if(typeof(wayf_discofeed_url) == "undefined"){
    wayf_discofeed_url = '';
  }

  if(typeof(wayf_sp_cookie_path) == "undefined"){
    wayf_sp_cookie_path = '';
  }
  
  if((typeof(wayf_list_height) != "number") || (wayf_list_height < 0)){
    wayf_list_height = '150px';
  } else {
    wayf_list_height += 'px';
  }

  if(wayf_use_discovery_service == false && typeof(wayf_sp_handlerURL) == "undefined"){
    alert('The mandatory parameter \'wayf_sp_handlerURL\' is missing. Please add it as a javascript variable on this page.');
    config_ok = false;
  }
  
  if(wayf_use_discovery_service == true && typeof(wayf_sp_samlDSURL) == "undefined"){
    // Set to default DS handler
    wayf_sp_samlDSURL = wayf_sp_handlerURL + "/DS";
  }
  
  if (typeof(wayf_sp_samlACURL) == "undefined"){
    wayf_sp_samlACURL = wayf_sp_handlerURL + '/SAML/POST';
  }
  
  if(typeof(wayf_font_color) == "undefined"){
    wayf_font_color = 'black';
  }
  
  if(
    typeof(wayf_font_size) == "undefined"
    || typeof(wayf_font_size) != "number"
    ){
    wayf_font_size = 12;
  }
  
  if(typeof(wayf_border_color) == "undefined"){
    wayf_border_color = '#00247D';
  }
  
  if(typeof(wayf_background_color) == "undefined"){
    wayf_background_color = '#F4F7F7';
  }
  
  if(
    typeof(wayf_use_small_logo) == "undefined" 
    || typeof(wayf_use_small_logo) != "boolean"
    ){
    wayf_use_small_logo = false;
  }
  
  if(
    typeof(wayf_hide_logo) == "undefined" 
    || typeof(wayf_use_small_logo) != "boolean"
    ){
    wayf_hide_logo = false;
  }
  
  if(typeof(wayf_width) == "undefined"){
    wayf_width = "auto";
  } else if (typeof(wayf_width) == "number"){
    wayf_width += 'px';
  }
  
  if(typeof(wayf_height) == "undefined"){
    wayf_height = "auto";
  } else if (typeof(wayf_height) == "number"){
    wayf_height += "px";
  }
  
  if(
    typeof(wayf_show_remember_checkbox) == "undefined"
    || typeof(wayf_show_remember_checkbox) != "boolean"
    ){
    wayf_show_remember_checkbox = true;
  }
  
  if(
    typeof(wayf_force_remember_for_session) == "undefined"
    || typeof(wayf_force_remember_for_session) != "boolean"
    ){
    wayf_force_remember_for_session = false;
  }
  
  if(
    typeof(wayf_auto_login) == "undefined"
    || typeof(wayf_auto_login) != "boolean"
    ){
    wayf_auto_login = true;
  }
  
  if(
    typeof(wayf_hide_after_login) == "undefined"
    || typeof(wayf_hide_after_login) != "boolean"
    ){
    wayf_hide_after_login = false;
  }
  
  if(typeof(wayf_logged_in_messsage) == "undefined"){
    wayf_logged_in_messsage = "認証済";
  }
  
  if(
    typeof(wayf_most_used_idps) == "undefined"
    || typeof(wayf_most_used_idps) != "object"
    ){
    wayf_most_used_idps = new Array();
  }
  
  if(
    typeof(wayf_show_categories) == "undefined"
    || typeof(wayf_show_categories) != "boolean"
    ){
    wayf_show_categories = true;
  }
  
  if(
    typeof(wayf_hide_categories) == "undefined"
    || typeof(wayf_hide_categories) != "object"
    ){
    wayf_hide_categories = new Array();
  }
  
  if(
    typeof(wayf_unhide_idps) == "undefined"
    ||  typeof(wayf_unhide_idps) != "object"
  ){
    wayf_unhide_idps = new Array();
  }
  
  // Disable categories if IdPs are unhidden from hidden categories
  if (wayf_unhide_idps.length > 0){
    wayf_show_categories = false;
  }
  
  if(
    typeof(wayf_hide_idps) == "undefined"
    || typeof(wayf_hide_idps) != "object"
    ){
    wayf_hide_idps = new Array();
  }
  
  if(
    typeof(wayf_additional_idps) == "undefined"
    || typeof(wayf_additional_idps) != "object"
    ){
    wayf_additional_idps = [];
  }
  
  // Exit without outputting html if config is not ok
  if (config_ok != true){
    return;
  }
  
  // Check if user is logged in already:
  var user_logged_in = false;
  if (typeof(wayf_check_login_state_function) == "undefined"
    || typeof(wayf_check_login_state_function) != "function" ){
    // Use default Shibboleth Service Provider login check
    user_logged_in = isCookie('shibsession');
  } else {
    // Use custom function
    user_logged_in = wayf_check_login_state_function();
  }
  
  // Check if user is authenticated already and 
  // whether something has to be drawn
  if (
    wayf_hide_after_login 
    && user_logged_in 
    && wayf_logged_in_messsage == ''
  ){
    
    // Exit script without drawing
    return;
  }
  
  // Now start generating the HTML for outer box
  if(
    wayf_hide_after_login 
    && user_logged_in
  ){
    writeHTML('<div id="wayf_div" style="background:' + wayf_background_color + ';border-style: solid;border-color: ' + wayf_border_color + ';border-width: 1px;padding: 10px;height: auto;width: ' + wayf_width + ';text-align: left;overflow: hidden;">');
  } else {
    writeHTML('<div id="wayf_div" style="background:' + wayf_background_color + ';border-style: solid;border-color: ' + wayf_border_color + ';border-width: 1px;padding: 10px;height: ' + wayf_height + ';width: ' + wayf_width + ';text-align: left;">');
  }

  
  // Shall we display the logo
  if (wayf_hide_logo != true){
    
    // Write header of logo div
    writeHTML('<div id="wayf_logo_div" style="float: right;margin-bottom: 5px;"><a href="https://www.gakunin.jp/" target="_blank" style="border:0px">');
    
    // Which size of the logo shall we display
    if (wayf_use_small_logo){
      writeHTML('<img id="wayf_logo" src="https://ds.gakunin.nii.ac.jp/GakuNinDS/images/gakunin-seal.png" alt="Federation Logo" style="border:0px">')
    } else {
      writeHTML('<img id="wayf_logo" src="https://ds.gakunin.nii.ac.jp/GakuNinDS/images/gakunin.png" alt="Federation Logo" style="border:0px">')
    }
    
    // Write footer of logo div
    writeHTML('</a></div>');
  }
  
  // Start login check
  // Search for login state cookie
  // If one exists, we only draw the logged_in_message
  if(
    wayf_hide_after_login 
    && user_logged_in
  ){
    writeHTML('<p id="wayf_intro_div" style="float:left;font-size:' + wayf_font_size + 'px;color:' + wayf_font_color + ';">' + wayf_logged_in_messsage + '</p>');
    
  } else {
  // Else draw embedded WAYF
    
    //Do we have to draw custom text? or any text at all?
    if(typeof(wayf_overwrite_intro_text) == "undefined"){
      writeHTML('<label for="user_idp" id="wayf_intro_label" style="float:left; min-width:80px; font-size:' + wayf_font_size + 'px;color:' + wayf_font_color + ';margin-top: 5px;">所属機関:');
    } else if (wayf_overwrite_intro_text != "") {
      writeHTML('<label for="user_idp" id="wayf_intro_label" style="float:left; min-width:80px; font-size:' + wayf_font_size + 'px;color:' + wayf_font_color + ';margin-top: 5px;">' + wayf_overwrite_intro_text);
    }
    
    // Get local cookie
    var saml_idp = getCookie('_saml_idp');
    var last_idp = '';
    var last_idps = new Array();
    
    if (saml_idp && saml_idp.length > 0){
      last_idps = saml_idp.split('+')
      if (last_idps[0] && last_idps[0].length > 0){
        last_idp = decodeBase64(last_idps[0]);
      }
    }

    if (last_idp == "" && safekind == 2) {
      writeHTML('');
        ('<img src="https://ds.gakunin.nii.ac.jp/GakuNinDS/images/alert.gif" title="注意:リファラ遮断のためDSから所属IdP情報を取得できません" style="vertical-align:text-bottom; border:0px; width:20px; height:20px;">');
    }
    writeHTML('</label>');
    
    var wayf_authReq_URL = '';
    var form_start = '';
    
    if (wayf_use_discovery_service == true){
      var return_url = wayf_sp_samlDSURL + (wayf_sp_samlDSURL.indexOf('?')>=0?'&':'?')+'SAMLDS=1&target=' + encodeURIComponent(wayf_return_url);
      
      wayf_authReq_URL = wayf_URL 
      + '?entityID=' + encodeURIComponent(wayf_sp_entityID)
      + '&amp;return=' + encodeURIComponent(return_url);
      
      form_start = '<form id="IdPList" name="IdPList" method="post" target="_parent" onSubmit="return submitForm()" action="' + wayf_authReq_URL + '">';
    } else {
      
      wayf_authReq_URL = wayf_URL 
      + '?providerId=' + encodeURIComponent(wayf_sp_entityID)
      + '&amp;shire=' + encodeURIComponent(wayf_sp_samlACURL)
      + '&amp;target=' + encodeURIComponent(wayf_return_url);
      
      form_start = '<form id="IdPList" name="IdPList" method="post" target="_parent" onSubmit="return submitForm()" action="' + wayf_authReq_URL + '&amp;time=1553058534'
      + '">';
    }
    
    writeHTML('<link rel="stylesheet" href="https://ds.gakunin.nii.ac.jp/GakuNinDS/incsearch/suggest.css" type="text/css" />');
    writeHTML('<script type="text/javascript" src="https://ds.gakunin.nii.ac.jp/GakuNinDS/incsearch/jquery.js"></script>');
    writeHTML('<script type="text/javascript" src="https://ds.gakunin.nii.ac.jp/GakuNinDS/incsearch/jquery.flickable.js"></script>');
    writeHTML('<script type="text/javascript" src="https://ds.gakunin.nii.ac.jp/GakuNinDS/incsearch/suggest.js"></script>');

    writeHTML(form_start);
    writeHTML('<input name="request_type" type="hidden" value="embedded">');
    writeHTML('<input id="user_idp" name="user_idp" type="hidden" value="">');

    // Favourites
    if (wayf_most_used_idps.length > 0){
      if(typeof(wayf_overwrite_most_used_idps_text) != "undefined"){
        favorite_idp_group = wayf_overwrite_most_used_idps_text;
      }

      // Show additional IdPs in the order they are defined
      for ( var i=0; i < wayf_most_used_idps.length; i++){
        if (wayf_idps[wayf_most_used_idps[i]]){
          favorite_list.push(wayf_idps[wayf_most_used_idps[i]].search.slice());
          favorite_list[favorite_list.length - 1][1] = favorite_idp_group;
        }
      }
    }
    if (last_idp == 'https://shib-idp01.iic.hokudai.ac.jp/idp/shibboleth'){
      dispDefault = '北海道大学';
    }   if (isAllowedType('https://shib-idp01.iic.hokudai.ac.jp/idp/shibboleth','hokkaido') && isAllowedIdP('https://shib-idp01.iic.hokudai.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://shib-idp01.iic.hokudai.ac.jp/idp/shibboleth"
        ){
        dispDefault = '北海道大学';
      }
      pushIncSearchList('https://shib-idp01.iic.hokudai.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.asahikawa-med.ac.jp/idp/shibboleth'){
      dispDefault = '旭川医科大学';
    }   if (isAllowedType('https://idp.asahikawa-med.ac.jp/idp/shibboleth','hokkaido') && isAllowedIdP('https://idp.asahikawa-med.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.asahikawa-med.ac.jp/idp/shibboleth"
        ){
        dispDefault = '旭川医科大学';
      }
      pushIncSearchList('https://idp.asahikawa-med.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.msls.kushiro-ct.ac.jp/idp/shibboleth'){
      dispDefault = '釧路工業高等専門学校';
    }   if (isAllowedType('https://idp.msls.kushiro-ct.ac.jp/idp/shibboleth','hokkaido') && isAllowedIdP('https://idp.msls.kushiro-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.msls.kushiro-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '釧路工業高等専門学校';
      }
      pushIncSearchList('https://idp.msls.kushiro-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://shibboleth.lib.kitami-it.ac.jp/idp/shibboleth'){
      dispDefault = '北見工業大学';
    }   if (isAllowedType('https://shibboleth.lib.kitami-it.ac.jp/idp/shibboleth','hokkaido') && isAllowedIdP('https://shibboleth.lib.kitami-it.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://shibboleth.lib.kitami-it.ac.jp/idp/shibboleth"
        ){
        dispDefault = '北見工業大学';
      }
      pushIncSearchList('https://shibboleth.lib.kitami-it.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://sso.sapmed.ac.jp/idp/shibboleth'){
      dispDefault = '札幌医科大学';
    }   if (isAllowedType('https://sso.sapmed.ac.jp/idp/shibboleth','hokkaido') && isAllowedIdP('https://sso.sapmed.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://sso.sapmed.ac.jp/idp/shibboleth"
        ){
        dispDefault = '札幌医科大学';
      }
      pushIncSearchList('https://sso.sapmed.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.tomakomai-ct.ac.jp/idp/shibboleth'){
      dispDefault = '苫小牧工業高等専門学校';
    }   if (isAllowedType('https://kidp.tomakomai-ct.ac.jp/idp/shibboleth','hokkaido') && isAllowedIdP('https://kidp.tomakomai-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.tomakomai-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '苫小牧工業高等専門学校';
      }
      pushIncSearchList('https://kidp.tomakomai-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.hakodate-ct.ac.jp/idp/shibboleth'){
      dispDefault = '函館工業高等専門学校';
    }   if (isAllowedType('https://kidp.hakodate-ct.ac.jp/idp/shibboleth','hokkaido') && isAllowedIdP('https://kidp.hakodate-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.hakodate-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '函館工業高等専門学校';
      }
      pushIncSearchList('https://kidp.hakodate-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.asahikawa-nct.ac.jp/idp/shibboleth'){
      dispDefault = '旭川工業高等専門学校';
    }   if (isAllowedType('https://kidp.asahikawa-nct.ac.jp/idp/shibboleth','hokkaido') && isAllowedIdP('https://kidp.asahikawa-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.asahikawa-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '旭川工業高等専門学校';
      }
      pushIncSearchList('https://kidp.asahikawa-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.sgu.ac.jp/idp/shibboleth'){
      dispDefault = '札幌学院大学';
    }   if (isAllowedType('https://idp.sgu.ac.jp/idp/shibboleth','hokkaido') && isAllowedIdP('https://idp.sgu.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.sgu.ac.jp/idp/shibboleth"
        ){
        dispDefault = '札幌学院大学';
      }
      pushIncSearchList('https://idp.sgu.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://gakunin-idp01.mmm.muroran-it.ac.jp/idp/shibboleth'){
      dispDefault = '室蘭工業大学';
    }   if (isAllowedType('https://gakunin-idp01.mmm.muroran-it.ac.jp/idp/shibboleth','hokkaido') && isAllowedIdP('https://gakunin-idp01.mmm.muroran-it.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gakunin-idp01.mmm.muroran-it.ac.jp/idp/shibboleth"
        ){
        dispDefault = '室蘭工業大学';
      }
      pushIncSearchList('https://gakunin-idp01.mmm.muroran-it.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.fun.ac.jp/idp/shibboleth'){
      dispDefault = '公立はこだて未来大学';
    }   if (isAllowedType('https://idp.fun.ac.jp/idp/shibboleth','hokkaido') && isAllowedIdP('https://idp.fun.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.fun.ac.jp/idp/shibboleth"
        ){
        dispDefault = '公立はこだて未来大学';
      }
      pushIncSearchList('https://idp.fun.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.hokkyodai.ac.jp/idp/shibboleth'){
      dispDefault = '北海道教育大学';
    }   if (isAllowedType('https://idp.hokkyodai.ac.jp/idp/shibboleth','hokkaido') && isAllowedIdP('https://idp.hokkyodai.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.hokkyodai.ac.jp/idp/shibboleth"
        ){
        dispDefault = '北海道教育大学';
      }
      pushIncSearchList('https://idp.hokkyodai.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://sib-idp.obihiro.ac.jp/idp/shibboleth'){
      dispDefault = '帯広畜産大学';
    }   if (isAllowedType('https://sib-idp.obihiro.ac.jp/idp/shibboleth','hokkaido') && isAllowedIdP('https://sib-idp.obihiro.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://sib-idp.obihiro.ac.jp/idp/shibboleth"
        ){
        dispDefault = '帯広畜産大学';
      }
      pushIncSearchList('https://sib-idp.obihiro.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://upki.yamagata-u.ac.jp/idp/shibboleth'){
      dispDefault = '山形大学';
    }   if (isAllowedType('https://upki.yamagata-u.ac.jp/idp/shibboleth','tohoku') && isAllowedIdP('https://upki.yamagata-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://upki.yamagata-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '山形大学';
      }
      pushIncSearchList('https://upki.yamagata-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.miyakyo-u.ac.jp/idp/shibboleth'){
      dispDefault = '宮城教育大学';
    }   if (isAllowedType('https://idp.miyakyo-u.ac.jp/idp/shibboleth','tohoku') && isAllowedIdP('https://idp.miyakyo-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.miyakyo-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '宮城教育大学';
      }
      pushIncSearchList('https://idp.miyakyo-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.ichinoseki.ac.jp/idp/shibboleth'){
      dispDefault = '一関工業高等専門学校';
    }   if (isAllowedType('https://kidp.ichinoseki.ac.jp/idp/shibboleth','tohoku') && isAllowedIdP('https://kidp.ichinoseki.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.ichinoseki.ac.jp/idp/shibboleth"
        ){
        dispDefault = '一関工業高等専門学校';
      }
      pushIncSearchList('https://kidp.ichinoseki.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.hachinohe-ct.ac.jp/idp/shibboleth'){
      dispDefault = '八戸工業高等専門学校';
    }   if (isAllowedType('https://kidp.hachinohe-ct.ac.jp/idp/shibboleth','tohoku') && isAllowedIdP('https://kidp.hachinohe-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.hachinohe-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '八戸工業高等専門学校';
      }
      pushIncSearchList('https://kidp.hachinohe-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://ksidp.sendai-nct.ac.jp/idp/shibboleth'){
      dispDefault = '仙台高等専門学校　広瀬キャンパス';
    }   if (isAllowedType('https://ksidp.sendai-nct.ac.jp/idp/shibboleth','tohoku') && isAllowedIdP('https://ksidp.sendai-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://ksidp.sendai-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '仙台高等専門学校　広瀬キャンパス';
      }
      pushIncSearchList('https://ksidp.sendai-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.akita-nct.ac.jp/idp/shibboleth'){
      dispDefault = '秋田工業高等専門学校';
    }   if (isAllowedType('https://kidp.akita-nct.ac.jp/idp/shibboleth','tohoku') && isAllowedIdP('https://kidp.akita-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.akita-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '秋田工業高等専門学校';
      }
      pushIncSearchList('https://kidp.akita-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.auth.tohoku.ac.jp/idp/shibboleth'){
      dispDefault = '東北大学';
    }   if (isAllowedType('https://idp.auth.tohoku.ac.jp/idp/shibboleth','tohoku') && isAllowedIdP('https://idp.auth.tohoku.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.auth.tohoku.ac.jp/idp/shibboleth"
        ){
        dispDefault = '東北大学';
      }
      pushIncSearchList('https://idp.auth.tohoku.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.tsuruoka-nct.ac.jp/idp/shibboleth'){
      dispDefault = '鶴岡工業高等専門学校';
    }   if (isAllowedType('https://kidp.tsuruoka-nct.ac.jp/idp/shibboleth','tohoku') && isAllowedIdP('https://kidp.tsuruoka-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.tsuruoka-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '鶴岡工業高等専門学校';
      }
      pushIncSearchList('https://kidp.tsuruoka-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.fukushima-nct.ac.jp/idp/shibboleth'){
      dispDefault = '福島工業高等専門学校';
    }   if (isAllowedType('https://kidp.fukushima-nct.ac.jp/idp/shibboleth','tohoku') && isAllowedIdP('https://kidp.fukushima-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.fukushima-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '福島工業高等専門学校';
      }
      pushIncSearchList('https://kidp.fukushima-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://knidp.sendai-nct.ac.jp/idp/shibboleth'){
      dispDefault = '仙台高等専門学校 名取キャンパス';
    }   if (isAllowedType('https://knidp.sendai-nct.ac.jp/idp/shibboleth','tohoku') && isAllowedIdP('https://knidp.sendai-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://knidp.sendai-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '仙台高等専門学校 名取キャンパス';
      }
      pushIncSearchList('https://knidp.sendai-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.tohtech.ac.jp/idp/shibboleth'){
      dispDefault = '東北工業大学';
    }   if (isAllowedType('https://idp.tohtech.ac.jp/idp/shibboleth','tohoku') && isAllowedIdP('https://idp.tohtech.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.tohtech.ac.jp/idp/shibboleth"
        ){
        dispDefault = '東北工業大学';
      }
      pushIncSearchList('https://idp.tohtech.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://auas.akita-u.ac.jp/idp/shibboleth'){
      dispDefault = '秋田大学';
    }   if (isAllowedType('https://auas.akita-u.ac.jp/idp/shibboleth','tohoku') && isAllowedIdP('https://auas.akita-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://auas.akita-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '秋田大学';
      }
      pushIncSearchList('https://auas.akita-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp01.gn.hirosaki-u.ac.jp/idp/shibboleth'){
      dispDefault = '弘前大学';
    }   if (isAllowedType('https://idp01.gn.hirosaki-u.ac.jp/idp/shibboleth','tohoku') && isAllowedIdP('https://idp01.gn.hirosaki-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp01.gn.hirosaki-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '弘前大学';
      }
      pushIncSearchList('https://idp01.gn.hirosaki-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.u-aizu.ac.jp/idp/shibboleth'){
      dispDefault = '会津大学';
    }   if (isAllowedType('https://idp.u-aizu.ac.jp/idp/shibboleth','tohoku') && isAllowedIdP('https://idp.u-aizu.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.u-aizu.ac.jp/idp/shibboleth"
        ){
        dispDefault = '会津大学';
      }
      pushIncSearchList('https://idp.u-aizu.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://axl.aiu.ac.jp/idp/shibboleth'){
      dispDefault = '国際教養大学';
    }   if (isAllowedType('https://axl.aiu.ac.jp/idp/shibboleth','tohoku') && isAllowedIdP('https://axl.aiu.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://axl.aiu.ac.jp/idp/shibboleth"
        ){
        dispDefault = '国際教養大学';
      }
      pushIncSearchList('https://axl.aiu.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.fmu.ac.jp/idp/shibboleth'){
      dispDefault = '福島県立医科大学';
    }   if (isAllowedType('https://idp.fmu.ac.jp/idp/shibboleth','tohoku') && isAllowedIdP('https://idp.fmu.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.fmu.ac.jp/idp/shibboleth"
        ){
        dispDefault = '福島県立医科大学';
      }
      pushIncSearchList('https://idp.fmu.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://tg.ex-tic.com/auth/gakunin/saml2/assertions'){
      dispDefault = '東北学院大学';
    }   if (isAllowedType('https://tg.ex-tic.com/auth/gakunin/saml2/assertions','tohoku') && isAllowedIdP('https://tg.ex-tic.com/auth/gakunin/saml2/assertions')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://tg.ex-tic.com/auth/gakunin/saml2/assertions"
        ){
        dispDefault = '東北学院大学';
      }
      pushIncSearchList('https://tg.ex-tic.com/auth/gakunin/saml2/assertions');
    }   if (last_idp == 'https://idp.nii.ac.jp/idp/shibboleth'){
      dispDefault = '国立情報学研究所';
    }   if (isAllowedType('https://idp.nii.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.nii.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.nii.ac.jp/idp/shibboleth"
        ){
        dispDefault = '国立情報学研究所';
      }
      pushIncSearchList('https://idp.nii.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://upki-idp.chiba-u.jp/idp/shibboleth'){
      dispDefault = '千葉大学';
    }   if (isAllowedType('https://upki-idp.chiba-u.jp/idp/shibboleth','kanto') && isAllowedIdP('https://upki-idp.chiba-u.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://upki-idp.chiba-u.jp/idp/shibboleth"
        ){
        dispDefault = '千葉大学';
      }
      pushIncSearchList('https://upki-idp.chiba-u.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.account.tsukuba.ac.jp/idp/shibboleth'){
      dispDefault = '筑波大学';
    }   if (isAllowedType('https://idp.account.tsukuba.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.account.tsukuba.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.account.tsukuba.ac.jp/idp/shibboleth"
        ){
        dispDefault = '筑波大学';
      }
      pushIncSearchList('https://idp.account.tsukuba.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://asura.seijo.ac.jp/idp/shibboleth'){
      dispDefault = '成城大学';
    }   if (isAllowedType('https://asura.seijo.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://asura.seijo.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://asura.seijo.ac.jp/idp/shibboleth"
        ){
        dispDefault = '成城大学';
      }
      pushIncSearchList('https://asura.seijo.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://upki.toho-u.ac.jp/idp/shibboleth'){
      dispDefault = '東邦大学';
    }   if (isAllowedType('https://upki.toho-u.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://upki.toho-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://upki.toho-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '東邦大学';
      }
      pushIncSearchList('https://upki.toho-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://shibboleth.nihon-u.ac.jp/idp/shibboleth'){
      dispDefault = '日本大学';
    }   if (isAllowedType('https://shibboleth.nihon-u.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://shibboleth.nihon-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://shibboleth.nihon-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '日本大学';
      }
      pushIncSearchList('https://shibboleth.nihon-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://upki-idp.rikkyo.ac.jp/idp/shibboleth'){
      dispDefault = '立教大学';
    }   if (isAllowedType('https://upki-idp.rikkyo.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://upki-idp.rikkyo.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://upki-idp.rikkyo.ac.jp/idp/shibboleth"
        ){
        dispDefault = '立教大学';
      }
      pushIncSearchList('https://upki-idp.rikkyo.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://servs.lib.meiji.ac.jp/idp/shibboleth'){
      dispDefault = '明治大学';
    }   if (isAllowedType('https://servs.lib.meiji.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://servs.lib.meiji.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://servs.lib.meiji.ac.jp/idp/shibboleth"
        ){
        dispDefault = '明治大学';
      }
      pushIncSearchList('https://servs.lib.meiji.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://ws1.jichi.ac.jp/idp/shibboleth'){
      dispDefault = '自治医科大学';
    }   if (isAllowedType('https://ws1.jichi.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://ws1.jichi.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://ws1.jichi.ac.jp/idp/shibboleth"
        ){
        dispDefault = '自治医科大学';
      }
      pushIncSearchList('https://ws1.jichi.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://gakunin-idp.ynu.ac.jp/'){
      dispDefault = '横浜国立大学';
    }   if (isAllowedType('https://gakunin-idp.ynu.ac.jp/','kanto') && isAllowedIdP('https://gakunin-idp.ynu.ac.jp/')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gakunin-idp.ynu.ac.jp/"
        ){
        dispDefault = '横浜国立大学';
      }
      pushIncSearchList('https://gakunin-idp.ynu.ac.jp/');
    }   if (last_idp == 'https://saml-2.tmd.ac.jp/idp/shibboleth'){
      dispDefault = '東京医科歯科大学';
    }   if (isAllowedType('https://saml-2.tmd.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://saml-2.tmd.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://saml-2.tmd.ac.jp/idp/shibboleth"
        ){
        dispDefault = '東京医科歯科大学';
      }
      pushIncSearchList('https://saml-2.tmd.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.kosen-k.go.jp/idp/shibboleth'){
      dispDefault = '国立高等専門学校機構';
    }   if (isAllowedType('https://kidp.kosen-k.go.jp/idp/shibboleth','kanto') && isAllowedIdP('https://kidp.kosen-k.go.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.kosen-k.go.jp/idp/shibboleth"
        ){
        dispDefault = '国立高等専門学校機構';
      }
      pushIncSearchList('https://kidp.kosen-k.go.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.tdc.ac.jp/idp/shibboleth'){
      dispDefault = '東京歯科大学';
    }   if (isAllowedType('https://idp.tdc.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.tdc.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.tdc.ac.jp/idp/shibboleth"
        ){
        dispDefault = '東京歯科大学';
      }
      pushIncSearchList('https://idp.tdc.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://shib.ap.showa-u.ac.jp/idp/shibboleth'){
      dispDefault = '昭和大学';
    }   if (isAllowedType('https://shib.ap.showa-u.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://shib.ap.showa-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://shib.ap.showa-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '昭和大学';
      }
      pushIncSearchList('https://shib.ap.showa-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://ill.lib.kth.isp.ntt-east.co.jp/idp/shibboleth'){
      dispDefault = 'NTT東日本関東病院';
    }   if (isAllowedType('https://ill.lib.kth.isp.ntt-east.co.jp/idp/shibboleth','kanto') && isAllowedIdP('https://ill.lib.kth.isp.ntt-east.co.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://ill.lib.kth.isp.ntt-east.co.jp/idp/shibboleth"
        ){
        dispDefault = 'NTT東日本関東病院';
      }
      pushIncSearchList('https://ill.lib.kth.isp.ntt-east.co.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp01.ipc.kaiyodai.ac.jp/idp/shibboleth'){
      dispDefault = '東京海洋大学';
    }   if (isAllowedType('https://idp01.ipc.kaiyodai.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp01.ipc.kaiyodai.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp01.ipc.kaiyodai.ac.jp/idp/shibboleth"
        ){
        dispDefault = '東京海洋大学';
      }
      pushIncSearchList('https://idp01.ipc.kaiyodai.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.soka.ac.jp/idp/shibboleth'){
      dispDefault = '創価大学';
    }   if (isAllowedType('https://idp.soka.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.soka.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.soka.ac.jp/idp/shibboleth"
        ){
        dispDefault = '創価大学';
      }
      pushIncSearchList('https://idp.soka.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.igakuken.or.jp/idp/shibboleth'){
      dispDefault = '東京都医学総合研究所';
    }   if (isAllowedType('https://idp.igakuken.or.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.igakuken.or.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.igakuken.or.jp/idp/shibboleth"
        ){
        dispDefault = '東京都医学総合研究所';
      }
      pushIncSearchList('https://idp.igakuken.or.jp/idp/shibboleth');
    }   if (last_idp == 'https://gakuninidp.sic.shibaura-it.ac.jp/idp/shibboleth'){
      dispDefault = '芝浦工業大学';
    }   if (isAllowedType('https://gakuninidp.sic.shibaura-it.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://gakuninidp.sic.shibaura-it.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gakuninidp.sic.shibaura-it.ac.jp/idp/shibboleth"
        ){
        dispDefault = '芝浦工業大学';
      }
      pushIncSearchList('https://gakuninidp.sic.shibaura-it.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://tgu.u-gakugei.ac.jp/idp/shibboleth'){
      dispDefault = '東京学芸大学';
    }   if (isAllowedType('https://tgu.u-gakugei.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://tgu.u-gakugei.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://tgu.u-gakugei.ac.jp/idp/shibboleth"
        ){
        dispDefault = '東京学芸大学';
      }
      pushIncSearchList('https://tgu.u-gakugei.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.musashi.ac.jp/idp/shibboleth'){
      dispDefault = '武蔵学園';
    }   if (isAllowedType('https://idp.musashi.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.musashi.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.musashi.ac.jp/idp/shibboleth"
        ){
        dispDefault = '武蔵学園';
      }
      pushIncSearchList('https://idp.musashi.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.it-chiba.ac.jp/idp/shibboleth'){
      dispDefault = '千葉工業大学';
    }   if (isAllowedType('https://idp.it-chiba.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.it-chiba.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.it-chiba.ac.jp/idp/shibboleth"
        ){
        dispDefault = '千葉工業大学';
      }
      pushIncSearchList('https://idp.it-chiba.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://shibboleth.tama.ac.jp/idp/shibboleth'){
      dispDefault = '多摩大学';
    }   if (isAllowedType('https://shibboleth.tama.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://shibboleth.tama.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://shibboleth.tama.ac.jp/idp/shibboleth"
        ){
        dispDefault = '多摩大学';
      }
      pushIncSearchList('https://shibboleth.tama.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://upkishib.cc.ocha.ac.jp/idp/shibboleth'){
      dispDefault = 'お茶の水女子大学';
    }   if (isAllowedType('https://upkishib.cc.ocha.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://upkishib.cc.ocha.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://upkishib.cc.ocha.ac.jp/idp/shibboleth"
        ){
        dispDefault = 'お茶の水女子大学';
      }
      pushIncSearchList('https://upkishib.cc.ocha.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.tokyo-ct.ac.jp/idp/shibboleth'){
      dispDefault = '東京工業高等専門学校';
    }   if (isAllowedType('https://kidp.tokyo-ct.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://kidp.tokyo-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.tokyo-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '東京工業高等専門学校';
      }
      pushIncSearchList('https://kidp.tokyo-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.gunma-u.ac.jp/idp/shibboleth'){
      dispDefault = '群馬大学';
    }   if (isAllowedType('https://idp.gunma-u.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.gunma-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.gunma-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '群馬大学';
      }
      pushIncSearchList('https://idp.gunma-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.oyama-ct.ac.jp/idp/shibboleth'){
      dispDefault = '小山工業高等専門学校';
    }   if (isAllowedType('https://kidp.oyama-ct.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://kidp.oyama-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.oyama-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '小山工業高等専門学校';
      }
      pushIncSearchList('https://kidp.oyama-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://gakunin1.keio.ac.jp/idp/shibboleth'){
      dispDefault = '慶應義塾大学';
    }   if (isAllowedType('https://gakunin1.keio.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://gakunin1.keio.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gakunin1.keio.ac.jp/idp/shibboleth"
        ){
        dispDefault = '慶應義塾大学';
      }
      pushIncSearchList('https://gakunin1.keio.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.gunma-ct.ac.jp/idp/shibboleth'){
      dispDefault = '群馬工業高等専門学校';
    }   if (isAllowedType('https://kidp.gunma-ct.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://kidp.gunma-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.gunma-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '群馬工業高等専門学校';
      }
      pushIncSearchList('https://kidp.gunma-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://shibboleth-idp.dokkyomed.ac.jp/idp/shibboleth'){
      dispDefault = '獨協医科大学';
    }   if (isAllowedType('https://shibboleth-idp.dokkyomed.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://shibboleth-idp.dokkyomed.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://shibboleth-idp.dokkyomed.ac.jp/idp/shibboleth"
        ){
        dispDefault = '獨協医科大学';
      }
      pushIncSearchList('https://shibboleth-idp.dokkyomed.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://iccoam.tufs.ac.jp/idp/shibboleth'){
      dispDefault = '東京外国語大学';
    }   if (isAllowedType('https://iccoam.tufs.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://iccoam.tufs.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://iccoam.tufs.ac.jp/idp/shibboleth"
        ){
        dispDefault = '東京外国語大学';
      }
      pushIncSearchList('https://iccoam.tufs.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.ibaraki-ct.ac.jp/idp/shibboleth'){
      dispDefault = '茨城工業高等専門学校';
    }   if (isAllowedType('https://kidp.ibaraki-ct.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://kidp.ibaraki-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.ibaraki-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '茨城工業高等専門学校';
      }
      pushIncSearchList('https://kidp.ibaraki-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://shibboleth.cc.uec.ac.jp/idp/shibboleth'){
      dispDefault = '電気通信大学';
    }   if (isAllowedType('https://shibboleth.cc.uec.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://shibboleth.cc.uec.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://shibboleth.cc.uec.ac.jp/idp/shibboleth"
        ){
        dispDefault = '電気通信大学';
      }
      pushIncSearchList('https://shibboleth.cc.uec.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.sys.affrc.go.jp/idp/shibboleth'){
      dispDefault = 'AFFRIT/MAFFIN';
    }   if (isAllowedType('https://idp.sys.affrc.go.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.sys.affrc.go.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.sys.affrc.go.jp/idp/shibboleth"
        ){
        dispDefault = 'AFFRIT/MAFFIN';
      }
      pushIncSearchList('https://idp.sys.affrc.go.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.kisarazu.ac.jp/idp/shibboleth'){
      dispDefault = '木更津工業高等専門学校';
    }   if (isAllowedType('https://kidp.kisarazu.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://kidp.kisarazu.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.kisarazu.ac.jp/idp/shibboleth"
        ){
        dispDefault = '木更津工業高等専門学校';
      }
      pushIncSearchList('https://kidp.kisarazu.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://gakunin-idp.c.chuo-u.ac.jp/idp/shibboleth'){
      dispDefault = '中央大学';
    }   if (isAllowedType('https://gakunin-idp.c.chuo-u.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://gakunin-idp.c.chuo-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gakunin-idp.c.chuo-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '中央大学';
      }
      pushIncSearchList('https://gakunin-idp.c.chuo-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://gidp.adm.u-tokyo.ac.jp/idp/shibboleth'){
      dispDefault = '東京大学';
    }   if (isAllowedType('https://gidp.adm.u-tokyo.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://gidp.adm.u-tokyo.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gidp.adm.u-tokyo.ac.jp/idp/shibboleth"
        ){
        dispDefault = '東京大学';
      }
      pushIncSearchList('https://gidp.adm.u-tokyo.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.dendai.ac.jp/idp/shibboleth'){
      dispDefault = '東京電機大学';
    }   if (isAllowedType('https://idp.dendai.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.dendai.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.dendai.ac.jp/idp/shibboleth"
        ){
        dispDefault = '東京電機大学';
      }
      pushIncSearchList('https://idp.dendai.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.cc.seikei.ac.jp/idp/shibboleth'){
      dispDefault = '成蹊大学';
    }   if (isAllowedType('https://idp.cc.seikei.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.cc.seikei.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.cc.seikei.ac.jp/idp/shibboleth"
        ){
        dispDefault = '成蹊大学';
      }
      pushIncSearchList('https://idp.cc.seikei.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.teikyo-u.ac.jp/AccessManager/shibboleth'){
      dispDefault = '帝京大学';
    }   if (isAllowedType('https://idp.teikyo-u.ac.jp/AccessManager/shibboleth','kanto') && isAllowedIdP('https://idp.teikyo-u.ac.jp/AccessManager/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.teikyo-u.ac.jp/AccessManager/shibboleth"
        ){
        dispDefault = '帝京大学';
      }
      pushIncSearchList('https://idp.teikyo-u.ac.jp/AccessManager/shibboleth');
    }   if (last_idp == 'https://idp.tau.ac.jp/idp/shibboleth'){
      dispDefault = '東京有明医療大学';
    }   if (isAllowedType('https://idp.tau.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.tau.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.tau.ac.jp/idp/shibboleth"
        ){
        dispDefault = '東京有明医療大学';
      }
      pushIncSearchList('https://idp.tau.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.tokyo-kasei.ac.jp/idp/shibboleth'){
      dispDefault = '東京家政大学';
    }   if (isAllowedType('https://idp.tokyo-kasei.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.tokyo-kasei.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.tokyo-kasei.ac.jp/idp/shibboleth"
        ){
        dispDefault = '東京家政大学';
      }
      pushIncSearchList('https://idp.tokyo-kasei.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.grips.ac.jp/idp/shibboleth'){
      dispDefault = '政策研究大学院大学';
    }   if (isAllowedType('https://idp.grips.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.grips.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.grips.ac.jp/idp/shibboleth"
        ){
        dispDefault = '政策研究大学院大学';
      }
      pushIncSearchList('https://idp.grips.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://gakuninshib.tmu.ac.jp/idp/shibboleth'){
      dispDefault = '首都大学東京';
    }   if (isAllowedType('https://gakuninshib.tmu.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://gakuninshib.tmu.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gakuninshib.tmu.ac.jp/idp/shibboleth"
        ){
        dispDefault = '首都大学東京';
      }
      pushIncSearchList('https://gakuninshib.tmu.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp-gakunin.nap.gsic.titech.ac.jp/idp/shibboleth'){
      dispDefault = '東京工業大学';
    }   if (isAllowedType('https://idp-gakunin.nap.gsic.titech.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp-gakunin.nap.gsic.titech.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp-gakunin.nap.gsic.titech.ac.jp/idp/shibboleth"
        ){
        dispDefault = '東京工業大学';
      }
      pushIncSearchList('https://idp-gakunin.nap.gsic.titech.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.tsurumi-u.ac.jp/idp/shibboleth'){
      dispDefault = '鶴見大学';
    }   if (isAllowedType('https://idp.tsurumi-u.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.tsurumi-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.tsurumi-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '鶴見大学';
      }
      pushIncSearchList('https://idp.tsurumi-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://sidp.ibaraki.ac.jp/idp/shibboleth'){
      dispDefault = '茨城大学';
    }   if (isAllowedType('https://sidp.ibaraki.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://sidp.ibaraki.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://sidp.ibaraki.ac.jp/idp/shibboleth"
        ){
        dispDefault = '茨城大学';
      }
      pushIncSearchList('https://sidp.ibaraki.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.nims.go.jp/idp/shibboleth'){
      dispDefault = '物質・材料研究機構';
    }   if (isAllowedType('https://idp.nims.go.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.nims.go.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.nims.go.jp/idp/shibboleth"
        ){
        dispDefault = '物質・材料研究機構';
      }
      pushIncSearchList('https://idp.nims.go.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.toyaku.ac.jp/idp/shibboleth'){
      dispDefault = '東京薬科大学';
    }   if (isAllowedType('https://idp.toyaku.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.toyaku.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.toyaku.ac.jp/idp/shibboleth"
        ){
        dispDefault = '東京薬科大学';
      }
      pushIncSearchList('https://idp.toyaku.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://gakunin2.tuat.ac.jp/idp/shibboleth'){
      dispDefault = '東京農工大学';
    }   if (isAllowedType('https://gakunin2.tuat.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://gakunin2.tuat.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gakunin2.tuat.ac.jp/idp/shibboleth"
        ){
        dispDefault = '東京農工大学';
      }
      pushIncSearchList('https://gakunin2.tuat.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://gakunin-idp.shodai.ac.jp/idp/shibboleth'){
      dispDefault = '横浜商科大学';
    }   if (isAllowedType('https://gakunin-idp.shodai.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://gakunin-idp.shodai.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gakunin-idp.shodai.ac.jp/idp/shibboleth"
        ){
        dispDefault = '横浜商科大学';
      }
      pushIncSearchList('https://gakunin-idp.shodai.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://koma-sso.komazawa-u.ac.jp/idp/shibboleth'){
      dispDefault = '駒澤大学';
    }   if (isAllowedType('https://koma-sso.komazawa-u.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://koma-sso.komazawa-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://koma-sso.komazawa-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '駒澤大学';
      }
      pushIncSearchList('https://koma-sso.komazawa-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp3.qst.go.jp/idp/shibboleth'){
      dispDefault = '量子科学技術研究開発機構';
    }   if (isAllowedType('https://idp3.qst.go.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp3.qst.go.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp3.qst.go.jp/idp/shibboleth"
        ){
        dispDefault = '量子科学技術研究開発機構';
      }
      pushIncSearchList('https://idp3.qst.go.jp/idp/shibboleth');
    }   if (last_idp == 'https://rprx.rku.ac.jp/idp/shibboleth'){
      dispDefault = '流通経済大学';
    }   if (isAllowedType('https://rprx.rku.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://rprx.rku.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://rprx.rku.ac.jp/idp/shibboleth"
        ){
        dispDefault = '流通経済大学';
      }
      pushIncSearchList('https://rprx.rku.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.kanagawa-u.ac.jp/idp/shibboleth'){
      dispDefault = '神奈川大学';
    }   if (isAllowedType('https://idp.kanagawa-u.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.kanagawa-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.kanagawa-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '神奈川大学';
      }
      pushIncSearchList('https://idp.kanagawa-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.ide.go.jp/idp/shibboleth'){
      dispDefault = 'アジア経済研究所';
    }   if (isAllowedType('https://idp.ide.go.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.ide.go.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.ide.go.jp/idp/shibboleth"
        ){
        dispDefault = 'アジア経済研究所';
      }
      pushIncSearchList('https://idp.ide.go.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.senshu-u.ac.jp/idp/shibboleth'){
      dispDefault = '専修大学';
    }   if (isAllowedType('https://idp.senshu-u.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.senshu-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.senshu-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '専修大学';
      }
      pushIncSearchList('https://idp.senshu-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.geidai.ac.jp/idp/shibboleth'){
      dispDefault = '東京藝術大学';
    }   if (isAllowedType('https://idp.geidai.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.geidai.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.geidai.ac.jp/idp/shibboleth"
        ){
        dispDefault = '東京藝術大学';
      }
      pushIncSearchList('https://idp.geidai.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.aoyama.ac.jp/idp/shibboleth'){
      dispDefault = '青山学院大学';
    }   if (isAllowedType('https://idp.aoyama.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.aoyama.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.aoyama.ac.jp/idp/shibboleth"
        ){
        dispDefault = '青山学院大学';
      }
      pushIncSearchList('https://idp.aoyama.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://sso.internet.ac.jp'){
      dispDefault = '東京通信大学';
    }   if (isAllowedType('https://sso.internet.ac.jp','kanto') && isAllowedIdP('https://sso.internet.ac.jp')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://sso.internet.ac.jp"
        ){
        dispDefault = '東京通信大学';
      }
      pushIncSearchList('https://sso.internet.ac.jp');
    }   if (last_idp == 'https://idp.itc.saitama-u.ac.jp/idp/shibboleth'){
      dispDefault = '埼玉大学';
    }   if (isAllowedType('https://idp.itc.saitama-u.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.itc.saitama-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.itc.saitama-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '埼玉大学';
      }
      pushIncSearchList('https://idp.itc.saitama-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://lib.nmct.ntt-east.co.jp/idp/shibboleth'){
      dispDefault = 'NTT東日本関東病院図書館';
    }   if (isAllowedType('https://lib.nmct.ntt-east.co.jp/idp/shibboleth','kanto') && isAllowedIdP('https://lib.nmct.ntt-east.co.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://lib.nmct.ntt-east.co.jp/idp/shibboleth"
        ){
        dispDefault = 'NTT東日本関東病院図書館';
      }
      pushIncSearchList('https://lib.nmct.ntt-east.co.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.my-pharm.ac.jp/idp/shibboleth'){
      dispDefault = '明治薬科大学';
    }   if (isAllowedType('https://idp.my-pharm.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.my-pharm.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.my-pharm.ac.jp/idp/shibboleth"
        ){
        dispDefault = '明治薬科大学';
      }
      pushIncSearchList('https://idp.my-pharm.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://gakunin.st.daito.ac.jp/idp/shibboleth'){
      dispDefault = '大東文化大学';
    }   if (isAllowedType('https://gakunin.st.daito.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://gakunin.st.daito.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gakunin.st.daito.ac.jp/idp/shibboleth"
        ){
        dispDefault = '大東文化大学';
      }
      pushIncSearchList('https://gakunin.st.daito.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.kiryu-u.ac.jp/idp/shibboleth'){
      dispDefault = '桐生大学';
    }   if (isAllowedType('https://idp.kiryu-u.ac.jp/idp/shibboleth','kanto') && isAllowedIdP('https://idp.kiryu-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.kiryu-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '桐生大学';
      }
      pushIncSearchList('https://idp.kiryu-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://fed.mie-u.ac.jp/idp'){
      dispDefault = '三重大学';
    }   if (isAllowedType('https://fed.mie-u.ac.jp/idp','chubu') && isAllowedIdP('https://fed.mie-u.ac.jp/idp')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://fed.mie-u.ac.jp/idp"
        ){
        dispDefault = '三重大学';
      }
      pushIncSearchList('https://fed.mie-u.ac.jp/idp');
    }   if (last_idp == 'https://gakunin.ealps.shinshu-u.ac.jp/idp/shibboleth'){
      dispDefault = '信州大学';
    }   if (isAllowedType('https://gakunin.ealps.shinshu-u.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://gakunin.ealps.shinshu-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gakunin.ealps.shinshu-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '信州大学';
      }
      pushIncSearchList('https://gakunin.ealps.shinshu-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://gknidp.ict.nitech.ac.jp/idp/shibboleth'){
      dispDefault = '名古屋工業大学';
    }   if (isAllowedType('https://gknidp.ict.nitech.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://gknidp.ict.nitech.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gknidp.ict.nitech.ac.jp/idp/shibboleth"
        ){
        dispDefault = '名古屋工業大学';
      }
      pushIncSearchList('https://gknidp.ict.nitech.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.yamanashi.ac.jp/idp/shibboleth'){
      dispDefault = '山梨大学';
    }   if (isAllowedType('https://idp.yamanashi.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://idp.yamanashi.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.yamanashi.ac.jp/idp/shibboleth"
        ){
        dispDefault = '山梨大学';
      }
      pushIncSearchList('https://idp.yamanashi.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.suzuka-ct.ac.jp/idp/shibboleth'){
      dispDefault = '鈴鹿工業高等専門学校';
    }   if (isAllowedType('https://idp.suzuka-ct.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://idp.suzuka-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.suzuka-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '鈴鹿工業高等専門学校';
      }
      pushIncSearchList('https://idp.suzuka-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.imc.tut.ac.jp/idp/shibboleth'){
      dispDefault = '豊橋技術科学大学';
    }   if (isAllowedType('https://idp.imc.tut.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://idp.imc.tut.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.imc.tut.ac.jp/idp/shibboleth"
        ){
        dispDefault = '豊橋技術科学大学';
      }
      pushIncSearchList('https://idp.imc.tut.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.fukui-nct.ac.jp/idp/shibboleth'){
      dispDefault = '福井工業高等専門学校';
    }   if (isAllowedType('https://kidp.fukui-nct.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://kidp.fukui-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.fukui-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '福井工業高等専門学校';
      }
      pushIncSearchList('https://kidp.fukui-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.shizuoka.ac.jp/idp/shibboleth'){
      dispDefault = '静岡大学';
    }   if (isAllowedType('https://idp.shizuoka.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://idp.shizuoka.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.shizuoka.ac.jp/idp/shibboleth"
        ){
        dispDefault = '静岡大学';
      }
      pushIncSearchList('https://idp.shizuoka.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://wagner.isc.chubu.ac.jp/idp/shibboleth'){
      dispDefault = '中部大学';
    }   if (isAllowedType('https://wagner.isc.chubu.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://wagner.isc.chubu.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://wagner.isc.chubu.ac.jp/idp/shibboleth"
        ){
        dispDefault = '中部大学';
      }
      pushIncSearchList('https://wagner.isc.chubu.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.nagaoka-ct.ac.jp/idp/shibboleth'){
      dispDefault = '長岡工業高等専門学校';
    }   if (isAllowedType('https://kidp.nagaoka-ct.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://kidp.nagaoka-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.nagaoka-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '長岡工業高等専門学校';
      }
      pushIncSearchList('https://kidp.nagaoka-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.numazu-ct.ac.jp/idp/shibboleth'){
      dispDefault = '沼津工業高等専門学校';
    }   if (isAllowedType('https://kidp.numazu-ct.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://kidp.numazu-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.numazu-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '沼津工業高等専門学校';
      }
      pushIncSearchList('https://kidp.numazu-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.nagano-nct.ac.jp/idp/shibboleth'){
      dispDefault = '長野工業高等専門学校';
    }   if (isAllowedType('https://kidp.nagano-nct.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://kidp.nagano-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.nagano-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '長野工業高等専門学校';
      }
      pushIncSearchList('https://kidp.nagano-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.ishikawa-nct.ac.jp/idp/shibboleth'){
      dispDefault = '石川工業高等専門学校';
    }   if (isAllowedType('https://kidp.ishikawa-nct.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://kidp.ishikawa-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.ishikawa-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '石川工業高等専門学校';
      }
      pushIncSearchList('https://kidp.ishikawa-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kiidp.nc-toyama.ac.jp/idp/shibboleth'){
      dispDefault = '富山高等専門学校';
    }   if (isAllowedType('https://kiidp.nc-toyama.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://kiidp.nc-toyama.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kiidp.nc-toyama.ac.jp/idp/shibboleth"
        ){
        dispDefault = '富山高等専門学校';
      }
      pushIncSearchList('https://kiidp.nc-toyama.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.toba-cmt.ac.jp/idp/shibboleth'){
      dispDefault = '鳥羽商船高等専門学校';
    }   if (isAllowedType('https://kidp.toba-cmt.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://kidp.toba-cmt.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.toba-cmt.ac.jp/idp/shibboleth"
        ){
        dispDefault = '鳥羽商船高等専門学校';
      }
      pushIncSearchList('https://kidp.toba-cmt.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.gifu-nct.ac.jp/idp/shibboleth'){
      dispDefault = '岐阜工業高等専門学校';
    }   if (isAllowedType('https://kidp.gifu-nct.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://kidp.gifu-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.gifu-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '岐阜工業高等専門学校';
      }
      pushIncSearchList('https://kidp.gifu-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://sso.sugiyama-u.ac.jp/idp/shibboleth'){
      dispDefault = '椙山女学園大学';
    }   if (isAllowedType('https://sso.sugiyama-u.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://sso.sugiyama-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://sso.sugiyama-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '椙山女学園大学';
      }
      pushIncSearchList('https://sso.sugiyama-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.toyota-ct.ac.jp/idp/shibboleth'){
      dispDefault = '豊田工業高等専門学校';
    }   if (isAllowedType('https://kidp.toyota-ct.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://kidp.toyota-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.toyota-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '豊田工業高等専門学校';
      }
      pushIncSearchList('https://kidp.toyota-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://shib.nagoya-u.ac.jp/idp/shibboleth'){
      dispDefault = '名古屋大学';
    }   if (isAllowedType('https://shib.nagoya-u.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://shib.nagoya-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://shib.nagoya-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '名古屋大学';
      }
      pushIncSearchList('https://shib.nagoya-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://islwpi01.auecc.aichi-edu.ac.jp/idp/shibboleth'){
      dispDefault = '愛知教育大学';
    }   if (isAllowedType('https://islwpi01.auecc.aichi-edu.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://islwpi01.auecc.aichi-edu.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://islwpi01.auecc.aichi-edu.ac.jp/idp/shibboleth"
        ){
        dispDefault = '愛知教育大学';
      }
      pushIncSearchList('https://islwpi01.auecc.aichi-edu.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://ams.juen.ac.jp/idp/shibboleth'){
      dispDefault = '上越教育大学';
    }   if (isAllowedType('https://ams.juen.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://ams.juen.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://ams.juen.ac.jp/idp/shibboleth"
        ){
        dispDefault = '上越教育大学';
      }
      pushIncSearchList('https://ams.juen.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp1.b.cii.u-fukui.ac.jp/idp/shibboleth'){
      dispDefault = '福井大学';
    }   if (isAllowedType('https://idp1.b.cii.u-fukui.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://idp1.b.cii.u-fukui.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp1.b.cii.u-fukui.ac.jp/idp/shibboleth"
        ){
        dispDefault = '福井大学';
      }
      pushIncSearchList('https://idp1.b.cii.u-fukui.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://gakunin.gifu-u.ac.jp/idp/shibboleth'){
      dispDefault = '岐阜大学';
    }   if (isAllowedType('https://gakunin.gifu-u.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://gakunin.gifu-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gakunin.gifu-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '岐阜大学';
      }
      pushIncSearchList('https://gakunin.gifu-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.iamas.ac.jp/idp/shibboleth'){
      dispDefault = '情報科学芸術大学院大学';
    }   if (isAllowedType('https://idp.iamas.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://idp.iamas.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.iamas.ac.jp/idp/shibboleth"
        ){
        dispDefault = '情報科学芸術大学院大学';
      }
      pushIncSearchList('https://idp.iamas.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://gakunin.aitech.ac.jp/idp/shibboleth'){
      dispDefault = '愛知工業大学';
    }   if (isAllowedType('https://gakunin.aitech.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://gakunin.aitech.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gakunin.aitech.ac.jp/idp/shibboleth"
        ){
        dispDefault = '愛知工業大学';
      }
      pushIncSearchList('https://gakunin.aitech.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://ipcm2.nagaokaut.ac.jp/idp/shibboleth'){
      dispDefault = '長岡技術科学大学';
    }   if (isAllowedType('https://ipcm2.nagaokaut.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://ipcm2.nagaokaut.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://ipcm2.nagaokaut.ac.jp/idp/shibboleth"
        ){
        dispDefault = '長岡技術科学大学';
      }
      pushIncSearchList('https://ipcm2.nagaokaut.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://shibboleth.niigata-cn.ac.jp/idp/shibboleth'){
      dispDefault = '新潟県立看護大学';
    }   if (isAllowedType('https://shibboleth.niigata-cn.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://shibboleth.niigata-cn.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://shibboleth.niigata-cn.ac.jp/idp/shibboleth"
        ){
        dispDefault = '新潟県立看護大学';
      }
      pushIncSearchList('https://shibboleth.niigata-cn.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.nifs.ac.jp/idp/shibboleth'){
      dispDefault = '核融合科学研究所';
    }   if (isAllowedType('https://idp.nifs.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://idp.nifs.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.nifs.ac.jp/idp/shibboleth"
        ){
        dispDefault = '核融合科学研究所';
      }
      pushIncSearchList('https://idp.nifs.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://shib.chukyo-u.ac.jp/idp/shibboleth'){
      dispDefault = '中京大学';
    }   if (isAllowedType('https://shib.chukyo-u.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://shib.chukyo-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://shib.chukyo-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '中京大学';
      }
      pushIncSearchList('https://shib.chukyo-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.cais.niigata-u.ac.jp/idp/shibboleth'){
      dispDefault = '新潟大学学認IdP';
    }   if (isAllowedType('https://idp.cais.niigata-u.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://idp.cais.niigata-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.cais.niigata-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '新潟大学学認IdP';
      }
      pushIncSearchList('https://idp.cais.niigata-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.fujita-hu.ac.jp/idp/shibboleth'){
      dispDefault = '藤田医科大学';
    }   if (isAllowedType('https://idp.fujita-hu.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://idp.fujita-hu.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.fujita-hu.ac.jp/idp/shibboleth"
        ){
        dispDefault = '藤田医科大学';
      }
      pushIncSearchList('https://idp.fujita-hu.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://ku-sso.cis.kanazawa-u.ac.jp/idp/shibboleth'){
      dispDefault = '金沢大学';
    }   if (isAllowedType('https://ku-sso.cis.kanazawa-u.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://ku-sso.cis.kanazawa-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://ku-sso.cis.kanazawa-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '金沢大学';
      }
      pushIncSearchList('https://ku-sso.cis.kanazawa-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.gifu.shotoku.ac.jp/idp/shibboleth'){
      dispDefault = '岐阜聖徳学園大学';
    }   if (isAllowedType('https://idp.gifu.shotoku.ac.jp/idp/shibboleth','chubu') && isAllowedIdP('https://idp.gifu.shotoku.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.gifu.shotoku.ac.jp/idp/shibboleth"
        ){
        dispDefault = '岐阜聖徳学園大学';
      }
      pushIncSearchList('https://idp.gifu.shotoku.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://authidp1.iimc.kyoto-u.ac.jp/idp/shibboleth'){
      dispDefault = '京都大学';
    }   if (isAllowedType('https://authidp1.iimc.kyoto-u.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://authidp1.iimc.kyoto-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://authidp1.iimc.kyoto-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '京都大学';
      }
      pushIncSearchList('https://authidp1.iimc.kyoto-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://gakunin.kyoto-su.ac.jp/idp'){
      dispDefault = '京都産業大学';
    }   if (isAllowedType('https://gakunin.kyoto-su.ac.jp/idp','kinki') && isAllowedIdP('https://gakunin.kyoto-su.ac.jp/idp')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gakunin.kyoto-su.ac.jp/idp"
        ){
        dispDefault = '京都産業大学';
      }
      pushIncSearchList('https://gakunin.kyoto-su.ac.jp/idp');
    }   if (last_idp == 'https://fed.center.kobe-u.ac.jp/idp/shibboleth'){
      dispDefault = '神戸大学';
    }   if (isAllowedType('https://fed.center.kobe-u.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://fed.center.kobe-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://fed.center.kobe-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '神戸大学';
      }
      pushIncSearchList('https://fed.center.kobe-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.naist.jp/idp/shibboleth'){
      dispDefault = '奈良先端科学技術大学院大学';
    }   if (isAllowedType('https://idp.naist.jp/idp/shibboleth','kinki') && isAllowedIdP('https://idp.naist.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.naist.jp/idp/shibboleth"
        ){
        dispDefault = '奈良先端科学技術大学院大学';
      }
      pushIncSearchList('https://idp.naist.jp/idp/shibboleth');
    }   if (last_idp == 'https://shib-idp.nara-edu.ac.jp/idp/shibboleth'){
      dispDefault = '奈良教育大学';
    }   if (isAllowedType('https://shib-idp.nara-edu.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://shib-idp.nara-edu.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://shib-idp.nara-edu.ac.jp/idp/shibboleth"
        ){
        dispDefault = '奈良教育大学';
      }
      pushIncSearchList('https://shib-idp.nara-edu.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.ritsumei.ac.jp/idp/shibboleth'){
      dispDefault = '立命館大学';
    }   if (isAllowedType('https://idp.ritsumei.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://idp.ritsumei.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.ritsumei.ac.jp/idp/shibboleth"
        ){
        dispDefault = '立命館大学';
      }
      pushIncSearchList('https://idp.ritsumei.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp1.itc.kansai-u.ac.jp/idp/shibboleth'){
      dispDefault = '関西大学';
    }   if (isAllowedType('https://idp1.itc.kansai-u.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://idp1.itc.kansai-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp1.itc.kansai-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '関西大学';
      }
      pushIncSearchList('https://idp1.itc.kansai-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://shib.osaka-kyoiku.ac.jp/idp/shibboleth'){
      dispDefault = '大阪教育大学';
    }   if (isAllowedType('https://shib.osaka-kyoiku.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://shib.osaka-kyoiku.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://shib.osaka-kyoiku.ac.jp/idp/shibboleth"
        ){
        dispDefault = '大阪教育大学';
      }
      pushIncSearchList('https://shib.osaka-kyoiku.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp1.kyokyo-u.ac.jp/idp/shibboleth'){
      dispDefault = '京都教育大学';
    }   if (isAllowedType('https://idp1.kyokyo-u.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://idp1.kyokyo-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp1.kyokyo-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '京都教育大学';
      }
      pushIncSearchList('https://idp1.kyokyo-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://authsv.kpu.ac.jp/idp/shibboleth'){
      dispDefault = '京都府立大学';
    }   if (isAllowedType('https://authsv.kpu.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://authsv.kpu.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://authsv.kpu.ac.jp/idp/shibboleth"
        ){
        dispDefault = '京都府立大学';
      }
      pushIncSearchList('https://authsv.kpu.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.tezukayama-u.ac.jp/idp/shibboleth'){
      dispDefault = '帝塚山大学';
    }   if (isAllowedType('https://idp.tezukayama-u.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://idp.tezukayama-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.tezukayama-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '帝塚山大学';
      }
      pushIncSearchList('https://idp.tezukayama-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.tieskun.net/idp/shibboleth'){
      dispDefault = 'CCC-TIES';
    }   if (isAllowedType('https://idp.tieskun.net/idp/shibboleth','kinki') && isAllowedIdP('https://idp.tieskun.net/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.tieskun.net/idp/shibboleth"
        ){
        dispDefault = 'CCC-TIES';
      }
      pushIncSearchList('https://idp.tieskun.net/idp/shibboleth');
    }   if (last_idp == 'https://idp.ouhs.ac.jp/idp/shibboleth'){
      dispDefault = '大阪体育大学';
    }   if (isAllowedType('https://idp.ouhs.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://idp.ouhs.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.ouhs.ac.jp/idp/shibboleth"
        ){
        dispDefault = '大阪体育大学';
      }
      pushIncSearchList('https://idp.ouhs.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.maizuru-ct.ac.jp/idp/shibboleth'){
      dispDefault = '舞鶴工業高等専門学校';
    }   if (isAllowedType('https://kidp.maizuru-ct.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://kidp.maizuru-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.maizuru-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '舞鶴工業高等専門学校';
      }
      pushIncSearchList('https://kidp.maizuru-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.wakayama-nct.ac.jp/idp/shibboleth'){
      dispDefault = '和歌山工業高等専門学校';
    }   if (isAllowedType('https://kidp.wakayama-nct.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://kidp.wakayama-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.wakayama-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '和歌山工業高等専門学校';
      }
      pushIncSearchList('https://kidp.wakayama-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.akashi.ac.jp/idp/shibboleth'){
      dispDefault = '明石工業高等専門学校';
    }   if (isAllowedType('https://kidp.akashi.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://kidp.akashi.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.akashi.ac.jp/idp/shibboleth"
        ){
        dispDefault = '明石工業高等専門学校';
      }
      pushIncSearchList('https://kidp.akashi.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://g-shib.auth.oit.ac.jp/idp/shibboleth'){
      dispDefault = '大阪工業大学';
    }   if (isAllowedType('https://g-shib.auth.oit.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://g-shib.auth.oit.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://g-shib.auth.oit.ac.jp/idp/shibboleth"
        ){
        dispDefault = '大阪工業大学';
      }
      pushIncSearchList('https://g-shib.auth.oit.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.nara-k.ac.jp/idp/shibboleth'){
      dispDefault = '奈良工業高等専門学校';
    }   if (isAllowedType('https://kidp.nara-k.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://kidp.nara-k.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.nara-k.ac.jp/idp/shibboleth"
        ){
        dispDefault = '奈良工業高等専門学校';
      }
      pushIncSearchList('https://kidp.nara-k.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.kobe-cufs.ac.jp/idp/shibboleth'){
      dispDefault = '神戸市外国語大学';
    }   if (isAllowedType('https://idp.kobe-cufs.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://idp.kobe-cufs.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.kobe-cufs.ac.jp/idp/shibboleth"
        ){
        dispDefault = '神戸市外国語大学';
      }
      pushIncSearchList('https://idp.kobe-cufs.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://sumsidp.shiga-med.ac.jp/idp/shibboleth'){
      dispDefault = '滋賀医科大学';
    }   if (isAllowedType('https://sumsidp.shiga-med.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://sumsidp.shiga-med.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://sumsidp.shiga-med.ac.jp/idp/shibboleth"
        ){
        dispDefault = '滋賀医科大学';
      }
      pushIncSearchList('https://sumsidp.shiga-med.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.kobe-tokiwa.ac.jp/idp/shibboleth'){
      dispDefault = '神戸常盤大学';
    }   if (isAllowedType('https://idp.kobe-tokiwa.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://idp.kobe-tokiwa.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.kobe-tokiwa.ac.jp/idp/shibboleth"
        ){
        dispDefault = '神戸常盤大学';
      }
      pushIncSearchList('https://idp.kobe-tokiwa.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://gakunin.osaka-cu.ac.jp/idp/shibboleth'){
      dispDefault = '大阪市立大学';
    }   if (isAllowedType('https://gakunin.osaka-cu.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://gakunin.osaka-cu.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gakunin.osaka-cu.ac.jp/idp/shibboleth"
        ){
        dispDefault = '大阪市立大学';
      }
      pushIncSearchList('https://gakunin.osaka-cu.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.doshisha.ac.jp/idp/shibboleth'){
      dispDefault = '同志社大学';
    }   if (isAllowedType('https://idp.doshisha.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://idp.doshisha.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.doshisha.ac.jp/idp/shibboleth"
        ){
        dispDefault = '同志社大学';
      }
      pushIncSearchList('https://idp.doshisha.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.center.wakayama-u.ac.jp/idp/shibboleth'){
      dispDefault = '和歌山大学';
    }   if (isAllowedType('https://idp.center.wakayama-u.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://idp.center.wakayama-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.center.wakayama-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '和歌山大学';
      }
      pushIncSearchList('https://idp.center.wakayama-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.kpu-m.ac.jp/idp/shibboleth'){
      dispDefault = '京都府立医科大学';
    }   if (isAllowedType('https://idp.kpu-m.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://idp.kpu-m.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.kpu-m.ac.jp/idp/shibboleth"
        ){
        dispDefault = '京都府立医科大学';
      }
      pushIncSearchList('https://idp.kpu-m.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.otani.ac.jp/idp/shibboleth'){
      dispDefault = '大谷大学';
    }   if (isAllowedType('https://idp.otani.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://idp.otani.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.otani.ac.jp/idp/shibboleth"
        ){
        dispDefault = '大谷大学';
      }
      pushIncSearchList('https://idp.otani.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://gidp.ryukoku.ac.jp/idp/shibboleth'){
      dispDefault = '龍谷大学';
    }   if (isAllowedType('https://gidp.ryukoku.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://gidp.ryukoku.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gidp.ryukoku.ac.jp/idp/shibboleth"
        ){
        dispDefault = '龍谷大学';
      }
      pushIncSearchList('https://gidp.ryukoku.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://naraidp.cc.nara-wu.ac.jp/idp/shibboleth'){
      dispDefault = '奈良女子大学';
    }   if (isAllowedType('https://naraidp.cc.nara-wu.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://naraidp.cc.nara-wu.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://naraidp.cc.nara-wu.ac.jp/idp/shibboleth"
        ){
        dispDefault = '奈良女子大学';
      }
      pushIncSearchList('https://naraidp.cc.nara-wu.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://gk-idp.auth.osaka-u.ac.jp/idp/shibboleth'){
      dispDefault = '大阪大学';
    }   if (isAllowedType('https://gk-idp.auth.osaka-u.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://gk-idp.auth.osaka-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gk-idp.auth.osaka-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '大阪大学';
      }
      pushIncSearchList('https://gk-idp.auth.osaka-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://heimdall.osaka-aoyama.ac.jp/idp/shibboleth'){
      dispDefault = '大阪青山大学';
    }   if (isAllowedType('https://heimdall.osaka-aoyama.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://heimdall.osaka-aoyama.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://heimdall.osaka-aoyama.ac.jp/idp/shibboleth"
        ){
        dispDefault = '大阪青山大学';
      }
      pushIncSearchList('https://heimdall.osaka-aoyama.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.kindai.ac.jp/idp/shibboleth'){
      dispDefault = '近畿大学';
    }   if (isAllowedType('https://idp.kindai.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://idp.kindai.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.kindai.ac.jp/idp/shibboleth"
        ){
        dispDefault = '近畿大学';
      }
      pushIncSearchList('https://idp.kindai.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.cis.kit.ac.jp/idp/shibboleth'){
      dispDefault = '京都工芸繊維大学';
    }   if (isAllowedType('https://idp.cis.kit.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://idp.cis.kit.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.cis.kit.ac.jp/idp/shibboleth"
        ){
        dispDefault = '京都工芸繊維大学';
      }
      pushIncSearchList('https://idp.cis.kit.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.andrew.ac.jp/idp/shibboleth'){
      dispDefault = '桃山学院大学';
    }   if (isAllowedType('https://idp.andrew.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://idp.andrew.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.andrew.ac.jp/idp/shibboleth"
        ){
        dispDefault = '桃山学院大学';
      }
      pushIncSearchList('https://idp.andrew.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.kobe-ccn.ac.jp/idp/shibboleth'){
      dispDefault = '神戸市看護大学';
    }   if (isAllowedType('https://idp.kobe-ccn.ac.jp/idp/shibboleth','kinki') && isAllowedIdP('https://idp.kobe-ccn.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.kobe-ccn.ac.jp/idp/shibboleth"
        ){
        dispDefault = '神戸市看護大学';
      }
      pushIncSearchList('https://idp.kobe-ccn.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.hiroshima-u.ac.jp/idp/shibboleth'){
      dispDefault = '広島大学';
    }   if (isAllowedType('https://idp.hiroshima-u.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://idp.hiroshima-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.hiroshima-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '広島大学';
      }
      pushIncSearchList('https://idp.hiroshima-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://odidp.cc.okayama-u.ac.jp/idp/shibboleth'){
      dispDefault = '岡山大学';
    }   if (isAllowedType('https://odidp.cc.okayama-u.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://odidp.cc.okayama-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://odidp.cc.okayama-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '岡山大学';
      }
      pushIncSearchList('https://odidp.cc.okayama-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://fed.ipc.hiroshima-cu.ac.jp/idp/shibboleth'){
      dispDefault = '広島市立大学';
    }   if (isAllowedType('https://fed.ipc.hiroshima-cu.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://fed.ipc.hiroshima-cu.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://fed.ipc.hiroshima-cu.ac.jp/idp/shibboleth"
        ){
        dispDefault = '広島市立大学';
      }
      pushIncSearchList('https://fed.ipc.hiroshima-cu.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.it-hiroshima.ac.jp/idp/shibboleth'){
      dispDefault = '広島工業大学';
    }   if (isAllowedType('https://idp.it-hiroshima.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://idp.it-hiroshima.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.it-hiroshima.ac.jp/idp/shibboleth"
        ){
        dispDefault = '広島工業大学';
      }
      pushIncSearchList('https://idp.it-hiroshima.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.shudo-u.ac.jp/idp/shibboleth'){
      dispDefault = '広島修道大学';
    }   if (isAllowedType('https://idp.shudo-u.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://idp.shudo-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.shudo-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '広島修道大学';
      }
      pushIncSearchList('https://idp.shudo-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.oshima-k.ac.jp/idp/shibboleth'){
      dispDefault = '大島商船高等専門学校';
    }   if (isAllowedType('https://kidp.oshima-k.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://kidp.oshima-k.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.oshima-k.ac.jp/idp/shibboleth"
        ){
        dispDefault = '大島商船高等専門学校';
      }
      pushIncSearchList('https://kidp.oshima-k.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.kure-nct.ac.jp/idp/shibboleth'){
      dispDefault = '呉工業高等専門学校';
    }   if (isAllowedType('https://kidp.kure-nct.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://kidp.kure-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.kure-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '呉工業高等専門学校';
      }
      pushIncSearchList('https://kidp.kure-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.hiroshima-cmt.ac.jp/idp/shibboleth'){
      dispDefault = '広島商船高等専門学校';
    }   if (isAllowedType('https://kidp.hiroshima-cmt.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://kidp.hiroshima-cmt.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.hiroshima-cmt.ac.jp/idp/shibboleth"
        ){
        dispDefault = '広島商船高等専門学校';
      }
      pushIncSearchList('https://kidp.hiroshima-cmt.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.yonago-k.ac.jp/idp/shibboleth'){
      dispDefault = '米子工業高等専門学校';
    }   if (isAllowedType('https://kidp.yonago-k.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://kidp.yonago-k.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.yonago-k.ac.jp/idp/shibboleth"
        ){
        dispDefault = '米子工業高等専門学校';
      }
      pushIncSearchList('https://kidp.yonago-k.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.tsuyama-ct.ac.jp/idp/shibboleth'){
      dispDefault = '津山工業高等専門学校';
    }   if (isAllowedType('https://kidp.tsuyama-ct.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://kidp.tsuyama-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.tsuyama-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '津山工業高等専門学校';
      }
      pushIncSearchList('https://kidp.tsuyama-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.ube-k.ac.jp/idp/shibboleth'){
      dispDefault = '宇部工業高等専門学校';
    }   if (isAllowedType('https://kidp.ube-k.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://kidp.ube-k.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.ube-k.ac.jp/idp/shibboleth"
        ){
        dispDefault = '宇部工業高等専門学校';
      }
      pushIncSearchList('https://kidp.ube-k.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.tokuyama.ac.jp/idp/shibboleth'){
      dispDefault = '徳山工業高等専門学校';
    }   if (isAllowedType('https://kidp.tokuyama.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://kidp.tokuyama.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.tokuyama.ac.jp/idp/shibboleth"
        ){
        dispDefault = '徳山工業高等専門学校';
      }
      pushIncSearchList('https://kidp.tokuyama.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.matsue-ct.ac.jp/idp/shibboleth'){
      dispDefault = '松江工業高等専門学校';
    }   if (isAllowedType('https://idp.matsue-ct.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://idp.matsue-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.matsue-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '松江工業高等専門学校';
      }
      pushIncSearchList('https://idp.matsue-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.tottori-u.ac.jp/idp/shibboleth'){
      dispDefault = '鳥取大学';
    }   if (isAllowedType('https://idp.tottori-u.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://idp.tottori-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.tottori-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '鳥取大学';
      }
      pushIncSearchList('https://idp.tottori-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.shimane-u.ac.jp/idp/shibboleth'){
      dispDefault = '島根大学';
    }   if (isAllowedType('https://idp.shimane-u.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://idp.shimane-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.shimane-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '島根大学';
      }
      pushIncSearchList('https://idp.shimane-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.oka-pu.ac.jp/idp/shibboleth'){
      dispDefault = '岡山県立大学';
    }   if (isAllowedType('https://idp.oka-pu.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://idp.oka-pu.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.oka-pu.ac.jp/idp/shibboleth"
        ){
        dispDefault = '岡山県立大学';
      }
      pushIncSearchList('https://idp.oka-pu.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.pu-hiroshima.ac.jp/idp/shibboleth'){
      dispDefault = '県立広島大学';
    }   if (isAllowedType('https://idp.pu-hiroshima.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://idp.pu-hiroshima.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.pu-hiroshima.ac.jp/idp/shibboleth"
        ){
        dispDefault = '県立広島大学';
      }
      pushIncSearchList('https://idp.pu-hiroshima.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://auth.tusy.ac.jp/idp/shibboleth'){
      dispDefault = '山陽小野田市立山口東京理科大学';
    }   if (isAllowedType('https://auth.tusy.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://auth.tusy.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://auth.tusy.ac.jp/idp/shibboleth"
        ){
        dispDefault = '山陽小野田市立山口東京理科大学';
      }
      pushIncSearchList('https://auth.tusy.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.cc.yamaguchi-u.ac.jp/idp/shibboleth'){
      dispDefault = '山口大学';
    }   if (isAllowedType('https://idp.cc.yamaguchi-u.ac.jp/idp/shibboleth','chugoku') && isAllowedIdP('https://idp.cc.yamaguchi-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.cc.yamaguchi-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '山口大学';
      }
      pushIncSearchList('https://idp.cc.yamaguchi-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.cc.ehime-u.ac.jp/idp/shibboleth'){
      dispDefault = '愛媛大学';
    }   if (isAllowedType('https://idp.cc.ehime-u.ac.jp/idp/shibboleth','shikoku') && isAllowedIdP('https://idp.cc.ehime-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.cc.ehime-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '愛媛大学';
      }
      pushIncSearchList('https://idp.cc.ehime-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://gidp.ait230.tokushima-u.ac.jp/idp/shibboleth'){
      dispDefault = '徳島大学';
    }   if (isAllowedType('https://gidp.ait230.tokushima-u.ac.jp/idp/shibboleth','shikoku') && isAllowedIdP('https://gidp.ait230.tokushima-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://gidp.ait230.tokushima-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '徳島大学';
      }
      pushIncSearchList('https://gidp.ait230.tokushima-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.kochi-ct.ac.jp/idp/shibboleth'){
      dispDefault = '高知工業高等専門学校';
    }   if (isAllowedType('https://kidp.kochi-ct.ac.jp/idp/shibboleth','shikoku') && isAllowedIdP('https://kidp.kochi-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.kochi-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '高知工業高等専門学校';
      }
      pushIncSearchList('https://kidp.kochi-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://ktidp.kagawa-nct.ac.jp/idp/shibboleth'){
      dispDefault = '香川高等専門学校';
    }   if (isAllowedType('https://ktidp.kagawa-nct.ac.jp/idp/shibboleth','shikoku') && isAllowedIdP('https://ktidp.kagawa-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://ktidp.kagawa-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '香川高等専門学校';
      }
      pushIncSearchList('https://ktidp.kagawa-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.yuge.ac.jp/idp/shibboleth'){
      dispDefault = '弓削商船高等専門学校';
    }   if (isAllowedType('https://kidp.yuge.ac.jp/idp/shibboleth','shikoku') && isAllowedIdP('https://kidp.yuge.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.yuge.ac.jp/idp/shibboleth"
        ){
        dispDefault = '弓削商船高等専門学校';
      }
      pushIncSearchList('https://kidp.yuge.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.niihama-nct.ac.jp/idp/shibboleth'){
      dispDefault = '新居浜工業高等専門学校';
    }   if (isAllowedType('https://kidp.niihama-nct.ac.jp/idp/shibboleth','shikoku') && isAllowedIdP('https://kidp.niihama-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.niihama-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '新居浜工業高等専門学校';
      }
      pushIncSearchList('https://kidp.niihama-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.anan-nct.ac.jp/idp/shibboleth'){
      dispDefault = '阿南工業高等専門学校';
    }   if (isAllowedType('https://kidp.anan-nct.ac.jp/idp/shibboleth','shikoku') && isAllowedIdP('https://kidp.anan-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.anan-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '阿南工業高等専門学校';
      }
      pushIncSearchList('https://kidp.anan-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.kochi-tech.ac.jp/idp/shibboleth'){
      dispDefault = '高知工科大学';
    }   if (isAllowedType('https://idp.kochi-tech.ac.jp/idp/shibboleth','shikoku') && isAllowedIdP('https://idp.kochi-tech.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.kochi-tech.ac.jp/idp/shibboleth"
        ){
        dispDefault = '高知工科大学';
      }
      pushIncSearchList('https://idp.kochi-tech.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://aries.naruto-u.ac.jp/idp/shibboleth'){
      dispDefault = '鳴門教育大学';
    }   if (isAllowedType('https://aries.naruto-u.ac.jp/idp/shibboleth','shikoku') && isAllowedIdP('https://aries.naruto-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://aries.naruto-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '鳴門教育大学';
      }
      pushIncSearchList('https://aries.naruto-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp1.matsuyama-u.ac.jp/idp/shibboleth'){
      dispDefault = '松山大学';
    }   if (isAllowedType('https://idp1.matsuyama-u.ac.jp/idp/shibboleth','shikoku') && isAllowedIdP('https://idp1.matsuyama-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp1.matsuyama-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '松山大学';
      }
      pushIncSearchList('https://idp1.matsuyama-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.kochi-u.ac.jp/idp/shibboleth'){
      dispDefault = '高知大学';
    }   if (isAllowedType('https://idp.kochi-u.ac.jp/idp/shibboleth','shikoku') && isAllowedIdP('https://idp.kochi-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.kochi-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '高知大学';
      }
      pushIncSearchList('https://idp.kochi-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.itc.kagawa-u.ac.jp/idp/shibboleth'){
      dispDefault = '香川大学';
    }   if (isAllowedType('https://idp.itc.kagawa-u.ac.jp/idp/shibboleth','shikoku') && isAllowedIdP('https://idp.itc.kagawa-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.itc.kagawa-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '香川大学';
      }
      pushIncSearchList('https://idp.itc.kagawa-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://ssoidp.cc.saga-u.ac.jp/idp/shibboleth'){
      dispDefault = '佐賀大学';
    }   if (isAllowedType('https://ssoidp.cc.saga-u.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://ssoidp.cc.saga-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://ssoidp.cc.saga-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '佐賀大学';
      }
      pushIncSearchList('https://ssoidp.cc.saga-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.isc.kyutech.ac.jp/idp/shibboleth'){
      dispDefault = '九州工業大学';
    }   if (isAllowedType('https://idp.isc.kyutech.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://idp.isc.kyutech.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.isc.kyutech.ac.jp/idp/shibboleth"
        ){
        dispDefault = '九州工業大学';
      }
      pushIncSearchList('https://idp.isc.kyutech.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.kyushu-u.ac.jp/idp/shibboleth'){
      dispDefault = '九州大学';
    }   if (isAllowedType('https://idp.kyushu-u.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://idp.kyushu-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.kyushu-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '九州大学';
      }
      pushIncSearchList('https://idp.kyushu-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://um-idp.cc.miyazaki-u.ac.jp/idp/shibboleth'){
      dispDefault = '宮崎大学';
    }   if (isAllowedType('https://um-idp.cc.miyazaki-u.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://um-idp.cc.miyazaki-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://um-idp.cc.miyazaki-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '宮崎大学';
      }
      pushIncSearchList('https://um-idp.cc.miyazaki-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://fed.u-ryukyu.ac.jp/shibboleth'){
      dispDefault = '琉球大学';
    }   if (isAllowedType('https://fed.u-ryukyu.ac.jp/shibboleth','kyushu') && isAllowedIdP('https://fed.u-ryukyu.ac.jp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://fed.u-ryukyu.ac.jp/shibboleth"
        ){
        dispDefault = '琉球大学';
      }
      pushIncSearchList('https://fed.u-ryukyu.ac.jp/shibboleth');
    }   if (last_idp == 'https://kidp.kct.ac.jp/idp/shibboleth'){
      dispDefault = '北九州工業高等専門学校';
    }   if (isAllowedType('https://kidp.kct.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://kidp.kct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.kct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '北九州工業高等専門学校';
      }
      pushIncSearchList('https://kidp.kct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://shibboleth-idp.bene.fit.ac.jp/idp/shibboleth'){
      dispDefault = '福岡工業大学';
    }   if (isAllowedType('https://shibboleth-idp.bene.fit.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://shibboleth-idp.bene.fit.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://shibboleth-idp.bene.fit.ac.jp/idp/shibboleth"
        ){
        dispDefault = '福岡工業大学';
      }
      pushIncSearchList('https://shibboleth-idp.bene.fit.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://shib.kumamoto-u.ac.jp/idp/shibboleth'){
      dispDefault = '熊本大学';
    }   if (isAllowedType('https://shib.kumamoto-u.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://shib.kumamoto-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://shib.kumamoto-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '熊本大学';
      }
      pushIncSearchList('https://shib.kumamoto-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.oita-ct.ac.jp/idp/shibboleth'){
      dispDefault = '大分工業高等専門学校';
    }   if (isAllowedType('https://kidp.oita-ct.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://kidp.oita-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.oita-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '大分工業高等専門学校';
      }
      pushIncSearchList('https://kidp.oita-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.sasebo.ac.jp/idp/shibboleth'){
      dispDefault = '佐世保工業高等専門学校';
    }   if (isAllowedType('https://kidp.sasebo.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://kidp.sasebo.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.sasebo.ac.jp/idp/shibboleth"
        ){
        dispDefault = '佐世保工業高等専門学校';
      }
      pushIncSearchList('https://kidp.sasebo.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.kagoshima-ct.ac.jp/idp/shibboleth'){
      dispDefault = '鹿児島工業高等専門学校';
    }   if (isAllowedType('https://kidp.kagoshima-ct.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://kidp.kagoshima-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.kagoshima-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '鹿児島工業高等専門学校';
      }
      pushIncSearchList('https://kidp.kagoshima-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.kurume-nct.ac.jp/idp/shibboleth'){
      dispDefault = '久留米工業高等専門学校';
    }   if (isAllowedType('https://kidp.kurume-nct.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://kidp.kurume-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.kurume-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '久留米工業高等専門学校';
      }
      pushIncSearchList('https://kidp.kurume-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.miyakonojo-nct.ac.jp/idp/shibboleth'){
      dispDefault = '都城工業高等専門学校';
    }   if (isAllowedType('https://kidp.miyakonojo-nct.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://kidp.miyakonojo-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.miyakonojo-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '都城工業高等専門学校';
      }
      pushIncSearchList('https://kidp.miyakonojo-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.ariake-nct.ac.jp/idp/shibboleth'){
      dispDefault = '有明工業高等専門学校';
    }   if (isAllowedType('https://kidp.ariake-nct.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://kidp.ariake-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.ariake-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '有明工業高等専門学校';
      }
      pushIncSearchList('https://kidp.ariake-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.kumamoto-nct.ac.jp/idp/shibboleth'){
      dispDefault = '熊本高等専門学校';
    }   if (isAllowedType('https://kidp.kumamoto-nct.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://kidp.kumamoto-nct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.kumamoto-nct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '熊本高等専門学校';
      }
      pushIncSearchList('https://kidp.kumamoto-nct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.okinawa-ct.ac.jp/idp/shibboleth'){
      dispDefault = '沖縄工業高等専門学校';
    }   if (isAllowedType('https://kidp.okinawa-ct.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://kidp.okinawa-ct.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.okinawa-ct.ac.jp/idp/shibboleth"
        ){
        dispDefault = '沖縄工業高等専門学校';
      }
      pushIncSearchList('https://kidp.okinawa-ct.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://shibboleth-idp.kyusan-u.ac.jp/idp/shibboleth'){
      dispDefault = '九州産業大学';
    }   if (isAllowedType('https://shibboleth-idp.kyusan-u.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://shibboleth-idp.kyusan-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://shibboleth-idp.kyusan-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '九州産業大学';
      }
      pushIncSearchList('https://shibboleth-idp.kyusan-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://logon.oist.jp/idp/shibboleth'){
      dispDefault = '沖縄科学技術大学院大学';
    }   if (isAllowedType('https://logon.oist.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://logon.oist.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://logon.oist.jp/idp/shibboleth"
        ){
        dispDefault = '沖縄科学技術大学院大学';
      }
      pushIncSearchList('https://logon.oist.jp/idp/shibboleth');
    }   if (last_idp == 'https://nuidp.nagasaki-u.ac.jp/idp/shibboleth'){
      dispDefault = '長崎大学';
    }   if (isAllowedType('https://nuidp.nagasaki-u.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://nuidp.nagasaki-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://nuidp.nagasaki-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '長崎大学';
      }
      pushIncSearchList('https://nuidp.nagasaki-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.seinan-gu.ac.jp/idp/shibboleth'){
      dispDefault = '西南学院大学';
    }   if (isAllowedType('https://idp.seinan-gu.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://idp.seinan-gu.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.seinan-gu.ac.jp/idp/shibboleth"
        ){
        dispDefault = '西南学院大学';
      }
      pushIncSearchList('https://idp.seinan-gu.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.net.oita-u.ac.jp/idp/shibboleth'){
      dispDefault = '大分大学';
    }   if (isAllowedType('https://idp.net.oita-u.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://idp.net.oita-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.net.oita-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '大分大学';
      }
      pushIncSearchList('https://idp.net.oita-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://kidp.cc.kagoshima-u.ac.jp/idp/shibboleth'){
      dispDefault = '鹿児島大学';
    }   if (isAllowedType('https://kidp.cc.kagoshima-u.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://kidp.cc.kagoshima-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://kidp.cc.kagoshima-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '鹿児島大学';
      }
      pushIncSearchList('https://kidp.cc.kagoshima-u.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.nifs-k.ac.jp/idp/shibboleth'){
      dispDefault = '鹿屋体育大学';
    }   if (isAllowedType('https://idp.nifs-k.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://idp.nifs-k.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.nifs-k.ac.jp/idp/shibboleth"
        ){
        dispDefault = '鹿屋体育大学';
      }
      pushIncSearchList('https://idp.nifs-k.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://ss.fukuoka-edu.ac.jp/idp/shibboleth'){
      dispDefault = '福岡教育大学';
    }   if (isAllowedType('https://ss.fukuoka-edu.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://ss.fukuoka-edu.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://ss.fukuoka-edu.ac.jp/idp/shibboleth"
        ){
        dispDefault = '福岡教育大学';
      }
      pushIncSearchList('https://ss.fukuoka-edu.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.sun.ac.jp/idp/shibboleth'){
      dispDefault = '長崎県立大学';
    }   if (isAllowedType('https://idp.sun.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://idp.sun.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.sun.ac.jp/idp/shibboleth"
        ){
        dispDefault = '長崎県立大学';
      }
      pushIncSearchList('https://idp.sun.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.okiu.ac.jp/idp/shibboleth'){
      dispDefault = '沖縄国際大学';
    }   if (isAllowedType('https://idp.okiu.ac.jp/idp/shibboleth','kyushu') && isAllowedIdP('https://idp.okiu.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.okiu.ac.jp/idp/shibboleth"
        ){
        dispDefault = '沖縄国際大学';
      }
      pushIncSearchList('https://idp.okiu.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.gakunin.nii.ac.jp/idp/shibboleth'){
      dispDefault = '学認IdP';
    }   if (isAllowedType('https://idp.gakunin.nii.ac.jp/idp/shibboleth','others') && isAllowedIdP('https://idp.gakunin.nii.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.gakunin.nii.ac.jp/idp/shibboleth"
        ){
        dispDefault = '学認IdP';
      }
      pushIncSearchList('https://idp.gakunin.nii.ac.jp/idp/shibboleth');
    }   if (last_idp == 'https://idp.sojo-u.ac.jp/idp/shibboleth'){
      dispDefault = '崇城大学';
    }   if (isAllowedType('https://idp.sojo-u.ac.jp/idp/shibboleth','unknown') && isAllowedIdP('https://idp.sojo-u.ac.jp/idp/shibboleth')){
      if (
        "-" == "-" 
        && typeof(wayf_default_idp) != "undefined"
        && wayf_default_idp == "https://idp.sojo-u.ac.jp/idp/shibboleth"
        ){
        dispDefault = '崇城大学';
      }
      pushIncSearchList('https://idp.sojo-u.ac.jp/idp/shibboleth');
    }   if (wayf_additional_idps.length > 0){
      var listcnt = inc_search_list.length;
      
      // Show additional IdPs in the order they are defined
      for ( var i=0; i < wayf_additional_idps.length ; i++){
        if (wayf_additional_idps[i]){
          // Last used IdP is known because of local _saml_idp cookie
          if (
            wayf_additional_idps[i].name
            && wayf_additional_idps[i].entityID == last_idp
            ){
            dispDefault = wayf_additional_idps[i].name;
            inc_search_list[listcnt] = new Array();
            inc_search_list[listcnt][0] = wayf_additional_idps[i].entityID;
                                                inc_search_list[listcnt][1] = "他のフェデレーションから";
            inc_search_list[listcnt][2] = wayf_additional_idps[i].name;
            inc_search_list[listcnt][3] = wayf_additional_idps[i].name;
            listcnt++;
          }
          // If no IdP is known but the default IdP matches, use this entry
          else if (
            wayf_additional_idps[i].name
            && typeof(wayf_default_idp) != "undefined" 
            && wayf_additional_idps[i].entityID == wayf_default_idp
            ){
            dispDefault = wayf_additional_idps[i].name;
            inc_search_list[listcnt] = new Array();
            inc_search_list[listcnt][0] = wayf_additional_idps[i].entityID;
                                                inc_search_list[listcnt][1] = "他のフェデレーションから";
            inc_search_list[listcnt][2] = wayf_additional_idps[i].name;
            inc_search_list[listcnt][3] = wayf_additional_idps[i].name;
            listcnt++;
          } else if (wayf_additional_idps[i].name) {
            inc_search_list[listcnt] = new Array();
            inc_search_list[listcnt][0] = wayf_additional_idps[i].entityID;
                                                inc_search_list[listcnt][1] = "他のフェデレーションから";
            inc_search_list[listcnt][2] = wayf_additional_idps[i].name;
            inc_search_list[listcnt][3] = wayf_additional_idps[i].name;
            listcnt++;
          }
        }
      }
      
    }
    writeHTML('<div style="clear:both;"></div>');
    writeHTML('<table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">');
    writeHTML('<tr>');
    writeHTML('<td id="keytext_td" style="width: 100%;">');
    if (dispDefault == ''){
      dispidp = initdisp;
    } else {
      dispidp = dispDefault;
    }
    writeHTML('<input id="keytext" type="text" name="pattern" value="" autocomplete="off" size="60" tabindex=5 style="float: left; width: 100%; display: block"/>');
    
    writeHTML('<div style="clear:both;"></div>');
    writeHTML('<div id="view_incsearch_base">');
    writeHTML('<div id="view_incsearch_animate" style="height:' + wayf_list_height + ';">');
    writeHTML('<div id="view_incsearch_scroll" style="height:' + wayf_list_height + ';">');
    writeHTML('<div id="view_incsearch"></div>');
    writeHTML('</div>');
    writeHTML('</div>');
    writeHTML('</div>');
    writeHTML('</td>');
    
    writeHTML('<td>');
    writeHTML('<img id="dropdown_img" src="https://ds.gakunin.nii.ac.jp/GakuNinDS/images/dropdown_down.png" title="IdPリストの表示/非表示" tabindex=6 style="border:0px; width:20px; height:20px; vertical-align:middle;">');
    writeHTML('</td>');
    
    writeHTML('<td>');
    writeHTML('&nbsp;');
    writeHTML('</td>');
    
    writeHTML('<td>');
    // Do we have to display custom text?
    if(typeof(wayf_overwrite_submit_button_text) == "undefined"){
      writeHTML('<input id="wayf_submit_button" type="submit" name="Login" accesskey="s" value="選択" tabindex="10" ');
    } else {
      writeHTML('<input id="wayf_submit_button" type="submit" name="Login" accesskey="s" value="' + wayf_overwrite_submit_button_text + '" tabindex="10" ');
    }

    if (dispidp == initdisp) {
      writeHTML('disabled >');
    } else {
      writeHTML('>');
    }

    writeHTML('</td>');
    writeHTML('</tr>');

    
    writeHTML('<tr>');
    writeHTML('<td colspan="3">');
    // Draw checkbox
    writeHTML('<div id="wayf_remember_checkbox_div" style="float: left;margin-top: 0px;margin-bottom:0px; width: 100%;">');
    // Do we have to show the remember settings checkbox?
    if (wayf_show_remember_checkbox){
      // Is the checkbox forced to be checked
      if (wayf_force_remember_for_session){
        // First draw the dummy checkbox ...
        writeHTML('<input id="wayf_remember_checkbox" type="checkbox" name="session_dummy" value="true" tabindex=8 checked="checked" disabled="disabled" >&nbsp;');
        // ... and now the real but hidden checkbox
        writeHTML('<input type="hidden" name="session" value="true">&nbsp;');
      } else {
        writeHTML('<input id="wayf_remember_checkbox" type="checkbox" name="session" value="true" tabindex=8 >&nbsp;');
      }
      
      // Do we have to display custom text?
      if(typeof(wayf_overwrite_checkbox_label_text) == "undefined"){
        writeHTML('<label for="wayf_remember_checkbox" id="wayf_remember_checkbox_label" style="min-width:80px; font-size:' + wayf_font_size + 'px;color:' + wayf_font_color + ';">ブラウザ起動中は自動ログイン</label>');
        
      } else if (wayf_overwrite_checkbox_label_text != "")  {
        writeHTML('<label for="wayf_remember_checkbox" id="wayf_remember_checkbox_label" style="min-width:80px; font-size:' + wayf_font_size + 'px;color:' + wayf_font_color + ';">' + wayf_overwrite_checkbox_label_text + '</label>');
      }
    } else if (wayf_force_remember_for_session){
      // Is the checkbox forced to be checked but hidden
      writeHTML('<input id="wayf_remember_checkbox" type="hidden" name="session" value="true">&nbsp;');
    }
    writeHTML('</div>');
    writeHTML('</td>');
    
    writeHTML('<td style="vertical-align:middle; text-align:center;">');
    writeHTML('<div id="clear_a" class="default" title="検索キーを空にして、全IdPリストの表示" tabindex=11>リセット</div>');
    writeHTML('</td>');
    writeHTML('</tr>');
    writeHTML('</table>');
  
    // Close form
    writeHTML('</form>');
    
  }  // End login check
  
  // Close box
  writeHTML('</div>');
  writeHTML('<div style="clear:both;"></div>');
  
  if (typeof(dsconfig['additional_html']) != "undefined" && dsconfig['additional_html'] != ''){
    wayf_html += dsconfig['additional_html'];
  };

  // Now output HTML all at once
  return htmlSafe(wayf_html);

}

export default helper(dispDs);


/*
--------------------------------------------------------
suggest.js - Input Suggest
Version 2.2 (Update 2010/09/14)

Copyright (c) 2006-2010 onozaty (http://www.enjoyxstudy.com)

Released under an MIT-style license.

For details, see the web site:
 http://www.enjoyxstudy.com/javascript/suggest/

--------------------------------------------------------
*/
function checkDiscofeedList(json, list){
  var newList = new Array();
  var index = 0;
  var matchFlg = false;

  for (var j = 0, length = list.length; j < length; j++) {
    for (var i in json) {
      if (json[i].entityID == list[j][0]) {
        newList[index] = list[j];
        matchFlg = true;
        index++;
        break;
      }
    }
  }
  return newList;
}

function setDiscofeedList(json){
  if (!json) return;
  inc_search_list = checkDiscofeedList(json, inc_search_list);
  favorite_list = checkDiscofeedList(json, favorite_list);
  hint_list = checkDiscofeedList(json, hint_list);
}

// It adds it to window event.
function start() {
  new Suggest.Local(
        "keytext",                // element id of input area
        "view_incsearch",         // element id of IdP list display area
        "view_incsearch_animate", // element id of IdP list display animate area
        "view_incsearch_scroll",  // element id of IdP list display scroll area
        inc_search_list,          // IdP list
        favorite_list,            // IdP list (Favorite)
  hint_list,                // IdP list (Hint IP, Domain)
        "dropdown_img",           // element id of dropdown image
        "wayf_submit_button",     // element id of select button
        "clear_a",                // element id of clear
        initdisp,                 // Initial display of input area
        dispDefault,              // Select IdP display of input area
        dropdown_down,            // URL of deropdown down image 
        dropdown_up,              // URL of deropdown up image
        favorite_idp_group,       // favorite idp list group
  hint_idp_group,           // hint idp list group
        {dispMax: 500, showgrp: wayf_show_categories}); // option
}

// DiscoFeed
if (typeof(wayf_discofeed_url) != "undefined" && wayf_discofeed_url != ''){
  var urldomain = wayf_discofeed_url.split('/')[2];
  if(location.hostname != urldomain && window.XDomainRequest){
    var xdr = new XDomainRequest();
    xdr.onload = function(){
        setDiscofeedList(eval("(" + xdr.responseText + ")"));
    }
    xdr.open("get", wayf_discofeed_url, false);
    xdr.send( null );
  } else {
    $.ajax({
      type: 'get',
      url: wayf_discofeed_url,
      dataType: 'json',
      async: false,
      success: function(json) {
        setDiscofeedList(json);
      }
    });
  }
}

window.addEventListener ?
        window.addEventListener('load', start, false) :
        window.attachEvent('onload', start);

if (!Suggest) {
  var Suggest = {};
}
/*-- KeyCodes -----------------------------------------*/
Suggest.Key = {
  TAB:     9,
  RETURN: 13,
  ESC:    27,
  UP:     38,
  DOWN:   40
};

/*-- Utils --------------------------------------------*/
Suggest.copyProperties = function(dest, src) {
  for (var property in src) {
    dest[property] = src[property];
  }
  return dest;
};

/*-- Suggest.Local ------------------------------------*/
Suggest.Local = function() {
  this.initialize.apply(this, arguments);
};
Suggest.Local.prototype = {
  initialize: function(input, suggestArea, animateArea, scrollArea, candidateList, favoriteList, hintList,
                       dnupImgElm, selectElm, clearElm, initDisp, dispDefault, dnImgURL, upImgURL, favoriteIdpGroup, hintIdpGroup) {

    this.input = this._getElement(input);
    this.suggestArea = this._getElement(suggestArea);
    this.animateArea = this._getElement(animateArea);
    this.scrollArea = this._getElement(scrollArea);
    this.candidateList = candidateList;
    this.favoriteList = favoriteList;
    this.hintList = hintList;
    this.dnupImgElm = this._getElement(dnupImgElm);
    this.selectElm = this._getElement(selectElm);
    this.clearElm = this._getElement(clearElm);
    this.initDisp = initDisp;
    this.dispDefault = dispDefault;
    this.dnImgURL = dnImgURL;
    this.upImgURL = upImgURL;
    this.favoriteIdpGroup = favoriteIdpGroup;
    this.hintIdpGroup = hintIdpGroup;
    this.setInputText(dispidp);
    this.oldText = (this.initDisp == this.getInputText()) ?
      '': this.getInputText();
    this.searchFlg = false;
    this.noMatch = true;
    this.userAgentFlg = 0;
    this.discofeedFlg = false;

    if (this.candidateList.length > 0) {
      // favorite IdP List
      if (this.favoriteList.length > 0) {
        this.candidateList = this.favoriteList.concat(this.candidateList);
      }
      // hint(IP, Domain) IdP List
      if (this.hintList.length > 0) {
        this.candidateList = this.hintList.concat(this.candidateList);
      }
    }
    if (this.candidateList.length == 0) {
      this.setInputText(this.initDisp);
    }

    if (arguments[16]) this.setOptions(arguments[16]);

    // reg event
    this._addEvent(this.input, 'focus', this._bind(this.tabFocus));
    this._addEvent(this.input, 'blur', this._bind(this.tabBlur));

    var keyevent = 'keydown';
    if (window.opera || (navigator.userAgent.indexOf('Gecko') >= 0 && navigator.userAgent.indexOf('KHTML') == -1)) {
      keyevent = 'keypress';
    }
    this._addEvent(this.input, keyevent, this._bindEvent(this.keyEvent));
    this._addEvent(this.dnupImgElm, keyevent, this._bindEvent(this.keyEvent));
    this._addEvent(this.clearElm, keyevent, this._bindEvent(this.keyEvent));
    this._addEvent(this.dnupImgElm, 'click', this._bindEvent(this.elementClick));
    this._addEvent(this.clearElm, 'click', this._bindEvent(this.elementClick));
    this._addEvent(this.clearElm, 'focus', this._bindEvent(this.changeClass, this.classActive));
    this._addEvent(this.clearElm, 'blur', this._bindEvent(this.changeClass, this.classDefault));
    this._addEvent(this.clearElm, 'mouseover', this._bindEvent(this.changeClass, this.classActive));
    this._addEvent(this.clearElm, 'mouseout', this._bindEvent(this.changeClass, this.classDefault));

    // init
    this.clearSuggestArea();
    $('#' + this.animateArea.id).hide();
    this.checkUserAgent();
    this.checkNoMatch(this.oldText);
    if (this.userAgentFlg == 1){
      this.touchScroll();
    }

  },

  // options
  interval: 500,
  dispMax: 20,
  listTagName: 'div',
  prefix: false,
  ignoreCase: true,
  highlight: false,
  dispAllKey: false,
  classMouseOver: 'over',
  classSelect: 'select',
  classDefault: 'default',
  classActive: 'active',
  classGroup: 'list_group',
  classIdPNm: 'list_idp',
  classGroupFavorite: 'list_group_favorite',
  classIdPNmFavorite: 'list_idp_favorite',
  classGroupHint: 'list_group_hint',
  classIdPNmHint: 'list_idp_hint',
  dispListTime: 300,
  showgrp: true,
  hookBeforeSearch: function(){},

  setOptions: function(options) {
    Suggest.copyProperties(this, options);
  },

  checkUserAgent: function() {
    if (navigator.userAgent.indexOf('Android 2') > 0){
      this.userAgentFlg = 1;
    } else if (navigator.userAgent.indexOf('iPhone') > 0 ||
               navigator.userAgent.indexOf('iPad') > 0 ||
               navigator.userAgent.indexOf('iPod') > 0 ||
               navigator.userAgent.indexOf('Android') > 0) {
      this.userAgentFlg = 2;
    } else {
      this.userAgentFlg = 0;
    }
  },

  checkNoMatch: function(text) {
    var flg = true;

    if (text != '') {
      for (var i = 0, length = this.candidateList.length; i < length; i++) {
        for (var j = 3, length2 = this.candidateList[i].length; j < length2; j++) {
          if (text.toLowerCase() == this.candidateList[i][j].toLowerCase()) {
            flg = false;
            break;
          }
        }
        if (!flg) {
          break;
        }
      }
    }

    var search_cnt = 0;
    if (this.suggestList){
      search_cnt = this.suggestList.length - this.hintList.length - this.favoriteList.length;
    }
    if (search_cnt == 1) {
      this.setStyleActive(this.suggestList[this.hintList.length + this.favoriteList.length]);
      hiddenKeyText = this.candidateList[this.suggestIndexList[this.hintList.length + this.favoriteList.length]][2];
      this.activePosition = this.hintList.length + this.favoriteList.length;
      flg = false;
    }

    this.noMatch = flg;
  },

  elementClick: function(event) {
    var element = this._getEventElement(event);
    if (element.id == this.input.id) {
      this.execSearch();
    } else if (element.id == this.dnupImgElm.id) {
      if (this.dnupImgElm.src == this.dnImgURL) {
        if (this.getInputText() == this.initDisp) this.setInputText('');
        this.execSearch();
      } else {
        this.closeList();
      }
    } else if (element.id == this.clearElm.id) {
      this.setInputText('');
      this.execSearch();
    }
  },

  changeClass: function(event, classname) {
    var element = this._getEventElement(event);
    element.className = classname;
  },

  execSearch: function() {
    this.input.focus();
    if (!this.suggestList) {
      this.searchFlg = true;
      this.checkLoop();
    }
  },

  tabFocus: function() {
    if (!this.suggestList) {
      if (this.getInputText() == this.initDisp) this.setInputText('');
    }
  },

  tabBlur: function() {
    if (!this.suggestList) {
      if (this.getInputText() == '') this.setInputText(this.initDisp);
    }
  },

  closeList: function() {
    this.changeUnactive();
    this.oldText = (this.initDisp == this.getInputText()) ?
      '': this.getInputText();
    $('#' + this.animateArea.id).hide();

    if (this.timerId) clearTimeout(this.timerId);
    this.timerId = null;

    setTimeout(this._bind(this.clearSuggestArea), 100);
    if (document.activeElement.id != this.input.id && this.getInputText() == '')
        this.setInputText(this.initDisp);
  },

  checkLoop: function() {
    var text = this.getInputText();
    if (text == this.initDisp) {
      text = '';
    }

    this.noMatch = true;

    if (text != this.oldText || this.searchFlg) {
      hiddenKeyText = '';
      this.searchFlg = false;
      this.oldText = text;
      this.search();
    }

    if (this.timerId) clearTimeout(this.timerId);
    this.timerId = setTimeout(this._bind(this.checkLoop), this.interval);
  },

  search: function() {

    // init
    this.clearSuggestArea();

    var text = this.getInputText();

    if (text == null || text == this.initDisp) return;

    if (!this.discofeedFlg){
      this.candidateList = inc_search_list;
      this.favoriteList = favorite_list;
      this.hintList = hint_list;
      if (this.candidateList.length > 0) {
        // favorite IdP List
        if (this.favoriteList.length > 0) {
          this.candidateList = this.favoriteList.concat(this.candidateList);
        }
        // hint(IP, Domain) IdP List
        if (this.hintList.length > 0) {
          this.candidateList = this.hintList.concat(this.candidateList);
        }
      }
      if (this.candidateList.length == 0) {
        this.setInputText(this.initDisp);
      }
      this.discofeedFlg = true;
    }

    this.hookBeforeSearch(text);
    var resultList = this._search(text);
    if (resultList.length != 0) {
      this.createSuggestArea(resultList);
    } else {
      $('#' + this.animateArea.id).hide();
    }
    this.checkNoMatch(this.getInputText());
    this.selectElm.disabled = this.noMatch;
  },

  _search: function(text) {

    var resultList = [];
    var temp; 
    this.suggestIndexList = [];

    for (var i = 0, length = this.candidateList.length; i < length; i++) {
      for (var j = 3, length2 = this.candidateList[i].length; j < length2; j++) {
        if (text == '' ||
             this.isMatch(this.candidateList[i][j], text) != null ||
             this.candidateList[i][1] == this.hintIdpGroup ||
             this.candidateList[i][1] == this.favoriteIdpGroup) {
          resultList.push(this.candidateList[i]);
          this.suggestIndexList.push(i);
          break;
        }
      }
      if (this.dispMax != 0 && resultList.length >= this.dispMax) break;
    }
    return resultList;
  },

  isMatch: function(value, pattern) {

    if (value == null) return null;

    var pos = (this.ignoreCase) ?
      value.toLowerCase().indexOf(pattern.toLowerCase())
      : value.indexOf(pattern);

    if ((pos == -1) || (this.prefix && pos != 0)) return null;
    if (this.highlight) {
      return (this._escapeHTML(value.substr(0, pos)) + '<strong>' 
             + this._escapeHTML(value.substr(pos, pattern.length)) 
               + '</strong>' + this._escapeHTML(value.substr(pos + pattern.length)));
    } else {
      return this._escapeHTML(value);
    }
  },

  clearSuggestArea: function() {
    this.suggestArea.innerHTML = '';
    this.suggestList = null;
    this.suggestIndexList = null;
    this.activePosition = null;
    this.dnupImgElm.src = this.dnImgURL;
  },

  createSuggestArea: function(resultList) {

    this.suggestList = [];
    this.inputValueBackup = this.input.value;

    if (this.userAgentFlg == 1) {
      $('#' + this.scrollArea.id).flickable('disable');
    }
    var oldGroup = '';
    $('#' + this.suggestArea.id).css('width', '');
    for (var i = 0, length = resultList.length; i < length; i++) {
      if (this.showgrp && oldGroup != resultList[i][1]) {
        var element = document.createElement(this.listTagName);
        if (resultList[i][1] == this.hintIdpGroup) {
          element.className = this.classGroupHint;
          element.innerHTML = '&nbsp;' + this.hintIdpGroup;
        } else if (resultList[i][1] == this.favoriteIdpGroup) {
          element.className = this.classGroupFavorite;
          element.innerHTML = '&nbsp;' + this.favoriteIdpGroup;
        } else {
          element.className = this.classGroup;
          element.innerHTML = '&nbsp;' + resultList[i][1];
        }
        this.suggestArea.appendChild(element);
        oldGroup = resultList[i][1];
      }
        
      var element = document.createElement(this.listTagName);
      if (resultList[i][1] == this.hintIdpGroup) {
        element.className = this.classIdPNmHint;
      } else if (resultList[i][1] == this.favoriteIdpGroup) {
        element.className = this.classIdPNmFavorite;
      } else {
        element.className = this.classIdPNm;
      }
      if (this.userAgentFlg == 0) {
        element.innerHTML = resultList[i][2];
      } else {
        element.innerHTML = '<a onclick="">' + resultList[i][2] + '</a>';
      }
      this.suggestArea.appendChild(element);

      this._addEvent(element, 'click', this._bindEvent(this.listClick, i));
      this._addEvent(element, 'mouseover', this._bindEvent(this.listMouseOver, i));
      this._addEvent(element, 'mouseout', this._bindEvent(this.listMouseOut, i));

      this.suggestList.push(element);
    }

    this.scrollArea.scrollTop = 0;
    this.dnupImgElm.src = this.upImgURL;
    $('#' + this.animateArea.id).slideDown(this.dispListTime);
    var scrollbarWidth = 0;
    if (this.userAgentFlg == 0) scrollbarWidth = 19;
    var scrollAreaWidth = Number($('#' + this.scrollArea.id).css('width').replace('px', ''));
    var suggestAreaWidth = Number($('#' + this.suggestArea.id).css('width').replace('px', ''));
    if (scrollAreaWidth > suggestAreaWidth) {
      $('#' + this.suggestArea.id).css('width', scrollAreaWidth - scrollbarWidth + 'px');
    }
    if (this.userAgentFlg == 1) {
      $('#' + this.scrollArea.id).flickable('enable');
      $('#' + this.scrollArea.id).flickable('disable');
      $('#' + this.scrollArea.id).flickable('enable');
    }
  },

  touchScroll: function() {
    $('#' + this.scrollArea.id).flickable({
      disabled: false,
      elasticConstant: 0.2,
      friction: 0.7
    });
  },

  getInputText: function() {
    return this.input.value;
  },

  setInputText: function(text) {
    this.input.value = text;
  },

  // key event
  keyEvent: function(event) {

    if (!this.timerId) {
      this.timerId = setTimeout(this._bind(this.checkLoop), this.interval);
    }

    if (this._getEventElement(event).id == this.dnupImgElm.id
        || this._getEventElement(event).id == this.clearElm.id) {
      if (event.keyCode == Suggest.Key.RETURN) {
        this._stopEvent(event);
        this.elementClick(event);
      }
    } else if (this.dispAllKey && event.ctrlKey 
        && this.getInputText() == ''
        && !this.suggestList
        && event.keyCode == Suggest.Key.DOWN) {
      // dispAll
      this._stopEvent(event);
      this.keyEventDispAll();
    } else if (event.keyCode == Suggest.Key.UP ||
               event.keyCode == Suggest.Key.DOWN) {
      // search
      if (!this.suggestList && event.keyCode == Suggest.Key.DOWN) {
        this.execSearch();
      }
      // key move
      if (this.suggestList && this.suggestList.length != 0) {
  hiddenKeyText = '';
        this._stopEvent(event);
        this.keyEventMove(event.keyCode);
      } 
    } else if (event.keyCode == Suggest.Key.RETURN) {
      // fix
      if (this.selectElm.disabled == true) {
        if (this.suggestList.length != 1) {
          this._stopEvent(event);
//          this.keyEventReturn();
        }
      }
    } else if (event.keyCode == Suggest.Key.ESC) {
      // clear
      this._stopEvent(event);
      setTimeout(this._bind(this.keyEventEsc), 5);
    } else if (event.keyCode == Suggest.Key.TAB) {
      if (this.getInputText() == '') this.setInputText(this.initDisp);
      if (this.suggestList) this.closeList();
    } else {
      this.keyEventOther(event);
    }
  },

  keyEventDispAll: function() {

    // init
    this.clearSuggestArea();

    this.oldText = this.getInputText();

    this.suggestIndexList = [];
    for (var i = 0, length = this.candidateList.length; i < length; i++) {
      this.suggestIndexList.push(i);
    }

    this.createSuggestArea(this.candidateList);
  },

  keyEventMove: function(keyCode) {

    this.changeUnactive();

    if (keyCode == Suggest.Key.UP) {
      // up
      if (this.activePosition == null) {
        this.activePosition = this.suggestList.length -1;
      }else{
        this.activePosition--;
        if (this.activePosition < 0) {
          this.activePosition = null;
          this.input.value = this.inputValueBackup;
          this.scrollArea.scrollTop = 0;
          return;
        }
      }
    }else{
      // down
      if (this.activePosition == null) {
        this.activePosition = 0;
      }else{
        this.activePosition++;
      }

      if (this.activePosition >= this.suggestList.length) {
        this.activePosition = null;
        this.input.value = this.inputValueBackup;
        this.scrollArea.scrollTop = 0;
        return;
      }
    }

    this.changeActive(this.activePosition);
  },

  keyEventReturn: function() {

    if (this.activePosition != null && this.activePosition >= 0) {
      this.selectElm.disabled = false;
    }
    this.clearSuggestArea();
    this.moveEnd();
  },

  keyEventEsc: function() {

    this.setInputText('');
    this.selectElm.disabled = true;
    hiddenKeyText = '';
    this.closeList();
  },

  keyEventOther: function(event) {},

  changeActive: function(index) {

    this.setStyleActive(this.suggestList[index]);

    this.setInputText(this.candidateList[this.suggestIndexList[index]][2]);

    this.oldText = this.getInputText();
    this.input.focus();
    this.selectElm.disabled = false;
  },

  changeUnactive: function() {

    if (this.suggestList != null 
        && this.suggestList.length > 0
        && this.activePosition != null) {
      this.setStyleUnactive(this.suggestList[this.activePosition], this.activePosition);
    }
  },

  listClick: function(event, index) {

    this.closeList();
    this.changeUnactive();
    this.activePosition = index;
    this.changeActive(index);

    this.moveEnd();

    if (index != null && index >= 0) {
      this.selectElm.disabled = false;
    }
  },

  listMouseOver: function(event, index) {
    this.setStyleMouseOver(this._getEventElement(event));
  },

  listMouseOut: function(event, index) {

    if (!this.suggestList) return;

    var element = this._getEventElement(event);

    if (index == this.activePosition) {
      this.setStyleActive(element);
    }else{
      this.setStyleUnactive(element, index);
    }
  },

  setStyleActive: function(element) {
    element.className = this.classSelect;

    // auto scroll
    var offset = element.offsetTop;
    var offsetWithHeight = offset + element.clientHeight;

    if (this.scrollArea.scrollTop > offset) {
      this.scrollArea.scrollTop = offset
    } else if (this.scrollArea.scrollTop + this.scrollArea.clientHeight < offsetWithHeight) {
      this.scrollArea.scrollTop = offsetWithHeight - this.scrollArea.clientHeight;
    }
  },

  setStyleUnactive: function(element, index) {
    if (index < this.hintList.length + this.favoriteList.length){
      if (this.hintList.length > 0 && index < this.hintList.length){
        element.className = this.classIdPNmHint;
      } else {
        element.className = this.classIdPNmFavorite;
      }
    } else {
      element.className = this.classIdPNm;
    }
  },

  setStyleMouseOver: function(element) {
    element.className = this.classMouseOver;
  },

  moveEnd: function() {

    if (this.input.createTextRange) {
      this.input.focus(); // Opera
      var range = this.input.createTextRange();
      range.move('character', this.input.value.length);
      range.select();
    } else if (this.input.setSelectionRange) {
      this.input.setSelectionRange(this.input.value.length, this.input.value.length);
    }
  },

  // Utils
  _getElement: function(element) {
    return (typeof element == 'string') ? document.getElementById(element) : element;
  },
  _addEvent: (window.addEventListener ?
    function(element, type, func) {
      element.addEventListener(type, func, false);
    } :
    function(element, type, func) {
      element.attachEvent('on' + type, func);
    }),
  _stopEvent: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.returnValue = false;
      event.cancelBubble = true;
    }
  },
  _getEventElement: function(event) {
    return event.target || event.srcElement;
  },
  _bind: function(func) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    return function(){ func.apply(self, args); };
  },
  _bindEvent: function(func) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    return function(event){ event = event || window.event; func.apply(self, [event].concat(args)); };
  },
  _escapeHTML: function(value) {
    return value.replace(/\&/g, '&amp;').replace( /</g, '&lt;').replace(/>/g, '&gt;')
             .replace(/\"/g, '&quot;').replace(/\'/g, '&#39;');
  }
};

/*-- Suggest.LocalMulti ---------------------------------*/
Suggest.LocalMulti = function() {
  this.initialize.apply(this, arguments);
};
Suggest.copyProperties(Suggest.LocalMulti.prototype, Suggest.Local.prototype);

Suggest.LocalMulti.prototype.delim = ' '; // delimiter

Suggest.LocalMulti.prototype.keyEventReturn = function() {

  this.clearSuggestArea();
  this.input.value += this.delim;
  this.moveEnd();
};

Suggest.LocalMulti.prototype.keyEventOther = function(event) {

  if (event.keyCode == Suggest.Key.TAB) {
    // fix
    if (this.suggestList && this.suggestList.length != 0) {
      this._stopEvent(event);

      if (!this.activePosition) {
        this.activePosition = 0;
        this.changeActive(this.activePosition);
      }

      this.clearSuggestArea();
      this.input.value += this.delim;
      if (window.opera) {
        setTimeout(this._bind(this.moveEnd), 5);
      } else {
        this.moveEnd();
      }
    }
  }
};

Suggest.LocalMulti.prototype.listClick = function(event, index) {

  this.changeUnactive();
  this.activePosition = index;
  this.changeActive(index);

  this.input.value += this.delim;
  this.moveEnd();
};

Suggest.LocalMulti.prototype.getInputText = function() {

  var pos = this.getLastTokenPos();

  if (pos == -1) {
    return this.input.value;
  } else {
    return this.input.value.substr(pos + 1);
  }
};

Suggest.LocalMulti.prototype.setInputText = function(text) {

  var pos = this.getLastTokenPos();

  if (pos == -1) {
    this.input.value = text;
  } else {
    this.input.value = this.input.value.substr(0 , pos + 1) + text;
  }
};

Suggest.LocalMulti.prototype.getLastTokenPos = function() {
  return this.input.value.lastIndexOf(this.delim);
};

