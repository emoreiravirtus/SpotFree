import Component from "./Component";

export default class Button extends Component {

  constructor(options = { action: 'submit', background: 'secondary', font: 'primary' }) {
    super(options);

    this.action = options.action;
    
    this.createComponent(`
    <button class="button bg-${options.background} font-${options.font}">
      ${ this.action }
    </button>
    `);
  }
}