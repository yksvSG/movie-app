import { Component } from "../core/common";
import movieStore, { searchMovies } from "../store/movie";
import MovieItem from "./MovieItem";
export default class MovieList extends Component {
  constructor() {
    super();
    movieStore.subscribe("movies", () => {
      // console.log("영화 정보 갱신", movieStore.state.movies);
      this.render();
    });
    movieStore.subscribe("loading", () => {
      // console.log("로딩 중..", movieStore.state.loading);
      this.render();
    });
    movieStore.subscribe("message", () => {
      // console.log("영화 검색 중..", movieStore.state.message);
      this.render();
    });
  }
  render() {
    this.el.classList.add("movie-list");
    this.el.innerHTML = /* html */ `
            ${
              movieStore.state.message
                ? `<div class="message">${movieStore.state.message}</div>`
                : '<div class="movies"></div>'
            }
            <div class="the-loader hide"></div> 
        `;

    /* 주의 : moviesEl 생성 조건은 movieStore.state.message 가 false 일때만 생성된다. */
    //* 이때, .movide 가 this.el에 추가되지 않는다면, moviesEl는 조회할 수 없으므로, null 값을 할당 받게 된다.
    //* 따라서, moviesEl가 있을 때만, append 시키면 되므로, 선택적 연산자를 적용하면 해결 할 수 있다.
    const moviesEl = this.el.querySelector(".movies");
    moviesEl?.append(
      // 각각의 MovieItem 컴포넌트는 배열로 moviesEl 에 추가되지 않는다.
      // 배열이 아닌 하나의 El로써 추가되어야 하므로,
      // map의 결과를 전개연산자로 append 한다.
      ...movieStore.state.movies.map((movie) => {
        return new MovieItem({ movie }).el;
      })
    );

    const loaderEl = this.el.querySelector(".the-loader");

    movieStore.state.loading
      ? loaderEl.classList.remove("hide")
      : loaderEl.classList.add("hide");
  }
}
// store 변경 순서
// 1. Home 컴포넌트 > Search 컴포넌트 내, input El에 영화제목 입력(input 이벤트 발동)
// 1.1. movieStore.state.searchText = inputEl.value;
//     (store의 state를 변경시키는 이벤트 헨들러 호출)
// 2.  input El에 영화제목 입력 후 keydown 혹은 btnEl 클릭(이벤트 발동)
// 2.1. 영화를 처음 검색했으므로,
//      영화의 첫번째 페이지 목록에 담을 영화 정보(movies[])를 조회하는 함수 호출
//      searchMovies(1)
//      (store의 state.moives를 업데이트하는 searchMovies(1) 이벤트 헨들러 호출)
// 3. 영화 정보 조회 후 store의 state.moives가 업데이트 됨

// 1. Home > inputEl > input 이벤트 발생 -> Store.state,searchText 변경
// 2. Home > inputEl > click or keydown 이벤트 발생
//     -> Store.state.movies를 업데이트하는 searchMovies(1) 호출
//     %주의: 해당 영화를 처음 조회 하므로, searchMovies(page)는 1! %
// 3. searchMovies(1) 호출 -> Store.state.movies를 기존의 영화 정보를 포함하여, 조회된 영화 정보로 업데이트
