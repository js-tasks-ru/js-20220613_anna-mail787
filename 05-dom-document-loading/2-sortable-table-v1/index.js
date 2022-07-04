export default class SortableTable {

  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.render();
  }

  getHeader() {
    const header = this.headerConfig.map(({id, sortable, title}) => {
      return `
        <div class="sortable-table__cell" data-id=${id} data-sortable=${sortable}>
          <span>${title}</span>
        </div>
      `;
    }).join('');

    return header;
  }

  getRow(item) {
    const row = this.headerConfig.map((columnConfig) => {
      return Object.keys(columnConfig).includes('template') ?
        `${columnConfig.template(item[columnConfig.id])}` :
        `<div class="sortable-table__cell">${item[columnConfig.id]}</div>`;
    }).join('');

    return row;
  }

  getBody() {
    return this.data.map(
      (item) => `<a href="" class="sortable-table__row">${this.getRow(item)}</a>`).join('');
  }

  get template() {

    return `
      <div class="sortable-table">
        <div data-element="header" class="sortable-table__header sortable-table__row">${this.getHeader()}</div>
        <div data-element="body" class="sortable-table__body">${this.getBody()}</div>
      </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    this.subElements = this.getSubElements();

  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    return result;
  }

  updateTable() {
    const table = this.subElements.body;
    table.innerHTML = this.getBody();
  }

  sort(field, order) {
    const direction = order === 'asc' ? 1 : -1;

    let sortType;
    for (const header of this.headerConfig) {
      if (header.id === field) {
        sortType = header.sortType;
      }
    }

    switch (sortType) {
    case 'number':
      this.data = [...this.data].sort((a, b) => direction * (a[field] - b[field]));
      break;

    case 'string':
      this.data = [...this.data].sort((a, b) => {
        return direction * a[field].localeCompare(b[field], 'ru-en', {caseFirst: 'upper'});
      });
      break;

    default:
      return [...this.data];
    }

    this.updateTable();
  }

  remove() {
    this.element.remove();
  }

  destroy(){
    this.remove();
  }
}

