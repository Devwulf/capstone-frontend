import axios from "axios";
import { addListener } from "process";
import React from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Configuration from "./utils/Configuration";
import { AuthContext, BaseUrlContext } from "./utils/Context";

type AppProps = {

}

type AppState = {
    token: string;
    baseUrl: string;
}

type BaseUrlListener = {
    name: string;
    listener: (baseUrl: string) => Promise<void>;
}

export default class App extends React.Component<AppProps, AppState> {
    private baseUrlListeners: BaseUrlListener[] = [];
    constructor(props: AppProps) {
        super(props);

        this.state = {
            token: "",
            baseUrl: Configuration.serverBaseUrl
        };

        this.setToken = this.setToken.bind(this);

        this.setBaseUrl = this.setBaseUrl.bind(this);
        this.addBaseUrlListener = this.addBaseUrlListener.bind(this);
        this.removeBaseUrlListener = this.removeBaseUrlListener.bind(this);
    }

    async setToken(token: string): Promise<void> {
        const { baseUrl } = this.state;

        try {
            const res = await axios.get(`${baseUrl}/auth/token`, {
                headers: {
                    "X-Access-Tokens": token
                }
            });
            if (res.status === 200) {
                if (res.data["message"] === "valid token")
                    this.setState({token: token});
                else
                    this.setState({token: ""});
            }
        } catch (err) {
            alert(`${err.response.status}: ${err.response.data}`);
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
        const { token, baseUrl } = this.state;
        return (
            <AuthContext.Provider value={{token: token, setToken: this.setToken}}>
                <BaseUrlContext.Provider value={{baseUrl: baseUrl, setBaseUrl: this.setBaseUrl, addListener: this.addBaseUrlListener, removeListener: this.removeBaseUrlListener}}>
                    <div className="App">
                        {(!token && 
                            <LoginPage />
                        ) || 
                        (token &&
                            <MainPage />
                        )}
                    </div>
                </BaseUrlContext.Provider>
            </AuthContext.Provider>
        );
    }
}
