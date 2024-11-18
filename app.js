function calculateExpression(expression) {
  let operator = '+';
  const expressionArray = buildArray(expression);
  return expressionArray.reduce((sum, el) => {
    if (el === '+' || el === '-') {
      operator = el;
      return sum;
    };
    return operator === '+' ? sum + el : sum - el;
  }, 0);
};

function buildArray(expression) {
  let temp = '';
  let expressionArray = [];
  let operator;

  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === '+' || expression[i] === '-') {
      operator = expression[i];
      expressionArray.push(Number(temp));
      expressionArray.push(operator);
      temp = '';
    } else if (i === expression.length - 1) {
      temp += expression[i];
      expressionArray.push(Number(temp));
    } else {
      temp += expression[i];
    }
  }

  return expressionArray
};

function findAllExpression(string, value = 200, index = 1, results=[]) {
  if (index === string.length) {
    if (calculateExpression(string) === value) {
      results.push(string);
    }
    return results;
  }

  findAllExpression(string.slice(0, index) + '+' + string.slice(index), value, index + 2, results);
  findAllExpression(string.slice(0, index) + '-' + string.slice(index), value, index + 2, results);
  findAllExpression(string, value, index + 1, results);

  return results;
}

function main() {
  const input = '9876543210';
  const answer = findAllExpression(input);
  console.log(answer);
  answer.forEach(el => console.log(`${el} = ${calculateExpression(el)}`))
}

main()