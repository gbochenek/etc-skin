//set page class for some conditional styles
var pageTitle = $('body title').html();
switch (pageTitle) {
    case 'Charge Number Message':
        $('body').addClass('wbs-message-page');
        break;
    default:
        $('body').addClass('wbs-detail-page');
}

//Set user icon based on id number
var userId = $('form > table > tbody > tr > td > table:first-of-type tr:nth-child(3) td:nth-child(0n + 1) strong font').html();
var userIcon;
if (parseInt(userId) < 7018) {
    userIcon = 'user-empire';
} else {
    userIcon = 'user-rebel';
}
$('form > table > tbody > tr > td > table:first-of-type tr:nth-child(3) td:nth-child(2)').addClass('user-icon ' + userIcon);

//create wbs links
$.each(
    $('td[id^="chgRow"] div'),
    function(index, value) {
        //link strings
        var baseRelatedLink = 'http://arczone.esri.com/utilities/finder/index.cfm?';
        var relatedWbsLink = 'fa=wbs&wbs=';
        var relatedIoLink = 'fa=io&io=';
        var baseDetailsLink = 'http://pswebsp:85/pdb/ProjectOverview.asp?projnum=';
        var relatedTooltip = 'View Related Numbers';
        var detailsTooltip = 'View Project Details';
        var ignoredIds = ['BERE', 'COMP', 'JURY', 'SICK', 'VACA', 'NOPA', 'HOLI'];

        var wbs = $(value).attr('id');

        //need to skip all this if the wbs is something like vacation or holiday
        if (ignoredIds.indexOf(wbs) < 0) {
            var actionContainer = $('<span class="wbs-link-container"></span>');
            //create the links because we know we have at least some details
            var hasProjectDetails = wbs[0] === 'C';
            var projectWbs;

            //format the project id for other pages to search
            //trims the id and adds '.'
            if (hasProjectDetails) {
                projectWbs = wbs.substring(0, wbs.indexOf('A'));
                projectWbs = [projectWbs.slice(0, 1), '.', projectWbs.slice(1)].join('');
            }

            //create domNodes for details and related wbs
            if (hasProjectDetails) {
                var projectDetailsLink = baseDetailsLink + projectWbs;
                $(actionContainer).append('<a href="' + projectDetailsLink + '" target="_blank" class="wbs-link details-wbs-link" data-tooltip-text="' + detailsTooltip + '"><i class="fa fa-info-circle"></i></a>');
            }

            //now for the related wbs link
            var relatedWbsLink;
            if (hasProjectDetails) {
                relatedWbsLink = baseRelatedLink + relatedWbsLink + projectWbs;
            } else {
                relatedWbsLink = baseRelatedLink + relatedIoLink + wbs;
            }
            $(actionContainer).append('<a href="' + relatedWbsLink + '" target="_blank" class="wbs-link related-wbs-link" data-tooltip-text="' + relatedTooltip + '"><i class="fa fa-list"></i></a>');

            $(value).append(actionContainer);
        }
    }
);


//get todays date and end of pay period date
var selectedDate = $('select[name="selpp2"] option:selected').text();
//strip the start date
selectedDate = selectedDate.split(' ');
selectedDate.splice(1, 2);
selectedDate = selectedDate.join('');
var lastDay = new Date(selectedDate);

var todaysDay = ('0' + new Date().getDate()).slice(-2);
var todaysMonth = ('0' + (new Date().getMonth() + 1)).slice(-2);
var todaysYear = new Date().getFullYear();
var todaysDate = todaysMonth + '/' + todaysDay;
var todaysDateObj = new Date(todaysDate + '/' + todaysYear);

//if today is the last day of the pay period lets add a class to the submit/summary menu link
if (JSON.stringify(todaysDateObj) == JSON.stringify(lastDay)) {
    $('a[href*="ts_summary"] b').addClass('last-day-submit');
}

//loop through the header rows and get the index for the current date, and last day of pay period
var contentRows = 'form > table > tbody > tr > td > table:nth-child(0n + 4) > tbody > tr > td:last-child > table:nth-child(0n + 2) > tbody > tr';
var todaysColIndex;
$.each(
    $(contentRows + ':nth-child(0n + 2) td'),
    function(index, value) {
      var colDate = $(value).find('b:first-child').html();
      if (colDate) {
          var formattedColDate = ('0' + colDate).slice(-5);
          var colDateWithYear = new Date(formattedColDate + '/' + todaysYear);

          if (formattedColDate == todaysDate) {
              //this is the current day column, use this index for adding classes to the other rows
              todaysColIndex = index + 1;
          }

          //if this is the last day of the pay period and it's a sunday lets add a class to the header
          if ((JSON.stringify(colDateWithYear) == JSON.stringify(lastDay)) && (lastDay.getDay() == 0)) {
              $(value).addClass('last-day-col');
          }
      }
    }
);

//add a class to the whole column for todays date
if (todaysColIndex) {
    $.each(
        $(contentRows + '>td:nth-child(0n+' + todaysColIndex + ')'),
        function(index, value) {
          $(value).addClass('today-col');
        }
    );
}

//create another menu option for overhead request
$('form > table > tbody > tr > td > table:nth-child(0n + 4) > tbody > tr > td:first-child font').last().append('<br><br><font face="arial" size="1"><a href="http://pswebsp/applications/overhead/ohmenu.aspx" target="_blank" onmouseover="window.status="Overhead Requests"; return true" onmouseout="window.status=""; return true"><font face="arial" color="blue" size="1"><b>Overhead Request</b></font></a><br><br>');

var hrefStrings = ['history', 'javascript:Vacation', 'javascript:Sick', 'javascript:bank', 'javascript:Jury', 'audit', 'javascript:Password', 'ts_summary', 'ts_query', 'rptcno.cfm', 'ext_hrs_details', 'http://pswebsp/applications/overhead/ohmenu.aspx'];
var iconStrings = ['history', 'glass', 'frown-o', 'university', 'gavel', 'eye', 'lock', 'list-alt', 'search', 'tasks', 'clock-o', 'meh-o'];
$.each(hrefStrings, function(index, value) {
    var el = $('a[href^="' + value + '"] b');
    $(el).attr('class', 'menu-link link-icon-' + iconStrings[index]);
});
