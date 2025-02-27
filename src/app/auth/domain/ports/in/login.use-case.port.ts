export interface LoginUserPort {
    login(username: string, password: string): void;
}
