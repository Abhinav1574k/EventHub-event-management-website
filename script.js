// ============================================
// DOM ELEMENTS
// ============================================

const eventGrid =
    document.getElementById("eventGrid");

const categoryFilter =
    document.getElementById("categoryFilter");

const dateFilter =
    document.getElementById("dateFilter");

const clearFilters =
    document.getElementById("clearFilters");

const eventCount =
    document.getElementById("eventCount");

const emptyState =
    document.getElementById("emptyState");

const detailSection =
    document.getElementById("detailSection");

const eventDetail =
    document.getElementById("eventDetail");

const backButton =
    document.getElementById("backButton");

const registrationSection =
    document.getElementById("registrationSection");

const registrationForm =
    document.getElementById("registrationForm");

const registrationEvent =
    document.getElementById("registrationEvent");

const registrationBack =
    document.getElementById("registrationBack");

const successMessage =
    document.getElementById("successMessage");

const navigation =
    document.getElementById("navigation");

const menuToggle =
    document.getElementById("menuToggle");

const logo =
    document.getElementById("logo");


// ============================================
// STATE
// ============================================

let selectedCategory = "All";

let selectedDate = "All";

let currentEventId = null;


// ============================================
// DATE FORMATTING
// ============================================

function formatDate(dateString) {

    const date =
        new Date(
            `${dateString}T00:00:00`
        );

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
}


// ============================================
// GET MONTH
// ============================================

function getMonth(dateString) {

    const date =
        new Date(
            `${dateString}T00:00:00`
        );

    return date.toLocaleDateString(
        "en-US",
        {
            month: "long"
        }
    );
}


// ============================================
// INITIALIZE CATEGORY FILTER
// ============================================

function initializeCategories() {

    const categories =
        [
            ...new Set(
                events.map(
                    event => event.category
                )
            )
        ];


    categories.forEach(category => {

        const option =
            document.createElement("option");

        option.value = category;

        option.textContent = category;

        categoryFilter.appendChild(option);
    });
}


// ============================================
// FILTER EVENTS
// ============================================

function getFilteredEvents() {

    return events.filter(event => {

        const matchesCategory =
            selectedCategory === "All" ||
            event.category === selectedCategory;


        const matchesDate =
            selectedDate === "All" ||
            getMonth(event.date) === selectedDate;


        return (
            matchesCategory &&
            matchesDate
        );
    });
}


// ============================================
// RENDER EVENTS
// ============================================

function renderEvents() {

    const filteredEvents =
        getFilteredEvents();


    eventGrid.innerHTML = "";


    eventCount.textContent =
        `${filteredEvents.length} ${
            filteredEvents.length === 1
                ? "event"
                : "events"
        }`;


    if (!filteredEvents.length) {

        emptyState.classList.remove(
            "hidden"
        );

        return;
    }


    emptyState.classList.add(
        "hidden"
    );


    filteredEvents.forEach(event => {

        const card =
            createEventCard(event);

        eventGrid.appendChild(card);
    });
}


// ============================================
// CREATE EVENT CARD
// ============================================

function createEventCard(event) {

    const card =
        document.createElement("article");

    card.className =
        "event-card";


    card.innerHTML = `

        <img
            class="event-image"
            src="${event.image}"
            alt="${event.title}"
            loading="lazy"
        >


        <div class="event-content">

            <span class="event-category">
                ${event.category}
            </span>


            <h3>
                ${event.title}
            </h3>


            <p class="event-organizer">
                By ${event.organizer}
            </p>


            <div class="event-meta">

                <span>
                    📅 ${formatDate(event.date)}
                </span>

                <span>
                    🕐 ${event.time}
                </span>

                <span>
                    📍 ${event.location}
                </span>

            </div>


            <p class="event-description">
                ${event.description}
            </p>


            <div class="event-bottom">

                <span class="seats">
                    ${event.seats} seats
                </span>

                <button
                    class="view-button"
                    type="button"
                >
                    View Details
                </button>

            </div>

        </div>
    `;


    card
        .querySelector(".view-button")
        .addEventListener(
            "click",
            () => openEvent(event.id)
        );


    return card;
}


// ============================================
// OPEN EVENT
// ============================================

function openEvent(eventId) {

    const event =
        events.find(
            item => item.id === eventId
        );


    if (!event) {
        return;
    }


    currentEventId =
        event.id;


    eventDetail.innerHTML = `

        <img
            class="detail-image"
            src="${event.image}"
            alt="${event.title}"
        >


        <div class="detail-body">

            <span class="event-category">
                ${event.category}
            </span>


            <h1>
                ${event.title}
            </h1>


            <p class="detail-organizer">
                Organized by ${event.organizer}
            </p>


            <div class="detail-meta">

                <div class="meta-box">

                    <strong>
                        DATE
                    </strong>

                    ${formatDate(event.date)}

                </div>


                <div class="meta-box">

                    <strong>
                        TIME
                    </strong>

                    ${event.time}

                </div>


                <div class="meta-box">

                    <strong>
                        LOCATION
                    </strong>

                    ${event.location}

                </div>


                <div class="meta-box">

                    <strong>
                        EVENT MODE
                    </strong>

                    ${event.mode}

                </div>

            </div>


            <h3>
                About this event
            </h3>


            <p>
                ${event.description}
            </p>


            <h3>
                Availability
            </h3>


            <p>
                ${event.seats} seats are currently
                available for this event.
            </p>


            <button
                class="register-button"
                id="registerButton"
                type="button"
            >
                Register for Event
            </button>

        </div>
    `;


    document
        .querySelector(".events-section")
        .classList.add("hidden");


    document
        .getElementById("about")
        .classList.add("hidden");


    registrationSection.classList.add(
        "hidden"
    );


    detailSection.classList.remove(
        "hidden"
    );


    document
        .getElementById("registerButton")
        .addEventListener(
            "click",
            openRegistration
        );


    window.location.hash =
        `event-${event.id}`;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ============================================
// OPEN REGISTRATION
// ============================================

function openRegistration() {

    const event =
        events.find(
            item => item.id === currentEventId
        );


    if (!event) {
        return;
    }


    registrationEvent.textContent =
        `${event.title} • ${formatDate(event.date)}`;


    detailSection.classList.add(
        "hidden"
    );


    registrationSection.classList.remove(
        "hidden"
    );


    successMessage.classList.add(
        "hidden"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ============================================
// REGISTRATION SUBMISSION
// ============================================

registrationForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (
            !registrationForm.checkValidity()
        ) {

            registrationForm.reportValidity();

            return;
        }


        successMessage.classList.remove(
            "hidden"
        );


        registrationForm.reset();
    }
);


// ============================================
// BACK TO EVENT DETAIL
// ============================================

registrationBack.addEventListener(
    "click",
    () => {

        registrationSection.classList.add(
            "hidden"
        );

        detailSection.classList.remove(
            "hidden"
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);


// ============================================
// BACK TO EVENT LIST
// ============================================

function showEvents() {

    detailSection.classList.add(
        "hidden"
    );

    registrationSection.classList.add(
        "hidden"
    );


    document
        .querySelector(".events-section")
        .classList.remove("hidden");


    document
        .getElementById("about")
        .classList.remove("hidden");


    history.pushState(
        null,
        "",
        window.location.pathname
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


backButton.addEventListener(
    "click",
    showEvents
);


logo.addEventListener(
    "click",
    event => {

        event.preventDefault();

        showEvents();
    }
);


// ============================================
// FILTER EVENTS
// ============================================

categoryFilter.addEventListener(
    "change",
    event => {

        selectedCategory =
            event.target.value;

        renderEvents();
    }
);


dateFilter.addEventListener(
    "change",
    event => {

        selectedDate =
            event.target.value;

        renderEvents();
    }
);


// ============================================
// CLEAR FILTERS
// ============================================

clearFilters.addEventListener(
    "click",
    () => {

        selectedCategory = "All";

        selectedDate = "All";


        categoryFilter.value =
            "All";

        dateFilter.value =
            "All";


        renderEvents();
    }
);


// ============================================
// MOBILE NAVIGATION
// ============================================

menuToggle.addEventListener(
    "click",
    () => {

        navigation.classList.toggle(
            "show"
        );
    }
);


navigation
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navigation.classList.remove(
                    "show"
                );
            }
        );
    });


// ============================================
// INITIALIZE APPLICATION
// ============================================

initializeCategories();

renderEvents();