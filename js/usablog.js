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

function log_note(log_type){
	
		switch(log_type) {
			case "new":
		  		$('#log').append('<tr class="task_new"><td class="task_label"><span>Task</span></td><td class="task_time">' + milliseconds_to_minutes_and_seconds(elapsed) + '</td><td class="task_note">' + notetext.substr(3,notetext.length) + '</td></tr>');
			break;
			case "error":
		  		$('#log').append('<tr class="task_new"><td class="task_label"><span>Task</span></td><td class="task_time">' + milliseconds_to_minutes_and_seconds(elapsed) + '</td><td class="task_note">' + notetext.substr(3,notetext.length) + '</td></tr>');
			break;
			case "assist":
		  		$('#log').append('<tr class="task_new"><td class="task_label"><span>Task</span></td><td class="task_time">' + milliseconds_to_minutes_and_seconds(elapsed) + '</td><td class="task_note">' + notetext.substr(3,notetext.length) + '</td></tr>');
			break;
			case "quote":
		  		$('#log').append('<tr class="task_new"><td class="task_label"><span>Task</span></td><td class="task_time">' + milliseconds_to_minutes_and_seconds(elapsed) + '</td><td class="task_note">' + notetext.substr(3,notetext.length) + '</td></tr>');
			break;
			case "task":
		  		$('#log').append('<tr class="task_new"><td class="task_label"><span>Task</span></td><td class="task_time">' + milliseconds_to_minutes_and_seconds(elapsed) + '</td><td class="task_note">' + notetext.substr(3,notetext.length) + '</td></tr>');
			break;
		  	default:
		  		$('#log').append('<tr class="task_new"><td class="task_label"><span>Task</span></td><td class="task_time">' + milliseconds_to_minutes_and_seconds(elapsed) + '</td><td class="task_note">' + notetext.substr(3,notetext.length) + '</td></tr>');
			break;
		}
}


// Document ready
$(function() {
	
	repaint_log();
	
	
 	$(".dialog_link").click(function() {
        var url = $(this).attr("href");
		var linktitle = $(this).attr("title");
        $("#dialog_ext").load(url, function() {
	        $('#dialog_ext').dialog({
				autoOpen: true,
				title: linktitle,
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
        });
		return false;
    });

	$("#logNote").click(function() {
		var notetext = $("#note").val();
		if( notetext != "") {
		start = localStorage.getItem("usablog." + session + ".startTime");
			if (start == null){
				var d = new Date();
				 start = d.getTime();
				$('#log').append('<tr class="start"><td class="task_note" colspan="3">Began logging on ' + d.toLocaleDateString() + ' at ' + d.toLocaleTimeString() +  '</td></tr>');
				 localStorage.setItem("usablog." + session + ".startTime", start);
				}
			elapsed = (new Date().getTime()) - start;
		
				var a = notetext.split(" ");
				var rest_of_note = '<td class="task_time">' + milliseconds_to_minutes_and_seconds(elapsed) + '</td><td class="task_note">' + notetext.substr(3,notetext.length) + '</td></tr>';
				switch(a[0]) {
					case "/t": // log a new task starting
						// TO DO: If this isn't the first task start, read time from last task start and calculate the task duration.
					  	$('#log').append('<tr class="task_new"><td class="task_label"><span>Task</span></td>' + rest_of_note);
						save_log();
						repaint_log();
					 	return;
					break;
					case "/e": // log that p committed an 'error'
						$('#log').append('<tr class="task_error"><td class="task_label"><span>Error</span></td>' + rest_of_note);
						save_log();
						repaint_log();
					 	return;
					break;
					case "/a": // log that p req assist from facilitator
						$('#log').append('<tr class="task_assist"><td class="task_label"><span>Assist</span></td>' + rest_of_note);
						save_log();
						repaint_log();
					 	return;
					break;
					case "/q": // log a quote from p
						$('#log').append('<tr class="task_quote"><td class="task_label"><span>Quote</span></td>' + rest_of_note);
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
					default:
						$("#log").append('<tr><td class="task_label"></td><td class="task_time">' + milliseconds_to_minutes_and_seconds(elapsed) + '</td><td class="task_note">' + notetext + '</td></tr>');
						save_log();
						repaint_log();
					break;
			}

		}
	});

	$("#session_change").click(function(){
		$('#dialog_change_session').dialog({
			autoOpen: true,
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
		return false;
	});

	$("#download").click(function(){
	//	$('#log').table2CSV();
		 var csv_value=$('#log').table2CSV({delivery:'value'});
		 $("#csv_text").val(csv_value);
		 $("#csv_name").val(session + ".csv");
		$("#csvform").submit();
		return false;
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






















