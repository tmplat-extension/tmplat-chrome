/* (c) 2011 Alasdair Mercer */
var options={init:function(){utils.i18nReplace('title, #optionTitle','opt_title');utils.i18nReplace('#featureSetting','opt_feature_header');utils.i18nReplace('#settingFeatureEnabledText','opt_feature_enabled_text');utils.i18nReplace('#urlShortenerSetting','opt_url_shortener_header');utils.i18nReplace('#urlShortenerNameHeader','opt_url_shortener_name_header');utils.i18nReplace('#urlShortenerEnabledHeader','opt_url_shortener_enabled_header');utils.i18nReplace('#urlShortenerConfigHeader','opt_url_shortener_config_header');utils.i18nReplace('#bitlyXLoginText','opt_url_shortener_username_text');utils.i18nReplace('#bitlyXApiKeyText','opt_url_shortener_api_key_text');utils.i18nReplace('#anchorSetting','opt_anchor_header');utils.i18nReplace('#settingTargetAttrText','opt_anchor_target_text');utils.i18nReplace('#settingTitleAttrText','opt_anchor_title_text');utils.i18nReplace('#notificationSetting','opt_notification_header');utils.i18nReplace('#settingNotificationText','opt_notification_text');utils.i18nReplace('#settingNotificationTimerText1','opt_notification_timer_text1');utils.i18nReplace('#settingNotificationTimerText2','opt_notification_timer_text2');utils.i18nReplace('#shorcutSetting','opt_shortcut_header');utils.i18nReplace('#settingShortcutText','opt_shortcut_text');utils.i18nReplace('#ieTabSetting','opt_ie_tab_header');utils.i18nReplace('#settingIeTabExtractText','opt_ie_tab_extract_text');utils.i18nReplace('#settingIeTabTitleText','opt_ie_tab_title_text');utils.i18nReplace('#ieTabFooter','opt_ie_tab_footer');utils.i18nReplace('#ieTabExtension','extension');utils.i18nReplace('#ieTabWebsite','website');utils.i18nReplace('#saveAndClose','opt_save_button');utils.i18nReplace('#footer','opt_footer',String(new Date().getFullYear()));$('#saveAndClose').click(options.saveAndClose);options.load();var bg=chrome.extension.getBackgroundPage();chrome.extension.sendRequest(bg.ietab.extensionId,{'key':'version','type':'GETLS'},function(response){$('#ieTabSettingDiv').show();});},load:function(){options.loadFeatures();options.loadNotifications();options.loadUrlShorteners();if(utils.get('settingShortcut')){$('#settingShortcut').attr('checked','checked');}else{$('#settingShortcut').removeAttr('checked');}
if(utils.get('settingTargetAttr')){$('#settingTargetAttr').attr('checked','checked');}else{$('#settingTargetAttr').removeAttr('checked');}
if(utils.get('settingTitleAttr')){$('#settingTitleAttr').attr('checked','checked');}else{$('#settingTitleAttr').removeAttr('checked');}
if(utils.get('settingIeTabExtract')){$('#settingIeTabExtract').removeAttr('checked');}else{$('#settingIeTabExtract').attr('checked','checked');}
if(utils.get('settingIeTabTitle')){$('#settingIeTabTitle').attr('checked','checked');}else{$('#settingIeTabTitle').removeAttr('checked');}},loadFeatures:function(){var bg=chrome.extension.getBackgroundPage();$('#settingFeatures option').remove();for(var i=0;i<bg.clipboard.features.length;i++){var feature=bg.clipboard.features[i];var opt=$('<option/>',{'text':chrome.i18n.getMessage(feature.name),'value':feature.name}).appendTo('#settingFeatures');opt.data('enabled',String(feature.isEnabled()));}
$('#settingFeatures').change(function(event){var opt=$(this).find('option:selected');if(opt.length===0){$('#moveDownButton, #moveUpButton, #settingFeatureEnabled').attr('disabled','disabled');}else{if(opt.is(':first-child')){$('#moveUpButton').attr('disabled','disabled');}else{$('#moveUpButton').removeAttr('disabled');}
if(opt.is(':last-child')){$('#moveDownButton').attr('disabled','disabled');}else{$('#moveDownButton').removeAttr('disabled');}
if(opt.data('enabled')==='true'){$('#settingFeatureEnabled').attr('checked','checked');}else{$('#settingFeatureEnabled').removeAttr('checked');}
if(bg.feature.url.name===opt.val()){$('#settingFeatureEnabled').attr('disabled','disabled');}else{$('#settingFeatureEnabled').removeAttr('disabled');}}
$('#moveDownButton:not([disabled]) img').attr('src','../images/move_down.gif');$('#moveUpButton:not([disabled]) img').attr('src','../images/move_up.gif');$('#moveDownButton[disabled] img').attr('src','../images/move_down_disabled.gif');$('#moveUpButton[disabled] img').attr('src','../images/move_up_disabled.gif');}).change();$('#moveDownButton').click(function(event){var opt=$('#settingFeatures option:selected');opt.insertAfter(opt.next());$('#settingFeatures').change();});$('#moveUpButton').click(function(event){var opt=$('#settingFeatures option:selected');opt.insertBefore(opt.prev());$('#settingFeatures').change();});$('#settingFeatureEnabled').click(function(event){$('#settingFeatures option:selected').data('enabled',String($(this).is(':checked')));});},loadNotifications:function(){if(utils.get('settingNotification')){$('#settingNotification').attr('checked','checked');}else{$('#settingNotification').removeAttr('checked');}
var timeInSecs=0;if(utils.get('settingNotificationTimer')>timeInSecs){timeInSecs=utils.get('settingNotificationTimer')/1000;}
$('#settingNotificationTimer option').remove();for(var i=0;i<=30;i++){var opt=$('<option/>',{'text':i,'value':i});if(i===timeInSecs){opt.attr('selected','selected');}
opt.appendTo('#settingNotificationTimer');}},loadUrlShorteners:function(){$('input[name="settingEnabledUrlShortener"]').each(function(){var radio=$(this);if(utils.get(radio.attr('id'))){radio.attr('checked','checked');}});$('#bitlyXApiKey').val(utils.get('bitlyXApiKey'));$('#bitlyXLogin').val(utils.get('bitlyXLogin'));},save:function(){utils.set('settingShortcut',$('#settingShortcut').is(':checked'));utils.set('settingTargetAttr',$('#settingTargetAttr').is(':checked'));utils.set('settingTitleAttr',$('#settingTitleAttr').is(':checked'));utils.set('settingIeTabExtract',!$('#settingIeTabExtract').is(':checked'));utils.set('settingIeTabTitle',$('#settingIeTabTitle').is(':checked'));options.saveFeatures();options.saveNotifications();options.saveUrlShorteners();},saveAndClose:function(event){options.save();chrome.tabs.getSelected(null,function(tab){chrome.tabs.remove(tab.id);});},saveFeatures:function(){var bg=chrome.extension.getBackgroundPage();$('#settingFeatures option').each(function(index){var opt=$(this);switch(opt.val()){case bg.feature.anchor.name:utils.set('copyAnchorEnabled',opt.data('enabled')==='true');utils.set('copyAnchorOrder',index);break;case bg.feature.bbcode.name:utils.set('copyBBCodeEnabled',opt.data('enabled')==='true');utils.set('copyBBCodeOrder',index);break;case bg.feature.encoded.name:utils.set('copyEncodedEnabled',opt.data('enabled')==='true');utils.set('copyEncodedOrder',index);break;case bg.feature.short.name:utils.set('copyShortEnabled',opt.data('enabled')==='true');utils.set('copyShortOrder',index);break;case bg.feature.url.name:utils.set('copyUrlEnabled',opt.data('enabled')==='true');utils.set('copyUrlOrder',index);break;}});bg.clipboard.updateFeatures();},saveNotifications:function(){utils.set('settingNotification',$('#settingNotification').is(':checked'));var timeInSecs=$('#settingNotificationTimer').val();timeInSecs=(timeInSecs)?parseInt(timeInSecs,10)*1000:0;utils.set('settingNotificationTimer',timeInSecs);},saveUrlShorteners:function(){$('input[name="settingEnabledUrlShortener"]').each(function(){var radio=$(this);utils.set(radio.attr('id'),radio.is(':checked'));});utils.set('bitlyXApiKey',$('#bitlyXApiKey').val());utils.set('bitlyXLogin',$('#bitlyXLogin').val());}};