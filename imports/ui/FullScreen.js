import React from 'react';

function getDimensions() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}

export default class FullScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleResize = this.handleResize.bind(this);
        this.state = {width: null, height: null}
    }

    handleResize() {
        this.setState(getDimensions());
    }

    componentDidMount() {
        this.handleResize()
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        const child = React.cloneElement(React.Children.only(this.props.children),
            {
                width: this.state.width,
                height: this.state.height
            }
        );
        return child;
    }
}
