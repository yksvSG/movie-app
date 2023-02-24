import { Component } from "../core/common";
import movieStore, { searchMovies } from "../store/movie";

export default class MoiveListMore extends Component {
  constructor() {
    super({
      tagName: "button",
    });
    //? MovieListMore 컴포넌트 활성화 조건
    //* 1. store.state의 page value와 pageMax value를 비교
    //* 2. pageMax value > page value
    //*    ? this.el.classList.remove('hide)
    //*    : this.el.classList.add('hide)
    //! 필수조건: pageMax의 변화를 실시간으로 구독해야함
    movieStore.subscribe("pageMax", () => {
      const { page, pageMax } = movieStore.state;
      pageMax > page
        ? this.el.classList.remove("hide")
        : this.el.classList.add("hide");
    });
  }

  render() {
    this.el.classList.add("btn", "view-more", "hide");
    this.el.textContent = "View more..";

    // 영화 정보를 추가로 가져오는 기능을 수행하므로, 비동기 처리해야함
    this.el.addEventListener("click", async () => {
      this.el.classList.add("hide");
      await searchMovies(movieStore.state.page + 1);
    });
  }
}
