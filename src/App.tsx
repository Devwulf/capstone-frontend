import axios from "axios";
import { addListener } from "process";
import React from "react";
import { Cookies, withCookies } from "react-cookie/es6";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Configuration from "./utils/Configuration";
import { AuthContext, BaseUrlContext, CookiesContext } from "./utils/Context";


type AppProps = {
    cookies: Cookies;
}

type AppState = {
    token: string;
    baseUrl: string;
}

type BaseUrlListener = {
    name: string;
    listener: (baseUrl: string) => Promise<void>;
}

export class App extends React.Component<AppProps, AppState> {
    private baseUrlListeners: BaseUrlListener[] = [];
    constructor(props: AppProps) {
        super(props);

        this.state = {
            token: "",
            baseUrl: Configuration.serverBaseUrl
        };

        this.setToken = this.setToken.bind(this);
        this.loadTokenFromCookie = this.loadTokenFromCookie.bind(this);
        this.checkTokenValid = this.checkTokenValid.bind(this);

        this.setBaseUrl = this.setBaseUrl.bind(this);
        this.addBaseUrlListener = this.addBaseUrlListener.bind(this);
        this.removeBaseUrlListener = this.removeBaseUrlListener.bind(this);
    }

    async setToken(token: string): Promise<void> {
        const { cookies } = this.props;
        const isTokenValid = await this.checkTokenValid(token);
        if (isTokenValid)
            this.setState({token: token}, () => {
                cookies.set("token", token);
            });
        else
            this.setState({token: ""});
    }

    async loadTokenFromCookie(): Promise<void> {
        const { cookies } = this.props;
        const token: string = cookies.get("token");
        if (!token)
            return;

        const isTokenValid = await this.checkTokenValid(token);
        this.setState({token: isTokenValid ? token : ""});
    }

    async checkTokenValid(token: string): Promise<boolean> {
        const { baseUrl } = this.state;

        try {
            const res = await axios.get(`${baseUrl}/auth/token`, {
                headers: {
                    "X-Access-Tokens": token
                }
            });

            if (res.status === 200)
                return res.data["message"] === "valid token";

            return false;
        } catch (err) {
            alert(`${err.response.status}: ${err.response.data}`);
            return false;
        }
    }

    setBaseUrl(baseUrl: string): void {
        this.setState({baseUrl: baseUrl}, async () => {
            await Promise.all(this.baseUrlListeners.map(fn => fn.listener(baseUrl)));
        });
    }

    addBaseUrlListener(name: string, listener: (baseUrl: string) => Promise<void>): void {
        if (this.baseUrlListeners.filter(listener => listener.name === name).length > 0)
            return;

        this.baseUrlListeners.push({name, listener});
    }

    removeBaseUrlListener(name: string): void {
        if (this.baseUrlListeners.filter(listener => listener.name === name).length <= 0)
            return;

        this.baseUrlListeners = this.baseUrlListeners.filter(listener => listener.name !== name);
    }

    render(): JSX.Element {
        const { cookies } = this.props;
        const { token, baseUrl } = this.state;
        return (
            <AuthContext.Provider value={{token: token, setToken: this.setToken}}>
                <BaseUrlContext.Provider value={{baseUrl: baseUrl, setBaseUrl: this.setBaseUrl, addListener: this.addBaseUrlListener, removeListener: this.removeBaseUrlListener}}>
                    <CookiesContext.Provider value={{cookies: cookies}}>
                        <div className="App">
                            {(!token && 
                                <LoginPage />
                            ) || 
                            (token &&
                                <MainPage />
                            )}
                        </div>
                    </CookiesContext.Provider>
                </BaseUrlContext.Provider>
            </AuthContext.Provider>
        );
    }
}

export default withCookies(App);
