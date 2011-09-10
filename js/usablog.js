var start, elapsed;
function milliseconds_to_minutes_and_seconds(ms) {
	s = Math.floor((ms/1000)%60) - 3; //offset 3 seconds for the lag of recording the observation; this will make timestamps closer
	m = Math.floor((ms/(1000*60))%60);
	if(s<0) s="0";
	if(s<10) s = "0" + s;
	return ( m + ":" + s);
}
	
function repaint_log() {
	session = localStorage.getItem("usablog.currentSession");
	if (session == null) session = "Default Session";
	$("#session").html(session);
	$("#log").html(localStorage.getItem("usablog." + session + ".localStore"));
	$('html, body').animate({scrollTop: $(document).height()}, 'slow');
	$("#note").val("").focus();
}

function save_log() {
	localStorage.setItem("usablog." + session + ".localStore", $("#log").html());
}

// Document ready
$(function() {
	
	repaint_log();
	
	// Set up dialogs
	$('#dialog_change_session').dialog({
		autoOpen: false,
		resizable: false,
		modal: true,
		buttons: {
			"Change Session": function() {
					var newSession = $("#session_name").val();
					if (newSession!=null && newSession!="") session = newSession;
					localStorage.setItem("usablog.currentSession", session);
					$( this ).dialog( "close" );
					repaint_log();
			},
			Cancel: function() {
				$( this ).dialog( "close" );
				repaint_log();
			}
		}
	});
	
	$('#dialog_about').dialog({
		autoOpen: false,
		resizable: false,
		modal: true,
		width: "550px",
		buttons: {
			"OK": function() {
				$( this ).dialog( "close" );
				repaint_log();
			}
		}
	});
	$('#dialog_help').dialog({
		autoOpen: false,
		resizable: false,
		modal: true,
		width: "550px",
		buttons: {
			"OK": function() {
				$( this ).dialog( "close" );
				repaint_log();
			}
		}
	});
	$('#dialog_ext').dialog({
		autoOpen: false,
		resizable: true,
		modal: true,
		width: "550px",
		buttons: {
			"OK": function() {
				$( this ).dialog( "close" );
				repaint_log();
			}
		}
	});

	$("#logNote").click(function() {
		var notetext = $("#note").val();
		if( notetext != "") {
		start = localStorage.getItem("usablog." + session + ".startTime");
			if (start == null){
				var d = new Date();
				 start = d.getTime();
				$('#log').append('<tr class="start"><td>0:00</td><td>Began logging on ' + d.toLocaleDateString() + ' at ' + d.toLocaleTimeString() +  '</td></tr>');
				 localStorage.setItem("usablog." + session + ".startTime", start);
				}
			elapsed = (new Date().getTime()) - start;
		
			if( notetext.charAt(0) == "/" ) {
				var a = notetext.split(" ");
			
				switch(a[0]) {
					case "/t": // log a new task starting
						// TO DO: If this isn't the first task start, read time from last task start and calculate the task duration.
					  	$('#log').append('<tr class="task"><td><span class="task_new">Task</span> ' + milliseconds_to_minutes_and_seconds(elapsed) + '</td><td>' + notetext.substr(3,notetext.length) + '</td></tr>');
						save_log();
						repaint_log();
					 	return;
					break;
					case "/nuke": // clear html5 localstorage
						var nukeConfirm = confirm("The nuclear option clears all of your notes. If you click OK, your data will be lost and cannot be recovered. Are you sure you want to go through with this?");
						if (nukeConfirm) localStorage.clear();
						repaint_log();
						return;
					break;
					case "/erase": // remove the last log entry
						$('#log tr:last-child').remove();
						save_log();
						repaint_log();
						return;
					break;
					case "/e": // log that p committed an 'error'
						$('#log').append('<tr><td><span class="task_error">Error</span> ' + milliseconds_to_minutes_and_seconds(elapsed) + '</td><td>' + notetext.substr(3,notetext.length) + '</td></tr>');
						save_log();
						repaint_log();
					 	return;
					break;
					case "/a": // log that p req assist from facilitator
						$('#log').append('<tr><td><span class="task_assist">Assist</span> ' + milliseconds_to_minutes_and_seconds(elapsed) + '</td><td>' + notetext.substr(3,notetext.length) + '</td></tr>');
						save_log();
						repaint_log();
					 	return;
					break;
					case "/reset": // erase all log entries and reset timer
						localStorage.removeItem("usablog." + session + ".startTime");
						$('#log tr').remove();
						save_log();
						repaint_log();
						return;
					break;
				}
			}
			$("#log").append("<tr><td>" + milliseconds_to_minutes_and_seconds(elapsed) + "</td><td>" + notetext + "</td></tr>");
			save_log();
			repaint_log();
		}
	});

	$("#session_change").click(function(){
		$('#dialog_change_session').dialog('open');
		return false;
	});

 	$(".dialog_link").click(function() {
        var url = $(this).attr("href");
		var linktitle = $(this).attr("title");
        $("#dialog_ext").load(url, function() {
	        $("#dialog_ext").dialog({ title: linktitle });	
            $("#dialog_ext").dialog("open");
        });

		return false;
    });

	$("#download").click(function(){
		$('#log').table2CSV();
		 var csv_value=$('#log').table2CSV({delivery:'value'});
		 $("#csv_text").val(csv_value);
		$("#csvform").submit();
	});
	
}); 




















	
//Google Analytics
	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-78608-4']);
	  _gaq.push(['_trackPageview']);

	  (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();






















