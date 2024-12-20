const main = document.querySelector("main");

const fetchPage = async (filePath) => {
    try {
        const response = await fetch(filePath, {
            method: "GET",
            headers: {
                Accept: "text/html",
            },
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const html = await response.text();
        main.innerHTML = html;

        main.addEventListener("click", (event) => {
            const target = event.target.closest("a[data-route]");
            if (target) {
                event.preventDefault();
                const path = target.getAttribute("data-route");
                window.location.hash = path;
            }
        });
    } catch (error) {
        console.error(error.message);
        main.innerHTML = "<h1>Error loading page. Please try again later.</h1>";
    }
};

const handleRouteChange = () => {
    const hash = window.location.hash.slice(1); 
    const routes = {
        home: "pages/about.html",
        blog: "pages/blog.html",
        "blog/website": "pages/blogs/website.html",
    };

    const filePath = routes[hash];
    
    fetchPage(filePath);

    // Update active link styling
    const links = document.querySelectorAll("nav ul li a");
    links.forEach((link) => {
        const path = link.getAttribute("data-route");
        if (path === hash) {
            link.parentElement.classList.add("active");
        } else {
            link.parentElement.classList.remove("active");
        }
    });
};

// Add event listeners to links to update the hash
const links = document.querySelectorAll("nav ul li a");
links.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const path = link.getAttribute("data-route");
        if (path) {
            window.location.hash = path; 
        } else {
            window.location.href = link.href;
        }
    });
});

// Listen for hash changes and handle them
window.addEventListener("hashchange", handleRouteChange);

// Handle the initial load
window.addEventListener("load", handleRouteChange);

// Update the footer year
const date = new Date();
const year = date.getFullYear();
document.getElementById("date").innerHTML = year;

