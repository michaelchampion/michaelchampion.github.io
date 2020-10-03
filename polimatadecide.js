// ------  polimatadecide.js ---------
// This implements a particular set of decision rules.

function Policy(actr) {

	this.niceness = Math.random();
	this.toughness = Math.random() *2 - 1;
	this.ruleset= [5];
}

function Rule(f, r, v) {
	this.field = f;		// see gDecisionFields for legal values
	this.relation = r;  // 'L', 'E', 'G'
	this.value = v;
}
var   gDecisionFields = {
	ALAST: 0,
	APREVIOUS: 1,
	BLAST: 3,
	BPREVIOUS: 4,
	APOWER: 5,
	BPOWER: 6,
	DELTAAPOWER: 7,
	DELTABPOWER: 8,
	ASUPPORT: 9,
	BSUPPORT: 10,
	ACONCUR: 11,
	BCONCUR: 12
}

function matchRule(r) {
// returns true if rule is triggered by the data fields, false otherwise
	var result = false;
	switch (flds.field) {
	
		case gDecisionFields.ALAST:
		break;
		case gDecisionFields.APREVIOUS:
		break;
		case gDecisionFields.BLAST:
		break;
		case gDecisionFields.BPREVIOUS:
		break;
		case gDecisionFields.APOWER:
		break;
		case gDecisionFields.BPOWER:
		break;
		case gDecisionFields.DELTAAPOWER:
		break;
		case gDecisionFields.DELTABPOWER:
		break;
		case gDecisionFields.ASUPPORT:
		break;
		case gDecisionFields.BSUPPORT: 
		break;
		case gDecisionFields.ACONCUR: 
		break;
		case gDecisionFields.BCONCUR: 
		break;
		
		default: 

	}
}
	
function ActorStyle(p) {

		var clr = Math.floor(p.policy.niceness * 255);

		//var clr = gIdColors[p.id];
		var t = (p.policy.toughness + 1) / 2;
		var pwr = p.power / 800;

		var style = "rgba(0," +clr+ ",0," + t + ")";
		//var style = "rgba(" + clr + "," + pwr + ")";
		return style;
}

function decide(oA, oB, hB2A) {

    // If the last act of the other actor was either null or Offer,
    // respond with an offer with p(niceness).  Otherwise the 
    // last act was Seize, so retaliate with p(toughness)

    var rndA = Math.random();
    if (hB2A.last == 0 || hB2A.last == kConcur) {
	    actA = oA.policy.niceness > rndA  ? kConcur : kDefy; 
	    }
		// If toughness < 0, use tit for 2 tats decision rule
    else if (hB2A.prev == kConcur && oA.policy.toughness < 0) {
	    actA = kConcur;
	    }
    else {
	    actA = oA.policy.toughness > rndA  ? kDefy : kConcur; 
	    }


    if (gLogging  && oA.id == gSelectedActor) {
		var logstring = "\n" + oA.id + " -> " + oB.id + 
		" rnd: ." + Math.floor(rndA * 1000) + 
		" nice: ." + Math.floor(oA.policy.niceness* 1000) + 
		" tough: ." + Math.floor(oA.policy.toughness * 1000) + 
		" Last: " + hB2A.last + " Act: " + actA ;
		var logElement = document.getElementById("dispLOG");
		logElement.appendChild(document.createTextNode(logstring));	
	}
	return actA;
}

function loadActorForm(a) {
    var uiElement;
    
    if (a) {
    	uiElement = document.getElementById("dispID");
 	   	uiElement.value = a.id;
 	   	uiElement = document.getElementById("dispPOWER");
 	  	uiElement.value = a.power;
 		uiElement = document.getElementById("dispNICE");
  	  	uiElement.value = a.policy.niceness;
  	    uiElement = document.getElementById("dispTOUGH");
   	    uiElement.value = a.policy.toughness;
   	 }
   	 else  // null passed in means clear the form fields
   	 {
   	   uiElement = document.getElementById("dispID");
 	   uiElement.value = "";
 	   uiElement = document.getElementById("dispPOWER");
 	   uiElement.value = "";
 	   uiElement = document.getElementById("dispNICE");
  	   uiElement.value = ""
  	   uiElement = document.getElementById("dispTOUGH");
   	   uiElement.value = ""
   	 }
}

function updateActorForm(e) {
    var uiElement;
    var a = gActors[gSelectedActor];
	
    uiElement = document.getElementById("dispNICE");
    a.policy.niceness = parseFloat(uiElement.value);
    uiElement = document.getElementById("dispTOUGH");
    a.policy.toughness = parseFloat(uiElement.value);
}