// Supabase Configuration
// Replace these with your actual Supabase project details
const SUPABASE_URL = 'https://umvhmikzqqortjamwssy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtdmhtaWt6cXFvcnRqYW13c3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NjE0MjQsImV4cCI6MjA4OTIzNzQyNH0.9U2sjz_tEknYPquoJJEvCAyV4thNuaMYEl6mK5F2QOo';

const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

let pendingResponse = null;

function handleResponse(response) {
    pendingResponse = response;
    const overlay = document.getElementById('name-overlay');
    const submitBtn = document.getElementById('submit-response-btn');

    if (response === 'YES') {
        submitBtn.innerText = 'Book My Seat';
    } else {
        submitBtn.innerText = 'Send My Regrets';
    }

    overlay.classList.add('active');
}

async function submitFinalResponse() {
    const userName = document.getElementById('user-name').value.trim();
    const statusMsg = document.getElementById('status-msg');
    const overlay = document.getElementById('name-overlay');

    if (!userName) {
        alert('Please enter your name.');
        return;
    }

    if (!supabaseClient) {
        statusMsg.innerText = "Error: Supabase not initialized. Check your credentials.";
        statusMsg.style.color = "#ff4444";
        statusMsg.style.opacity = 1;
        overlay.classList.remove('active');
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from('responses')
            .insert([
                { user_name: userName, response: pendingResponse, movie_name: 'Made In Korea' }
            ]);

        if (error) {
            console.error('Supabase Error details:', error);
            throw error;
        }

        statusMsg.innerText = `Thank you, ${userName}! Your response (${pendingResponse}) has been recorded.`;
        statusMsg.style.color = "var(--accent-red)";
        statusMsg.style.opacity = 1;

        // Hide buttons after response
        document.querySelector('.button-group').style.display = 'none';

    } catch (err) {
        console.error('Caught Error:', err);
        statusMsg.innerText = `Oops! ${err.message || 'Something went wrong.'}`;
        statusMsg.style.color = "#666";
        statusMsg.style.opacity = 1;
    } finally {
        overlay.classList.remove('active');
    }
}
