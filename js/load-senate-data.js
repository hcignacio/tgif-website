createTableSenate(data.results[0].members)

statesOptions = defineDropdownStatesOptions(data.results[0].members)
createDropdownStates(statesOptions)

function createDropdownStates(statesOptions) {
  statesOptions.forEach(function (state) {
    $("#dd-states").append(
      '<a class="dropdown-item" href="senate-data.html' + state + '">' + state + '</a>'
    )
  })
}

function defineDropdownStatesOptions(members) {
  var states = [];
  for (var j = 0; j < members.length; j++) {
    states.push(members[j].state);
  }

  states.sort();

  var statesOptions = [];

  for (var i = 0; i < states.length; i++) {
    if (states[i] != states[i + 1]) {
      statesOptions.push(states[i]);
    }
  }
  return statesOptions;
}

function createTableSenate(members) {
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


function getCB() {
  checkedBoxes = [];
  if (document.getElementById("cb-d").checked) {
    //console.log('D')
    checkedBoxes.push('D')
  }
  if (document.getElementById("cb-r").checked) {
    //console.log('R')
    checkedBoxes.push('R')
  }
  if (document.getElementById("cb-i").checked) {
    //console.log('I')
    checkedBoxes.push('I')
  }
  console.log(checkedBoxes)

  if (checkedBoxes.includes('D')) {
    console.log('D')
  }
}