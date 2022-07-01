import { atom } from "recoil";
import { User } from "../../types/user";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : sessionStorage //修正
});

const initialUserState: User = {
	accessToken: "",
	email: "",
	email_verified: false,
	name: "",
	nickname: "",
	picture: "",
	sub: "",
	updated_at: ""
};
export const userState = atom({
	key: "userState",
	default: initialUserState,
	effects_UNSTABLE: [persistAtom]
});
