import Component from "./Component";

export default class SearchBox extends Component {

  constructor(options = { placeholder: "Search..."}) {
    super(options);
    
    this.createComponent(`
    <input class="searchBox" type="text" placeholder="${ options.placeholder }">
    `);
  }
}