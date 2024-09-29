// Mock data for male and female clothing items based on events
const maleItems = [
    { id: 201, name: "Formal Suit", events: ["marriage", "business"] },
    { id: 202, name: "Casual Shirt and Jeans", events: ["outing", "dating"] },
    { id: 203, name: "Party Blazer", events: ["nightout"] },
    { id: 204, name: "Traditional Kurta", events: ["family_function", "marriage"] }
];

const femaleItems = [
    { id: 301, name: "Saree with Jewelry", events: ["marriage", "family_function"] },
    { id: 302, name: "Evening Gown", events: ["nightout", "dating"] },
    { id: 303, name: "Casual Dress", events: ["outing"] },
    { id: 304, name: "Business Formal Dress", events: ["business"] },
    { id: 305, name: "Party Dress with Accessories", events: ["nightout"] }
];

// Get gender and event-based recommendations
function getRecommendations() {
    const gender = document.getElementById("gender").value;
    const event = document.getElementById("event-type").value;

    let recommendedItems = [];

    if (gender === "male") {
        recommendedItems = maleItems.filter(item => item.events.includes(event));
    } else {
        recommendedItems = femaleItems.filter(item => item.events.includes(event));
    }

    displayRecommendations(recommendedItems);
}

// Function to display recommended items
function displayRecommendations(recommendedItems) {
    const recommendationsList = document.getElementById("recommendations-list");
    recommendationsList.innerHTML = "";  // Clear previous recommendations

    if (recommendedItems.length === 0) {
        recommendationsList.innerHTML = "<li>No recommendations available for this event.</li>";
        return;
    }

    // Populate recommendations list
    recommendedItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.name;
        recommendationsList.appendChild(li);
    });
}
