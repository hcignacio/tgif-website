var url = 'https://api.propublica.org/congress/v1/113/house/members.json';
var init = {
  headers: { 'X-API-Key': '7N4UW2yp17PDDNXVaEn7IK9c9NqAPMLu9snmfpyQ' },
  mode: 'cors',
};

$(function () {
  fetchJson(url, init);
})

function fetchJson(url, init) {
  return fetch(url, init).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  }).then(function (data) {
    
    console.log(data.results[0].members);
    statesOptions = defineDropdownStatesOptions(data.results[0].members);
    createDropdownStates(statesOptions);
    getCB(data.results[0].members);

    document.getElementById("dd-states").addEventListener("change", () => {
      let stateSelected = document.getElementById("dd-states").value;
      var dataToFilter = getCB(data.results[0].members);
      getDD(dataToFilter, stateSelected)
    });
    document.getElementById("cb-d").addEventListener("change", () => {
      let stateSelected = document.getElementById("dd-states").value;
      var dataToFilter = getCB(data.results[0].members);
      getDD(dataToFilter, stateSelected)
    });
    document.getElementById("cb-r").addEventListener("change", () => {
      let stateSelected = document.getElementById("dd-states").value;
      var dataToFilter = getCB(data.results[0].members);
      getDD(dataToFilter, stateSelected)
    });
    document.getElementById("cb-i").addEventListener("change", () => {
      let stateSelected = document.getElementById("dd-states").value;
      var dataToFilter = getCB(data.results[0].members);
      getDD(dataToFilter, stateSelected)
    });
  });
}

// statesOptions = defineDropdownStatesOptions(data.results[0].members)
// createDropdownStates(statesOptions)

/* function createDropdownStates(statesOptions) {
  statesOptions.forEach(function (state) {
    $("#dd-states").append(
      '<a class="dropdown-item" id="' + state + '" onclick="getDD(this.id)">' + state + '</a>'
    )
  })
} */

function createDropdownStates(statesOptions) {
  statesOptions.forEach(function (state) {
    $("#dd-states").append(
      '<option value="' + state + '" >' + state + '</option>'
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

function createTableHouse(members) {
  $("#t-data").empty();
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


function getCB(members) {
  checkedBoxes = [];
  if (document.getElementById("cb-d").checked) {
    checkedBoxes.push('D')
  }
  if (document.getElementById("cb-r").checked) {
    checkedBoxes.push('R')
  }
  if (document.getElementById("cb-i").checked) {
    checkedBoxes.push('I')
  }

  var dataToFilter = members;

  var finalData = dataToFilter.filter(member => checkedBoxes.includes(member.party))

  if (!(checkedBoxes.includes('D')) && !(checkedBoxes.includes('R')) && !(checkedBoxes.includes('I'))) {
    finalData = [];
  }

  let stateSelected = document.getElementById("dd-states").value;
  finalData = getDD(finalData, stateSelected);

  createTableHouse(finalData);

  if (finalData.length == 0) {
    $(".table").hide();
  }
  else {
    $(".table").fadeIn();
  }

  return finalData;
}

/* function getDD(id) {
  var dataToFilter = getCB();
  if (id == "ALL") {
    var finalData = dataToFilter
  }
  else {
    var finalData = dataToFilter.filter(member => member.state == id)
  }
  createTableHouse(finalData);
  console.log(id)
} */

/* document.getElementById("dd-states").addEventListener("change", () => {
  let stateSelected = document.getElementById("dd-states").value;
  var dataToFilter = getCB();
  getDD(dataToFilter, stateSelected)
}); */

function getDD(members, state) {
  if ((state) == "ALL") {
    var finalData = members
  }
  else {
    var finalData = members.filter(member => member.state == state)
  }
  return finalData;
}