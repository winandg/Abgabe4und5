let idElements: number = 0; //Counter fuer Klassenelemente

class AngelegteEvents{

private kuenstler: string;
private preis: string;
private idElements: number;

constructor(k: string, p: string){

    this.kuenstler = k;
    this.preis = p;
    this.idElements = idElements;

    idElements++;
    
}
asString(): string {
    return `${this.kuenstler} kostet ${this.preis} id: ${this.idElements}`;
}

getKuenstler(): string {
    return this.kuenstler;
}

getPreis(): string {
    return this.preis;
}

getIDElements(): string {
    return this.idElements.toString();
}
}

class EventStorage {
    static loadEvents(): void {
        let eventsJSON: string = localStorage.getItem("events") || "[]";
        for (let plan of JSON.parse(eventsJSON)) {
            addgespeichertesEvent(plan.interpret, plan.price);
        }
    }

    static storeEvent(): void {
        localStorage.setItem("events", JSON.stringify(AngelegteEvents));
    }
}

let kuenstlerInput: HTMLInputElement = <HTMLInputElement>document.getElementById("inputKuenstler");
let preisInput: HTMLInputElement = <HTMLInputElement>document.getElementById("inputPrice");

let neuesEvent: AngelegteEvents[] = [];
let addB: HTMLElement = document.getElementById("hinzufuegenButton");
let abspeichern: Event[] = [];
addB.addEventListener("click", addEvent);

function addEvent(): void {
    if (kuenstlerInput.value == "" ||  preisInput.value == "") {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }
    let entry: AngelegteEvents = new AngelegteEvents(kuenstlerInput.value, preisInput.value);
    neuesEvent.push(entry);
    EventStorage.storeEvent();
    addTableEntry(entry);
}

function addgespeichertesEvent(interpret: string, price: string): void {
    if (interpret == "" || price == "") {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }
    let entry: AngelegteEvents = new AngelegteEvents(kuenstlerInput.value, preisInput.value);
    neuesEvent.push(entry);
    EventStorage.storeEvent();
    addTableEntry(entry);
}


function removeTableEntry(event: Event): void {
    let element: HTMLElement = <HTMLElement>event.currentTarget;
    let parent: HTMLElement = ( <HTMLElement>event.target ).parentElement;
    removeEvent(element.getAttribute("data-id"));
    parent.remove();
}

function removeEvent(itemid: string): void {
    neuesEvent.forEach((eventelem, index) => {
        if (eventelem.getIDElements() == itemid) neuesEvent.splice(index, 1);
    });
    EventStorage.storeEvent();
    console.log(neuesEvent);
}
function addTableEntry(eventitem: AngelegteEvents): void {
 
    let entry: HTMLTableRowElement =      document.createElement("tr");
    let kuenstler: HTMLTableCellElement = document.createElement("td");
    let preis: HTMLTableCellElement =     document.createElement("td");
    let deleteF: HTMLTableCellElement =     document.createElement("td");

    kuenstler.innerHTML = eventitem.getKuenstler();
    preis.innerHTML = eventitem.getPreis();

    deleteF.setAttribute("class", "trash");
    deleteF.setAttribute("data-id", eventitem.getIDElements());
    deleteF.addEventListener("click", removeTableEntry);

    entry.appendChild(kuenstler);
    entry.appendChild(preis);
    entry.appendChild(deleteF);

    document.getElementById("table2").appendChild(entry);
}

