# [Template](http://neocotic.com/template)  
# (c) 2012 Alasdair Mercer  
# Freely distributable under the MIT license.  
# For all details and documentation:  
# <http://neocotic.com/template>

# Functionality
# -------------

# Wrap the functionality in a request for Template's details in order to get
# the ID in use.
chrome.extension.sendRequest type: 'info', (data) ->
  # Names of the classes to be removed from the targeted elements.
  classes = [
    'chrome_install_button'
    'primary'
  ]
  # "Install" links to be modified.
  links   = document.querySelectorAll "a.#{classes[0]}[href$=#{data.id}]"
  # Disable all "Install" links on the homepage for Template.
  for link in links
    link.className += ' disabled'
    link.innerText  = 'Installed'
    link.className  = link.className.replace cls, '' for cls in classes