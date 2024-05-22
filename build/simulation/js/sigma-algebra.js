var cnt1 = 0;
var cnt2 = 0;
var maxCnt1 = 1;
var maxCnt2 = 4;

var ids1 = ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1", "j1", "k1", "l1", "m1"]
var ids2 = ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "i2", "j2", "k2", "l2", "m2"]
var ids3 = ["b3", "c3", "d3", "e3", "f3", "g3", "h3", "i3", "j3", "k3", "l3", "m3"]
var ids4 = ["b4", "c4", "d4", "e4", "f4", "g4", "h4", "i4", "j4", "k4", "l4", "m4"]

var idToSet = {
  "a": [0, 1, 0, 0],
  "b": [0, 0, 1, 0],
  "c": [0, 0, 0, 1],
  "d": [1, 1, 0, 0],
  "e": [1, 0, 1, 0],
  "f": [1, 0, 0, 1],
  "g": [0, 1, 1, 0],
  "h": [0, 1, 0, 1],
  "i": [0, 0, 1, 1],
  "j": [1, 1, 1, 0],
  "k": [1, 1, 0, 1],
  "l": [1, 0, 1, 1],
  "m": [0, 1, 1, 1]
}

var sampleSpace = [1, 1, 1, 1]
var coll1 = [[0, 0, 0, 0], [1, 1, 1, 1], [1, 0, 0, 0]];
var coll2 = [[0, 0, 0, 0], [1, 1, 1, 1], [1, 0, 0, 0], [0, 1, 0, 0]];

function initialPosition(id1, id2) {
  id1.style.display = "block";
  id1.style.display = "flex";
  id2.style.display = "none";

  const obs1 = document.getElementById("observations1");
  obs1.innerHTML = "";
  const res1 = document.getElementById("results1");
  res1.innerHTML = "";
  const obs2 = document.getElementById("observations2");
  obs2.innerHTML = "";
  const res2 = document.getElementById("results2");
  res2.innerHTML = "";
}
function hide1(id1, id2) {
  if (cnt1 < maxCnt1) {
    cnt1 = cnt1 + 1;
    id1 = document.getElementById(id1);
    id2 = document.getElementById(id2);
    initialPosition(id2, id1);
  }
}
function hide2(id1, id2) {
  cnt1 = cnt1 - 1;
  id1 = document.getElementById(id1);
  id2 = document.getElementById(id2);
  initialPosition(id1, id2);
}
function hide3(id3, id4) {
  if (cnt2 < maxCnt2) {
    cnt2 = cnt2 + 1;
    id3 = document.getElementById(id3);
    id4 = document.getElementById(id4);
    initialPosition(id4, id3);
  }
}
function hide4(id3, id4) {
  cnt2 = cnt2 - 1;
  id3 = document.getElementById(id3);
  id4 = document.getElementById(id4);
  initialPosition(id3, id4);
}

function complement(set) {
  // Gives binary complement of the given set
  var comp = set.slice();
  for (var i = 0; i < set.length; i++) {
    if (set[i] == 1) {
      comp[i] = 0;
    }
    else {
      comp[i] = 1;
    }
  }
  return comp;
}
function union(set1, set2) {
  // Gives binary union of the given sets
  var unionSet = set1.slice();
  for (var i = 0; i < set1.length; i++) {
    if (set2[i] == 1) {
      unionSet[i] = 1;
    }
  }
  return unionSet;
}
function setToEvent(set) {
  // Gives the event corresponding to the given set for the sample space {a,b,c,d}
  var event = "{";
  if (set[0] == 1) {
    event = event + "a,";
  }
  if (set[1] == 1) {
    event = event + "b,";
  }
  if (set[2] == 1) {
    event = event + "c,";
  }
  if (set[3] == 1) {
    event = event + "d";
  }
  return event + "}";
}
function isSigmaAlgebra(coll, sampleSpace) {
  // check if the collection is a sigma algebra

  // check if sample space is present in the collection
  console.log(coll.some(e => JSON.stringify(e) === JSON.stringify(sampleSpace)));
  if (!coll.some(e => JSON.stringify(e) === JSON.stringify(sampleSpace))) {
    return [false, "sample space not included"];
  }
  // check if the collection is closed under complement
  for (var i = 0; i < coll.length; i++) {
    var comp = complement(coll[i]);
    if (!coll.some(e => JSON.stringify(e) === JSON.stringify(comp))) {
      return [false, "complement of " + setToEvent(coll[i]) + " is not there in the choosen collection."];
    }
  }
  // check if the collection is closed under union
  for (var i = 0; i < coll.length; i++) {
    for (var j = i; j < coll.length; j++) {
      var unionSet = union(coll[i], coll[j]);
      if (!coll.some(e => JSON.stringify(e) === JSON.stringify(unionSet))) {
        return [false, "union of " + setToEvent(coll[i]) + " and " + setToEvent(coll[j]) + " is not included in the choosen collection."];
      }
    }
  }
  return [true, "sigma algebra"];
}
function choosenId(ids) {
  // gives the ids which are choosen
  var choosedIds = [];
  for (var i = 0; i < ids.length; i++) {
    var id = document.getElementById(ids[i]);
    if (id.style.display == "flex") {
      choosedIds.push(ids[i]);
    }
  }
  return choosedIds;
}
function checkSoln(collGiven, idGiven) {
  var coll = [];
  var ids = idGiven;
  var choosedIds = choosenId(ids);

  // insert set to the collection based on the choosen ids
  for (var i = 0; i < choosedIds.length; i++) {
    var id = choosedIds[i];
    var set = idToSet[id[0]];
    coll.push(set);
  }
  coll = [...coll, ...collGiven]
  // check if the collection is a sigma algebra
  var res = isSigmaAlgebra(coll, sampleSpace);
  return res;
}

function check1() {
  const obs1 = document.getElementById("observations1");

  if (cnt1 == 0) {
    obs1.innerHTML = "Click on the sets"
    obs1.style.color = "black";
    return;
  }
  const res1 = document.getElementById("results1");
  const response = checkSoln(coll1, ids2);
  if (response[0] == true) {
    obs1.innerHTML = "<b>Correct Answer!!!</b>"
    obs1.style.color = "green";
    res1.innerHTML = "The given collection is a sigma algebra.";
  }
  else {
    obs1.innerHTML = "<b>Wrong Answer :(</b> ";
    obs1.style.color = "red";
    res1.innerHTML = "The given collection is not a sigma algebra, because " + response[1];
  }
}
function check2() {
  const obs2 = document.getElementById("observations2");

  if (cnt2 == 0) {
    obs2.innerHTML = "Click on the sets"
    obs2.style.color = "black";
    return;
  }
  const res2 = document.getElementById("results2");
  const response = checkSoln(coll2, ids4);
  if (response[0] == true) {
    obs2.innerHTML = "<b>Correct Answer!!!</b>"
    obs2.style.color = "green";
    res2.innerHTML = "The given collection is a sigma algebra.";
  }
  else {
    obs2.innerHTML = "<b>Wrong Answer :(</b> ";
    obs2.style.color = "red";
    res2.innerHTML = "The given collection is not a sigma algebra, because " + response[1];
  }
}

function reset1() {
  cnt1 = 0;
  for (var i = 0; i < ids1.length; i++) {
    initialPosition(document.getElementById(ids1[i]), document.getElementById(ids2[i]));
  }
}
function reset2() {
  cnt2 = 0;
  for (var i = 0; i < ids3.length; i++) {
    initialPosition(document.getElementById(ids3[i]), document.getElementById(ids4[i]));
  }
}

function page1() {
  const p1 = document.getElementById("page1");
  const p2 = document.getElementById("page2");
  reset1();
  p1.style.display = "block";
  p2.style.display = "none";
}
function page2() {
  const p1 = document.getElementById("page1");
  const p2 = document.getElementById("page2");
  reset2();
  p1.style.display = "none";
  p2.style.display = "block";

}