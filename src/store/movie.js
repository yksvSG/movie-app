import { Store } from "../core/common";
import Search from "../components/Search";

// ----- Movie-app 의 영화 정보 ------ //
const store = new Store({
  searchText: "",
  page: 1,
  pageMax: 1, // 영화 더보기 최대 페이지
  movies: [], // 영화정보 내용
  movie: {}, // 영화 상세 정보
  loading: false,
  message: "Search for the movie title!",
});

export default store;

/* ----- store의 상태를 변경하는 함수 ----- */
export const searchMovies = async (page) => {
  store.state.loading = true;
  // MovieListMore 컴포넌트에서 전달한 page 정보를 업데이트 함
  store.state.page = page;
  // 새로운 영화를 검색한다면, 페이지는 1일 것이고, 영화 정보는 초기화되어야 한다.
  if (page === 1) {
    store.state.movies = [];
    store.state.message = "";
  }
  try {
    const res = await fetch(
      `https://omdbapi.com?apikey=7035c60c&s=${store.state.searchText}&page=${page}`
    );

    const { Search, totalResults, Response, Error } = await res.json();
    if (Response === "True") {
      store.state.movies = [...store.state.movies, ...Search];
      store.state.pageMax = Math.ceil(Number(totalResults) / 10);
    } else {
      store.state.message = Error;
    }
  } catch (error) {
    console.error("searchMovies error: ", error);
  } finally {
    store.state.loading = false;
  }
  //
};

export const getMovieDetails = async (id) => {
  try {
    const res = await fetch(
      `https://omdbapi.com?apikey=7035c60c&i=${id}&plot=full`
    );
    store.state.movie = await res.json();
  } catch (error) {
    console.error("getMovieDetails Error: ", error);
  }
};

//  res.json 의 Search Array 요소로 movies Array 를 update

// 영화 정보는 10개씩 1페이지로 구성되므로,
// store.state.searchText 에 해당하는 제목을 가진 영화들의 총 개수를 알아야한다.
// 이때, 동일 제목을 가진 영화의 총 편수(데이터)가 res.json.totalRsults 에 담겨, 서버로부터 전달되고 있다.
// 따라서, store.state에서 totalResults를 관리해야하므로,
// 1. 1page 당 10편 이하로 계산하여, pageMax에 그 값을 할당한다.
// 2. 현재 페이지를 나타내는 store.state.page와
//    최대 페이지를 나타내는 store.state.pageMax 를 비교하여,
//    더보기 버튼 노출 유무를 결정할 수 있다.

// ---  store.state.loading 처리 ---
// 1. 상태를 관리하는 store에 로딩을 관리하는 state인 loading을 추가하고, 기본값으로 false를 할당한다.
// 2. 로딩이 적용되어야 하는 구간은 어디일까?
//    === 서버로부터, 영화 정보를 받아오는 구간에 적용되어야 하므로,
//    1) searchMoives()를 실행할때, 가장 먼저, store.state.loading = true 로 변경, 로딩을 진행시킨다.
//    2) 서버로 부터 영화 정보를 비동기로 전달 받고, 이를 store.state.movies 배열에 요소로 비동기로 할당한다.
//    3) 영화 정보 할당(await)이 끝나고, 최대 페이지까지 업데이트가 끝나면,
//    4) 비로서, loadgin이 종료됨을 뜻하는  store.state.loading = false 로 변경시킨다.
// 3. store의 subscrib()를 사용하여, store의 상태가 변경됨에 따라 콜백함수를 호출시킬 수 있다.
//    ==> 이 기능을 사용하여, MovieList 컴포넌트에서 loading을 구독하여, MovieList 컴포넌트를 렌더링 시킨다.
