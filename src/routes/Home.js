import { Component } from "../core/common";
import Headline from "../components/Headline";
import Search from "../components/Search";
import MovieList from "../components/MovieList";
import MoiveListMore from "../components/MovieListMore";
export default class Home extends Component {
  render() {
    const hedline = new Headline().el;
    const search = new Search().el;
    const movieList = new MovieList().el;
    const movieListMore = new MoiveListMore().el;
    this.el.classList.add("container");
    this.el.append(hedline, search, movieList, movieListMore);
  }
}
