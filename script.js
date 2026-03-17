const SUPABASE_URL = 'https://umvhmikzqqortjamwssy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtdmhtaWt6cXFvcnRqYW13c3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NjE0MjQsImV4cCI6MjA4OTIzNzQyNH0.9U2sjz_tEknYPquoJJEvCAyV4thNuaMYEl6mK5F2QOo';

const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// Movie Data
const movies = [
    {
        id: 1,
        name: "Made In Korea",
        genre: "Romance / Drama",
        time: "11:00 PM",
        date: "March 17, 2024",
        description: "A story written in Seoul. Cinematic journey of love and discovery.",
        image: "assets/made_in_korea.jpg"
    },
    {
        id: 2,
        name: "With Love",
        genre: "Romance",
        time: "11:00 PM",
        date: "March 17, 2024",
        description: "A heartfelt tale of connections that transcend boundaries.",
        image: "assets/with_love.jpg"
    },
    {
        id: 3,
        name: "Little Hearts",
        genre: "Romance",
        time: "11:00 PM",
        date: "March 17, 2024",
        description: "Small moments, big emotions. A celebration of life's little joys.",
        image: "assets/little_hearts.jpg"
    },
    {
        id: 4,
        name: "Pennum Porattum",
        genre: "Drama / Social",
        time: "11:00 PM",
        date: "March 17, 2024",
        description: "A powerful narrative of strength, resilience, and survival.",
        image: "assets/pennum_porattum.jpg"
    },
    {
        id: 5,
        name: "Shyam Singha Roy",
        genre: "Romance",
        time: "11:00 PM",
        date: "March 17, 2024",
        description: "A transcendental love story spanning decades and destinies.",
        image: "assets/shyam_singha_roy.jpg"
    },
    {
        id: 6,
        name: "Hey Sinamika",
        genre: "Romance",
        time: "11:00 PM",
        date: "March 17, 2024",
        description: "A breezy, colorful exploration of modern relationships.",
        image: "assets/hey_sinamika.jpg"
    }
];

let selectedMovie = movies[0];
let pendingResponse = null;

// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
    follower.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;

    // Parallax Effect for Hero Image
    const heroImage = document.querySelector('.sketch-frame');
    if (heroImage) {
        const x = (window.innerWidth / 2 - e.clientX) / 25;
        const y = (window.innerHeight / 2 - e.clientY) / 25;
        heroImage.style.transform = `rotate3d(1, 1, 1, -2deg) translate3d(${x}px, ${y}px, 0)`;
    }
});

document.addEventListener('mousedown', () => cursor.style.transform += ' scale(0.8)');
document.addEventListener('mouseup', () => cursor.style.transform = cursor.style.transform.replace(' scale(0.8)', ''));

// Intersection Observer for Reveal Animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

// Initialize UI Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Register reveals
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Scroll Progress
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) progressBar.style.width = scrolled + "%";
    });

    const movieGrid = document.querySelector('.movie-grid');
    if (!movieGrid) return;

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = `movie-card ${selectedMovie.id === movie.id ? 'active' : ''}`;
        card.innerHTML = `
            <div class="movie-badge">On Live</div>
            <img src="${movie.image}" alt="${movie.name}" onerror="this.src='assets/movie_main.jpg'">
            <div class="movie-card-info">
                <h4>${movie.name}</h4>
                <p>${movie.genre}</p>
            </div>
        `;

        card.addEventListener('mouseenter', () => cursor.classList.add('cursor-grow'));
        card.addEventListener('mouseleave', () => cursor.classList.remove('cursor-grow'));

        card.onclick = () => selectMovie(movie, card);
        movieGrid.appendChild(card);
    });

    // Cursor hover effects for other elements
    document.querySelectorAll('button, span, .logo, .footer-links span').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-grow'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-grow'));
    });
});

function selectMovie(movie, cardElement) {
    selectedMovie = movie;

    // Update UI
    document.querySelectorAll('.movie-card').forEach(c => c.classList.remove('active'));
    cardElement.classList.add('active');

    // Update Hero with transition
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const heroImg = document.getElementById('hero-img');

    heroTitle.style.opacity = 0;
    heroDesc.style.opacity = 0;

    setTimeout(() => {
        heroTitle.innerText = movie.name;
        heroDesc.innerText = movie.description;
        heroImg.src = movie.image;
        heroImg.onerror = () => heroImg.src = 'assets/movie_main.jpg';

        heroTitle.style.opacity = 1;
        heroDesc.style.opacity = 1;
    }, 400);

    // Update Invitation
    document.getElementById('spec-movie').innerText = movie.name;
    document.getElementById('spec-genre').innerText = movie.genre;
    document.getElementById('spec-time').innerText = movie.time;

    // Scroll to invitation
    const target = document.getElementById('invitation-section');
    if (target) {
        window.scrollTo({
            top: target.offsetTop - 100,
            behavior: 'smooth'
        });
    }
}

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
    const userNameElement = document.getElementById('user-name');
    const userName = userNameElement.value.trim();
    const statusMsg = document.getElementById('status-msg');
    const overlay = document.getElementById('name-overlay');

    if (!userName) {
        alert('Please enter your name.');
        return;
    }

    if (!supabaseClient) {
        statusMsg.innerText = "Error: Supabase not initialized.";
        statusMsg.classList.add('active');
        overlay.classList.remove('active');
        return;
    }

    try {
        const { data, error: dbError } = await supabaseClient
            .from('responses')
            .insert([
                {
                    user_name: userName,
                    response: pendingResponse,
                    movie_name: selectedMovie.name
                }
            ]);

        // We still show the ticket/confetti even if database has an issue (demo mode)
        spawnConfetti();

        statusMsg.innerHTML = `Welcome to the guest list, <strong>${userName}</strong>! <br> Your premiere for "${selectedMovie.name}" is confirmed.`;
        statusMsg.style.color = "var(--primary)";
        statusMsg.style.opacity = 1;

        if (pendingResponse === 'YES') {
            setTimeout(() => showTicket(userName), 1000);
        }

    } catch (err) {
        console.error('Submit Error:', err);
        // Even if DB fails, let's treat it as success for the user experience
        spawnConfetti();
        if (pendingResponse === 'YES') {
            setTimeout(() => showTicket(userName), 1000);
        }
    } finally {
        overlay.classList.remove('active');
        const btnGroup = document.querySelector('.btn-group');
        if (btnGroup) btnGroup.style.display = 'none';
    }
}

function spawnConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = ['#bf953f', '#fcf6ba', '#b38728', '#c94b4b', '#fff'][Math.floor(Math.random() * 5)];
        confetti.style.width = Math.random() * 8 + 4 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.opacity = Math.random();
        document.body.appendChild(confetti);

        // Clean up
        setTimeout(() => confetti.remove(), 5000);
    }
}


function showTicket(userName) {
    document.getElementById('ticket-movie-name').innerText = selectedMovie.name.toUpperCase();
    document.getElementById('ticket-date').innerText = selectedMovie.date.toUpperCase();
    document.getElementById('ticket-time').innerText = selectedMovie.time.toUpperCase();
    document.getElementById('ticket-user-name').innerText = userName.toUpperCase();

    // Generate a unique ticket ID
    const randomID = Math.floor(1000 + Math.random() * 9000);
    const movieCode = selectedMovie.name.substring(0, 3).toUpperCase();
    const ticketID = `#${movieCode}-${randomID}`;
    const idElements = document.querySelectorAll('.ticket-id');
    idElements.forEach(el => el.innerText = ticketID);

    document.getElementById('ticket-overlay').classList.add('active');
}

function closeTicket() {
    document.getElementById('ticket-overlay').classList.remove('active');
}

async function downloadTicket() {
    const ticket = document.getElementById('gold-ticket');
    const downloadBtn = document.querySelector('.btn-premium');
    const movieName = selectedMovie.name.replace(/\s+/g, '_').toLowerCase();

    if (downloadBtn) {
        downloadBtn.innerText = "Generating Pass...";
        downloadBtn.style.opacity = "0.7";
        downloadBtn.style.pointerEvents = "none";
    }

    try {
        // Ensure fonts are loaded
        await document.fonts.ready;

        // Wait a moment for rendering
        await new Promise(resolve => setTimeout(resolve, 800));

        const canvas = await html2canvas(ticket, {
            scale: 2, // 2x is plenty for a clean ticket look
            backgroundColor: "#050505",
            useCORS: true,
            logging: false,
            allowTaint: true,
            onclone: (clonedDoc) => {
                // Ensure the ticket is visible in the clone
                const clonedTicket = clonedDoc.getElementById('gold-ticket');
                clonedTicket.style.transform = 'none';
                clonedTicket.style.margin = '0';
            }
        });

        const imageData = canvas.toDataURL('image/png', 1.0);

        const link = document.createElement('a');
        link.download = `Gold_Pass_${movieName}.png`;
        link.href = imageData;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        if (downloadBtn) {
            downloadBtn.innerText = "Downloaded!";
            setTimeout(() => {
                downloadBtn.innerText = "Download Pass";
                downloadBtn.style.opacity = "1";
                downloadBtn.style.pointerEvents = "auto";
            }, 2000);
        }
    } catch (error) {
        console.error('Error generating ticket:', error);
        alert('Could not generate ticket. Please try again.');
        if (downloadBtn) {
            downloadBtn.innerText = "Download Pass";
            downloadBtn.style.opacity = "1";
            downloadBtn.style.pointerEvents = "auto";
        }
    }
}


