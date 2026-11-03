// Exercise 3 - Expense Tracker
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test

// One expense in the array looks like this:
// { id: 1, desc: "Pizza", amount: 42.5, category: "food" }

// Step 1: add an expense on submit (unique id, no reload, validation messages, clear desc + amount, focus desc)

// Step 2: render() - rebuild the table rows from the array

// Step 3: delete (one listener on #rows - event delegation, by data-id)

// Step 4: total of the expenses that are shown

// Step 5: filter by category

// Step 6: sort by amount (toSorted - the original array keeps its order)

// Step 7: rows with an amount above 100 get the class "big"

let expenseArr = [
    // { id: 1, desc: "Pizza", amount: 42.5, category: "food" }
];

// elements
const form = document.querySelector('form')

// events
form.addEventListener('submit', addExpense);



// functions
// add expense
function addExpense(event) {
    event.preventDefault();
    const inputs = form.querySelectorAll('input');
    const select = form.querySelector('select');
    const formError = document.querySelector('#form-error');

    // check input
    if (!inputs[0].value.trim()){
        formError.textContent = 'Please add a description';
        formError.hidden = false;
        return;
    }
    else if (inputs[1].value <= 0){
        formError.textContent = 'The amount must be larger than 0';
        formError.hidden = false;
        return;
    }

    let item = {
        id: expenseArr.length > 0 ? expenseArr[expenseArr.length - 1].id + 1 : 0,
        desc: inputs[0].value,
        amount: Number(inputs[1].value),
        category: select.value,
    }
    expenseArr.push(item);
    formError.hidden = true;

    inputs[0].value = "";
    inputs[1].value = "";
    inputs[0].focus();

    render();
}

// ציור הטבלה
function render() {
    let tbody = document.querySelector('#rows');
    let noRows = document.querySelector('#no-rows');
    tbody.replaceChildren();

    if (expenseArr.length == 0)
        noRows.hidden = false;
    else {
        noRows.hidden = true;
        expenseArr.forEach((line) => {
            let tr = document.createElement('tr');

            let td = document.createElement('td');
            td.textContent = line.desc;
            tr.appendChild(td);

            td = document.createElement('td');
            span = document.createElement('span');
            span.classList.add('badge');
            span.textContent = line.category;
            td.appendChild(span);
            tr.appendChild(td);

            td = document.createElement('td');
            td.textContent = line.amount.toFixed(2);
            tr.appendChild(td);

            td = document.createElement('td');
            btn = document.createElement('button');
            btn.textContent = 'delete';
            btn.classList.add('delete')
            btn.dataset.id = line.id;
            td.appendChild(btn);
            tr.appendChild(td);

            tbody.appendChild(tr);
        })
    }
}