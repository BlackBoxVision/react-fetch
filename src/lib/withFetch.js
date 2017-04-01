import React from 'react';
import fetch from 'isomorphic-fetch';

export default function withFetch(options) {
    const {
        url,
        config,
        delay = 2000,
        polling = false,
        renderOnServer = false,
        LoadingComponent = ({ message = "Loading..." }) => <div>{message}</div>,
        ErrorComponent = ({ error: { message, stack } }) => <div>{message}</div>
    } = options;

    return ReactComponent => {
        class FetchComponent extends React.Component {
            state = {
                loading: true,
                data: null,
                error: null
            }

            componentDidMount() {
                if (!polling) {
                    !renderOnServer && this.fetchTimeout();
                } else {
                    !renderOnServer && this.fetchInterval();
                }
            }

            componentWillMount() {
                //On server we only fetch data needed once. Polling is done client side.
                !polling && renderOnServer && this.fetchTimeout();
            }

            componentWillUnmount() {
                this.interval && clearInterval(this.interval);
                this.timeout && clearTimeout(this.timeout);
            }

            render() {
                const { state: { loading, data, error }, props } = this;

                if (loading) {
                    return <LoadingComponent/>;
                } else if (error) {
                    return <ErrorComponent error={error}/>
                } else {
                    return <ReactComponent jsonData={data} {...props}/>
                }
            }

            async fetchData() {
                try {
                    if (!url) {
                        throw 'URL is undefined. You should define url key in your options object.';
                    }

                    if (!config || config === {}) {
                        throw 'Config is undefined or empty. You should define config key in your options object.';
                    }

                    const response = await fetch(url, config);
                    const data = await response.json();

                    this.setState({ data, loading: !this.state.loading })
                } catch (error) {
                    this.setState({ error, loading: !this.state.loading });
                }
            }

            fetchInterval() {
                this.interval = setInterval(this.fetchData, delay);
            }

            fetchTimeout() {
                this.timeout = setTimeout(this.fetchData, delay);
            }
        }

        return FetchComponent;
    };
}