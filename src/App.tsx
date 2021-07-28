import axios from "axios";
import React from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { AuthContext } from "./utils/Context";

type AppProps = {

}

type AppState = {
    token: string;
}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            token: ""
        };

        this.setToken = this.setToken.bind(this);
    }

    async setToken(token: string): Promise<void> {
        try {
            const res = await axios.get("http://localhost:5000/auth/token", {
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

    render(): JSX.Element {
        const { token } = this.state;
        return (
            <AuthContext.Provider value={{token: token, setToken: this.setToken}}>
                <div className="App">
                    {(!token && 
                        <LoginPage />
                    ) || 
                    (token &&
                        <MainPage />
                    )}
                </div>
            </AuthContext.Provider>
        );
    }
}
