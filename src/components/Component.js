export default class Component {

  constructor() {
    this.element = document.createElement('span');
  }

  render(options) {

    if (!options) {
      options = this.default;
    }

    let htmlToRender = this.html;

    for(let item in options) {
      htmlToRender = htmlToRender.replace(this.hashes[item], options[item])
    }

    this.element.insertAdjacentHTML(
      'beforeEnd',
      htmlToRender
    );

    this.element.dataset.appId = Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);
    const elementToRender = this.element.outerHTML;

    this.element = document.createElement('span');
    
    return elementToRender;
  }
}