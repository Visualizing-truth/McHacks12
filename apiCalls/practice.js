const myMap = {
    "Monday": {"Acitivity1": "1:00-4:00"},
    "Tuesday": {"Activity2": "3:00-5:00"}
};
  
Object.entries(myMap).forEach(([k, v]) => {
    console.log(`Key is ${k}`);
    Object.entries(v).forEach(([k1, v1]) => 
        console.log(`Value is ${v1} and key is ${k1}`));
});
