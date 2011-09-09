var start, elapsed;
function milliseconds_to_minutes_and_seconds(ms) {
	s = Math.floor((ms/1000)%60) - 3; //offset 3 seconds for the lag of recording the observation; this will make timestamps closer
	m = Math.floor((ms/(1000*60))%60);
	if(s<0) s="0";
	if(s<10) s = "0" + s;
	if(m<10) m = "0" + m;
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

	$("#logNote").click(function() {
		var notetext = $("#note").val();
		if( notetext != "") {
		start = localStorage.getItem("usablog." + session + ".startTime");
			if (start == null){
				 start = new Date().getTime();
				 localStorage.setItem("usablog." + session + ".startTime", start);
				}
			elapsed = (new Date().getTime()) - start;
		
			if( notetext.charAt(0) == "/" ) {
				var a = notetext.split(" ");
			
				switch(a[0]) {
					case "/t": // log a new task starting
					  	$('#log').append('<tr class="task"><td>' + milliseconds_to_minutes_and_seconds(elapsed) + '</td><td><span class="newtask">New task</span> ' + notetext.substr(3,notetext.length) + '</td></tr>');
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
					
				}
			}
			$("#log").append("<tr><td>" + milliseconds_to_minutes_and_seconds(elapsed) + "</td><td>" + notetext + "</td></tr>");
			save_log();
			repaint_log();
		}
	});

	$("#session_change").click(function(){
		$('#dialog_change_session').dialog('open');
	});
	$("#about").click(function(){
		$('#dialog_about').dialog('open');
	});
	$("#help").click(function(){
		$('#dialog_help').dialog('open');
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






















