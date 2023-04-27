import { Component } from "../core/common";
import { SimpleMovie } from "../store/movie";
interface Props {
  [key: string]: unknown;
  movie: SimpleMovie;
}

// 1. MovieItem 컴포넌트는 MovieList 컴포넌트의 하위 컴포넌트로써,
//    MovieList 컴포넌트가 map으로 전달한 movie 데이터를 객체형태로 props에 담아 전달 받는다.
// 2. 개별 MovieItem을 클릭시 영화 상세 페이지로 이동해야하므로, 상위 클래스로부터 tagName: 'a', props를 받아온다.
// 3. 영화 상세 페이지로 이동하기 위해서는 props로 전달 된 영화 정보 중 imdbID 가 필요하며,
//    만들어진 a 태그에 href 속성을 추가하여, 다음과 같은 쿼리스트링을 할당한다.`#/movie?id=${props.moive.imdbID}`
export default class MovieItem extends Component {
  public props!: Props;
  constructor(props: Props) {
    super({ props, tagName: "a" });
  }

  render() {
    const { movie } = this.props;
    console.log(" movie : ", movie);
    this.el.setAttribute("href", `#/movie?id=${movie.imdbID}`);
    this.el.classList.add("movie");
    this.el.style.backgroundImage = `url(${movie.Poster})`;
    this.el.innerHTML = /* html */ `
        <div class="info">
            <div class="year">
                ${movie.Year}
            </div>
            <div class="title">
                ${movie.Title}
            </div>
        </div>
    `;
  }
}
