function calculateTeamFinanceReport(salaries, team) {
   let finalObj = {};
   let taxArr = [];
   let specTaxObj = {};
   let sum = 0;
   let specCount = {};
   finalObj['totalBudgetTeam'] = 0; //Declaring variables for task

    //Made 2 arrays to convert salaries and taxes to salaries with taxes included 

   for (let i=0;i<Object.keys(salaries).length;i++) {
        taxArr.push(Object.values(salaries)[i].tax)
   } 
   
   taxArr.join(' ').replace(/[!%]/g, '').split(' '); 
   let newTaxArr = []; 
   for (let j=0;j<taxArr.length;j++) {
    newTaxArr.push(parseFloat(taxArr[j])/100+1)
   }

   // specTaxObj is an Object which contains salaries with taxes of each specialization

   for (let t=0;t<Object.keys(salaries).length;t++) {
    specTaxObj[Object.entries(salaries)[t][0]] = parseInt(newTaxArr[t] * Object.values(salaries)[t].salary)
   } 

   // specCount is an Object which counts each specialization and has each of them as "specialization" : "specialization count", first for loop declaring properties with names of specialization
   // while second for loop counts each person

   for (let y=0;y<Object.keys(team).length;y++) {
    if (salaries.hasOwnProperty(Object.values(team)[y].specialization) === true) {
        specCount[Object.values(team)[y].specialization] = 0; 
    }
   } 
   
   for (let y=0;y<Object.keys(team).length;y++) {
    if (salaries.hasOwnProperty(Object.values(team)[y].specialization) === true) {
    specCount[Object.values(team)[y].specialization] = (specCount[Object.values(team)[y].specialization] + 1)
    }
   }

    // last for loop is doing main Math, it sums every salary with taxes and also sums totalBudget for each specialization

   for (let k=0; k<Object.keys(team).length; k++) {
    if (salaries.hasOwnProperty(Object.values(team)[k].specialization) === true) {
        sum +=  specTaxObj[Object.values(team)[k].specialization]
        finalObj['totalBudget' + Object.values(team)[k].specialization] = specTaxObj[Object.values(team)[k].specialization] * specCount[Object.values(team)[k].specialization];
    }
   } 

 finalObj['totalBudgetTeam'] = sum;

 return finalObj
}


    const salaries1 = {
    Manager: { salary: 1000, tax: "10%" },
    Designer: { salary: 600, tax: "30%" },
    Artist: { salary: 1500, tax: "15%" },
    TeamLead: { salary: 1000, tax: "99%" },
    Architect: { salary: 9000, tax: "34%" }}
    const team1 = [
    { name: "Misha", specialization: "Manager" },
    { name: "Max", specialization: "Designer" },
    { name: "Vova", specialization: "Designer"},
    { name: "Leo", specialization: "Artist"},
    { name: "Vova1", specialization: "Designer"},
    { name: "Vova12", specialization: "Designer12"},
    { name: "Alexander", specialization: "TeamLead" },
    { name: "Gaudi", specialization: "Architect" },
    { name: "Koolhas", specialization: "Architect" },
    { name: "Foster", specialization: "Architect" },
    { name: "Napoleon", specialization: "General" },]

    const financeReport1 = calculateTeamFinanceReport(salaries1, team1)
    console.log(JSON.stringify(financeReport1))