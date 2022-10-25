import { writable } from "svelte/store";

export const auth = writable({ loggedIn: false, cred: {} });
export const userData = writable({ user: {}, users: [] });
