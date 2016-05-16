// Here You can type your custom JavaScript...
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
