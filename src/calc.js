export const calcZar = (curr, amount, rands, ) => {
    let temp = ( rands / curr) * amount;
    return Number(temp.toFixed(2));
}