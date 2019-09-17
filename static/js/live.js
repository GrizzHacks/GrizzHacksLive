// Initialize Firebase
var config = {
	apiKey: "AIzaSyDR6LpGExH6Vg9qMMTNRlV2uM8GSG7wtcg",
	authDomain: "mythirdagent-32541.firebaseapp.com",
	databaseURL: "https://mythirdagent-32541.firebaseio.com",
	projectId: "mythirdagent-32541",
	storageBucket: "mythirdagent-32541.appspot.com",
	messagingSenderId: "660038034431"
};

firebase.initializeApp(config);

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

/* Timer */
var hackingStarts = new Date("Sep 28, 2019 12:00:00");
var hackingEnds = new Date("Sep 29, 2019 12:00:00");

var x = setInterval(function() {
	var now = new Date().getTime();
	var distance = hackingStarts.getTime() - now;

	if(now > hackingStarts) {
		distance = now - hackingEnds.getTime();
	}
	
	if(distance < 0)  {
		distance *= -1;
	}

	var hours = Math.floor((distance / (1000 * 60 * 60)));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	var textModifier = "";

	if(now < hackingStarts) {
		textModifier = "until hacking starts."
	} else if(now < hackingEnds && now > hackingStarts) {
		textModifier = "until hacking ends."
	} else if(now > hackingEnds) {
		textModifier = "Hacking Ended!"
	}

	$("#time").text(hours + ":" + minutes + ":" + seconds);
	$("#timerAppendedText").text(textModifier);
}, 1000);

/* Schedule */
/*
db.collection("scheduleItems").orderBy("order").get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			$("#scheduleList").append(createScheduleItem(doc.data()));
		});
});
*/
function createScheduleItem(scheduleItem) {
	return '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">' + 
				'<div class="d-flex w-100 justify-content-between">' +
					'<h5 class="mb-1">' + scheduleItem.title + '</h5>' +
					'<small>' + scheduleItem.type + '</small>' +
				'</div>' +
				'<p class="mb-1">Starts: ' + scheduleItem.start + '</p>' +
				'<p class="mb-1">Ends: ' + scheduleItem.end + '</p>' +
				'<p class="mb-1">Location: ' + scheduleItem.location + '</p>' +
			'</a>';
}

/* Challenges */
db.collection("challenges").get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			$("#challengeList").append(createChallenge(doc.data()));
		});
});

function createChallenge(challenge) {
	return '<a href="' + challenge.url + '" class="list-group-item list-group-item-action flex-column align-items-start">' + 
				'<div class="d-flex w-100 justify-content-between">' +
					'<h5 class="mb-1">' + challenge.title + '</h5>' +
					'<small>' + challenge.sponsor + '</small>' +
				'</div>' +
				'<p class="mb-1">' + challenge.description + '</p>' +
				'<small>' + challenge.type + ' Prize</small>' +
			'</a>';
}

