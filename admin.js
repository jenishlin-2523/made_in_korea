// Supabase Configuration
const SUPABASE_URL = 'https://umvhmikzqqortjamwssy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtdmhtaWt6cXFvcnRqYW13c3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NjE0MjQsImV4cCI6MjA4OTIzNzQyNH0.9U2sjz_tEknYPquoJJEvCAyV4thNuaMYEl6mK5F2QOo';

const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

async function fetchResponses() {
    if (!supabaseClient) {
        console.error("Supabase not initialized.");
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from('responses')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        updateStats(data);
        renderTable(data);
    } catch (err) {
        console.error('Error fetching responses:', err);
        document.getElementById('table-body').innerHTML = `<tr><td colspan="3" style="text-align: center; color: #d63031;">Error: ${err.message}</td></tr>`;
    }
}

function updateStats(data) {
    const totalCount = data.length;
    const yesCount = data.filter(r => r.response === 'YES').length;
    const noCount = data.filter(r => r.response === 'NO').length;

    document.getElementById('total-count').innerText = totalCount;
    document.getElementById('yes-count').innerText = yesCount;
    document.getElementById('no-count').innerText = noCount;
}

function renderTable(data) {
    const tableBody = document.getElementById('table-body');
    
    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3" style="text-align: center;">No responses yet.</td></tr>';
        return;
    }

    tableBody.innerHTML = data.map(row => `
        <tr>
            <td>${row.user_name}</td>
            <td class="${row.response === 'YES' ? 'resp-yes' : 'resp-no'}">${row.response}</td>
            <td>${new Date(row.created_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

// Initial fetch
fetchResponses();

// Refresh every 30 seconds
setInterval(fetchResponses, 30000);
