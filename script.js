const steps = [...document.getElementsByClassName('steps')];
const nextButton = [...document.getElementsByClassName("next-step")];
const backButton = [...document.getElementsByClassName("back-button")];
const number = [...document.getElementsByClassName("number")];
const plans = [...document.getElementsByClassName("plans")];
const addOn = [...document.getElementsByClassName("add-on")];
const planPricing = [...document.getElementsByClassName("plan-pricing")];
const addOnPricing = [...document.getElementsByClassName("add-on-pricing")];
const userName = document.getElementById("user-name");
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phone-number');
const frequencyToggle = document.getElementById('frequency-toggle');
const addOnCheckbox = [...document.getElementsByClassName("add-on-checkbox")];
const summary = document.getElementById('summary');
let isMonthly = true;

const planOptions = [
    {
        id: 9,
        Name: "Arcade",
        price: 9,

    },
    {
        id: 12,
        Name: "Advanced",
        price: 12,
    },
    {
        id: 15,
        Name: "Pro",
        price: 15,
    }
]

const addOnOptions = [
    {
        id: "1",
        Name: "Online service",
        price: 1,
    },
    {
        id: "2",
        Name: "Larger storage",
        price: 2,
    },
    {
        id: "2.0",
        Name: "Customizable Profile",
        price: 2,
    }
]



console.log(steps)
class SelectionSummary {
    constructor() {
        this.userPlans = [];
        this.total = 0;
        this.addOns = [];
    }

    clearSelection() {
        plans.forEach((plan) => {
            plan.classList.remove("selected");
        })
    }

    addPlan(id, isMonthly, products) {
        const product = products.find(item => item.id === id);
        console.log(product);
        const {price, Name } = product;
        if (isMonthly) {
            summary.innerHTML = `<div class="chosen-container"><div><p>${Name}(Monthly)</p><button type="button" class="change-button">Change</button></div><p>\$${price}/mo</p></div>`;
        } else {
            price *= 10;

            summary.innerHTML = `<div><div><p>${Name}(Monthly)</p><button type="button" class="change-button">Change</button></div><p>\$${price}/yr</p></div>`;
        }
        this.total += price;
        /* this.userPlans.push(product); */
    }

    getAddon() {
        this.addOns = [];
        addOnCheckbox.forEach((check, index) => {
            if (check.checked) {
                this.addOns.push(check);
            }
        })
        return this.addOns;
    }

    addAddOn(isMonthly, products) {
        this.getAddon().forEach(addOn => {
            const product = products.find(item => item.id === addOn.id);
            console.log(product);
            const { price, Name } = product;
            if (isMonthly) {
                summary.innerHTML += `<div><p></p>${Name}<p>\$${price}</p></div>`;
            } else {
                price *= 10;
                summary.innerHTML += `<div><p></p>${Name}<p>\$${price}</p></div>`;
            }
        })

    }
}

let currentStepIndex = steps.findIndex(step => step.classList.contains('active'));
console.log(currentStepIndex);
const Selection = new SelectionSummary();
addOnCheckbox.forEach((check, index) => {
    check.addEventListener("click", () => {
        addOn[index].classList.toggle("checked");
        console.log(addOn[index].classList)
        const addOns = [];
        addOnCheckbox.forEach((check, index) => {
            if (check.checked) {
                addOns.push(check);
                console.log(addOns);
            }
        })
        /* addOn[index].style.backgroundColor = "217, 100%, 97% ";
        addOn[index].style.border = "1px solid hsl(213, 96%, 18%)"; */
    })
})

function showCurrentStep() {
    steps.forEach((step, index) => {
        if (index === currentStepIndex) {
            step.classList.toggle('active');
            step.classList.toggle("inactive");
        } else {
            step.classList.remove('active');
            step.classList.add('inactive');
        }
    });
    number.forEach((steps, index) => {
        steps.classList.add("inactive");
        if (currentStepIndex > 3) {
            steps.classList.remove("inactive", index === 3);
            steps.classList.toggle("active", index === 3);
        } else {
            steps.classList.remove("inactive", index === currentStepIndex);
            steps.classList.toggle("active", index === currentStepIndex);
        }

    })
}

nextButton.forEach(step => {
    step.addEventListener("click", () => {
        console.log(currentStepIndex);
        currentStepIndex += 1;
        console.log(currentStepIndex);
        if (currentStepIndex === 3) {
            Selection.addAddOn(isMonthly, addOnOptions);
        }
        showCurrentStep();
    })

});

backButton.forEach(step => {
    step.addEventListener("click", () => {
        console.log(currentStepIndex);
        currentStepIndex -= 1;
        console.log(currentStepIndex);
        showCurrentStep();
    })
}
)

frequencyToggle.addEventListener("click", (event) => {
    console.log(event.target.classList)
    if (isMonthly === true) {
        isMonthly = false;

    } else {

        isMonthly = true;
    }
    frequencyToggle.classList.toggle("fa-flip-horizontal");
    if (isMonthly === false) {
        planPricing[0].innerText = "$90/yr";
        planPricing[1].innerText = "$120/yr";
        planPricing[2].innerText = "$150/yr";
        addOnPricing[0].innerText = "+$10/yr";
        addOnPricing[1].innerText = "+$20/yr";
        addOnPricing[2].innerText = "+$20/yr";
    } else {
        planPricing[0].innerText = "$9/mo";
        planPricing[1].innerText = "$12/mo";
        planPricing[2].innerText = "$15/mo";
        addOnPricing[0].innerText = "+$1/mo";
        addOnPricing[1].innerText = "+$2/mo";
        addOnPricing[2].innerText = "+$2/mo";
    }
    console.log(isMonthly);
});



plans.forEach((plan) => {
    plan.addEventListener("click", () => {
        Selection.addPlan(Number(plan.id), isMonthly, planOptions);
        console.log(plans);
        plans.forEach((plan) => {
            plan.classList.remove("selected");
        })
        plan.classList.add("selected");
    })
})