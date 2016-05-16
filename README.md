# etc-skin
Reskin etc webapp
[BETA]

An alternate skin for the electronic time card webapp used by esri.

Features:
- Click WBS titles to see more information about the project
- Fluid layout that takes advantage of larger screens
- Improved ui including larger, and prettier buttons, and icons

Requirements: Certain features require the use of a custom script plugin that will run some javascript when you load the page. This javascript just adds some click handlers and classes to make the new stuff work. I suggest CJS (https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija?hl=en). Once the plugin is installed, paste the below script into the cjs menu and click save.

```
$.each(
    $('td[id^="chgRow"] div'),
    function(index, value) {
        $(value).click(function() {
            var url;
            var wbs = $(value).attr('id');
            if (wbs[0] === 'C') {
                //is a project wbs
                var projectUrl = 'http://pswebsp:85/pdb/ProjectOverview.asp?projnum=';
                wbs = wbs.substring(0, wbs.indexOf('A'));
                var projectWbs = [wbs.slice(0, 1), '.', wbs.slice(1)].join('');
                url = projectUrl + projectWbs;
            } else {
                //some other kind of wbs
                url = 'http://arczone.esri.com/utilities/finder/index.cfm?fa=io&wbs=' + $(value).attr('id');
            }

            var win = window.open(url, '_blank');
            if(win){
                //Browser has allowed it to be opened
                win.focus();
            }else{
                //Broswer has blocked it
                alert('Please allow popups to see details about this WBS');
            }
        })
    }
);

var hrefStrings = ['history', 'javascript:Vacation', 'javascript:Sick', 'javascript:bank', 'javascript:Jury', 'audit', 'javascript:Password', 'ts_summary', 'ts_query', 'ext_hrs_details'];
var iconStrings = ['history', 'glass', 'frown-o', 'university', 'gavel', 'eye', 'lock', 'list-alt', 'search', 'clock-o'];
$.each(hrefStrings, function(index, value) {
  var el = $('a[href^="' + value + '"] b');
  $(el).attr('class', 'menu-link link-icon-' + iconStrings[index]);
});
```

For questions or help email me at clawson@esri.com
