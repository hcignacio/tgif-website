createTableHouse(data.results[0].members)

statesOptions = defineDropdownStatesOptions(data.results[0].members)
createDropdownStates(statesOptions)

function createDropdownStates(statesOptions) {
  statesOptions.forEach(function (state) {
    $("#dd-states").append(
      '<a class="dropdown-item" href="#">' + state + '</a>'
    )
  })
}

function defineDropdownStatesOptions(members) {
  var states = [];
  for (var j = 0; j < members.length; j++) {
    states.push(members[j].state);
  }

  states.sort();
  //console.log(states);

  
  var statesOptions = [];
  
  for (var i = 0; i < states.length; i++) {
    if (states[i] != states[i + 1]) {
      //console.log(states[i]);
      statesOptions.push(states[i]);
    }
    else{
      //console.log(states[i]);
    }
  }
  //console.log(statesOptions);
  return statesOptions;
}

function createTableHouse(members) {
  members.forEach(function (member) {
    $("#t-data").append('<tr>'
      + '<td class="table-index">' + (members.indexOf(member) + 1) + '</td>'
      + '<td class="table-full-name">' + '<a href=" '
      + member.url + '">'
      + (member.last_name)
      + ', ' + (member.first_name)
      + ' '
      + hasMiddleName(member)
      + '</td>'
      + '<td>' + (member.party) + '</td>'
      + '<td>' + (member.state) + '</td>'
      + '<td>' + (member.seniority) + ' years' + '</td>'
      + '<td>' + (member.votes_with_party_pct) + ' %' + '</td>'
      + '</th>')
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