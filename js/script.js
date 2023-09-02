/* 
Your challenge is to build out this age calculator app and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

Your users should be able to: 

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted */
/* 
Ok!
Vamos pegar os input ao clicar em input
Modulo dataCheck
criar uma função boolean que confirma os numeros
     - The day number is not between 1-31  / The month number is not between 1-12
     - Checar o caso dos meses (acho que if else ja ta de bom tamanho)



se false usar a funcao q cria os elementos da mensagem de erro


criar uma função que converte os numeros
 
utilizar a função que altera o conteudo texto para o resultado da conversão



*/
//variables

let currentYear = new Date().getFullYear();
let dayDiv = document.getElementById("dayDiv");
let monthDiv = document.getElementById("monthDiv");
let yearDiv = document.getElementById("yearDiv");
//////////////Inputs///////////////////
let dayInput = document.getElementById("day");
let monthInput = document.getElementById("month");
let yearInput = document.getElementById("year");
/////////////Outputs//////////////
let dayOutput = document.getElementById("convertedDays");
let monthOutput = document.getElementById("convertedMonths");
let yearOutput = document.getElementById("convertedYears");
///////////////Error Messages//////////
let errorD = document.createElement("p");
let errorM = document.createElement("p");
let errorY = document.createElement("p");

/////////////////Input EventListener////////////

let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  errorD.textContent = "";
  errorM.textContent = "";
  errorY.textContent = "";

  let permissão = dataCheck(dayInput.value, monthInput.value, yearInput.value);
  if (permissão)
    calculateAge(dayInput.value, monthInput.value, yearInput.value);
  /*  dayOutput.textContent = dayInput.value;
  monthOutput.textContent = monthInput.value;
  yearOutput.textContent = yearInput.value; */
});

const dataCheck = (day, month, year) => {
  if (day == "" || month == "" || year == "") {
    errorEmpty();
    return false;
  }
  if (day > 31 || month > 12 || year > currentYear) {
    errorInvalid();
    return false;
  }
  if (day == 28 && month != 2) {
    errorInvalid();
    return false;
  } else if (
    day == 30 &&
    (month != 4 || month != 6 || month != 9 || month != 11)
  ) {
    errorInvalid();
    return false;
  } else if (
    day == 31 &&
    (month != 1 ||
      month != 3 ||
      month != 5 ||
      month != 7 ||
      month != 8 ||
      month != 10 ||
      month != 12)
  ) {
    errorInvalid();
    return false;
  } else {
    return true;
  }
};
//funções que cria as mensagem de erro
const errorInvalid = () => {
  dayInput.value = "";
  monthInput.value = "";
  yearInput.value = "";

  errorD.textContent = "Must enter a valid day";
  dayDiv.appendChild(errorD);

  errorM.textContent = "Must enter a valid month";
  monthDiv.appendChild(errorM);

  errorY.textContent = "Must enter a valid Year";
  yearDiv.appendChild(errorY);
};
const errorEmpty = () => {
  dayInput.value = "";
  monthInput.value = "";
  yearInput.value = "";
  errorD.textContent = "This field is required";
  dayDiv.appendChild(errorD);

  errorM.textContent = "This field is required";
  monthDiv.appendChild(errorM);

  errorY.textContent = "This field is required";
  yearDiv.appendChild(errorY);
};

//Get age function

const calculateAge = (dayOfBirth, monthOfBirth, yearOfBirth) => {
  // Get the current date
  const currentDate = new Date();

  // Create a Date object for the birthdate
  const birthDate = new Date(yearOfBirth, monthOfBirth - 1, dayOfBirth);

  // Calculate the age
  let ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
  let ageInMonths = currentDate.getMonth() - birthDate.getMonth();
  let ageInDays = currentDate.getDate() - birthDate.getDate();

  // Adjust for negative months or days
  if (ageInDays < 0) {
    const lastDayOfMonth = new Date(
      birthDate.getFullYear(),
      birthDate.getMonth() + 1,
      0
    ).getDate();
    ageInMonths--;
    ageInDays = lastDayOfMonth - birthDate.getDate() + currentDate.getDate();
  }
  if (ageInMonths < 0) {
    ageInYears--;
    ageInMonths = 12 + ageInMonths;
  }

  // Ensure age is not negative
  ageInYears = Math.max(ageInYears, 0);
  ageInMonths = Math.max(ageInMonths, 0);
  ageInDays = Math.max(ageInDays, 0);

  // Update the text content of the output elements
  yearOutput.textContent = ageInYears;
  monthOutput.textContent = ageInMonths;
  dayOutput.textContent = ageInDays;
};
