// export default function MainPage(){
//     return (
//         let d = new Date();
//         document.body.innerHTML = "<h1>Today's date is " + d + "</h1>"
//     )
// }

// let d = new Date();
// document.body.innerHTML = "<h1>Today's date is " + d + "</h1>"

window.onload = function () {
    const DELIMITER = ',';
    const NEWLINE = '\n';
    const DATA = document.getElementById('file'); //'data.csv'
    const table = document.getElementById('table'); //'table'
    //const DATA2 =
    const path = "./Data.csv";
    const DATA2 = getFile(path).file()
    if (!DATA) {
        return
    }

    // DATA.addEventListener('change', function () {
    //     if (!!DATA.files && DATA.files.length > 0) {
    //         parseCSV(DATA.files[0]);
    //     }
    // })
    parseCSV(DATA.files[0]);


    function parseCSV(file) {
        if (!file || !FileReader) {
            return;
        }
        let reader = new FileReader();

        reader.onload = function (e) {
            toTable(e.target.result);
        };

        reader.readAsText(file);

    }

    function toTable(text) {
        if (!text || !table) {
            return;
        }

        while (table.lastElementChild) {
            table.removeChild(table.lastElementChild);
        }

        let rows = text.split(NEWLINE);
        let headers = rows.shift().split(DELIMITER);
        let htr = document.createElement('tr');

        headers.forEach(function (h) {
            let th = document.createElement('th');
            let ht = h.trim();

            if (!ht) {
                return;
            }

            th.textContent = ht;
            htr.appendChild(th);
        });

        table.appendChild(htr);

        let rtr;

        rows.forEach(function (r) {
            r = r.trim();
            if (!r) {
                return;
            }

            let cols = r.split(DELIMITER);

            if (cols.length === 0) {
                return;
            }

            rtr = document.createElement('tr')

            cols.forEach(function (c) {
                let td = document.createElement('td');
                //let tc = c.trim();

                td.textContent = c.trim();
                rtr.appendChild(td);
            });

            table.appendChild(rtr);
        });

    }
}

//
// (function () {
//     const DELIMITER = ',';
//     const NEWLINE = '\n';
//     const DATA = document.getElementById('file'); //'data.csv'
//     const table = document.getElementById('table'); //'table'
//     //const DATA2 =
//     if (!DATA){
//         return
//     }
//
//     DATA.addEventListener('change', function (){
//         if(!!DATA.files && DATA.files.length > 0){
//             parseCSV(DATA.files[0]);
//         }
//     })
//
//
//
//     function parseCSV(file){
//         if (!file || !FileReader){
//             return;
//         }
//         let reader = new FileReader();
//
//         reader.onload = function (e){
//             toTable(e.target.result);
//         };
//
//         reader.readAsText(file);
//
//     }
//     function toTable(text){
//         if(!text||!table){
//             return;
//         }
//
//         while (table.lastElementChild){
//             table.removeChild(table.lastElementChild);
//         }
//
//         let rows = text.split(NEWLINE);
//         let headers = rows.shift().split(DELIMITER);
//         let htr = document.createElement('tr');
//
//         headers.forEach(function (h) {
//             let th = document.createElement('th');
//             let ht = h.trim();
//
//             if(!ht){
//                 return;
//             }
//
//             th.textContent = ht;
//             htr.appendChild(th);
//         });
//
//         table.appendChild(htr);
//
//         let rtr;
//
//         rows.forEach(function (r){
//             r = r.trim();
//             if (!r){
//                 return;
//             }
//
//             let cols = r.split(DELIMITER);
//
//             if (cols.length === 0){
//                 return;
//             }
//
//             rtr = document.createElement('tr')
//
//             cols.forEach(function (c){
//                 let td = document.createElement('td');
//                 //let tc = c.trim();
//
//                 td.textContent = c.trim();
//                 rtr.appendChild(td);
//             });
//
//             table.appendChild(rtr);
//         });
//
//
//     }
// })();