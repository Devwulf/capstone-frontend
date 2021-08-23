import axios from "axios";
import React, { useContext } from "react";
import ToggleBaseUrl from "../components/ToggleBaseUrl";
import { AuthContext, AuthContextType, BaseUrlContext, BaseUrlContextType } from "../utils/Context";

type LoginPageProps = {
    authContext: AuthContextType;
    baseUrlContext: BaseUrlContextType;
}

type LoginPageState = {
    username: string;
    password: string;
    isRegister: boolean;
}

export class LoginPageInner extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props: LoginPageProps) {
        super(props);

        this.state = {
            username: "",
            password: "",
            isRegister: false
        };

        this.onDemoClick = this.onDemoClick.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    onDemoClick(): void {
        const demoUsername = "test";
        const demoPassword = "test123";
        this.setState({username: demoUsername, password: demoPassword});
    }

    async onRegister(): Promise<void> {
        const { baseUrlContext } = this.props;
        const { username, password } = this.state;

        try {
            const res = await axios.post(`${baseUrlContext.baseUrl}/auth/register`, {
                username: username,
                password: password
            });
    
            if (res.status === 200)
                alert(res.data["message"]);
        } catch(err) {
            alert(`${err.response.status}: ${err.response.data}`);
        }
    }

    async onLogin(): Promise<void> {
        const { authContext, baseUrlContext } = this.props;
        const { username, password } = this.state;
        
        try {
            const res = await axios.post(`${baseUrlContext.baseUrl}/auth/login`, {}, {
                auth: {
                    username: username,
                    password: password
                }
            });
            if (res.status === 200)
                authContext.setToken(res.data["token"]);
        } catch (err) {
            alert(`${err.response.status}: ${err.response.data}`);
        }
    }

    render(): JSX.Element {
        const { username, password, isRegister } = this.state;

        return (
            <div className="flex justify-center items-center w-screen h-screen">
                {(!isRegister && 
                    <div className="flex flex-col p-4 rounded-lg bg-indigo-200 text-indigo-900">
                        <div className="flex flex-row justify-between items-center mb-4">
                            <span className="text-2xl font-bold">Login</span>
                            <ToggleBaseUrl />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label className="text-xs mb-1" htmlFor="">Username</label>
                            <input className="px-2 py-1 rounded-default text-sm" 
                                value={username}
                                onChange={event => this.setState({username: event.target.value})} />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label className="text-xs mb-1" htmlFor="">Password</label>
                            <input className="px-2 py-1 rounded-default text-sm" 
                                value={password} 
                                type="password"
                                onChange={event => this.setState({password: event.target.value})} />
                        </div>

                        <div className="flex justify-between">
                            <button className="px-4 py-1 mr-2 rounded-default text-xs bg-indigo-400 text-indigo-100"
                                onClick={() => this.setState({isRegister: true})}>Register</button>
                            <button className="px-4 py-1 mr-2 rounded-default text-xs bg-indigo-700 text-indigo-200"
                                onClick={this.onLogin}>Login</button>
                            <button className="px-4 py-1 rounded-default text-xs bg-indigo-400 text-indigo-100"
                                onClick={this.onDemoClick}>
                                    Demo
                            </button>
                        </div>
                    </div>
                ) || 
                (isRegister && 
                    <div className="flex flex-col p-4 rounded-lg bg-indigo-200 text-indigo-900">
                        <div className="flex flex-row justify-between items-center mb-4">
                            <span className="text-2xl font-bold">Register</span>
                            <ToggleBaseUrl />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label className="text-xs mb-1" htmlFor="">Username</label>
                            <input className="px-2 py-1 rounded-default text-sm" 
                                value={username}
                                onChange={event => this.setState({username: event.target.value})} />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label className="text-xs mb-1" htmlFor="">Password</label>
                            <input className="px-2 py-1 rounded-default text-sm" 
                                value={password} 
                                type="password"
                                onChange={event => this.setState({password: event.target.value})} />
                        </div>

                        <div className="flex justify-between">
                            <button className="px-4 py-1 mr-2 rounded-default text-xs bg-indigo-700 text-indigo-200"
                                onClick={this.onRegister}>Register</button>
                            <button className="px-4 py-1 mr-2 rounded-default text-xs bg-indigo-400 text-indigo-100"
                                onClick={() => this.setState({isRegister: false})}>
                                    Login
                            </button>
                            <button className="px-4 py-1 rounded-default text-xs bg-indigo-400 text-indigo-100"
                                onClick={this.onDemoClick}>
                                    Demo
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default function LoginPage(): JSX.Element {
    const auth = useContext(AuthContext);
    const baseUrl = useContext(BaseUrlContext);

    return (
        <LoginPageInner authContext={auth} baseUrlContext={baseUrl} />
    );
}