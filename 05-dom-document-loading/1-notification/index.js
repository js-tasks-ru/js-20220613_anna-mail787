export default class NotificationMessage {

  static notificationMessage = null;
  timerId = null;

  constructor(message = '', {duration = 200, type = 'success'} = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  get template() {
    return `
      <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
  }

  show(notificationContainer = document.body) {
    if (NotificationMessage.notificationMessage) {
      NotificationMessage.notificationMessage.remove();
    }

    NotificationMessage.notificationMessage = this;

    notificationContainer.append(this.element);

    this.timerId = setTimeout(() => this.remove(), this.duration);
  }

  remove() {
    NotificationMessage.notificationMessage = null;
    clearTimeout(this.timerId);
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
