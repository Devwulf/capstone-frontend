import axios from "axios";
import React from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { AuthContext, BaseUrlContext } from "./utils/Context";

type AppProps = {

}

type AppState = {
    token: string;
    baseUrl: string;
}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            token: "",
            baseUrl: ""
        };

        this.setToken = this.setToken.bind(this);
        this.setBaseUrl = this.setBaseUrl.bind(this);
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

    async setBaseUrl(baseUrl: string): Promise<void> {
        this.setState({baseUrl: baseUrl});
    }

    render(): JSX.Element {
        const { token, baseUrl } = this.state;
        return (
            <AuthContext.Provider value={{token: token, setToken: this.setToken}}>
                <BaseUrlContext.Provider value={{baseUrl: baseUrl, setBaseUrl: this.setBaseUrl}}>
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
