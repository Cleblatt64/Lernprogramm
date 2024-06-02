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

        //Fragen und Antworten wurden vom Chatbot "Aria" generiert.

        this.fragListAll = [{a:"Welches ist das größte Säugetier der Welt?", 
                                l:["Wal","Nashorn","Giraffe","Elefant"]},
                            {a:"Was ist die Hauptstadt von Australien?", 
                                l:["Canberra","Sydney","Melbourne","Perth"]},
                            {a:"Wer schrieb das Drama \"Romeo und Julia\"?", 
                                l:["William Shakespeare","Johann Wolfgang von Goethe","Friedrich Schiller","Heinrich Heine"]},
                            {a:"Welche Farbe hat die Null auf dem Roulette-Rad?", 
                                l:["Grün","Rot","Schwarz","Blau"]},
                            {a:"Wie viele Kontinente gibt es auf der Erde?", 
                                l:["7","5","6","8"]}, 
                            {a:"Welches ist das längste Fluss der Welt?", 
                                l:["Nil","Amazonas","Mississippi","Jangtse"]}, 
                            {a:"Wer malte die Mona Lisa?", 
                                l:["Leonardo da Vinci","Vincent van Gogh","Pablo Picasso","Claude Monet"]}, 
                            {a:"Wann endete der Erste Weltkrieg?", 
                                l:["1918","1939","1945","1905"]}, 
                            {a:"Was ist die chemische Formel für Wasser?",
                                 l:["H2O","CO2","NaCl","C6H12O6"]}, 
                            {a:"Welches ist das meistgesprochene Sprache der Welt?", 
                                l:["Mandarin","Englisch","Spanisch","Hindi"]}, 
                            {a:"Welcher Planet ist der größte in unserem Sonnensystem?", 
                                l:["Jupiter","Mars","Venus","Saturn"]}, 
                            {a:"In welcher Stadt steht der Eiffelturm?", 
                                l:["Paris","Rom","London","Berlin"]}, 
                            {a:"Was ist die Hauptstadt von Japan?", 
                                l:["Tokio","Peking","Seoul","Bangkok"]}, 
                            {a:"Welches ist das höchste Gebäude der Welt?", 
                                l:["Burj Khalifa","Shanghai Tower","One World Trade Center","Taipei 101"]}, 
                            {a:"Wer erfand das Telefon?", 
                                l:["Alexander Graham Bell","Thomas Edison","Nikola Tesla","Albert Einstein"]}, 
                            {a:"Welches ist das größte Land der Welt?", 
                                l:["Russland","Kanada","China","USA"]}, 
                            {a:"Wie viele Beine hat eine Spinne?", 
                                l:["8","6","10","12"]}, 
                            {a:"Wer war der erste Mensch im Weltraum?", 
                                l:["Juri Gagarin","Neil Armstrong","Buzz Aldrin","Valentina Tereshkova"]}, 
                            {a:"Welches ist das chemische Symbol für Gold?", 
                                l:["Au","Ag","Fe","Cu"]}];

        this.fragListMat = [{a:"a^2-b^2", l:["(a+b)(a-b)","-ab^2","(a-b)^2","a^2+2ab+b^2"]},
                            {a:"\\frac{a^3}{a^2}", l:["a","a^2","0","1"]},
                            {a:"\\sqrt{a}*\\sqrt{b}", l:["\\sqrt{ab}","a*b","0","ab^2"]},
                            {a:"a^x/a^y", l:["a^{x-y}","a^{x+y}","(x-y)^a","x/y"]},
                            {a:"(a+b)^3", l:["a^3+3a^2b+3ab^2+b^3","a^3+3ab+b^3","(a+b)*(a+b)","3(a+b)"]},
                            {a:"\\frac{a*b}{c}", l:["ab/c","c/ab","ab*c","\\frac{a}{c}+\\frac{b}{c}"]},
                            {a:"a^2+2ab+b^2", l:["(a+b)^2","2ab","a^b","2^{ab}"]},
                            {a:"\\frac{a^2}{a}", l:["a","-a","0","1"]},
                            {a:"a^{-n}*a^n", l:["1","0","a","a^2"]},
                            {a:"a*a*a", l:["a^3","3^a","a+a+a","\\sqrt{a}^5"]}];

        this.fragListInt = [{a:"Was ist HTML?", 
                                l:["Hypertext Markup Language","High Tech Multiplayer Language","Hyperlink and Text Markup Language","Home Tool Markup Language"]}, 
                            {a:"Welche Programmiersprache wird häufig für die Entwicklung von Webanwendungen verwendet?", 
                                l:["JavaScript","Java","C#","Python"]}, 
                            {a:"Was ist ein URL?", 
                                l:["Uniform Resource Locator","Universal Registration Link","Uniform Reference Language","Universal Rendering Language"]}, 
                            {a:"Welches Protokoll wird verwendet, um Webseiten sicher zu übertragen?", 
                                l:["HTTPS","HTTP","FTP","TCP"]}, 
                            {a:"Was ist ein Cookie in Bezug auf das Internet?", 
                                l:["Eine kleine Textdatei, die vom Browser gespeichert wird","Ein Online-Bezahlsystem","Ein neuer Webbrowser","Eine Art von Spam-E-Mails"]}, 
                            {a:"Welche Firma entwickelte das Betriebssystem Android?", 
                                l:["Google","Apple","Microsoft","Samsung"]}, 
                            {a:"Was ist ein VPN?", 
                                l:["Virtual Private Network","Very Personal Navigator","Virtual Programming Network","Visual Private Node"]}, 
                            {a:"Welches ist ein beliebtes Content-Management-System (CMS) für Websites?", 
                                l:["WordPress","Photoshop","Excel","PowerPoint"]}, 
                            {a:"Was ist ein DNS?", 
                                l:["Domain Name System","Data Network Server","Digital Naming Service","Dynamic Network Security"]}, 
                            {a:"Was ist ein Router in einem Netzwerk?", 
                                l:["Ein Gerät, das den Datenverkehr zwischen verschiedenen Netzwerken leitet","Ein schneller Internetbrowser","Ein drahtloses Kommunikationsgerät","Ein spezielles Kabel für schnelle Datenübertragung"]}, 
                            {a:"Welches ist ein bekanntes soziales Netzwerk?", 
                                l:["Facebook","Netflix","Amazon","Spotify"]}, 
                            {a:"Was ist ein ISP?", 
                                l:["Internetdienstanbieter","Integriertes Sicherheitspaket","Internationales Suchportal","Interaktives Streaming-Protokoll"]}, 
                            {a:"Was ist eine IP-Adresse?", 
                                l:["Eine eindeutige Kennung für ein Gerät im Netzwerk","Ein spezieller Webbrowser","Ein Internetprotokoll","Eine Art von Computer-Virus"]}, 
                            {a:"Was ist ein Trojaner in Bezug auf Computer?", 
                                l:["Schadsoftware, die sich als nützliche Anwendung tarnt","Ein schneller Prozessor","Eine spezielle Art von Computermaus","Ein alter Computerstandard"]}, 
                            {a:"Was ist ein HTTP-Statuscode 404?", 
                                l:["Seite nicht gefunden","Serverfehler","Erfolgreiche Anfrage","Weiterleitung"]}, 
                            {a:"Was ist ein Cloudspeicher?", 
                                l:["Online-Speicherplatz für Dateien","Ein neuer Internetbrowser","Ein schnelles WLAN-Netzwerk","Ein spezielles Netzwerkkabel"]}, 
                            {a:"Was ist ein E-Mail-Protokoll zum Senden von Nachrichten?", 
                                l:["SMTP","FTP","HTTP","POP"]}, 
                            {a:"Was ist ein Podcast?", 
                                l:["Eine Serie von digitalen Audio- oder Videodateien","Ein spezielles Antivirenprogramm","Ein Online-Radiosender","Ein soziales Netzwerk für Musiker"]}, 
                            {a:"Was ist ein Spam in Bezug auf E-Mails?", 
                                l:["Unerwünschte oder unerwünschte E-Mails","Ein neuer E-Mail-Filter","Ein spezieller E-Mail-Virus","Ein schneller E-Mail-Server"]}, 
                            {a:"Was ist ein Browser?", 
                                l:["Ein Programm zum Anzeigen von Webseiten","Ein schneller Prozessor","Ein spezielles Computerkabel","Ein mobiler Internetanbieter"]}];
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
        let frag = task.a;
        if (this.v.Topic == "Tmat") {frag = "$" + frag +"$"}
        this.anr = Math.floor(Math.random() * 4);
        let antw = task.l[0];
        if (this.v.Topic == "Tmat") {antw = "$" + antw +"$"}
        View.inscribeButtons(this.anr, antw, this.anr);
        View.renderText(frag);
        let apos = 1;
        for (let i = 0; i < 4; i++) {
            if (i==this.anr) continue;
            antw = task.l[apos];
            if (this.v.Topic == "Tmat") {antw = "$" + antw +"$"}
            apos++;
            let pos = i;
            View.inscribeButtons(i, antw, pos); // Tasten beschriften -> View -> Antworten
        }
        window.dispatchEvent(new Event('Katex'));
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
        let pCorrect = Math.floor(this.correct / this.questionNr * 100);
        progress.value = pCorrect
        document.getElementById("taskCount").innerHTML = "Frage " + (this.questionNr+1) + "/10";
        document.getElementById("percent").innerHTML = pCorrect + "% korrekt";
        
        if (this.questionNr < 10){
            this.setTask();
        } else {
            this.v.showResult(this.correct, pCorrect);
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
        document.getElementById("Home").addEventListener("click", this.home.bind(this), false);
        document.getElementById("Home2").addEventListener("click", this.home.bind(this), false);
        document.getElementById("restart").addEventListener("click", this.restart.bind(this), false);
    }

    start() {
        this.p.setTask();
        //document.getElementById("start").style.visibility = "hidden";
        document.getElementById("main").style.display = "block";
        document.getElementById("result").style.display = "none";
        document.getElementById("topic").style.display = "none";
    }

    home() {
        document.getElementById("main").style.display = "none";
        document.getElementById("result").style.display = "none";
        document.getElementById("topic").style.display = "block";
    }

    setup(T) {
        this.Topic = T;
        this.p.correct = 0;
        this.p.wrong = 0;
        this.p.questionNr = 0;
        progress.value = 0;
        document.getElementById("taskCount").innerHTML = "Frage 1/10";
        document.getElementById("percent").innerHTML = "0% korrekt";
        this.start();
    }

    restart() {this.setup(this.Topic)}

    Tall() {this.setup("Tall")}
    Tmat() {this.setup("Tmat")}
    Tint() {this.setup("Tint")}

    static inscribeButtons(i, text, pos) {
        document.querySelectorAll("#answer > * > *")[i].innerHTML = text;
        document.querySelectorAll("#answer > *")[i].setAttribute("number", pos);
    }

    checkEvent(event) {
        console.log(event.type);
        if (event.target.nodeName === "BUTTON") {
            this.p.checkAnswer(Number(event.target.attributes.getNamedItem("number").value));
        }
    }

    showResult(correct, pCorrect) {
        document.getElementById("main").style.display = "none";
        document.getElementById("resultCount").innerHTML = correct + "/10 korrekte Antworten (" + pCorrect +"%)";
        document.getElementById("result").style.display = "block";
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