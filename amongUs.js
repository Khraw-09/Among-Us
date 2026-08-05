const NOPsInputEl = document.querySelector(".NOPsInput");
const NOPsButtonEl = document.querySelector(".NOPsButton");
const impEl = document.querySelector(".impCountInput");
const nueEl = document.querySelector(".nueCountInput");

const nameContainerEl = document.querySelector(".nameContainer");

NOPsButtonEl.addEventListener("click", () => {
  scan();
});

let listOfNames = JSON.parse(localStorage.getItem("listOfNames"));

let listOfSelectedRoles = [];

function scan() {
  impEl.disabled = true;
  nueEl.disabled = true;

  if (nueEl.value <= 3) {
    if (
      listOfAllRoles.includes("Vampire") &
      listOfAllRoles.includes("Pelican") &
      listOfAllRoles.includes("Activist")
    ) {
      listOfAllRoles.splice(listOfAllRoles.indexOf("Vampire"), 1);
      listOfAllRoles.splice(listOfAllRoles.indexOf("Pelican"), 1);
      listOfAllRoles.splice(listOfAllRoles.indexOf("Activist"), 1);
    }
  }
  if ((impEl.value == 1) & listOfAllRoles.includes("Possessor")) {
    listOfAllRoles.splice(listOfAllRoles.indexOf("Possessor"), 1);
  }
  if ((impEl.value == 1) & listOfAllRoles.includes("Butcher")) {
    listOfAllRoles.splice(listOfAllRoles.indexOf("Butcher"), 1);
  }

  const NOPsInputEl = document.querySelector(".NOPsInput");
  const NOPsButtonEl = document.querySelector(".NOPsButton");

  const nameContainerEl = document.querySelector(".nameContainer");

  let ranList = getRandomList();
  console.log(ranList);

  //inserting the "Confirm All" button
  const confirmAllEl = document.createElement("button");
  confirmAllEl.classList.add("confirmAllButton");
  confirmAllEl.textContent = "Confirm All";
  confirmAllEl.addEventListener("click", () => {
    draft(ranList);
  });
  document.querySelector(".inputContainer").appendChild(confirmAllEl);

  let noOfPlayers = NOPsInputEl.value;
  NOPsInputEl.disabled = true;
  NOPsButtonEl.disabled = true;

  for (let i = 0; i < noOfPlayers; i++) {
    //creating the container for input-button-button group
    const nameInputContainerEl = document.createElement("div");
    nameInputContainerEl.classList.add("nameInputContainer");
    nameContainerEl.appendChild(nameInputContainerEl);

    //creating the input field
    const nameInputEl = document.createElement("input");
    nameInputEl.classList.add("nameInput");
    nameInputEl.placeholder = `Enter Player-${i + 1} name`;
    nameInputContainerEl.appendChild(nameInputEl);

    //creating the confirm button
    const confirmNameEl = document.createElement("button");
    confirmNameEl.classList.add("confirmName");
    confirmNameEl.textContent = "Confirm";
    nameInputContainerEl.appendChild(confirmNameEl);

    //creating the delete button
    const deleteNameEl = document.createElement("button");
    deleteNameEl.classList.add("deleteName");
    deleteNameEl.textContent = "Delete";
    nameInputContainerEl.appendChild(deleteNameEl);
  }

  if (listOfNames === null || listOfNames.length === 0) {
    listOfNames = [];
    console.log("List is null");
  } else {
    const nameInputList = document.querySelectorAll(".nameInput");
    for (let i = 0; i < nameInputList.length; i++) {
      console.log(listOfNames);
      nameInputList[i].value = listOfNames[i];
    }
  }

  for (let j = 0; j < noOfPlayers; j++) {
    const nameInputContainerList = document.querySelectorAll(
      ".nameInputContainer",
    );
    const nameInputList = document.querySelectorAll(".nameInput");
    const confirmNameList = document.querySelectorAll(".confirmName");
    const deleteNameList = document.querySelectorAll(".deleteName");

    confirmNameList[j].addEventListener("click", () => {
      nameInputList[j].disabled = true;
      confirmNameList[j].disabled = true;
      let name = nameInputList[j].value;
      if (listOfNames.includes(name)) {
      } else {
        listOfNames.push(name);
        localStorage.setItem("listOfNames", JSON.stringify(listOfNames));
        console.log("Scored");
      }
    });

    deleteNameList[j].addEventListener("click", () => {
      const toDelList = document.querySelectorAll(".nameInputContainer");
      for (let el = 0; el < toDelList.length; el++) {
        nameContainerEl.removeChild(toDelList[el]);
      }

      let name = nameInputList[j].value;
      if (listOfNames.includes(name)) {
        listOfNames.splice(listOfNames.indexOf(name), 1);
      }
      localStorage.setItem("listOfNames", JSON.stringify(listOfNames));

      NOPsInputEl.value--;
      scan();
    });
  }
}

function check(event) {
  if (event.key === "Enter") {
    scan();
  }
}

const listOfImposters = [
  "Killer",
  "Betrayer",
  "Butcher",
  "Black-Mailer",
  "Possessor",
];

const listOfNeutrals = [
  "Jester",
  "Executioner",
  "Predictor",
  "Pelican",
  "Activist",
  "Vampire",
];

const listOfCrewmates = [
  "Angel",
  "Ghost",
  "Sheriff",
  "Lawyer",
  "Exposer",
  "Wildcard",
  "In-evitable",
  "Reviver",
  "Soul",
  "Swindler",
  "Bishop",
  "Greed",
  "Xenser",
  "Mayor",
  "Hitman",
  "Survivor",
  "Glitch",
  "Crewmate",
];

const listOfAllRoles = [
  "Killer",
  "Butcher",
  "Black-Mailer",
  "Possessor",
  "Jester",
  "Executioner",
  "Predictor",
  "Pelican",
  "Activist",
  "Vampire",
  "Glitch",
  "Angel",
  "Ghost",
  "Sheriff",
  "Lawyer",
  "Exposer",
  "Wildcard",
  "In-evitable",
  "Reviver",
  "Soul",
  "Swindler",
  "Bishop",
  "Greed",
  "Xenser",
  "Mayor",
  "Hitman",
  "Survivor",
  "Crewmate",
];

draftingTurn = 0;
function draft(list) {
  let NOPsInputEl = document.querySelector(".NOPsInput");
  console.log(NOPsInputEl.value);
  console.log(draftingTurn);

  let res = NOPsInputEl.value == draftingTurn;
  console.log(res);
  if (res) {
    document.querySelector(".dataContainer").classList.add("active");
    document.querySelector(".active").classList.remove("dataContainer");
    console.log(listOfSelectedRoles);
    console.log("draft ended");
    return;
  }

  let name = listOfNames[list[draftingTurn]];
  document.querySelector("h1").textContent = `${name}'s turn`;

  //getting the roles
  ranRolesList = genRandomRoles();
  const role1 = listOfAllRoles[ranRolesList[0]];
  const role2 = listOfAllRoles[ranRolesList[1]];
  const role3 = listOfAllRoles[ranRolesList[2]];
  console.log(role1, role2, role3);
  //putting the roles one-by-one
  //choice 1
  const choice1El = document.createElement("div");
  choice1El.classList.add("choiceContainer");
  if (listOfImposters.includes(role1)) {
    choice1El.classList.add("impContainer");
  } else if (listOfNeutrals.includes(role1)) {
    choice1El.classList.add("neuContainer");
  } else {
    choice1El.classList.add("creContainer");
  }
  document.querySelector(".draftContainer").appendChild(choice1El);
  const role1GroupEl = document.createElement("div");
  role1GroupEl.classList.add("roleGroup");
  if (listOfImposters.includes(role1)) {
    role1GroupEl.textContent = "IMPOSTER";
  } else if (listOfNeutrals.includes(role1)) {
    role1GroupEl.textContent = "NEUTRAL";
  } else {
    role1GroupEl.textContent = "CREWMATE";
  }
  choice1El.appendChild(role1GroupEl);
  const role1El = document.createElement("div");
  role1El.classList.add("role");
  role1El.textContent = role1;
  choice1El.appendChild(role1El);

  //choice 2
  const choice2El = document.createElement("div");
  choice2El.classList.add("choiceContainer");
  if (listOfImposters.includes(role2)) {
    choice2El.classList.add("impContainer");
  } else if (listOfNeutrals.includes(role2)) {
    choice2El.classList.add("neuContainer");
  } else {
    choice2El.classList.add("creContainer");
  }
  document.querySelector(".draftContainer").appendChild(choice2El);
  const role2GroupEl = document.createElement("div");
  role2GroupEl.classList.add("roleGroup");
  if (listOfImposters.includes(role2)) {
    role2GroupEl.textContent = "IMPOSTER";
  } else if (listOfNeutrals.includes(role2)) {
    role2GroupEl.textContent = "NEUTRAL";
  } else {
    role2GroupEl.textContent = "CREWMATE";
  }
  choice2El.appendChild(role2GroupEl);
  const role2El = document.createElement("div");
  role2El.classList.add("role");
  role2El.textContent = role2;
  choice2El.appendChild(role2El);

  //choice 3
  const choice3El = document.createElement("div");
  choice3El.classList.add("choiceContainer");
  if (listOfImposters.includes(role3)) {
    choice3El.classList.add("impContainer");
  } else if (listOfNeutrals.includes(role3)) {
    choice3El.classList.add("neuContainer");
  } else {
    choice3El.classList.add("creContainer");
  }
  document.querySelector(".draftContainer").appendChild(choice3El);
  const role3GroupEl = document.createElement("div");
  role3GroupEl.classList.add("roleGroup");
  if (listOfImposters.includes(role3)) {
    role3GroupEl.textContent = "IMPOSTER";
  } else if (listOfNeutrals.includes(role3)) {
    role3GroupEl.textContent = "NEUTRAL";
  } else {
    role3GroupEl.textContent = "CREWMATE";
  }
  choice3El.appendChild(role3GroupEl);
  const role3El = document.createElement("div");
  role3El.classList.add("role");
  role3El.textContent = role3;
  choice3El.appendChild(role3El);

  //putting a random option
  const ranChoiceEl = document.createElement("div");
  ranChoiceEl.classList.add("choiceContainer", "choice4");
  document.querySelector(".draftContainer").appendChild(ranChoiceEl);
  const queMarkEl = document.createElement("div");
  queMarkEl.classList.add("queMark");
  queMarkEl.textContent = "?";
  ranChoiceEl.appendChild(queMarkEl);
  const randomNoteEl = document.createElement("div");
  randomNoteEl.classList.add("randomNote");
  randomNoteEl.textContent = "Random";
  ranChoiceEl.appendChild(randomNoteEl);

  //config the choices
  choice1El.addEventListener("click", () => {
    chooseRole(name, list, role1);
  });
  choice2El.addEventListener("click", () => {
    chooseRole(name, list, role2);
  });
  choice3El.addEventListener("click", () => {
    chooseRole(name, list, role3);
  });
  ranChoiceEl.addEventListener("click", () => {
    chooseRole(
      name,
      list,
      listOfAllRoles[Math.floor(Math.random() * listOfAllRoles.length)],
    );
  });
}

function getRandomList() {
  let turn = 0;
  let list = [];
  const rangeEl = document.querySelector(".NOPsInput");
  const range = rangeEl.value;
  let ran = genRandomList();
  function genRandomList() {
    if (turn == range) {
      return;
    } else {
      const num = Math.floor(Math.random() * range);
      if (!list.includes(num)) {
        list.push(num);
        turn++;
      }
      genRandomList();
    }
    return list;
  }
  return ran;
}

function genRandomRoles() {
  let rolesTurn = 0;
  let rolesNumList = [];
  let ranList = getRandomRolesNum();
  function getRandomRolesNum() {
    if (rolesTurn == 3) {
      return;
    } else {
      const rVar = Math.floor(Math.random() * listOfAllRoles.length);
      if (!rolesNumList.includes(rVar)) {
        rolesNumList.push(rVar);
        rolesTurn++;
      }
      getRandomRolesNum();
    }
    return rolesNumList;
  }
  return rolesNumList;
}

function chooseRole(name, list, role) {
  console.log(role);
  document.querySelector(".draftContainer").innerHTML = "";
  document.querySelector("h1").textContent = "";

  const displayEl = document.createElement("div");
  displayEl.classList.add("displayContainer");
  if (listOfImposters.includes(role)) {
    displayEl.classList.add("impContainer");
  } else if (listOfNeutrals.includes(role)) {
    displayEl.classList.add("neuContainer");
  } else {
    displayEl.classList.add("creContainer");
  }
  document.querySelector(".draftContainer").appendChild(displayEl);
  const roleInfoEl = document.createElement("div");
  roleInfoEl.classList.add("roleInfo");
  roleInfoEl.textContent = role;
  displayEl.appendChild(roleInfoEl);
  const infoEl = document.createElement("div");
  infoEl.classList.add("desc");
  infoEl.textContent = getRoleInfo(name, role);
  console.log(listOfAllRoles);
  displayEl.appendChild(infoEl);

  const proceedEl = document.createElement("button");
  proceedEl.classList.add("proceedBtn");
  proceedEl.textContent = "Proceed";
  displayEl.appendChild(proceedEl);
  if (listOfImposters.includes(role)) {
    proceedEl.classList.add("proceedImp");
  } else if (listOfNeutrals.includes(role)) {
    proceedEl.classList.add("proceedNeu");
  } else {
    proceedEl.classList.add("proceedCre");
  }
  proceedEl.addEventListener("click", () => {
    draftingTurn++;
    document.querySelector(".draftContainer").innerHTML = "";
    draft(list);
  });
}

function getRoleInfo(name, role) {
  const dataEl = document.querySelector(".dataContainer");

  listOfSelectedRoles.push(role);
  if (nueEl.value == 4) {
    if (role == "Pelican") {
      listOfAllRoles.splice(listOfAllRoles.indexOf("Vampire"), 1);
      listOfAllRoles.splice(listOfAllRoles.indexOf("Activist"), 1);
    }
    if (role == "Vampire") {
      listOfAllRoles.splice(listOfAllRoles.indexOf("Pelican"), 1);
      listOfAllRoles.splice(listOfAllRoles.indexOf("Activist"), 1);
    }
    if (role == "Activist") {
      listOfAllRoles.splice(listOfAllRoles.indexOf("Vampire"), 1);
      listOfAllRoles.splice(listOfAllRoles.indexOf("Pelican"), 1);
    }
  }
  if (nueEl.value == 5) {
    if (role == "Vampire") {
      if (listOfSelectedRoles.includes("Pelican")) {
        listOfAllRoles.splice(listOfAllRoles.indexOf("Activist"), 1);
      }
      if (listOfSelectedRoles.includes("Activist")) {
        listOfAllRoles.splice(listOfAllRoles.indexOf("Pelican"), 1);
      }
    }
    if (role == "Pelican") {
      if (listOfSelectedRoles.includes("Vampire")) {
        listOfAllRoles.splice(listOfAllRoles.indexOf("Activist"), 1);
      }
      if (listOfSelectedRoles.includes("Activist")) {
        listOfAllRoles.splice(listOfAllRoles.indexOf("Vampire"), 1);
      }
    }
    if (role == "Activist") {
      if (listOfSelectedRoles.includes("Pelican")) {
        listOfAllRoles.splice(listOfAllRoles.indexOf("Vampire"), 1);
      }
      if (listOfSelectedRoles.includes("Vampire")) {
        listOfAllRoles.splice(listOfAllRoles.indexOf("Pelican"), 1);
      }
    }
  }

  let checkCrew = role == "Crewmate";
  if (!checkCrew) {
    listOfAllRoles.splice(listOfAllRoles.indexOf(role), 1);
  }

  const mainCon = document.createElement("div");

  const lab = document.createElement("div");
  lab.classList.add("title");
  lab.textContent = `${role} (${name})`;

  const inner = document.createElement("div");
  inner.classList.add("inner");

  if (role === "Killer") {
    listOfAllRoles.splice(listOfAllRoles.indexOf("Butcher"), 1);
    listOfAllRoles.splice(listOfAllRoles.indexOf("Possessor"), 1);
    listOfAllRoles.splice(listOfAllRoles.indexOf("Black-Mailer"), 1);
    if (impEl.value == 2) {
      listOfAllRoles.push("Betrayer");
    }

    mainCon.classList.add("killerContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Kill:";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    return "Pyniap lut ia baroh ban jop.";
  }
  if (role === "Butcher") {
    listOfAllRoles.splice(listOfAllRoles.indexOf("Killer"), 1);
    listOfAllRoles.splice(listOfAllRoles.indexOf("Possessor"), 1);
    listOfAllRoles.splice(listOfAllRoles.indexOf("Black-Mailer"), 1);
    if (impEl.value == 2) {
      listOfAllRoles.push("Betrayer");
    }

    mainCon.classList.add("killerContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Kill:";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    return "Lada phi ioh pyniap ha ki 2 round, phi lah ban pyniap 2 ngut ha ka round ba bud.";
  }
  if (role === "Possessor") {
    listOfAllRoles.splice(listOfAllRoles.indexOf("Killer"), 1);
    listOfAllRoles.splice(listOfAllRoles.indexOf("Butcher"), 1);
    listOfAllRoles.splice(listOfAllRoles.indexOf("Black-Mailer"), 1);

    mainCon.classList.add("killerContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Kill:";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    const innerLabel1 = document.createElement("label");
    innerLabel1.classList.add("innerLabel1");
    innerLabel1.textContent = "Possess:";
    inner.appendChild(innerLabel1);

    const input2 = document.createElement("input");
    input2.classList.add("inputEl");
    inner.appendChild(input2);

    return "Phi lah ban pynkylla Betrayer ia iwei na ki Player.";
  }
  if (role === "Black-Mailer") {
    listOfAllRoles.splice(listOfAllRoles.indexOf("Killer"), 1);
    listOfAllRoles.splice(listOfAllRoles.indexOf("Butcher"), 1);
    listOfAllRoles.splice(listOfAllRoles.indexOf("Possessor"), 1);
    if (impEl.value == 2) {
      listOfAllRoles.push("Betrayer");
    }

    mainCon.classList.add("killerContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Kill:";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    const innerLabel1 = document.createElement("label");
    innerLabel1.classList.add("innerLabel1");
    innerLabel1.textContent = "Blackmail:";
    inner.appendChild(innerLabel1);

    const input2 = document.createElement("input");
    input2.classList.add("inputEl");
    inner.appendChild(input2);

    return "Pynsngapjar ia iwei na ki player ha ka por meeting.";
  }
  if (role === "Betrayer") {
    mainCon.classList.add("killerContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Kill:";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    return "Kylla killer lada iap ne shah vote out ne shah pyniap kiwei pat ki IMPOSTER.";
  }
  if (role === "Jester") {
    mainCon.classList.add("neutralContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    return "Shah vote out ban jop.";
  }
  if (role === "Executioner") {
    const exe =
      listOfNames[
        Math.floor(Math.random() * document.querySelector(".NOPsInput").value)
      ];

    mainCon.classList.add("neutralContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = `To execute: ${exe}`;
    inner.appendChild(innerLabel);
    return "Vote out ia i " + exe + " ban jop.";
  }
  if (role === "Predictor") {
    mainCon.classList.add("neutralContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel1");
    innerLabel.textContent = "Predict:";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    return "Jop da kaba guess mano ban iap.";
  }
  if (role === "Pelican") {
    mainCon.classList.add("neutralContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Eat:";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    return "Bam ia kiwei ban jop.";
  }
  if (role === "Activist") {
    mainCon.classList.add("neutralContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    return "Pyndonkam ia ka vote jong kiba lah iap.";
  }
  if (role === "Vampire") {
    mainCon.classList.add("neutralContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Bite:";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    return "Pynkylla Vampire lang ia kiwei.";
  }
  if (role === "Glitch") {
    mainCon.classList.add("crewContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Glitch:";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    return "Ka role jong phi ka kylla man ka por.";
  }
  if (role === "Angel") {
    mainCon.classList.add("crewContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Protect:";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    return "Iada ia ki player na ka jingiap.";
  }
  if (role === "Ghost") {
    mainCon.classList.add("crewContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Protect:";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    return "Iada briew ynda phi lah iap.";
  }
  if (role === "Sheriff") {
    mainCon.classList.add("crewContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Shoot:";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    return "Pyniap ia ki IMPOSTER. Lada bakla, phi iap ialade.";
  }
  if (role === "Lawyer") {
    mainCon.classList.add("crewContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Defend:";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    return "Iada ia ki player ba kin nym shah beh.";
  }
  if (role === "Exposer") {
    mainCon.classList.add("crewContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    return "Kiba vote ia phi kin sa babe.";
  }
  if (role === "Wildcard") {
    mainCon.classList.add("crewContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    return "Tang u Betrayer u lah ban pyniap ia phi.";
  }
  if (role === "In-evitable") {
    mainCon.classList.add("crewContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    return "Tang u Activist u lah ban vote out ia phi.";
  }
  if (role === "Reviver") {
    mainCon.classList.add("crewContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Revive:";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    const input2 = document.createElement("input");
    input2.classList.add("inputEl");
    inner.appendChild(input2);

    return "Pyndonkam ia ka role jong iwei na kiba lah iap.";
  }
  if (role === "Soul") {
    mainCon.classList.add("crewContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Give soul to:";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    return "Ai noh ia ka jingim jong phi ha iwei pat i player, lada phi shah vote out.";
  }
  if (role === "Swindler") {
    mainCon.classList.add("crewContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Swap votes:";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    return "Bujli ia ki votes jong ar ngut ki player.";
  }
  if (role === "Bishop") {
    mainCon.classList.add("crewContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Inspect(1):";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    return "Tip ia ka role jong iwei na ki Player.";
  }
  if (role === "Greed") {
    mainCon.classList.add("crewContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Inspect(3):";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    return "Tip ia ka role jong 3 ngut ki player.";
  }
  if (role === "Xenser") {
    mainCon.classList.add("crewContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Inspect:";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    return "Tip ia ka group jong kiwei ki player.";
  }
  if (role === "Mayor") {
    mainCon.classList.add("crewContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    return "Ia ka vote jong phi yn Khein 2.";
  }
  if (role === "Hitman") {
    mainCon.classList.add("crewContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    const innerLabel = document.createElement("label");
    innerLabel.classList.add("innerLabel");
    innerLabel.textContent = "Camp:";
    inner.appendChild(innerLabel);

    const input1 = document.createElement("input");
    input1.classList.add("inputEl");
    inner.appendChild(input1);

    const innerLabel1 = document.createElement("label");
    innerLabel1.classList.add("innerLabel1");
    innerLabel1.textContent = "Kill:";
    inner.appendChild(innerLabel1);

    const input2 = document.createElement("input");
    input2.classList.add("inputEl");
    inner.appendChild(input2);

    return "Pyniap ia iwei pat i player lada i paralok phi i iap.";
  }
  if (role === "Survivor") {
    mainCon.classList.add("crewContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    return "Im mar-shiteng game ban tip ia ki IMPOSTER.";
  }
  if (role === "Crewmate") {
    mainCon.classList.add("crewContainer");
    dataEl.appendChild(mainCon);

    mainCon.appendChild(lab);
    mainCon.appendChild(inner);

    return;
  }
}
