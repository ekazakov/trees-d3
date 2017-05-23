const isLeftParen = (ch) => ch === '(';
const isRightParen = (ch) => ch === ')';
const isOp = (ch) => '+*-/'.includes(ch);
const isDigit = (ch) => '0123456789'.includes(ch);


export function tokenizeExpression(expr = '') {
    const chars = expr.split('');
    const tokens = [];
    let number = '';
    for (let char of chars) {
        if (isLeftParen(char) || isRightParen(char) || isOp(char)) {
            if (number) {
                tokens.push(parseInt(number));
                number = '';
            }
            tokens.push(char);
        } else if (isDigit(char)) {
            number += char;
        }
    }



    return tokens;
}