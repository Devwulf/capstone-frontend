import React from "react";
import { SearchContext } from "../utils/Context";

type VideoPlayerProps = {

}

type VideoPlayerState = {
    embedId: string;
    isIdValid: boolean;
}

export default class VideoPlayer extends React.Component<VideoPlayerProps, VideoPlayerState> {
    static contextType = SearchContext;
    private readonly WIDTH = 560;
    private readonly HEIGHT = 315;
    constructor(props: VideoPlayerProps) {
        super(props);

        this.state = {
            embedId: "",
            isIdValid: true
        };

        this.getEmbedId = this.getEmbedId.bind(this);
    }

    componentDidMount(): void {
        this.context.addActionListener("videoPlayer", this.getEmbedId);
    }

    // Valid link formats: 
    // https://www.youtube.com/watch?v=JzeZZ3IV27Q
    // https://youtu.be/JzeZZ3IV27Q
    // JzeZZ3IV27Q
    async getEmbedId(searchStr: string): Promise<void> {
        const regex = /^(https:\/\/www.youtube.com\/watch\?v=[a-zA-Z0-9]{11})|(https:\/\/youtu.be\/[a-zA-Z0-9]{11})|([a-zA-Z0-9]{11})$/;
        let embedId = "";

        if (searchStr.match(regex))
            embedId = searchStr.substring(searchStr.length - 11);

        if (!embedId || embedId.length !== 11) {
            this.setState({embedId: "", isIdValid: false});
            return;
        }

        this.setState({embedId: embedId, isIdValid: true});
    }

    componentWillUnmount(): void {
        this.context.removeActionListener("videoPlayer");
    }

    render(): JSX.Element {
        const { embedId, isIdValid } = this.state;

        return (
            <div className="flex w-full justify-center relative">
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-gray-900 opacity-50"></div>
                {(!embedId && 
                    <div className="flex w-full justify-center z-10">
                        <div className="flex items-center justify-center bg-gray-900" style={{width: this.WIDTH, height: this.HEIGHT}}>
                            <span className="text-gray-400">{`${isIdValid ? "No video selected." : "Invalid video url or id given."}`}</span>
                        </div>
                    </div>
                ) || 
                (embedId &&
                    <div className="z-10">
                        <iframe width={this.WIDTH}
                            height={this.HEIGHT}
                            src={`https://www.youtube.com/embed/${embedId}`}
                            frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Youtube" />
                    </div>
                )}
            </div>
        );
    }
}