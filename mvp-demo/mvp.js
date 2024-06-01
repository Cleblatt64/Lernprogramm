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
        this.fragListAll = [{f:"0", a:["a","b","c","d"]},
                            {f:"1", a:["a","b","c","d"]},
                            {f:"2", a:["a","b","c","d"]},
                            {f:"3", a:["a","b","c","d"]},
                            {f:"4", a:["a","b","c","d"]}];

        this.fragListMat = [{f:"5", a:["a","b","c","d"]},
                            {f:"6", a:["a","b","c","d"]},
                            {f:"7", a:["a","b","c","d"]},
                            {f:"8", a:["a","b","c","d"]},
                            {f:"9", a:["a","b","c","d"]}];

        this.fragListInt = [{f:"10", a:["a","b","c","d"]},
                            {f:"11", a:["a","b","c","d"]},
                            {f:"12", a:["a","b","c","d"]},
                            {f:"13", a:["a","b","c","d"]},
                            {f:"14", a:["a","b","c","d"]}];
    }

    // Holt eine Frage aus dem Array, zufällig ausgewählt oder vom Server
    getTask(T) {
        let TaskList
        switch (T) {
            case "Tall":
                TaskList = this.fragListAll;
                break;
            case "Tmat":
                TaskList = this.fragListMat;
                break;
            case "Tint":
                TaskList = this.fragListInt;
                break;
        }

        let tnr = Math.floor(Math.random() * TaskList.length);
        return TaskList[tnr];  // Aufgabe + Lösungen
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
        let task = this.m.getTask(this.v.Topic);
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
        this.questionNr++;
        console.log("question Nr.", this.questionNr," correct: ",this.correct, " wrong: ",this.wrong);
        let progress = document.getElementById("progress");
        progress.value = this.correct / this.questionNr * 100;
        document.getElementById("taskCount").innerHTML = "Frage " + (this.questionNr+1) + "/10";
        
        if (this.questionNr < 10){
            this.setTask();
        } else {
            this.v.showResult(this.correct);
        }
    }
}

// ##################### View #####################################################################
class View {
    constructor(p) {
        this.p = p;  // Presenter
        this.setHandler();
        this.firstTask = true;
    }

    setHandler() {
        // use capture false -> bubbling (von unten nach oben aufsteigend)
        // this soll auf Objekt zeigen -> bind (this)
        document.getElementById("answer").addEventListener("click", this.checkEvent.bind(this), false);
        //document.getElementById("start").addEventListener("click", this.start.bind(this), false);
        document.getElementById("Tall").addEventListener("click", this.Tall.bind(this), false);
        document.getElementById("Tmat").addEventListener("click", this.Tmat.bind(this), false);
        document.getElementById("Tint").addEventListener("click", this.Tint.bind(this), false);
    }

    start() {
        this.p.setTask();
        //document.getElementById("start").style.visibility = "hidden";
        document.getElementById("main").style.visibility = "visible";
        document.getElementById("result").style.visibility = "collapse";
    }

    setup(T) {
        this.Topic = T;
        this.p.correct = 0;
        this.p.wrong = 0;
        this.p.questionNr = 0;
        this.start();
    }

    Tall() {this.setup("Tall")}
    Tmat() {this.setup("Tmat")}
    Tint() {this.setup("Tint")}

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

    showResult(correct) {
        document.getElementById("main").style.visibility = "collapse";
        document.getElementById("resultCount").innerHTML = correct + "/10 Fragen wurden korrekt beantwortet";
        document.getElementById("result").style.visibility = "visible";
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
        div.appendChild(p);
    }
}