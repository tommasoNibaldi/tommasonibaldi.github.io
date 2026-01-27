let carrello = [];
let prodotti = [];


async function caricaDati() {

const json = await fetch('data/occhiali.json').then(r=>r.json());
prodotti.push(...json);



const xmlText = await fetch('data/occhiali.xml').then(r=>r.text());
const xml = new DOMParser().parseFromString(xmlText, 'text/xml');
xml.querySelectorAll('occhiale').forEach(o=>{
prodotti.push({
id:o.querySelector('id').textContent,
nome:o.querySelector('nome').textContent,
categoria:o.querySelector('categoria').textContent,
prezzo:o.querySelector('prezzo').textContent
});
});



const csv = await fetch('data/occhiali.csv').then(r=>r.text());
const [id,nome,categoria,prezzo] = csv.split(',');
prodotti.push({id,nome,categoria,prezzo});



const txt = await fetch('data/occhiali.txt').then(r=>r.text());
const [id2,nome2,categoria2,prezzo2] = txt.split('|');
prodotti.push({id:id2,nome:nome2,categoria:categoria2,prezzo:prezzo2});


mostraProdotti();
}


function mostraProdotti() {
const div = document.getElementById('prodotti');
div.innerHTML='';
prodotti.forEach(p=>{
div.innerHTML += `<div class="card">
<b>${p.nome}</b><br>
Categoria: ${p.categoria}<br>
Prezzo: €${p.prezzo}<br>
<button onclick='aggiungi(${JSON.stringify(p)})'>Compra</button>
</div>`;
});
}


function aggiungi(p) { carrello.push(p); }


function generaPDF() {
const { jsPDF } = window.jspdf;
const doc = new jsPDF();
let y = 10;
doc.text('Scontrino', 10, y);
carrello.forEach(p=>{
y+=10;
doc.text(`${p.nome} - €${p.prezzo}`,10,y);
});
doc.save('scontrino.pdf');
}


caricaDati();