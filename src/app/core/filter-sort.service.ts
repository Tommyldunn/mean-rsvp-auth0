import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class FilterSortService {

  constructor(private datePipe: DatePipe) { }

  filter(array: any[], property: string, value: any) {
    // return values with specific key/value pair
    if (!property || value === undefined) {
      return array;
    }
    const filteredArray = array.filter(item => {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          if (key === property && item[key] === value) {
            return true;
          }
        }
      }
    });
    return filteredArray;
  }

  search(array: any[], query: string, excludeProps?: string|Array<string>, dateFormat?: string) {
    // match query to strings
    // match query to Date objects or ISO UTC strings
    // optionally exclude properties from being searched
    // if matching dates, can optionally pass in date format string
    if (!query) {
      return array;
    }
    const lQuery = query.toLowerCase();
    const dateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/; // ISO UTC
    const dateF = dateFormat ? dateFormat : 'medium';
    const filteredArray = array.filter(item => {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          if (!excludeProps || excludeProps.indexOf(key) === -1) {
            const thisVal = item[key];
            if (
              typeof thisVal === 'string' &&
              !thisVal.match(dateRegex) &&
              thisVal.toLowerCase().indexOf(lQuery) !== -1
            ) {
              return true;
            } else if (
              (thisVal instanceof Date || thisVal.toString().match(dateRegex)) &&
              // https://angular.io/docs/ts/latest/api/common/index/DatePipe-pipe.html
              // matching date format string passed in as param (or default to 'medium')
              this.datePipe.transform(thisVal, dateF).toLowerCase().indexOf(lQuery) !== -1
            ) {
              return true;
            }
          }
        }
      }
    });
    return filteredArray;
  }

  orderBy(array: any[], prop: string, reverse?: boolean) {
    // Order an array of objects by a property
    // Supports string, number, and boolean values
    if (!prop) {
      return array;
    }
    const propType = typeof array[0][prop];
    let sortedArray;
    if (propType === 'string') {
      // Default: ascending (A->Z)
      sortedArray = array.sort((a, b) => {
        const itemA = a[prop].toLowerCase();
        const itemB = b[prop].toLowerCase();
        if (!reverse) {
          if (itemA < itemB) { return -1; }
          if (itemA > itemB) { return 1; }
          return 0;
        } else {
          if (itemA > itemB) { return -1; }
          if (itemA < itemB) { return 1; }
          return 0;
        }
      });
    } else if (propType === 'number') {
      // Default: ascending (0->9)
      sortedArray = array.sort((a, b) => {
        const itemA = a[prop];
        const itemB = b[prop];
        return !reverse ? itemA - itemB : itemB - itemA;
      });
    } else if (propType === 'boolean') {
      // Default: descending (true->false)
      sortedArray = array.sort((a, b) => {
        const itemA = a[prop];
        const itemB = b[prop];
        return !reverse ? itemB - itemA : itemA - itemB;
      });
    } else {
      sortedArray = array;
    }
    return sortedArray;
  }

  orderByDate(array: any[], prop: string, reverse?: boolean) {
    // Order an array of objects by a date property
    // Default: ascending
    if (!prop) {
      return array;
    }
    const sortedArray = array.sort((a, b) => {
      const dateA = new Date(a[prop]).getTime();
      const dateB = new Date(b[prop]).getTime();
      return !reverse ? dateA - dateB : dateB - dateA;
    });
    return sortedArray;
  }

}
