const func = (first, second, { name: myNewName, serName: myNewSerName }) => {
    const sum = first + second;

    // const name = someObject.name;
    // const serName = someObject.serName;

    // const { name: myNewName, serName: myNewSerName } = someObject;



    return sum + ' ' + myNewName + ' ' + myNewSerName;
}

// {
//     id:
//     name:
//     count
// }

const result = func(1, 3, { name: 'John', serName: 'Watson'});

console.log(result);