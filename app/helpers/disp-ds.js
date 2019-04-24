import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import $ from 'jquery';
import ENV from '../config/environment';

var dsconfig = ENV.dsconfig;
var modulePrefix = ENV.modulePrefix;

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
var wayf_overwrite_intro_text = dsconfig['wayf_overwrite_intro_text'];
var wayf_overwrite_most_used_idps_text = dsconfig['wayf_overwrite_most_used_idps_text'];
var wayf_default_idp;

var wayf_html = "";

var wayf_idps = {};

var wayf_hint_list = [  ];
var inc_search_list = [];
var favorite_list = [];
var hint_list = [];
var submit_check_list = [];
var safekind = '2';
//var allIdPList = '';
var initdisp = '所属している機関を選択';
var dispDefault = '';
var dispidp = '';
var hiddenKeyText = '';
var dropdown_up = 'https://ds.gakunin.nii.ac.jp/GakuNinDS/images/dropdown_up.png';
var dropdown_down = 'https://ds.gakunin.nii.ac.jp/GakuNinDS/images/dropdown_down.png';
var favorite_idp_group = "Most often used Home Organisations";
var hint_idp_group = 'ヒント！所属機関';
var location_dic = {
  hokkaido: '北海道',
  tohoku: '東北',
  kanto: '関東',
  chubu: '中部',
  kinki: '近畿',
  chugoku: '中国',
  shikoku: '四国',
  kyushu: '九州',
  others: '他のフェデレーションから'
};
var metadata_url = '/' + modulePrefix + '/gakunin-metadata.xml';

export function dispDs(disp) {
  if(disp != 'true'){
    start();
    $("#IdPList").on('submit', submit);
    return;
  }
  setup_wayf_idps();
  build_html();
  // Now output HTML all at once
  return htmlSafe(wayf_html);
}

export default helper(dispDs);

function setup_wayf_idps() {
   $.ajax(metadata_url, {async: false}).done(function(xml){
    var entity_discriptors = $(xml).find('EntityDescriptor');
    for(let entity_discriptior of entity_discriptors) {
      var entity_id = $(entity_discriptior).attr('entityID');
      var idp_descriptor = $(entity_discriptior).find('IDPSSODescriptor');
      if(idp_descriptor.length > 0){
        var location = $(idp_descriptor).find('mdui\\:Keywords', 'Keywords').text().replace(/.?category:location:(\w*).*/, "$1");
        var name_ja = $(idp_descriptor).find('mdui\\:DisplayName[xml\\:lang="ja"]', 'DisplayName[lang="ja"]').text();
        var name_en = $(idp_descriptor).find('mdui\\:DisplayName[xml\\:lang="en"]', 'DisplayName[lang="en"]').text();
        var org_name_ja = $(idp_descriptor).find('OrganizationName[xml\\:lang="ja"]', 'OrganizationName[lang="ja"]').text();
        var saml_url = $(idp_descriptor).find('SingleSignOnService[Binding="urn\\:mace\\:shibboleth\\:1.0\\:profiles\\:AuthnRequest"]').attr('Location');
        var entry = {
          entity_id: entity_id,
          type: location,
          name: name_ja,
          search: [entity_id, location_dic[location], name_ja, name_en, org_name_ja],
          SAML1SSOurl: saml_url
        };
        wayf_idps[entity_id] = entry;
      }
    }
  });
}

function wayf_check_login_state_function() {
  isCookie('shibsession');
}

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
      
      for ( var j=0; j <= wayf_unhide_idps.length; j++){
        // Show IdP if it has to be unhidden
        if (wayf_unhide_idps[j] == IdP){
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

//function isAllowedCategory(category){
//  
//  if (!category || category == ''){
//    return true;
//  }
//  
//  for ( var i=0; i<= wayf_hide_categories.length; i++){
//    
//    if (wayf_hide_categories[i] == category || wayf_hide_categories[i] == "all" ){
//      return false;
//    }
//  }
//  
//  // Category was not hidden
//  return true;
//}

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
  //var base64test = /[^A-Za-z0-9+/=]/g;
  input = input.replace(/[^A-Za-z0-9+/=]/g, "");
  
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

function build_html() {  
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
  user_logged_in = wayf_check_login_state_function();
  
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
    for(let key of Object.keys(wayf_idps)) {
      if (last_idp == key){
        dispDefault = wayf_idps[key]['name'];
      }
      if (isAllowedType(key, wayf_idps[key]['type']) && isAllowedIdP(key)){
        if (
          "-" == "-" 
          && typeof(wayf_default_idp) != "undefined"
          && wayf_default_idp == key
          ){
        dispDefault = wayf_idps[key]['name'];
        }
      pushIncSearchList(key);
      }
    }




    if (wayf_additional_idps.length > 0){
      var listcnt = inc_search_list.length;
      
      // Show additional IdPs in the order they are defined
      for ( var j=0; j < wayf_additional_idps.length ; j++){
        if (wayf_additional_idps[j]){
          // Last used IdP is known because of local _saml_idp cookie
          if (
            wayf_additional_idps[j].name
            && wayf_additional_idps[j].entityID == last_idp
            ){
            dispDefault = wayf_additional_idps[j].name;
            inc_search_list[listcnt] = new Array();
            inc_search_list[listcnt][0] = wayf_additional_idps[j].entityID;
                                                inc_search_list[listcnt][1] = "他のフェデレーションから";
            inc_search_list[listcnt][2] = wayf_additional_idps[j].name;
            inc_search_list[listcnt][3] = wayf_additional_idps[j].name;
            listcnt++;
          }
          // If no IdP is known but the default IdP matches, use this entry
          else if (
            wayf_additional_idps[j].name
            && typeof(wayf_default_idp) != "undefined" 
            && wayf_additional_idps[j].entityID == wayf_default_idp
            ){
            dispDefault = wayf_additional_idps[j].name;
            inc_search_list[listcnt] = new Array();
            inc_search_list[listcnt][0] = wayf_additional_idps[j].entityID;
                                                inc_search_list[listcnt][1] = "他のフェデレーションから";
            inc_search_list[listcnt][2] = wayf_additional_idps[j].name;
            inc_search_list[listcnt][3] = wayf_additional_idps[j].name;
            listcnt++;
          } else if (wayf_additional_idps[j].name) {
            inc_search_list[listcnt] = new Array();
            inc_search_list[listcnt][0] = wayf_additional_idps[j].entityID;
                                                inc_search_list[listcnt][1] = "他のフェデレーションから";
            inc_search_list[listcnt][2] = wayf_additional_idps[j].name;
            inc_search_list[listcnt][3] = wayf_additional_idps[j].name;
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
  }
}



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
  //var matchFlg = false;

  for (var j = 0, length = list.length; j < length; j++) {
    for (var i in json) {
      if (json[i].entityID == list[j][0]) {
        newList[index] = list[j];
        //matchFlg = true;
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
    //var temp; 
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
      var element;
      if (this.showgrp && oldGroup != resultList[i][1]) {
        element = document.createElement(this.listTagName);
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
        
      element = document.createElement(this.listTagName);
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

  keyEventOther: function() {},

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

  listMouseOver: function(event) {
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
    return value.replace(/&/g, '&amp;').replace( /</g, '&lt;').replace(/>/g, '&gt;')
             .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
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

