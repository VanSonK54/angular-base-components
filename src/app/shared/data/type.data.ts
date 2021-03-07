import { ValidationErrors } from "@angular/forms";
import { DeepFilter, Filter } from "../dto";

/**
 * @description
 */
export type productType = 'Product' | 'ProductTamplate';

/**
 * @description
 */
export type filterOperator = 'eq' |
    'neq' |
    'lt' |
    'lte' |
    'gt' |
    'gte' |
    'in' |
    'notIn' |
    'startWith' |
    'endWith' |
    'contains';

/**
* 
*/
export type logic = 'or' | 'and';

/**
 * @description
 */
export type filter = Filter | DeepFilter;

/**
 * @description
 */
export type functionResult = (name: string, error: ValidationErrors) => string;

/**
 * @description Safe string type for type of Party
 */
export type partyType = 'IndividualParty' | 'OrganizationParty';