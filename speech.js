const timeIntervals = [0,15,30,45,50,55,60];
var startHour;
var endHour;



function init(){
    var dayNow = new Date().getDay();
    //Set hours for weekends and weekdays
    if (dayNow == 0 || dayNow == 6){
        startHour = 16;
        endHour = 17;
    }
    else{
        startHour = 20;
        endHour = 21;
    }
    
    startTimer();

    (function loop() {
        
        var now = new Date();
        var minutesLeft = 60 - now.getMinutes();
        
        if (now.getHours() == startHour && timeIntervals.includes(now.getMinutes())) 
            announce(minutesLeft, false);   
        else if (now.getHours() == endHour && now.getMinutes() == 0) 
            announce(0, true);
        now = new Date();                  // allow for time passing
        var delay = 60000 - (now % 60000); // exact ms to next minute interval
        setTimeout(loop, delay);
    })();

}

function announce(timeLeft, closing){
    var regAnnouncement = "Attention members, the fitness center will be closed in " + timeLeft + " minutes. Thank you.";
    var closingAnnouncement = "Attention members, the fitness center is now closed. Please rerack your weights, return spray bottles, and quicklu make your way to the exit. Thank you.";

    var announcement;
    if (!closing)
        announcement = regAnnouncement;
    else
        announcement = closingAnnouncement;

    responsiveVoice.speak(announcement, "UK English Female", { rate: 0.85, volume: 1});
    console.log("Announcement made");
}








function startTimer() {
    const today = new Date();
    let h = getHoursLeft(today.getHours());
    let m = getNextMinuteAnnouncement(today.getMinutes(), today.getHours());
    let s = 60 - today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s-1);

    document.getElementById('clock').innerHTML =  "<b>" + h + ":" + m + ":" + s +"</b>";
	document.getElementById('clock').style.fontSize = "x-large";

    setTimeout(startTimer, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
}

function getHoursLeft(hoursNow){
    var result = startHour - hoursNow - 1;
	if (result == -1)
		return 0;
    if (result < 0)
        result += 24;
    return result;
}

function getNextMinuteAnnouncement(minute, hour){
    var result = 0;
    for (var i = 0; i < timeIntervals.length - 1; i ++){
		if (hour != startHour)
			return 60-minute-1;
        else if (timeIntervals[i] - minute <= 0 && timeIntervals[i+1] - minute > 0)
            return timeIntervals[i+1] - minute - 1;
        else
            result = 60-minute-1;
	}
    return result;
}