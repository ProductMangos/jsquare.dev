// Get issues from Github
import { Octokit } from "https://esm.sh/octokit";
const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_API,
});


const main = document.querySelector("main");

// Get Blogs from Github Issues
// const displayRepoIssues = async (owner, repo) => {
//     try {
//         const response = await octokit.request(
//             "GET /repos/{owner}/{repo}/issues/",
//             {
//                 owner,
//                 repo,
//                 headers: {
//                     "X-GitHub-Api-Version": "2022-11-28",
//                 },
//             }
//         );

//         const data = response.data;

//         const findRouteName = (data) => {
//             for (let label of data.labels) {
//                 if (label.name.includes("Route")) {
//                     return label.description; 
//                 }
//             }
//             return ""; 
//         };

//         const blogContainer = document.getElementById("blog-container");
//         if (!blogContainer) return;

//         data.forEach(issue => {
//             let route = findRouteName(issue);
//             console.log(issue);
//             if (issue.labels) {
//                 blogContainer.innerHTML += `
//                     <a href="${route}">
//                         <h1>${issue.title}</h1>
//                     </a>
//                     <p>${marked.parse(issue.body)}</p>
//                     <div class="blog-border"></div>`;
//             }
//         });
//     } catch (error) {
//         console.error("Error fetching issues:", error);
//     }
// }

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

        // if (response.url.includes("blog")) {
        //     displayRepoIssues("ProductMangos", "jsquare.dev");

        // }

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
        "blog/ajax": "pages/blogs/ajax.html",
        "blog/website": "pages/blogs/website.html",
        "blog/calculators": "pages/blogs/calculators.html",
        "blog/data-logging": "pages/blogs/data-logging.html",
    };

    const filePath = routes[hash] || "pages/about.html";

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

