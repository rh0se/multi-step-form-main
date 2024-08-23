const steps = [...document.getElementsByClassName('steps')];
const nextButton =[...document.getElementsByClassName("next-step")];
const backButton = [...document.getElementsByClassName("back-button")];
const number = [...document.getElementsByClassName("number")];
const userName = document.getElementById("user-name");
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phone-number');


console.log(steps)


let currentStepIndex = steps.findIndex(step => step.classList.contains('active'));
console.log(currentStepIndex);

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
        showCurrentStep();
    })

});

backButton.forEach (step => {
    step.addEventListener("click", () => {
        console.log(currentStepIndex);
        currentStepIndex -= 1;
        console.log(currentStepIndex);
        showCurrentStep();
    })
}
)