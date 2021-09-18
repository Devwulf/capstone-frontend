import axios from "axios";
import React from "react";
import { Cookies, withCookies } from "react-cookie/es6";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Configuration from "./utils/Configuration";
import { AuthContext, BaseUrlContext, CookiesContext, TooltipContext } from "./utils/Context";


type AppProps = {
    cookies: Cookies;
}

type AppState = {
    token: string;
    baseUrl: string;
    currentTooltip: number;
    isTooltipEnabled: boolean;
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
            baseUrl: Configuration.serverBaseUrl,
            currentTooltip: 0,
            isTooltipEnabled: true
        };

        this.setToken = this.setToken.bind(this);
        this.loadTokenFromCookie = this.loadTokenFromCookie.bind(this);
        this.checkTokenValid = this.checkTokenValid.bind(this);

        this.setBaseUrl = this.setBaseUrl.bind(this);
        this.addBaseUrlListener = this.addBaseUrlListener.bind(this);
        this.removeBaseUrlListener = this.removeBaseUrlListener.bind(this);

        this.setCurrentTooltip = this.setCurrentTooltip.bind(this);
        this.resetCurrentTooltip = this.resetCurrentTooltip.bind(this);
        this.setTooltipEnabled = this.setTooltipEnabled.bind(this);
    }

    async componentDidMount(): Promise<void> {
        await this.loadTokenFromCookie();

        const { cookies } = this.props;
        const enabled: string | undefined = cookies.get("isTooltipEnabled");
        
        if (enabled == undefined)
            cookies.set("isTooltipEnabled", true);
        else
            this.setState({isTooltipEnabled: enabled === "true"});
    }

    async setToken(token: string): Promise<void> {
        const { cookies } = this.props;
        const isTokenValid = await this.checkTokenValid(token);
        if (isTokenValid)
            this.setState({token: token}, () => {
                cookies.set("token", token);
                this.resetCurrentTooltip();
            });
        else
            this.setState({token: ""}, () => {
                this.resetCurrentTooltip();
            });
    }

    async loadTokenFromCookie(): Promise<void> {
        const { cookies } = this.props;
        const token: string = cookies.get("token");
        if (!token)
            return;

        const isTokenValid = await this.checkTokenValid(token);
        this.setState({token: isTokenValid ? token : ""}, () => {
            this.resetCurrentTooltip();
        });
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

    setCurrentTooltip(index: number): void {
        this.setState({currentTooltip: index});
    }

    resetCurrentTooltip(): void {
        this.setCurrentTooltip(0);
    }

    setTooltipEnabled(isEnabled: boolean): void {
        const { cookies } = this.props;
        this.setState({isTooltipEnabled: isEnabled}, () => {
            cookies.set("isTooltipEnabled", isEnabled);
        });
    }

    render(): JSX.Element {
        const { cookies } = this.props;
        const { token, baseUrl, currentTooltip, isTooltipEnabled } = this.state;
        console.log(token);
        
        return (
            <AuthContext.Provider value={{token: token, setToken: this.setToken}}>
                <BaseUrlContext.Provider value={{baseUrl: baseUrl, setBaseUrl: this.setBaseUrl, addListener: this.addBaseUrlListener, removeListener: this.removeBaseUrlListener}}>
                    <CookiesContext.Provider value={{cookies: cookies}}>
                        <TooltipContext.Provider value={{currentTooltip: currentTooltip, isTooltipEnabled: isTooltipEnabled, setCurrentTooltip: this.setCurrentTooltip, resetCurrentTooltip: this.resetCurrentTooltip, setTooltipEnabled: this.setTooltipEnabled}}>
                            <Switch>
                                <Route exact path="/">
                                    {token ? <Redirect to="/main" /> : <Redirect to="/login" />}
                                </Route>
                                <Route path="/login">
                                    {token ? <Redirect to="/main" /> : <LoginPage />}
                                </Route>
                                <Route path="/main">
                                    <MainPage />
                                </Route>
                            </Switch>
                        </TooltipContext.Provider>
                    </CookiesContext.Provider>
                </BaseUrlContext.Provider>
            </AuthContext.Provider>
        );
    }
}

export default withCookies(App);
