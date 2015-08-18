$(document).ready(function() {
    
//    console.log("studentrole="+studentRole)
    // DRILL DOWN ROW TEST
    var anOpen = [];
    
    var wlObj;
    wlObj = {
               "mDataProp": "wl",
               "bSortable": false,        
               "sClass": "text-center",
               "sWidth": "20px"
            };
    
    var oTable = $('#section-dt').dataTable( {
        "fnCreatedRow": function( nRow, aData, iDataIndex ) {
            var rowNumber = "uid" + (iDataIndex + 1);
            $(nRow).attr("id",rowNumber);
            $('td:eq(0) a', nRow).attr("aria-controls",rowNumber + "A");
        },
        "oLanguage": {
            "sInfo": "_TOTAL_ entries",
            "sInfoFiltered": "(from _MAX_ total entries)",
            "sInfoEmpty": "0 entries",
            "sSearch": ""
        },
        "bProcessing": true,
        //"sAjaxSource": "http://localhost:8080/cis/static/js/objects.txt",
        "aaData": sectionDataObj,
        "bAutoWidth" : false,
        "aoColumns": [
            {
               "mDataProp": null,
               "bSortable": false,        
               "sClass": "control center text-center",
               "sWidth": "45px",
               "sDefaultContent": '<a aria-label="hide or show section details" href="#none"><span class="dt glyphicon glyphicon-chevron-down app-font16"></span></a>'
            },
            {
               "mDataProp": "wl",
               "bSortable": false,        
               "sClass": "text-center",
               "sWidth": "20px",
               "bVisible": studentRole
            },
            { "mDataProp": "status", "sWidth": "50px", "sClass": "text-center" },
            { "mDataProp": "crn", "sWidth": "55px" },
            { "mDataProp": "type", "sWidth": "70px", "sClass": "adjh" },
            { "mDataProp": "section", "sWidth": "65px", "sClass": "adjh td-break" },
            { "mDataProp": "time", "sWidth": "65px", "sClass": "adjh" },
            { "mDataProp": "day", "sWidth": "45px", "sClass": "adjh" },
            { "mDataProp": "location", "sWidth": "90px", "sClass": "adjh" },
            { "mDataProp": "instructor", "sWidth": "120px", "sClass": "instructor"}
        ],
        "bPaginate": false,
        "sDom": "<'row clearfix'<'col-sm-12'fi>r>t<'row'<'col-sm-12'>>"
    } );
    
    $(document).on( 'click', '#section-dt td.control', function (e) {
        e.preventDefault();
        var nTr = this.parentNode;
        var i = $.inArray( nTr, anOpen );
        
        if ( i === -1 ) {
           // ADD ID TO TD (cell) FOR NEW ROW to match ARIA-CONTROLS on details chevron link
           // and set last argument to false for aria-hidden value.
           var cellid = nTr.getAttribute('id') + "A"; 
           oTable.fnOpen( nTr, fnFormatDetails(oTable, nTr), "details", cellid, "false", "Detail" );
           anOpen.push( nTr );
           $('td:eq(0) a', nTr).attr("aria-expanded","true");
           $('#collapseAllTR').removeClass('disabled');
           if ( anOpen.length === oTable.fnSettings().fnRecordsTotal() ) {
                $('#expandAllTR').addClass('disabled');
           }   
         }
         else {
          // $('.dt', this).attr( 'class', "dt glyphicon glyphicon-chevron-down" );
           oTable.fnClose( nTr );
           anOpen.splice( i, 1 );
           $('td:eq(0) a', nTr).attr("aria-expanded","false");
           $('#expandAllTR').removeClass('disabled');
           if (anOpen.length < 1) {
               $('#collapseAllTR').addClass('disabled');
           }
           //console.log(anOpen);
         }
     } );
 
    function fnFormatDetails( oTable, nTr )
    {
//      var t1 = '<div class="row"><div class="col-xs-2 app-text-engage">';
//      var t2 = '</div><div class="col-xs-10 dt-value app-text-value">';
//      var t3 = '</div></div>';
      var t1 = '<tr><th class="app-text-engage">';
      var t2 = '</th><td class="app-text-value">';
      var t3 = '</td></tr>'
      var oData = oTable.fnGetData( nTr );
      
      var sOut = '';
      sOut += '<table id="section-details">';
      if (oData.availability) { sOut += t1 + 'Availability' + t2 + oData.availability + t3; }
      if (oData.credit) { sOut += t1 + 'Credit' + t2 + oData.credit + t3; }
      if (oData.sectionTitle) { sOut += t1 + 'SectionTitle' + t2 + oData.sectionTitle + t3; }
      if (oData.sectionDescription) { sOut += t1 + 'Description' + t2 + oData.sectionDescription + t3; }
      if (oData.courseDescription) { sOut += t1 + 'Description' + t2 + oData.courseDescription + t3; }
      if (oData.sectionDegreeNotes) { sOut += t1 + 'Degree Notes' + t2 + oData.sectionDegreeNotes + t3; }
      if (oData.courseDegreeNotes) { sOut += t1 + 'Degree Notes' + t2 + oData.courseDegreeNotes + t3; }
      if (oData.specialApproval) { sOut += t1 + 'Special Approval' + t2 + oData.specialApproval + t3; }
      if (oData.approvalCode) { sOut += t1 + 'Approval Code' + t2 + oData.approvalCode + t3; }
      if (oData.sectionFee) { sOut += t1 + 'Section Fee' + t2 + oData.sectionFee + t3; }
      if (oData.sectionDateRange) { sOut += t1 + 'Date Range' + t2 + oData.sectionDateRange + t3; }
      if (oData.courseDateRange) { sOut += t1 + 'Date Range' + t2 + oData.courseDateRange + t3; }
      if (oData.partOfTerm) { sOut += t1 + 'Part of Term' + t2 + oData.partOfTerm + t3; }
      if (oData.regNotes) { sOut += t1 + 'Registration Notes' + t2 + oData.regNotes + t3; }
      if (oData.info) { sOut += t1 + 'Section Info' + t2 + oData.info + t3; }
      if (oData.corequest) { sOut += t1 + 'Co-Request' + t2 + oData.corequest + t3; }
      if (oData.restricted) { sOut += t1 + 'Restriction(s)' + t2 + oData.restricted + t3; }
//      if (oData.availability) { sOut += t1 + 'Availability' + t2 + oData.availability + t3; }
//      if (oData.credit) { sOut += t1 + 'Credit' + t2 + oData.credit + t3; }
//      if (oData.sectionTitle) { sOut += t1 + 'SectionTitle' + t2 + oData.sectionTitle + t3; }
//      if (oData.sectionDescription) { sOut += t1 + 'Description' + t2 + oData.sectionDescription + t3; }
//      if (oData.courseDescription) { sOut += t1 + 'Description' + t2 + oData.courseDescription + t3; }
//      if (oData.sectionDegreeNotes) { sOut += t1 + 'Degree Notes' + t2 + oData.sectionDegreeNotes + t3; }
//      if (oData.courseDegreeNotes) { sOut += t1 + 'Degree Notes' + t2 + oData.courseDegreeNotes + t3; }
//      if (oData.specialApproval) { sOut += t1 + 'Special Approval' + t2 + oData.specialApproval + t3; }
//      if (oData.approvalCode) { sOut += t1 + 'Approval Code' + t2 + oData.approvalCode + t3; }
//      if (oData.sectionFee) { sOut += t1 + 'Section Fee' + t2 + oData.sectionFee + t3; }
//      if (oData.sectionDateRange) { sOut += t1 + 'Date Range' + t2 + oData.sectionDateRange + t3; }
//      if (oData.courseDateRange) { sOut += t1 + 'Date Range' + t2 + oData.courseDateRange + t3; }
//      if (oData.partOfTerm) { sOut += t1 + 'Part of Term' + t2 + oData.partOfTerm + t3; }
//      if (oData.regNotes) { sOut += t1 + 'Registration Notes' + t2 + oData.regNotes + t3; }
//      if (oData.info) { sOut += t1 + 'Section Info' + t2 + oData.info + t3; }
//      if (oData.corequest) { sOut += t1 + 'Co-Request' + t2 + oData.corequest + t3; }
//      if (oData.restricted) { sOut += t1 + 'Restriction(s)' + t2 + oData.restricted + t3; }
      sOut += '</table>';
      sOut += '';
      return sOut;
    }
    
    $(document).on("click", "#collapseAllTR", function(e) {
        e.preventDefault();
        $('#expandAllTR').removeClass('disabled');
        oTable.$('tr').each(function() {
            var i = $.inArray( this, anOpen );
            if ( i !== -1 ) {
                oTable.fnClose( this );
                anOpen.splice( i, 1 );
            }
            $('td:eq(0) a', this).attr("aria-expanded","false");
        });
        $(this).addClass('disabled');
    });

    
    $(document).on("click", "#expandAllTR", function(e) {
        e.preventDefault();
        expandAll();
      });
      
    function expandAll() {
        $('#collapseAllTR').removeClass('disabled');
        oTable.$('tr').each(function() {
            var i = $.inArray(this, anOpen);
            
            if (i === -1) {
                // ADD ID TO TD (cell) FOR NEW ROW to match ARIA-CONTROLS on details chevron link
                // and set last argument to false for aria-hidden value.
                var cellid = $(this).attr('id') + "A";
                $('td:eq(0) a', this).attr("aria-expanded","true");
                oTable.fnOpen(this, fnFormatDetails(oTable, this), "details", cellid, "false", "Detail");
                anOpen.push(this);
            }
        });
        $('#expandAllTR').addClass('disabled');
    }
    expandAll();
    
    // ARRANGE HEIGHT OF DIVS ON MULTIPLE MEETINGS IN A SECTION
    $('.instructor').each(function(index) {
        var m = $(this).children().size();
        for ( i=0; i < m; i++ ) {
            var hh = $(this).children().eq(i).height();
            if ( hh > 35) {
                $(this).siblings(".adjh").each(function(index) {
                    $(this).children().eq(i).css('height',hh+'px');
                });
            }
        }
    });
    
    // ADD SECTION TO WATCHLIST
    $(document).on("click",".wl-action", function(e) {
        e.preventDefault();
        var ajaxBase = "/mycis/student/ajax/watchlist/";
        var ajaxPath = $(this).data("ajaxpath").replace(/-/g,"/");
        var wlIcon = $(this).children();
        $.ajax({
            url: ajaxBase + ajaxPath,
            context: this,
            success:function(data) {
                if (data === "true") {
//                    console.log("success");
                    $(wlIcon).removeClass('glyphicon-star-empty').addClass('glyphicon-star').css("color","black");
                    $(this).popover('show');
                    $(this).removeClass('wl-action').removeAttr('href');
                } else {
//                    console.log("failed");
                    $(this).attr('data-content','Sorry! Section was not able to be added to your watchlist.');
                    $(this).popover('show');
                }
            }
        });
    });
    
    //POPOVER
    $('.pop-msg').on('show.bs.popover', function () {
//            console.log("show called");
            var delay=5000;//1 seconds
            setTimeout(function(){
//                console.log("delayed");
                $('.pop-msg').popover('hide');
            },delay);
            
        });

        $('.pop-msg').popover({
            'trigger': 'manual',
            'placement': 'top',
            'delay': { 'show': 500, 'hide': 10000 }
            
        });
        //$(".pop-msg").popover('show');
});