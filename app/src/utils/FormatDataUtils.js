//If the plate number has the old 7 digits format it will format and insert the "-"
export const formatPlate = (plate) => {
  if (plate.length === 7) {
    const letters = plate.slice(0, 3);
    const numbers = plate.slice(3, 7);
    const formatedPlate = letters + "-" + numbers;

    return formatedPlate;
  } else {
    return plate;
  }
};

//format cel and phone numbers
export const formatPhone = (phone) => {
  const ddd = phone.slice(0, 2);
  const formatedDDD = `(${ddd})`;

  if (phone.length === 11) {
    const firstSet = phone.slice(2, 7);
    const secondSet = phone.slice(7);
    const formatedPhone = formatedDDD + " " + firstSet + "-" + secondSet;
    return formatedPhone;
  } else {
    const firstSet = phone.slice(2, 6);
    const secondSet = phone.slice(6);
    const formatedPhone = formatedDDD + " " + firstSet + "-" + secondSet;
    return formatedPhone;
  }
};

//format CPF or CNPJ
export const formatCPF = (number) => {
    if(number.length === 11){
        const firstSet = number.slice(0,3)
        const secondSet = number.slice(3,6)
        const thirdSet = number.slice(6,9)
        const lastSet = number.slice(9)
        return firstSet + "." + secondSet + "." + thirdSet + "-" + lastSet
    }else if (number.length === 14){
        const firstSet = number.slice(0,2)
        const secondSet = number.slice(2,5)
        const thirdSet = number.slice(5,8)
        const fourthSet = number.slice(8,12)
        const lastSet = number.slice(12)
        return firstSet + "." + secondSet + "." + thirdSet + "/" + fourthSet + "-" + lastSet
    }else{
        return number
    }
}
