// Functions

function votesWithParty(members) {
  var total = 0;
  var average;
  members.forEach(member => {
    var partial = member.votes_with_party_pct || 0;
    total += partial;
  });
  average = total / members.length;

  return average;
}

function loyaltyTableInfo() {
  $("#democratsNumber").append(
    statistics.democratsNumber
  );
  $("#republicansNumber").append(
    statistics.republicansNumber
  );
  $("#independentsNumber").append(
    statistics.independentsNumber
  );
  $("#democratsVotesParty").append(
    statistics.democratsVotesParty.toPrecision(4)
  );
  $("#republicansVotesParty").append(
    statistics.republicansVotesParty.toPrecision(4)
  );
  $("#independentsVotesParty").append(
    statistics.independentsVotesParty.toPrecision(4)
  );
}

function findMinPercentage(members) {
  var lowestPercentage = members[0].votes_with_party_pct;
  for (var i = 0; i < members.length - 1; i++) {
    if (members[i].votes_with_party_pct < members[i + 1].votes_with_party_pct) {
      probablyTheLowest = members[i].votes_with_party_pct;
    }
    else {
      probablyTheLowest = members[i + 1].votes_with_party_pct;
    }
    if (lowestPercentage > probablyTheLowest) {
      lowestPercentage = probablyTheLowest;
    }
  }

  return lowestPercentage
}

function findLeastLoyal(members) {

  var sortedMembers = members.sort((a, b) => (a.votes_with_party_pct > b.votes_with_party_pct) ? 1 : -1);
  var filteredMembers;

  var totalLength = members.length;
  var lowerLength = 0;
  var percentage = 0;

  var leastLoyalsArray = [];

  var lowestPercentage = findMinPercentage(sortedMembers);

  console.log("theLowest: ", lowestPercentage)

  sortedMembers.forEach(member => {
    while (percentage < 0.1) {
      if (member.votes_with_party_pct <= lowestPercentage) {

        filteredMembers = sortedMembers.filter(member => member.votes_with_party_pct > lowestPercentage);

        //totalLength = filteredMembers.length;

        lowerLength += 1;

        percentage = lowerLength / totalLength;

        lowestPercentage = findMinPercentage(filteredMembers);
        /* 
              console.log("votes_with_party_pct: ", member.votes_with_party_pct)
              console.log("lowerLength: ", lowerLength)
              console.log("percentage: ", percentage)
              console.log("filteredMembers: ", filteredMembers)
              console.log("name: ", member.first_name)
              console.log("lowestPercentage: ", lowestPercentage) */

        leastLoyalsArray.push(member);

        /* console.log("leastLoyalsArray: ", leastLoyalsArray) */
        
        return leastLoyalsArray;
      }
    }
  });

}

// Statistics

var democratsArray = data.results[0].members.filter(member => member.party == "D");
var republicansArray = data.results[0].members.filter(member => member.party == "R");
var independentsArray = data.results[0].members.filter(member => member.party == "I");

var statistics = {
  "democratsNumber": democratsArray.length || 0,
  "republicansNumber": republicansArray.length || 0,
  "independentsNumber": independentsArray.length || 0,
  "totalNumber": democratsArray.length + republicansArray.length + independentsArray.length,
  "democratsVotesParty": votesWithParty(democratsArray),
  "republicansVotesParty": votesWithParty(republicansArray),
  "independentsVotesParty": votesWithParty(independentsArray),
}

// Tests

/* console.log("democratsNumber: ", statistics.democratsNumber);
console.log("republicansNumber: ", statistics.republicansNumber);
console.log("independentsNumber: ", statistics.independentsNumber);
console.log("totalNumber: ", statistics.totalNumber);
console.log("democratsVotesParty: ", statistics.democratsVotesParty);
console.log("republicansVotesParty: ", statistics.republicansVotesParty);
console.log("independentsVotesParty: ", statistics.independentsVotesParty); */

//

loyaltyTableInfo()
findLeastLoyal(democratsArray)