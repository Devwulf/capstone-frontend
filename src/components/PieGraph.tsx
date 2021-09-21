import { ChartData, ChartOptions } from "chart.js";
import React, { useContext } from "react";
import { Pie } from "react-chartjs-2";
import Toggle from "react-toggle";
import Select from "react-select";
import "rc-slider/assets/index.css";
import Slider, { Handle, SliderTooltip } from "rc-slider";
import { ILabeledGraphModel, LabeledGraphModel } from "../models/Graphs";
import { Team } from "../models/Policies";
import { AuthContext, AuthContextType, BaseUrlContext, BaseUrlContextType } from "../utils/Context";
import { Constants } from "../utils/Constants";

type PieGraphProps = {
    authContext: AuthContextType;
    baseUrlContext: BaseUrlContextType;
}

type PieGraphState = {
    team: Team;
    startState: number;
    startAction: string;
    hasKills: boolean;
    graph: ILabeledGraphModel;
    data?: ChartData;
    options?: ChartOptions;
}

class PieGraphInner extends React.Component<PieGraphProps, PieGraphState> {
    constructor(props: PieGraphProps) {
        super(props);

        const baseUrl = props.baseUrlContext.baseUrl;
        this.state = {
            team: Team.Blue,
            startState: 0,
            startAction: "bKills",
            hasKills: true,
            graph: new LabeledGraphModel(baseUrl)
        };

        this.getData = this.getData.bind(this);
    }

    async componentDidMount(): Promise<void> {
        await this.getData();
    }

    async getData(): Promise<void> {
        const { authContext } = this.props;
        const { team, startState, startAction, hasKills, graph } = this.state;

        await graph.retrieveProbabilityGraph(authContext.token, team, startState, startAction, hasKills);

        const points = graph.getSchema().points;
        const labels: string[] = [];
        const values: number[] = [];
        points.forEach(point => {
            labels.push(point.label);
            values.push(point.value);
        });

        const data: ChartData = {
            labels: labels,
            datasets: [
                {
                    label: `Probability on State ${startState}`,
                    data: values,
                    backgroundColor: [
                        "rgba(245, 101, 101, 0.2)", // red
                        "rgba(237, 137, 54, 0.2)", // orange
                        "rgba(236, 201, 75, 0.2)", // yellow
                        "rgba(72, 187, 120, 0.2)", // green
                        "rgba(56, 178, 172, 0.2)", // teal
                        "rgba(66, 153, 225, 0.2)", // blue
                        "rgba(102, 126, 234, 0.2)", // indigo
                        "rgba(159, 122, 234, 0.2)", // purple
                        "rgba(237, 100, 166, 0.2)" // pink
                    ],
                    borderColor: [
                        "rgba(245, 101, 101, 1)", // red
                        "rgba(237, 137, 54, 1)", // orange
                        "rgba(236, 201, 75, 1)", // yellow
                        "rgba(72, 187, 120, 1)", // green
                        "rgba(56, 178, 172, 1)", // teal
                        "rgba(66, 153, 225, 1)", // blue
                        "rgba(102, 126, 234, 1)", // indigo
                        "rgba(159, 122, 234, 1)", // purple
                        "rgba(237, 100, 166, 1)" // pink
                    ]
                }
            ]
        };
        const options: ChartOptions = {
            plugins: {
                title: {
                    display: true,
                    text: `Probability of Next Action given State ${startState} and Action '${startAction}'`
                }
            }
        };
        this.setState({data: data, options: options});
    }

    render(): JSX.Element | null {
        const { data, options } = this.state;
        if (!data)
            return null;
        const actions: { label: string, value: string }[] = [];
        Constants.Actions.forEach(action => {
            actions.push({
                label: action,
                value: action
            });
        });

        return (
            <div className="flex flex-col mb-16">
                <div className="flex flex-row mb-4 px-4 justify-between">
                    <div className="flex items-center text-xl font-bold">
                        Probability Pie Chart
                    </div>
                    <div className="flex flex-row">
                        <div className="flex items-center mr-4" style={{width: "16rem"}}>
                            <span className="text-lg font-bold mr-4 text-gray-800">State</span>
                            <Slider min={0} max={93} onAfterChange={value => this.setState({startState: value})} handle={CustomHandle} />
                        </div>

                        <div className="flex items-center mr-4">
                            <span className="text-lg font-bold mr-2 text-gray-800">Action</span>
                            <Select options={actions}
                                styles={{
                                    container: base => ({
                                        ...base,
                                        width: 220
                                    })
                                }}
                                defaultValue={actions.find(action => action.label === "bKills")}
                                onChange={item => {
                                    if (item)
                                        this.setState({startAction: item.value});
                                }} />
                        </div>
                        <button className="px-4 rounded-default text-sm bg-green-500 text-green-200"
                            onClick={() => this.getData()}>
                            Apply
                        </button>
                    </div>
                </div>
                <Pie data={data} options={options} />
            </div>
        );
    }
}

function CustomHandle(props: {
    className: string;
    prefixCls?: string;
    vertical?: boolean;
    offset: number;
    value: number;
    dragging?: boolean;
    disabled?: boolean;
    min?: number;
    max?: number;
    reverse?: boolean;
    index: number;
    tabIndex?: number;
    ariaLabel: string;
    ariaLabelledBy: string;
    style?: React.CSSProperties;
    ref?: React.Ref<any>;
}) {
    const { value, dragging, index, ...restProps } = props;
    return (
        <SliderTooltip
            prefixCls="rc-slider-tooltip"
            overlay={`${value}`}
            visible={dragging}
            placement="top"
            key={index}
            zIndex={50}
        >
            <Handle value={value} {...restProps} />
        </SliderTooltip>
    );
}

export default function PieGraph(): JSX.Element {
    const auth = useContext(AuthContext);
    const baseUrl = useContext(BaseUrlContext);
    return (
        <PieGraphInner authContext={auth} baseUrlContext={baseUrl} />
    );
}