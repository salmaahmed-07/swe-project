// Sample data
let orders = [
    { id: "ORD-001", customer: "John Doe", items: 3, total: "E£89.50", status: "Completed", date: "2024-01-15" },
    { id: "ORD-002", customer: "Jane Smith", items: 2, total: "E£45.00", status: "Pending", date: "2024-01-20" },
    { id: "ORD-003", customer: "Mike Johnson", items: 5, total: "E£156.75", status: "Shipped", date: "2024-01-22" }
];

let users = [
    { id: "USR-001", name: "John Doe", email: "john@example.com", phone: "+1 555-0123", role: "Customer", joinDate: "2023-06-15", status: "Active" },
    { id: "USR-002", name: "Jane Smith", email: "jane@example.com", phone: "+1 555-0456", role: "Admin", joinDate: "2023-01-20", status: "Active" },
    { id: "USR-003", name: "Mike Johnson", email: "mike@example.com", phone: "+1 555-0789", role: "Moderator", joinDate: "2023-08-10", status: "Active" }
];

let menuItems = [
    { id: "MENU-001", name: "Cappuccino", category: "Coffee", price: "E£25", availability: "Available" },
    { id: "MENU-002", name: "Cheeseburger", category: "Fast Food", price: "E£40", availability: "Out of Stock" }
];

// Page Navigation
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(`${page}-page`).style.display = 'block';
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (page === 'orders') { renderOrders(); updateOrderStats(); }
    else if (page === 'users') { renderUsers(); updateUserStats(); }
    else if (page === 'menu') { renderMenu(); updateMenuStats(); }
    else if (page === 'reports') { renderReports(); }

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
    const items = document.getElementById('order-items').value;
    const total = document.getElementById('order-total').value;
    const status = document.getElementById('order-status').value;

    if (customer && items && total) {
        const newOrder = {
            id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
            customer: customer,
            items: parseInt(items),
            total: total.startsWith('E£') ? total : `E£${total}`,
            status: status,
            date: new Date().toISOString().split('T')[0]
        };
        orders.push(newOrder);
        renderOrders();
        updateOrderStats();
        hideOrderForm();
        lucide.createIcons();
    }
}
function deleteOrder(orderId) {
    if (confirm('Are you sure you want to delete this order?')) {
        orders = orders.filter(order => order.id !== orderId);
        renderOrders();
        updateOrderStats();
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
            <td style="font-weight: 600;">${order.total}</td>
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
        const newUser = { id: `USR-${String(users.length + 1).padStart(3, '0')}`, name, email, phone, role, joinDate: new Date().toISOString().split('T')[0], status: 'Active' };
        users.push(newUser);
        renderUsers();
        updateUserStats();
        hideUserForm();
        lucide.createIcons();
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
            <td><div class="flex gap-2"><button class="action-btn"><i data-lucide="edit-2" style="color: #d09f30;"></i></button><button class="action-btn" onclick="deleteUser('${user.id}')"><i data-lucide="trash-2" style="color: #d9534f;"></i></button></div></td>
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
    const price = document.getElementById('menu-price').value;
    const availability = document.getElementById('menu-availability').value;

    if (name && category && price) {
        const newItem = {
            id: `MENU-${String(menuItems.length + 1).padStart(3, '0')}`,
            name, category, price: price.startsWith('E£') ? price : `E£${price}`, availability
        };
        menuItems.push(newItem);
        renderMenu();
        updateMenuStats();
        hideMenuForm();
        lucide.createIcons();
    }
}
function deleteMenuItem(menuId) {
    if (confirm('Are you sure you want to delete this item?')) {
        menuItems = menuItems.filter(item => item.id !== menuId);
        renderMenu();
        updateMenuStats();
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
            <td style="font-weight: 600;">${item.price}</td>
            <td><span class="status-badge status-${item.availability.toLowerCase().replace(/\s/g,'')}">${item.availability}</span></td>
            <td><div class="flex gap-2"><button class="action-btn"><i data-lucide="edit-2" style="color: #d09f30;"></i></button><button class="action-btn" onclick="deleteMenuItem('${item.id}')"><i data-lucide="trash-2" style="color: #d9534f;"></i></button></div></td>
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

    let sales = 0;
    let reportOrders = orders.length;
    let itemCounts = {};

    orders.forEach(order => {
        // Update total sales
        const totalNum = parseFloat(order.total.replace('E£', ''));
        sales += totalNum;

        // Count items (for top selling)
        const itemKey = order.customer; // If you want item-based, you'd need order.items array
        itemCounts[itemKey] = (itemCounts[itemKey] || 0) + order.items;
    });

    // Find top selling item
    let topItem = '-';
    let maxSold = 0;
    for (let key in itemCounts) {
        if (itemCounts[key] > maxSold) {
            maxSold = itemCounts[key];
            topItem = key;
        }
    }

    // Update stat cards
    document.getElementById('total-sales').textContent = `E£${sales.toFixed(2)}`;
    document.getElementById('total-report-orders').textContent = reportOrders;
    document.getElementById('top-item').textContent = topItem;

    // Populate table
    menuItems.forEach(item => {
        const soldQty = orders.reduce((acc, order) => acc + (order.items || 0), 0); // Simplified
        const revenue = parseFloat(item.price.replace('E£', '')) * soldQty;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${soldQty}</td>
            <td>E£${revenue.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}

// -------------------- INIT --------------------
document.addEventListener('DOMContentLoaded', function() {
    showPage('orders');
    renderOrders(); updateOrderStats();
    renderUsers(); updateUserStats();
    renderMenu(); updateMenuStats();
    lucide.createIcons();
});
