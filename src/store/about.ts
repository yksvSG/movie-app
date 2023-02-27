import { Store } from "../core/common";

interface State {
  photo: string;
  name: string;
  email: string;
  blog: string;
  github: string;
  repository: string;
}

export default new Store<State>({
  photo:
    "https://avatars.githubusercontent.com/u/93868114?s=400&u=dfa313a944bb35561a1504bd58e602eeaa193f72&v=4",
  name: "Guny / BaeSangGun",
  email: "gunyfe@gmail.com",
  blog: "https://velog.io/@sg_yksv77",
  github: "https://github.com/yksvSG",
  repository: "https://github.com/yksvSG/movie-app",
});
