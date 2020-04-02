 const  preObject = document.getElementById('object');
 const ulList = document.getElementById('list');
 // init firebase
 const db = firebase.database();
 // Create references
 const highscores = db.ref().child('highscores');
 const dbRefList = highscores.child('id1');
 //syn object changes
 highscores.on('value', snap => preObject.innerText = JSON.stringify(snap.val()), null, 5);

 dbRefList.on('child_added', snap => {
     const li = document.createElement('li');
     li.innerText = snap.val();
     ulList.appendChild(li);
 });


 for (let i = 0; i <20; i++){
     let tr = $("<tr></tr>").attr("id",i);
     let name = $("<td></td>").text(database[i].name);
     let précision = $("<td></td>").text(database[i].précision);
     let score = $("<td></td>").text(database[i].score);
     tr.append(name);
     tr.append(précision);
     tr.append(score);
 }

