export default class ColumnChart {
  chartHeight = 50;
  subElements = {};

  constructor({data = [], label = '', value = 0, link = '', formatHeading = (data) => data} = {}) {
    this.data = data;
    this.label = label;
    this.value = formatHeading(value);
    this.link = link;

    this.render();
  }

  get template() {
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.value}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${this.getColumns(this.data)}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    if (this.data.length) {
      this.element.classList.remove('column-chart_loading');
    }

    this.subElements = this.getSubElements();
  }

  getLink() {
    return this.link ? `<a href="${this.link}" class="column-chart__link">View all</a>` : '';
  }

  getColumns(data) {
    const maxValue = Math.max(...data);
    const scale =  this.chartHeight / maxValue;

    return data
      .map(item => {
        const percent = (item / maxValue * 100).toFixed(0);
        const value = String(Math.floor(item * scale));

        return `<div style="--value: ${value}" data-tooltip="${percent}%"></div>`;
      })
      .join('');
    // const maxValue = Math.max(...data);
    // const scale = this.chartHeight / maxValue;
    // const columns = this.data.map((item) => {
    //   const percent = ((item / maxValue) * 100).toFixed(0);
    //
    //   return `<div style="--value: ${Math.floor(item * scale)}" data-tooltip="${percent}"></div>`
    // }).join('');
    //
    // return columns;
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]')

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    return result;
  }

  update(data) {
    this.data = data;
    this.subElements.body.innerHTML = this.getColumns(this.data);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}

