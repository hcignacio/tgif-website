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

function loyaltyTableNumbers() {
  $("#democratsNumber").append(
    statistics.democratsNumber
  );
  $("#republicansNumber").append(
    statistics.republicansNumber
  );
  $("#independentsNumber").append(
    statistics.independentsNumber
  );
  $("#totalNumber").append(
    statistics.totalNumber
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
  $("#totalVotesParty").append(
    statistics.totalVotesParty.toPrecision(4)
  );
}

// Loyalty

// Statistics Displayed in Tables (Least Loyal)

function loyaltyTableLL(members) {
  members.forEach(function (member) {
    $("#t-LL").append('<tr>'
      + '<td>' + '<a href=" '
      + member.url + '">'
      + (member.last_name)
      + ', ' + (member.first_name)
      + ' '
      + hasMiddleName(member)
      + '<td>' + (member.total_votes) + '</td>'
      + '<td>' + (member.votes_with_party_pct) + ' %' + '</td>'
      + '</tr>')
  })
}

function hasMiddleName(member) {
  var middleName;
  if (member.middle_name != null) {
    middleName = member.middle_name;
  }
  else {
    middleName = '';
  }
  return middleName
}

// Least Often Vote with Party Calculations

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

  sortedMembers.forEach(member => {
    while (percentage < 0.1) {
      if (member.votes_with_party_pct <= lowestPercentage) {
        filteredMembers = sortedMembers.filter(member => member.votes_with_party_pct > lowestPercentage);
        lowerLength += 1;
        percentage = lowerLength / totalLength;
        lowestPercentage = findMinPercentage(filteredMembers);
      }
    }
  });
  leastLoyalsArray = sortedMembers.slice(0, lowerLength);
  return leastLoyalsArray;
}

// Statistics Displayed in Tables (Most Loyal)

function loyaltyTableML(members) {
  members.forEach(function (member) {
    $("#t-ML").append('<tr>'
      + '<td>' + '<a href=" '
      + member.url + '">'
      + (member.last_name)
      + ', ' + (member.first_name)
      + ' '
      + hasMiddleName(member)
      + '<td>' + (member.total_votes) + '</td>'
      + '<td>' + (member.votes_with_party_pct) + ' %' + '</td>'
      + '</tr>')
  })
}

// Most Often Vote with Party Calculations

function findMaxPercentage(members) {
  var highestPercentage = members[0].votes_with_party_pct;
  for (var i = 0; i < members.length - 1; i++) {
    if (members[i].votes_with_party_pct > members[i + 1].votes_with_party_pct) {
      probablyTheHighest = members[i].votes_with_party_pct;
    }
    else {
      probablyTheHighest = members[i + 1].votes_with_party_pct;
    }
    if (highestPercentage < probablyTheHighest) {
      highestPercentage = probablyTheHighest;
    }
  }

  return highestPercentage
}

function findMostLoyal(members) {
  var sortedMembers = members.sort((a, b) => (a.votes_with_party_pct > b.votes_with_party_pct) ? -1 : 1);
  var filteredMembers;
  var totalLength = members.length;
  var higherLength = 0;
  var percentage = 0;
  var leastLoyalsArray = [];
  var highestPercentage = findMaxPercentage(sortedMembers);

  sortedMembers.forEach(member => {
    while (percentage < 0.1) {
      if (member.votes_with_party_pct >= highestPercentage) {
        filteredMembers = sortedMembers.filter(member => member.votes_with_party_pct < highestPercentage);
        totalLength = filteredMembers.length;
        higherLength += 1;
        percentage = higherLength / totalLength;
        highestPercentage = findMaxPercentage(filteredMembers);
      }
    }
  });
  leastLoyalsArray = sortedMembers.slice(0, higherLength);
  return leastLoyalsArray;
}

// Enganged

// Statistics Displayed in Tables (Least Enganged)

function loyaltyTableLE(members) {
  members.forEach(function (member) {
    $("#t-LE").append('<tr>'
      + '<td>' + '<a href=" '
      + member.url + '">'
      + (member.last_name)
      + ', ' + (member.first_name)
      + ' '
      + hasMiddleName(member)
      + '<td>' + (member.missed_votes) + '</td>'
      + '<td>' + (member.missed_votes_pct) + ' %' + '</td>'
      + '</tr>')
  })
}

// Least Enganged

function findMaxPercentageEnganged(members) {
  var highestPercentage = members[0].missed_votes_pct;
  for (var i = 0; i < members.length - 1; i++) {
    if (members[i].missed_votes_pct > members[i + 1].missed_votes_pct) {
      probablyTheHighest = members[i].missed_votes_pct;
    }
    else {
      probablyTheHighest = members[i + 1].missed_votes_pct;
    }
    if (highestPercentage < probablyTheHighest) {
      highestPercentage = probablyTheHighest;
    }
  }

  return highestPercentage
}

function findLeastEnganged(members) {
  var sortedMembers = members.sort((a, b) => (a.missed_votes_pct > b.missed_votes_pct) ? -1 : 1);
  var filteredMembers;
  var totalLength = members.length;
  var lowerLength = 0;
  var percentage = 0;
  var leastLoyalsArray = [];
  var highestPercentage = findMaxPercentageEnganged(sortedMembers);


  sortedMembers.forEach(member => {
    while (percentage < 0.1) {
      if (member.missed_votes_pct >= highestPercentage) {
        filteredMembers = sortedMembers.filter(member => member.missed_votes_pct < highestPercentage);
        lowerLength += 1;
        percentage = lowerLength / totalLength;
        highestPercentage = findMaxPercentageEnganged(filteredMembers);
      }
    }
  });
  leastLoyalsArray = sortedMembers.slice(0, lowerLength);
  return leastLoyalsArray;
}

// Statistics Displayed in Tables (Most Enganged)

function loyaltyTableME(members) {
  members.forEach(function (member) {
    $("#t-ME").append('<tr>'
      + '<td>' + '<a href=" '
      + member.url + '">'
      + (member.last_name)
      + ', ' + (member.first_name)
      + ' '
      + hasMiddleName(member)
      + '<td>' + (member.missed_votes) + '</td>'
      + '<td>' + (member.missed_votes_pct) + ' %' + '</td>'
      + '</tr>')
  })
}

// most Enganged

function findMinPercentageEnganged(members) {
  var lowestPercentage = members[0].missed_votes_pct;
  for (var i = 0; i < members.length - 1; i++) {
    if (members[i].missed_votes_pct < members[i + 1].missed_votes_pct) {
      probablyTheLowest = members[i].missed_votes_pct;
    }
    else {
      probablyTheLowest = members[i + 1].missed_votes_pct;
    }
    if (lowestPercentage > probablyTheLowest) {
      lowestPercentage = probablyTheLowest;
    }
  }

  return lowestPercentage
}

function findMostEnganged(members) {
  var sortedMembers = members.sort((a, b) => (a.missed_votes_pct > b.missed_votes_pct) ? 1 : -1);
  var filteredMembers;
  var totalLength = members.length;
  var lowerLength = 0;
  var percentage = 0;
  var leastLoyalsArray = [];
  var highestPercentage = findMinPercentageEnganged(sortedMembers);


  sortedMembers.forEach(member => {
    while (percentage < 0.1) {
      if (member.missed_votes_pct <= highestPercentage) {
        filteredMembers = sortedMembers.filter(member => member.missed_votes_pct > highestPercentage);
        lowerLength += 1;
        percentage = lowerLength / totalLength;
        highestPercentage = findMinPercentageEnganged(filteredMembers);
      }
    }
  });
  leastLoyalsArray = sortedMembers.slice(0, lowerLength);
  return leastLoyalsArray;
}

// Object

var democratsArray = data.results[0].members.filter(member => member.party == "D");
var republicansArray = data.results[0].members.filter(member => member.party == "R");
var independentsArray = data.results[0].members.filter(member => member.party == "I");

var statistics = {
  "democratsNumber": democratsArray.length || 0,
  "republicansNumber": republicansArray.length || 0,
  "independentsNumber": independentsArray.length || 0,
  "totalNumber": democratsArray.length + republicansArray.length + independentsArray.length,
  "democratsVotesParty": votesWithParty(democratsArray) || 0,
  "republicansVotesParty": votesWithParty(republicansArray) || 0,
  "independentsVotesParty": votesWithParty(independentsArray) || 0,
  "totalVotesParty": votesWithParty(data.results[0].members),
}

//

loyaltyTableNumbers();
var leastLoyal = findLeastLoyal(data.results[0].members);
loyaltyTableLL(leastLoyal);
var mostLoyal = findMostLoyal(data.results[0].members);
loyaltyTableML(mostLoyal);

var leastLoyal = findLeastEnganged(data.results[0].members);
loyaltyTableLE(leastLoyal);
var MostLoyal = findMostEnganged(data.results[0].members);
loyaltyTableME(MostLoyal);