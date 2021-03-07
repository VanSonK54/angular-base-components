import { filterOperator } from "./type.data";

export const FILTER_OPERATION: { [key: string]: filterOperator } = {
    equal: 'eq',
    notEqual: 'neq',
    lessThan: 'lt',
    lessThanEqual: 'lte',
    greaterThan: 'gt',
    greaterThanEqual: 'gte',
    inArray: 'in',
    notInArray: 'notIn',
    startWith: 'startWith',
    endWith: 'endWith',
    contains: 'contains'
}

