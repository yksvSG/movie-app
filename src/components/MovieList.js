import { Component } from "../core/common";
import movieStore, { searchMovies } from "../store/movie";
export default class MovieList extends Component {
  render() {
    this.el.classList.add("movie-list");
    this.el.innerHTML = /* html */ `
            <div class="movies"></div>
        `;

    const moviesEl = this.el.querySelector(".movies");
    moviesEl.append(
      movieStore.state.movies.map((movie) => {
        return movie.Title;
      })
    );
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
