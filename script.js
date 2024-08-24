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
const totalAmount = document.getElementById('total-amount');
const selectedFrequency = document.getElementById('selected-frequency');
let isMonthly = true;

const planOptions = [
    {
        id: "9",
        Name: "Arcade",
        price: 9,

    },
    {
        id: "12",
        Name: "Advanced",
        price: 12,
    },
    {
        id: "15",
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

    /* clearSelection() {
        plans.forEach((plan) => {
            plan.classList.remove("selected");
        })
    } */

    getTotal() {
        console.log(this.total);
        if (isMonthly) {
            selectedFrequency.innerText = "month";
             totalAmount.innerHTML = `<span>+\$${this.total}/mo</span>`;

        } else {
            selectedFrequency.innerText = "year"
            totalAmount.innerHTML = `<span>+\$${this.total}/yr</span>`;
        }

        console.log(totalAmount);
       
    }

    getPlan() {
        this.userPlans = [];
        plans.forEach((plan) => {
            if (plan.classList.contains("selected")) {
                this.userPlans.push(plan);
            }
            /* plan.addEventListener("click", () => {
                Selection.addPlan(Number(plan.id), isMonthly, planOptions);
                console.log(plans);
                plans.forEach((plan) => {
                    plan.classList.remove("selected");
                })
                plan.classList.add("selected");
            }) */
        })
        return this.userPlans[0].id;
    }

    addPlan(isMonthly, products) {
        try {
            this.total= 0;
            const product = products.find(item => item.id ===  this.getPlan());
        console.log(product);
        var {price, Name } = product;
        
        if (isMonthly) {
            summary.innerHTML = ``;
            summary.innerHTML = `<div class="chosen-container"><div class="chosen-wrapper"><p>${Name}(Monthly)</p><button type="button" class="change-button">Change</button></div><p class="summary-price">\$${price}/mo</p></div><div id="summary-addons"></div>`;
        } else {
            summary.innerHTML = ``;
            price *= 10;
            summary.innerHTML = `<div class="chosen-container"><div class="chosen-wrapper"><p>${Name}(Monthly)</p><button type="button" class="change-button">Change</button></div><p class="summary-price">\$${price}/yr</p></div><div id="summary-addons"></div>`;
        }
        this.total += price;
        console.log(this.total)
        }

        catch {
            currentStepIndex = 1;
            showCurrentStep();
        }
        
        /* this.userPlans.push(product); */
    }

    getAddon() {
        this.addOns = [];
        console.log(this.addOns)
        addOnCheckbox.forEach((check, index) => {
            if (check.checked) {
                this.addOns.push(check);
            }
        })
        if (this.addOns.length === 0) {
            return
        }
        return this.addOns;
    }

    addAddOn(isMonthly, products) {
        const summaryAddOn = document.getElementById("summary-addons");
        this.total = 0;
        
        try {
            summaryAddOn.innerHTML = "";
            this.getAddon().forEach(addOn => {
                const product = products.find(item => item.id === addOn.id);
                console.log(product);
                var { price, Name } = product;
                
                if (isMonthly) {
                    this.total += Number(this.getPlan());
                    summaryAddOn.innerHTML += `<div><p>${Name}</p><p class="summary-price">\$${price}/mo</p></div>`;
                } else {
                    this.total += Number(this.getPlan() ) * 10;
                    price *= 10;
                    summaryAddOn.innerHTML += `<div><p>${Name}</p><p class="summary-price">\$${price}/yr</p></div>`;
                }
                this.total += price;
                console.log(this.total)
            })
        }

        catch {
            currentStepIndex = 3;
        }
        

    }
}

let currentStepIndex = steps.findIndex(step => step.classList.contains('active'));
console.log(currentStepIndex);
const Selection = new SelectionSummary();


function validateStepOne() {
    /* tovalidate form */
}


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
        if (currentStepIndex === 2) {
            Selection.addPlan(isMonthly, planOptions);
        }
        if (currentStepIndex === 3) {
            Selection.addAddOn(isMonthly, addOnOptions);
            Selection.getTotal();
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
        /* Selection.addPlan(Number(plan.id), isMonthly, planOptions); */
        console.log(plans);
        plans.forEach((plan) => {
            plan.classList.remove("selected");
        })
        plan.classList.add("selected");
    })
})