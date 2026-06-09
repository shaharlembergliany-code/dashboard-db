// Supabase Configuration
const SUPABASE_URL = 'https://lpchsyqtvptdfnowiflm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_iaXFm6qtcm9QTVrZHYkJmg_m7ulCaFY';

// Fallback data for demonstration
const demoData = {
    kpis: {
        revenue: 125000,
        customers: 450,
        orders: 45,
        satisfaction: 4.7
    },
    sales: [
        { date: '2026-06-08', product: 'מוצר A', quantity: 10, price: 150, total: 1500, status: 'הושלם' },
        { date: '2026-06-07', product: 'מוצר B', quantity: 5, price: 200, total: 1000, status: 'בהמתנה' },
        { date: '2026-06-06', product: 'מוצר C', quantity: 15, price: 100, total: 1500, status: 'הושלם' },
        { date: '2026-06-05', product: 'מוצר A', quantity: 8, price: 150, total: 1200, status: 'הושלם' },
        { date: '2026-06-04', product: 'מוצר B', quantity: 12, price: 200, total: 2400, status: 'הושלם' }
    ]
};

// Supabase client initialization
let supabaseClient = null;

// Initialize the dashboard
async function initializeDashboard() {
    try {
        // Load Supabase library from CDN
        const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.38.4/+esm');
        supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

        console.log('Connected to Supabase');
        await loadDataFromSupabase();
    } catch (error) {
        console.error('Failed to connect to Supabase:', error);
        console.log('Using demo data instead...');
        loadDemoData();
    }
}

// Connect to Supabase and load data
async function connectToSupabase() {
    console.log('Connecting to Supabase...');
    try {
        if (supabaseClient) {
            await loadDataFromSupabase();
        }
    } catch (error) {
        console.error('Error connecting to Supabase:', error);
        loadDemoData();
    }
}

// Load demo data
function loadDemoData() {
    console.log('Loading demo data...');

    // Update KPIs
    document.getElementById('revenue').textContent =
        `₪${demoData.kpis.revenue.toLocaleString('he-IL')}`;
    document.getElementById('customers').textContent =
        demoData.kpis.customers;
    document.getElementById('orders').textContent =
        demoData.kpis.orders;
    document.getElementById('satisfaction').textContent =
        demoData.kpis.satisfaction + '/5';

    // Update sales table
    updateSalesTable(demoData.sales);
}

// Update sales table with data
function updateSalesTable(sales) {
    const tableBody = document.getElementById('salesTable');
    tableBody.innerHTML = '';

    sales.forEach(sale => {
        const row = document.createElement('tr');
        const statusClass = sale.status === 'הושלם' ? 'completed' : 'pending';
        const statusText = sale.status === 'הושלם' ? 'הושלם' : 'בהמתנה';

        row.innerHTML = `
            <td>${sale.date}</td>
            <td>${sale.product}</td>
            <td>${sale.quantity}</td>
            <td>₪${sale.price}</td>
            <td>₪${sale.total.toLocaleString('he-IL')}</td>
            <td><span class="status ${statusClass}">${statusText}</span></td>
        `;

        tableBody.appendChild(row);
    });
}

// Load data from Supabase
async function loadDataFromSupabase() {
    try {
        console.log('Loading data from Supabase...');

        // Fetch KPIs
        const { data: kpiData, error: kpiError } = await supabaseClient
            .from('kpis')
            .select('*')
            .single();

        if (kpiError) throw kpiError;

        // Fetch Sales
        const { data: salesData, error: salesError } = await supabaseClient
            .from('sales')
            .select('*')
            .order('date', { ascending: false });

        if (salesError) throw salesError;

        // Update KPIs on dashboard
        if (kpiData) {
            document.getElementById('revenue').textContent =
                `₪${kpiData.revenue.toLocaleString('he-IL')}`;
            document.getElementById('customers').textContent =
                kpiData.customers;
            document.getElementById('orders').textContent =
                kpiData.orders;
            document.getElementById('satisfaction').textContent =
                kpiData.satisfaction + '/5';
        }

        // Update sales table
        if (salesData) {
            updateSalesTable(salesData);
        }

        console.log('Data loaded successfully from Supabase');
    } catch (error) {
        console.error('Error loading Supabase data:', error);
        loadDemoData();
    }
}

// Format currency
function formatCurrency(value) {
    return `₪${value.toLocaleString('he-IL')}`;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL');
}

// Update dashboard with real-time data
function setupRealtimeUpdates() {
    // This would set up real-time subscriptions with Supabase
    // supabaseClient
    //   .from('sales')
    //   .on('*', payload => {
    //       console.log('New data:', payload);
    //       loadDemoData();
    //   })
    //   .subscribe();
}

// Refresh data
async function refreshData() {
    console.log('Refreshing dashboard data...');
    if (SUPABASE_URL !== 'https://YOUR_PROJECT_ID.supabase.co') {
        await loadDataFromSupabase();
    } else {
        loadDemoData();
    }
}

// Auto-refresh every 30 seconds
setInterval(refreshData, 30000);

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeDashboard);
