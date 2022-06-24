import { Component } from 'react';

class ErrorBoundary extends Component {

    state = {
        hasError: false
    }

    componentDidCatch() {
        this.setState({ hasError: true })
    }

    render() {
        if (this.state.hasError) {
            return <div>Something went wrong...</div>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;