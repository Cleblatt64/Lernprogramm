"use strict";

//let p, v, m;
document.addEventListener('DOMContentLoaded', function () {
    let m = new Model();
    let p = new Presenter();
    let v = new View(p);
    p.setModelAndView(m, v);
    //p.setTask();
});

// ############# Model ###########################################################################
class Model {

    constructor() {
        this.fragList = [   {f:"0", a:["a","b","c","d"]},
                            {f:"1", a:["a","b","c","d"]},
                            {f:"2", a:["a","b","c","d"]},
                            {f:"3", a:["a","b","c","d"]},
                            {f:"4", a:["a","b","c","d"]}];
    }

    // Holt eine Frage aus dem Array, zufällig ausgewählt oder vom Server
    getTask(nr) {
        return this.fragList[nr];  // Aufgabe + Lösungen
    }
    checkAnswer() {
        // TODO
    }
}

// ############ Controller ########################################################################
class Presenter {
    constructor() {
        this.correct = 0;
        this.wrong = 0;
    }

    setModelAndView(m, v) {
        this.m = m;
        this.v = v;
    }

     // Holt eine neue Frage aus dem Model und setzt die View
    setTask() {
        this.fnr = Math.floor(Math.random() * this.m.fragList.length);
        let task = this.m.getTask(this.fnr);
        let frag = task.f;
        this.anr = Math.floor(Math.random() * 4);
        View.inscribeButtons(this.anr, task.a[0], this.anr)
        View.renderText(frag);
        let apos = 1;
        for (let i = 0; i < 4; i++) {
            if (i==this.anr) continue;
            let wert = task.a[apos];
            apos++;
            let pos = i;
            View.inscribeButtons(i, wert, pos); // Tasten beschriften -> View -> Antworten
        }
    }

    // Prüft die Antwort, aktualisiert Statistik und setzt die View
    checkAnswer(answer) {
        console.log("Antwort: ", answer);
        if (answer == this.anr){
            console.log("correct answer");
            this.correct++;
        } else {
            console.log("wrong answer");
            this.wrong++;
        }
        console.log("correct: ",this.correct, " wrong: ",this.wrong);
        this.setTask();
    }
}

// ##################### View #####################################################################
class View {
    constructor(p) {
        this.p = p;  // Presenter
        this.setHandler();
        document.getElementById("main").style.visibility = "hidden";
        this.firstTask = true;
    }

    setHandler() {
        // use capture false -> bubbling (von unten nach oben aufsteigend)
        // this soll auf Objekt zeigen -> bind (this)
        document.getElementById("answer").addEventListener("click", this.checkEvent.bind(this), false);
        document.getElementById("start").addEventListener("click", this.start.bind(this), false);
    }

    start() {
        this.p.setTask();
        document.getElementById("start").style.visibility = "hidden";
        document.getElementById("main").style.visibility = "visible";
    }

    static inscribeButtons(i, text, pos) {
        document.querySelectorAll("#answer > *")[i].textContent = text;
        document.querySelectorAll("#answer > *")[i].setAttribute("number", pos);
    }

    checkEvent(event) {
        console.log(event.type);
        if (event.target.nodeName === "BUTTON") {
            this.p.checkAnswer(Number(event.target.attributes.getNamedItem("number").value));
        }
    }

    static renderText(text) {
        //this.clearElement("boo");
        let div = document.getElementById("boo");
        let p = document.createElement("p");
        p.innerHTML = text;
        if (this.firstTask == true){
            div.appendChild(p);
            this.firstTask = false;
        } else {
            div.removeChild(div.lastChild);
            div.appendChild(p);
        }
    }
}