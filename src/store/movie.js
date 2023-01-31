import { Store } from "../core/common";
import Search from "../components/Search";

const store = new Store({
  searchText: "",
  page: 1,
  movies: [], // 영화정보 내용
});

export default store;
export const searchMovies = async (page) => {
  // 새로운 영화를 검색한다면, 페이지는 1일 것이고, 영화 정보는 초기화되어야 한다.
  if (page === 1) {
    store.state.movies = [];
  }
  const res = await fetch(
    `https://omdbapi.com?apikey=7035c60c&s=${store.state.searchText}&page=${page}`
  );
  //  res.json 의 Search Array 요소로 movies Array 를 update
  // 객체 구조분해 할당
  const { Search } = await res.json();
  //! store.state.movies 에 Search만 할당해서는 안된다
  //* page가 변경됨에 따라 추가로 가져오는 영화 정보를 포함해서 업데이트 되어야 하기 때문이다.
  store.state.movies = [...store.state.movies, ...Search];
};
