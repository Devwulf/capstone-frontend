import { ChartData, ChartOptions } from "chart.js";
import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import Toggle from "react-toggle";
import Select from "react-select";
import { ITwoDGraphModel, TwoDGraphModel } from "../models/Graphs";
import { Team } from "../models/Policies";
import { AuthContext, AuthContextType, BaseUrlContext, BaseUrlContextType } from "../utils/Context";
import { Constants } from "../utils/Constants";

type LineGraphProps = {
    authContext: AuthContextType;
    baseUrlContext: BaseUrlContextType;
    isProbability: boolean;
    showTeam?: boolean;
}

type LineGraphState = {
    team: Team;
    endAction: string;
    graph: ITwoDGraphModel;
    data?: ChartData;
    options?: ChartOptions;
}

class LineGraphInner extends React.Component<LineGraphProps, LineGraphState> {
    constructor(props: LineGraphProps) {
        super(props);

        const baseUrl = props.baseUrlContext.baseUrl;
        this.state = {
            team: Team.Blue,
            endAction: "bKills",
            graph: new TwoDGraphModel(baseUrl)
        };

        this.getData = this.getData.bind(this);
    }

    async componentDidMount(): Promise<void> {
        await this.getData();
    }

    async getData(): Promise<void> {
        const { authContext, isProbability } = this.props;
        const { team, endAction, graph } = this.state;

        if (isProbability)
            await graph.retrieveProbabilityGraph(authContext.token, team, endAction);
        else
            await graph.retrieveQValuesGraph(authContext.token, team, endAction);

        const points = graph.getSchema().points;
        const xs: number[] = [];
        const ys: number[] = [];
        points.forEach(point => {
            xs.push(point.x);
            ys.push(point.y);
        });

        const data: ChartData = {
            labels: xs,
            datasets: [
                {
                    label: `Average ${isProbability ? "Probability" : "Q-Value"}`,
                    data: ys,
                    tension: 0.5,
                    backgroundColor: isProbability ? "rgb(237, 137, 54)" : "rgb(159, 122, 234)",
                    borderColor: isProbability ? "rgba(237, 137, 54, 0.2)" : "rgba(159, 122, 234, 0.2)"
                }
            ]
        };
        const options: ChartOptions = {
            plugins: {
                title: {
                    display: true,
                    text: `Average ${isProbability ? "Probability" : "Q-Value"} over Time For ${Team[team]} Team with '${endAction}' End Action`
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "State"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: isProbability ? "Probability" : "Q-Value"
                    }
                }
            }
        };
        this.setState({data: data, options: options});
    }

    render(): JSX.Element | null {
        const { isProbability, showTeam = true } = this.props;
        const { data, options } = this.state;
        if (!data)
            return null;
        const actions: { label: string, value: string }[] = [];
        Constants.Actions.concat(Constants.WinningActions).forEach(action => {
            actions.push({
                label: action,
                value: action
            });
        });

        return (
            <div className="flex flex-col mb-16 purple">
                <div className="flex flex-row mb-4 px-4 justify-between">
                    <div className="flex items-center text-xl font-bold">
                        {`${isProbability ? "Probability" : "Q-Value"} Graph`}
                    </div>
                    <div className="flex flex-row">
                        {showTeam && (
                            <div className="flex items-center mr-4">
                                <span className="text-lg font-bold mr-2 text-gray-800">Team</span>
                                <Toggle
                                    icons={false}
                                    onChange={event => {
                                        const team = event.target.checked ?
                                            Team.Red : Team.Blue;
                                        this.setState({team: team});
                                    }} />
                            </div>
                        )}
                        
                        <div className="flex items-center mr-4">
                            <span className="text-lg font-bold mr-2 text-gray-800">End Action</span>
                            <Select options={actions}
                                styles={{
                                    container: base => ({
                                        ...base,
                                        width: 300
                                    })
                                }}
                                defaultValue={actions.find(action => action.label === "bKills")}
                                onChange={item => {
                                    if (item)
                                        this.setState({endAction: item.value});
                                }} />
                        </div>
                        <button className="px-4 rounded-default text-sm bg-green-500 text-green-200"
                            onClick={() => this.getData()}>
                            Apply
                        </button>
                    </div>
                </div>
                <Line data={data} options={options} />
            </div>
        );
    }
}

export default function LineGraph(props: { isProbability: boolean, showTeam?: boolean }): JSX.Element {
    const auth = useContext(AuthContext);
    const baseUrl = useContext(BaseUrlContext);
    return (
        <LineGraphInner authContext={auth} baseUrlContext={baseUrl} isProbability={props.isProbability} showTeam={props.showTeam} />
    );
}