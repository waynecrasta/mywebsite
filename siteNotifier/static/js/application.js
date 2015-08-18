
$(document).ready(function() {
    
//    $('.default-select2').select2({
//        allowClear: true,
//        minimumResultsForSearch: 15
//    });

    //console.log("sd= " + jSectionData);
    var h1 = $('h1').text();
    if ( h1 !== 'Course Explorer') {
        $('title').text(h1 + " | Course Explorer");
    } else {
        $('title').text(h1);
    }

    function ajaxAppendHtml(link) {
        $.ajax({
            url: link.attr('href'),
            dataType: 'html',
            success: function(htmlOut) {
                $(link.attr('mark')).append(htmlOut);
            }
        });
    }
    
    // ADDED FUNCTIONALITY TO BOOTSTRAP COLLAPSE PLUGIN WHEN EVENTS FIRE
    $('.ql-tog-event').on('show.bs.collapse', function() {
        $(this).attr('aria-hidden','false');
        $(this).prev().find('a').attr('aria-expanded','true');
    });
     $('.ql-tog-event').on('hide.bs.collapse', function() {
        $(this).attr('aria-hidden','true');
        $(this).prev().find('a').attr('aria-expanded','false');
    });

    // DEFAULT TOGGLE
    $('.app-toggle').on('click',function(e) {
        e.preventDefault();
        var target = $(this).attr('data-target');
        $('#'+target).toggle();
    });

    // DATATABLES
    $('#default-dt').dataTable({
        "oLanguage": {
            "sInfo": "_TOTAL_ entries",
            "sInfoFiltered": "(from _MAX_ total entries)",
            "sInfoEmpty": "0 entries",
            "sSearch": ""
        },
        "bPaginate": false,
        "sDom": "<'row clearfix'<'col-sm-12 clearfix'fi>>t<'row'<'col-sm-12'>>"
    });
    $('#years-dt').dataTable({
        "oLanguage": {
            "sInfo": "_TOTAL_ entries",
            "sInfoFiltered": "(from _MAX_ total entries)",
            "sInfoEmpty": "0 entries",
            "sSearch": ""
        },
        "bPaginate": false,
        "sDom": "<'row clearfix'<'col-sm-12 clearfix'fi>>t<'row'<'col-sm-12'>>",
        "aaSorting": [[0, "desc"]]
    });
    $('#year-dt').dataTable({
        "oLanguage": {
            "sInfo": "_TOTAL_ entries",
            "sInfoFiltered": "(from _MAX_ total entries)",
            "sInfoEmpty": "0 entries",
            "sSearch": ""
        },
        "bPaginate": false,
        "sDom": "<'row clearfix'<'col-sm-12 clearfix'fi>>t<'row'<'col-sm-12'>>",
        "aaSorting": []
    });
    
    // TOOLTIP
    $("[data-toggle='tooltip']").tooltip();
    

   
    // ACCORDIAN CARET 
//    $('.collapse').on('show', function(){
//        $(this).parent().find(".icon-chevron-left").removeClass("icon-chevron-left").addClass("icon-chevron-down");
//    }).on('hide', function(){
//        $(this).parent().find(".icon-chevron-down").removeClass("icon-chevron-down").addClass("icon-chevron-left");
//    });
//    
//    $('.collapse').on('show', function(){
//        $(this).parent().find(".right-caret").removeClass("right-caret").addClass("down-caret");
//    }).on('hide', function(){
//        $(this).parent().find(".down-caret").removeClass("down-caret").addClass("right-caret");
//    });
    
    $(document).on("click", ".ql-links", function() {
        var ajaxBase = "/ajax/ql/";
        //var ajaxPath = $(this).attr('data-ajaxpath').replace(/-/g,"/");
        var ajaxPath = $(this).data("ajaxpath").replace(/-/g,"/");
        var dataTarget = $(this).attr('href') + ' ul';
        $.getJSON(ajaxBase + ajaxPath, function(data) {
            var options = [];
            $.each(data, function(key, value) {
                options.push('<li><a href="' + value[0] + '" title="' + value[1] + '">' + key + '</a></li>');
            });
            $(dataTarget).html(options.join(''));
        });
        $(this).removeClass('ql-links'); // SO ON CLICK API IS NOT CALLED AGAIN
    });
    $(document).on("click", ".get-pdf", function(e) {
        $(window).load(function () {
            alert('page is loaded');
        });
//        console.log("Download");
//        e.preventDefault();
//        $.ajax({
//            xhr: function()
//            {
//              var xhr = new window.XMLHttpRequest();
//              //Upload progress
//              xhr.upload.addEventListener("progress", function(evt){
//                if (evt.lengthComputable) {
//                  var percentComplete = evt.loaded / evt.total;
//                  //Do something with upload progress
//                 console.log(percentComplete);
//               }
//             }, false);
//             //Download progress
//             xhr.addEventListener("progress", function(evt){
//                 console.log("download");
//               if (evt.lengthComputable) {
//                 console.log("computable");
//                 var percentComplete = evt.loaded / evt.total;
//                 //Do something with download progress
//                 console.log(evt.loaded / evt.total * 100 + '%');
//                 console.log(percentComplete);
//               }
//             }, false);
//             return xhr;
//           },
//           type: 'GET',
//           url: "/cis/pdf/schedule/2014/spring/AAS",
//           data: {},
//           headers: {
//                "Content-Type": "application/pdf"
//            },
//           success: function(data){
//             console.log("success");
//           }
//         });
     });
     
});