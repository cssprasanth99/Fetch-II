let url = "https://jsonplaceholder.typicode.com/todos";

fetch(url).then((res) => res.json()).then((data) => {
    console.log(data);
    showTable(data);
})

function showTable(data) {
    let tbody = document.querySelector("tbody");

    data.forEach(ele => {
        let tr = document.createElement("tr");
        let tdId = document.createElement("td");
        tdId.innerText = ele.id;
        let tdTitle = document.createElement("td");
        tdTitle.innerText = ele.title;
        let tdStatus = document.createElement("td");
        tdStatus.innerText = ele.completed;
        tr.append(tdId, tdTitle, tdStatus);
        tbody.append(tr);
    });

}

