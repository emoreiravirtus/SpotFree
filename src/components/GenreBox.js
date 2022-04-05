import Component from "./Component";
import { createHashes } from "../../util/framework/helper";

export default class GenreBox extends Component {

  default = {
    src: 'https://i.scdn.co/image/ab67706f000000034abf08ffea59d07bfdbc9e1d',
    title: 'Genre Glitch',
    id: 'https://api.spotify.com/v1/browse/categories/toplists'
  };

  constructor() {
    super();

    this.hashes = createHashes([ 'src', 'title', 'id' ])

    this.html = `
      <div data-id='${ this.hashes.id }' class="container genre-box p-m m-m">
        <div class="row">
          <div class="col-12 genre-box__img">
            <img width="100%" height="100%" src="${ this.hashes.src }">
            <p class="font-m genre-box__title">
              ${ this.hashes.title }
            </p>
          </div>
        </div>
      </div>
    `
  }
}