import { Component } from "../core/common";
export default class TheHeader extends Component {
  constructor() {
    super({
      tagName: "header",
      state: {
        menus: [
          {
            name: "Search",
            href: "#/",
          },
          {
            name: "Movie",
            href: "#/movie",
          },
          {
            name: "About",
            href: "#/about",
          },
        ],
      },
    });
    //! 오류 발생!
    //* 의도 : 페이지가 변경될 때마다, state로 들어온 href와 현재 페이지의 hash를 비교하여 active 클래스를 추가 및 삭제 함
    //* 오류 : 내비게이션 버튼을 클릭했을 때, 페이지 변경이 발생하지 않고, href와 hash 비교가 일어나지 않는다.
    //? 오류 해결!
    //* 내비게이션 버튼을 클릭 했을 때, 템플릿의 state 값이 클릭한 내비게이션 버튼의 값으로 변경되어야 한다.
    //* 그러나, state가 변경되기 위해서는 render 함수가 호출되어야만 가능하다.
    //* 이를 해결하기 위해, 브라우저의 활성 기록 항목이 변경될 때 마다(쉽게 말해, 페이지가 변경될 때 마다) 실행 되는 popstate 이벤트를 사용하면 된다. /
    //* 내비게이션 메뉴 버튼 클릭 -> 각 메뉴 버튼에 저장된 href로 이동 -> 페이지 변경 발생 -> popstate 이벤트 호출 -> render 함수 호출
    //* -> 각 메뉴 버튼과 현재 페이지의 hash를 비교 -> 네비게이션 버튼에 active 클래스 추가 및 삭제
    window.addEventListener("popstate", () => {
      this.render();
    });
  }

  render() {
    console.log(this.el);
    this.el.innerHTML = /* html */ `
        <a 
            href="#/"
            class="logo">
            <span>OMDdAPI</span>.COM
        </a>
        <nav>
            <ul>
                ${this.state.menus
                  .map((menu) => {
                    const href = menu.href.split("?")[0];
                    console.log(href);
                    const hash = location.hash.split("?")[0];
                    console.log(hash);
                    const isActive = href === hash;
                    console.log(isActive);
                    return /* html */ `
                        <li>
                            <a 
                              class="${isActive ? "active" : ""}"
                              href="${menu.href}">
                                ${menu.name}
                            </a>
                        </li>
                    `;
                  })
                  .join("")}
            </ul>
        </nav>
        <a href="#/about" class="user">
           <img src="https://avatars.githubusercontent.com/u/93868114?s=400&u=dfa313a944bb35561a1504bd58e602eeaa193f72&v=4" alt="User"/>
        </a>
    `;
  }
}
