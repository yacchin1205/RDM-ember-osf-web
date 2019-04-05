var dsconfig;
dsconfig = {
  wayf_URL: "https://test-ds.gakunin.nii.ac.jp/WAYF",
  wayf_sp_entityID: "https://accounts.test.rdm.nii.ac.jp/shibboleth-sp",
  wayf_sp_handlerURL: "https://accounts.test.rdm.nii.ac.jp/Shibboleth.sso",
  wayf_return_url: "https://accounts.test.rdm.nii.ac.jp/login?service=https://test.rdm.nii.ac.jp/",
  wayf_width: 430,
  wayf_height: "auto",
  wayf_show_remember_checkbox: false,
  wayf_force_remember_for_session: false,
  wayf_use_small_logo: true,
  wayf_hide_logo: true,
  wayf_show_categories: false,
  wayf_overwrite_intro_text: "",
  wayf_font_size: 11,
  wayf_font_color: '#000000',
  wayf_border_color: '#00247D',
  wayf_background_color: '#F4F7F7',
  wayf_auto_login: true,
  wayf_hide_after_login: false,
  wayf_hide_categories:  new Array("all"),
  wayf_unhide_idps: new Array(
      "https://openidp.nii.ac.jp/idp/shibboleth",
      "https://idp.rdm.nii.ac.jp/idp/shibboleth",
      "https://shib.nagoya-u.ac.jp/idp/shibboleth",
      "https://authidp1.iimc.kyoto-u.ac.jp/idp/shibboleth"
),
  wayf_additional_idps: [
      {name: "OpenIdP",
      entityID: "https://openidp.nii.ac.jp/idp/shibboleth",
      SAML1SSOurl: "https://openidp.nii.ac.jp/idp/profile/Shibboleth/SSO"},
      {name: "GakuNin RDM IdP",
      entityID: "https://idp.rdm.nii.ac.jp/idp/shibboleth",
      SAML1SSOurl: "https://idp.rdm.nii.ac.jp/idp/profile/Shibboleth/SSO"},
],
  wayf_sp_cookie_path: "/",
  wayf_list_height: 350,
  additional_html: `
<style>  
div#wayfInMenu {
 float: left !important;
}
div#wayf_div {
 padding: 5px !important;
 width: auto !important;
 max-width: 430px !important;
}
.wayf_col .wayf_col {
 flex-direction: row !important;
 padding-left: 0px !important;
 padding-right: 0px !important;
}
div.wayf_radioArea {
 display: none !important;
}
div.wayf_row {
 padding-left: 5px !important;
 padding-right: 5px !important;
}
div.wayf_linkArea {
 align-content: center !important;
}
form#IdPList table tbody {
 display: flex !important;
 flex-direction: row !important;
}
form#IdPList table tbody tr td div#clear_a {
 text-decoration: none;
 margin-top: 10px;
 margin-left: 5px;
 margin-right: 3px;
}
@media only screen and (max-width: 768px) {
 #wayf_div .wayf_inputArea {
  flex-wrap: nowrap !important;
 }
 #wayf_submit_div {
  width: auto !important;
 }
}
@media only screen and (max-width: 767px) {
 #wayf_div .wayf_inputArea {
  flex-wrap: wrap !important;
 }
 #wayf_submit_div {
  width: 100% !important;
 }
}
</style>
  `
};

export default dsconfig;
