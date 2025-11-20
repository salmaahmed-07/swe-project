// Sample Data
let orders = [
    { id: "ORD-001", customer: "John Doe", items: 3, total: 89.50, status: "Completed", date: "2024-01-15" },
    { id: "ORD-002", customer: "Jane Smith", items: 2, total: 45.00, status: "Pending", date: "2024-01-20" },
    { id: "ORD-003", customer: "Mike Johnson", items: 5, total: 156.75, status: "Shipped", date: "2024-01-22" }
];

let users = [
    { id: "USR-001", name: "John Doe", email: "john@example.com", phone: "+1 555-0123", role: "Customer", joinDate: "2023-06-15", status: "Active" },
    { id: "USR-002", name: "Jane Smith", email: "jane@example.com", phone: "+1 555-0456", role: "Admin", joinDate: "2023-01-20", status: "Active" },
    { id: "USR-003", name: "Mike Johnson", email: "mike@example.com", phone: "+1 555-0789", role: "Moderator", joinDate: "2023-08-10", status: "Active" }
];

let menuItems = [
    { id: "MENU-001", name: "Cappuccino", category: "Coffee", price: 25, availability: "Available" },
    { id: "MENU-002", name: "Cheeseburger", category: "Fast Food", price: 40, availability: "Out of Stock" }
];

// Page Navigation
function showPage(page, event) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(`${page}-page`).style.display = 'block';
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if(event) event.currentTarget.classList.add('active');

    if (page === 'orders') { renderOrders(); updateOrderStats(); }
    else if (page === 'users') { renderUsers(); updateUserStats(); }
    else if (page === 'menu') { renderMenu(); updateMenuStats(); }
    else if (page === 'reports') { renderReports(); renderSalesChart(); }

    lucide.createIcons();
}

// -------------------- ORDERS --------------------
function showOrderForm() { document.getElementById('order-form').style.display = 'block'; }
function hideOrderForm() {
    document.getElementById('order-form').style.display = 'none';
    document.getElementById('customer-name').value = '';
    document.getElementById('order-items').value = '';
    document.getElementById('order-total').value = '';
    document.getElementById('order-status').value = 'Pending';
}
function addOrder() {
    const customer = document.getElementById('customer-name').value;
    const items = parseInt(document.getElementById('order-items').value);
    const total = parseFloat(document.getElementById('order-total').value);
    const status = document.getElementById('order-status').value;

    if (customer && items && total) {
        orders.push({
            id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
            customer, items, total, status,
            date: new Date().toISOString().split('T')[0]
        });
        renderOrders();
        updateOrderStats();
        hideOrderForm();
        renderReports();
        renderSalesChart();
    }
}
function deleteOrder(orderId) {
    if (confirm('Are you sure you want to delete this order?')) {
        orders = orders.filter(order => order.id !== orderId);
        renderOrders();
        updateOrderStats();
        renderReports();
        renderSalesChart();
    }
}
function renderOrders() {
    const tbody = document.getElementById('orders-table-body');
    tbody.innerHTML = '';
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="color: #86987e; font-weight: 600;">${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.items}</td>
            <td style="font-weight: 600;">E£${order.total.toFixed(2)}</td>
            <td><span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span></td>
            <td class="text-gray-600">${order.date}</td>
            <td>
                <div class="flex gap-2">
                    <button class="action-btn"><i data-lucide="eye" style="color: #86987e;"></i></button>
                    <button class="action-btn"><i data-lucide="edit-2" style="color: #d09f30;"></i></button>
                    <button class="action-btn" onclick="deleteOrder('${order.id}')"><i data-lucide="trash-2" style="color: #d9534f;"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}
function updateOrderStats() {
    document.getElementById('total-orders').textContent = orders.length;
    document.getElementById('pending-orders').textContent = orders.filter(o => o.status === 'Pending').length;
    document.getElementById('completed-orders').textContent = orders.filter(o => o.status === 'Completed').length;
    document.getElementById('shipped-orders').textContent = orders.filter(o => o.status === 'Shipped').length;
}

// -------------------- USERS --------------------
function showUserForm() { document.getElementById('user-form').style.display = 'block'; }
function hideUserForm() {
    document.getElementById('user-form').style.display = 'none';
    document.getElementById('user-name').value = '';
    document.getElementById('user-email').value = '';
    document.getElementById('user-phone').value = '';
    document.getElementById('user-role').value = 'Customer';
}
function addUser() {
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const phone = document.getElementById('user-phone').value;
    const role = document.getElementById('user-role').value;

    if (name && email && phone) {
        users.push({
            id: `USR-${String(users.length + 1).padStart(3, '0')}`,
            name, email, phone, role,
            joinDate: new Date().toISOString().split('T')[0],
            status: 'Active'
        });
        renderUsers();
        updateUserStats();
        hideUserForm();
    }
}
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(user => user.id !== userId);
        renderUsers();
        updateUserStats();
    }
}
function renderUsers() {
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-weight: 600;">${user.name}</td>
            <td><div class="flex items-center gap-2 text-gray-600"><i data-lucide="mail" style="color: #86987e;"></i>${user.email}</div></td>
            <td><div class="flex items-center gap-2 text-gray-600"><i data-lucide="phone" style="color: #86987e;"></i>${user.phone}</div></td>
            <td><span class="role-badge role-${user.role.toLowerCase()}">${user.role}</span></td>
            <td class="text-gray-600">${user.joinDate}</td>
            <td><span class="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">${user.status}</span></td>
            <td>
                <div class="flex gap-2">
                    <button class="action-btn"><i data-lucide="edit-2" style="color: #d09f30;"></i></button>
                    <button class="action-btn" onclick="deleteUser('${user.id}')"><i data-lucide="trash-2" style="color: #d9534f;"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}
function updateUserStats() {
    document.getElementById('total-users').textContent = users.length;
    document.getElementById('active-users').textContent = users.filter(u => u.status === 'Active').length;
    document.getElementById('admin-users').textContent = users.filter(u => u.role === 'Admin').length;
}

// -------------------- MENU --------------------
function showMenuForm() { document.getElementById('menu-form').style.display = 'block'; }
function hideMenuForm() {
    document.getElementById('menu-form').style.display = 'none';
    document.getElementById('menu-name').value = '';
    document.getElementById('menu-category').value = '';
    document.getElementById('menu-price').value = '';
    document.getElementById('menu-availability').value = 'Available';
}
function addMenuItem() {
    const name = document.getElementById('menu-name').value;
    const category = document.getElementById('menu-category').value;
    const price = parseFloat(document.getElementById('menu-price').value);
    const availability = document.getElementById('menu-availability').value;

    if (name && category && price) {
        menuItems.push({ id: `MENU-${String(menuItems.length + 1).padStart(3,'0')}`, name, category, price, availability });
        renderMenu();
        updateMenuStats();
        hideMenuForm();
        renderReports();
        renderSalesChart();
    }
}
function deleteMenuItem(menuId) {
    if (confirm('Are you sure you want to delete this item?')) {
        menuItems = menuItems.filter(item => item.id !== menuId);
        renderMenu();
        updateMenuStats();
        renderReports();
        renderSalesChart();
    }
}
function renderMenu() {
    const tbody = document.getElementById('menu-table-body');
    tbody.innerHTML = '';
    menuItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="color: #86987e; font-weight: 600;">${item.name}</td>
            <td>${item.category}</td>
            <td style="font-weight: 600;">E£${item.price.toFixed(2)}</td>
            <td><span class="status-badge status-${item.availability.toLowerCase().replace(/\s/g,'')}">${item.availability}</span></td>
            <td>
                <div class="flex gap-2">
                    <button class="action-btn"><i data-lucide="edit-2" style="color: #d09f30;"></i></button>
                    <button class="action-btn" onclick="deleteMenuItem('${item.id}')"><i data-lucide="trash-2" style="color: #d9534f;"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}
function updateMenuStats() {
    document.getElementById('total-menu').textContent = menuItems.length;
    document.getElementById('available-menu').textContent = menuItems.filter(m => m.availability === 'Available').length;
    document.getElementById('outofstock-menu').textContent = menuItems.filter(m => m.availability === 'Out of Stock').length;
}

// -------------------- REPORTS --------------------
function renderReports() {
    const tbody = document.getElementById('reports-table-body');
    tbody.innerHTML = '';

    let totalSales = 0;
    let topItem = '-';
    let itemSales = {};

    orders.forEach(order => totalSales += order.total);

    menuItems.forEach(item => {
        const soldQty = orders.reduce((sum, order) => sum + (order.items || 0), 0); 
        itemSales[item.name] = soldQty;
    });

    let maxSold = 0;
    for (let key in itemSales) {
        if (itemSales[key] > maxSold) { maxSold = itemSales[key]; topItem = key; }
    }

    document.getElementById('total-sales').textContent = `E£${totalSales.toFixed(2)}`;
    document.getElementById('total-report-orders').textContent = orders.length;
    document.getElementById('top-item').textContent = topItem;

    menuItems.forEach(item => {
        const soldQty = itemSales[item.name];
        const revenue = soldQty * item.price;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${soldQty}</td>
            <td>E£${revenue.toFixed(2)}</td>
            <td>E£${(revenue/soldQty || 0).toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}

// -------------------- SALES CHART --------------------
let salesChart; // global variable

function renderSalesChart() {
    const ctx = document.getElementById('sales-chart').getContext('2d');

    // Prepare data
    const labels = orders.map(o => o.date);
    const data = orders.map(o => o.total);

    if (salesChart) salesChart.destroy(); // destroy old chart if exists

    salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sales Over Time (E£)',
                data: data,
                backgroundColor: 'rgba(134, 152, 126, 0.2)',
                borderColor: '#86987e',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true, position: 'top' }
            },
            scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Sales (E£)' }, beginAtZero: true }
            }
        }
    });
}

// -------------------- INIT --------------------
document.addEventListener('DOMContentLoaded', function() {
    showPage('orders');
    renderOrders(); updateOrderStats();
    renderUsers(); updateUserStats();
    renderMenu(); updateMenuStats();
    renderReports();
    renderSalesChart();
    lucide.createIcons();
});
