import { Injectable } from '@angular/core';

@Injectable()
export class FilterSortService {

  constructor() { }

  filter(array: any[], property: string, value: any) {
    // return values with specific key/value pair
    if (!property || value === undefined) {
      return array;
    } else if (array) {
      const filteredArray = array.filter(item => {
        for (const key in item) {
          if (key === property && item[key] === value) {
            return true;
          }
        }
      });
      return filteredArray;
    }
  }

  search(array: any[], query: string) {
    // match query to string values
    // @TODO: support dates too
    const lQuery = query.toLowerCase();

    if (!query) {
      return array;
    } else if (array) {
      const filteredArray = array.filter(item => {
        for (const key in item) {
          if ((typeof item[key] === 'string') && (item[key].toLowerCase().indexOf(lQuery) !== -1)) {
            return true;
          }
        }
      });
      return filteredArray;
    }
  }

  orderBy(array: any[], prop: string, reverse?: boolean) {
    // Order an array of objects by a property
    // Supports string and number values
    let sortedArray;
    if (!array || !array.length) {
      return array;
    }
    if (typeof array[0][prop] === 'string') {
      sortedArray = array.sort((a, b) => {
        const itemA = a[prop].toLowerCase();
        const itemB = b[prop].toLowerCase();
        if (!reverse) {
          if (itemA < itemB) return -1;
          if (itemA > itemB) return 1;
          return 0;
        } else {
          if (itemA > itemB) return -1;
          if (itemA < itemB) return 1;
          return 0;
        }
      });
    }
    else if (typeof array[0][prop] === 'number') {
      sortedArray = array.sort((a, b) => {
        const itemA = a[prop];
        const itemB = b[prop];
        return !reverse ? itemA - itemB : itemB - itemA;
      });
    }
    else {
      sortedArray = array;
    }
    return sortedArray;
  }

  orderByDate(array: any[], prop: string, reverse?: boolean) {
    // Order an array of objects by a property
    // Supports date values
    const sortedArray = array.sort((a, b) => {
      const dateA = new Date(a[prop]).getTime();
      const dateB = new Date(b[prop]).getTime();
      return !reverse ? dateA - dateB : dateB - dateA;
    });
    return sortedArray;
  }

}
