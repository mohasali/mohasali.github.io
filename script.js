const colors = ['#3cbd30', '#ff051397', '#a01fe5c2', '#00adffbf', '#16b193e0','#fb8404d6'];
var r = document.querySelector(':root');
r.style.setProperty('--secondary',colors[Math.floor(Math.random() * colors.length)]);

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.getElementById("switch").toggleAttribute("checked");
    toggleDark();
}

function toggleDark(){
    
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    const c1 = rs.getPropertyValue('--primary');
    const c2 = rs.getPropertyValue('--bg');
    r.style.setProperty('--bg',c1);
    r.style.setProperty('--primary',c2);
}

//Mouse Trail
let lastTrailTime = 0; // Timestamp to throttle trail appearance
const trailDelay = 100; // Delay in milliseconds between trail creation

window.onmousemove = e => {
    const currentTime = Date.now();
    if (currentTime - lastTrailTime < trailDelay) return; // Skip if within delay
    lastTrailTime = currentTime;

    const mouseX = e.clientX+ window.scrollX;
    const mouseY = e.clientY+ window.scrollY;
    const t = document.createElement('span');
    t.className = "trail";

    // Generate random code-like content
    const randomCode = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]();<>+=-*/';
        return chars[Math.floor(Math.random() * chars.length)];
    };

    t.textContent = randomCode(); // Assign random character
    t.style.left = `${mouseX}px`;
    t.style.top = `${mouseY}px`;

    // Add the trail to the document
    document.body.appendChild(t);

    // Remove the element after the animation completes
    t.addEventListener('animationend', () => t.remove());
};



// Set up Intersection Observer to trigger the typing effect when the element is in view
const typingElements = document.getElementsByClassName('typing-effect');

// Convert HTMLCollection to an array or use for...of loop to iterate over it
Array.from(typingElements).forEach(typingEffect);

function typingEffect(typingElement) {
    // Create a function to trigger the animation
    const startTypingAnimation = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Calculate number of steps based on the length of the heading text
                const textLength = typingElement.innerText.length;
                typingElement.style.setProperty('--steps', textLength);
                typingElement.classList.add('typing'); // Add 'typing' class to trigger the animation
                observer.unobserve(typingElement); // Stop observing after animation starts
            }
        });
    };

    // Create an Intersection Observer instance
    const observer = new IntersectionObserver(startTypingAnimation, {
        root: null,
        threshold: 0.5 // Trigger the animation when 50% of the element is in view
    });

    console.log(typingElement);  // Check if this outputs the correct element

    // Observe the typing element
    observer.observe(typingElement);
}



const items = document.querySelectorAll(".carousel-item");
const totalItems = items.length;
let currentIndex = 0;

const updatePositions = () => {
    items.forEach((item, index) => {
    // Remove all position-related classes
    item.classList.remove("front", "left-1", "left-2", "right-1", "right-2");

    const diff = (index - currentIndex + totalItems) % totalItems; // Circular calculation

    if (diff === 0) {
        item.classList.add("front");
    } else if (diff === 1) {
        item.classList.add("right-1");
    } else if (diff === 2) {
        item.classList.add("right-2");
    } else if (diff === totalItems - 1) {
        item.classList.add("left-1");
    } else if (diff === totalItems - 2) {
        item.classList.add("left-2");
    }
    });
};

// Initial setup
updatePositions();

// Add event listeners to arrows
document.querySelector(".left-arrow").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Move to the previous card
    updatePositions();
});

document.querySelector(".right-arrow").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalItems; // Move to the next card
    updatePositions();
});