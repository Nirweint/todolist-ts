import {ActionType, calculator, sum} from "./reducer";

test('is sum function correct', () => {
    // 1.Тестовые данные
    const num1 = 10;
    const num2 = 12;

    // 2.выполнение тустируемого кода
    const result =  sum(num1, num2)

    // 3.Сравнение с ожидаемым результатом
    expect(result).toBe(22)
})

test('test calculator sum', () => {
    // 1.Тестовые данные
    const num1 = 10;
    const num2 = 12;

    const sumAC: ActionType = {type: "SUM", number: num2}

    // 2.выполнение тустируемого кода
    const result = calculator(num1, sumAC)

    // 3.Сравнение с ожидаемым результатом
    expect(result).toBe(22)
})

test('test calculator multiply', () => {
    // 1.Тестовые данные
    const num1 = 10;
    const num2 = 12;

    const multAC: ActionType = {type: "MULT", number: num2}

    // 2.выполнение тустируемого кода
    const result = calculator(num1, multAC)

    // 3.Сравнение с ожидаемым результатом
    expect(result).toBe(120)
})

test('test calculator sub', () => {
    // 1.Тестовые данные
    const num1 = 12;
    const num2 = 10;

    const subAC: ActionType = {type: "SUB", number: num2}

    // 2.выполнение тустируемого кода
    const result = calculator(num1, subAC)

    // 3.Сравнение с ожидаемым результатом
    expect(result).toBe(2)
})

test('test calculator divide', () => {
    // 1.Тестовые данные
    const num1 = 20;
    const num2 = 2;

    const divAC: ActionType = {type: "DIV", number: num2}

    // 2.выполнение тустируемого кода
    const result = calculator(num1, divAC)

    // 3.Сравнение с ожидаемым результатом
    expect(result).toBe(10)
})

test('test calculator exp', () => {
    // 1.Тестовые данные
    const num1 = 2;
    const num2 = 3;

    const expAC: ActionType = {type: "EXP", number: num2}

    // 2.выполнение тустируемого кода
    const result = calculator(num1, expAC)

    // 3.Сравнение с ожидаемым результатом
    expect(result).toBe(8)
})