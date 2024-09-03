const menuData = [
    ["1", "Pizza", "169"],
    ["2", "Pasta", "129"],
    ["3", "Burger", "99"]
];

document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
});

function loadMenu() {
    const menuBody = document.getElementById('menu-body');
    menuData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = <td>${item[0]}</td><td>${item[1]}</td><td>${item[2]}</td>;
        menuBody.appendChild(row);
    });
}

let receipt = [];
let totalAmount = 0;
let totalQuantity = 0;
const GST = 5;

function addItem() {
    const slno = document.getElementById('item-slno').value;
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const customerName = document.getElementById('customer-name').value;

    const item = menuData.find(item => item[0] === slno);
    if (!item) {
        alert('Item not found');
        return;
    }

    const [itemSlno, itemName, itemCost] = item;
    const cost = parseInt(itemCost);
    receipt.push([slno, itemName, quantity, cost, cost * quantity]);
    totalAmount += cost * quantity;
    totalQuantity += quantity;
    
    document.getElementById('item-slno').value = '';
    document.getElementById('quantity').value = '1';
}

function generateInvoice() {
    if (receipt.length === 0) {
        alert('No items added');
        return;
    }

    const name = document.getElementById('customer-name').value;
    const invoiceSection = document.getElementById('invoice-section');
    const invoiceBody = document.getElementById('invoice-body');
    const invoiceDetails = document.getElementById('invoice-details');
    
    // Clear previous invoice data
    invoiceBody.innerHTML = '';
    invoiceDetails.innerHTML = '';

    // Calculate GST and final amount
    const gstAmount = (totalAmount * GST) / 100;
    const finalAmount = totalAmount + gstAmount;
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    
    invoiceDetails.innerHTML = `
        <p>Name: ${name}</p>
        <p>Date: ${currentDate} Time: ${currentTime}</p>
        <p>GST (%): ${GST}</p>
        <p>The Net Amount To Be Paid is: ${finalAmount.toFixed(2)}</p>
        <p>The total number of items purchased: ${totalQuantity}</p>
    `;
    
    // Populate invoice table
    receipt.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = <td>${item[0]}</td><td>${item[1]}</td><td>${item[2]}</td><td>${item[3]}</td><td>${item[4]}</td>;
        invoiceBody.appendChild(row);
    });
    
    // Show the invoice section
    invoiceSection.style.display = 'block';
}