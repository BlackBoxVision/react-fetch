import React from 'react';
import fetch from 'isomorphic-fetch';

export default function withFetch(options) {
    const { url, config, delay = 200, renderOnServer, LoadingComponent, ErrorComponent } = options;

    return ReactComponent => {
        class FetchComponent extends React.Component {
            state = {
                loading: true,
                data: null,
                error: null
            }

            componentDidMount() {
                !renderOnServer && setTimeout(delay, this.fetchData);
            }

            componentWillMount() {
                renderOnServer && setTimeout(delay, this.fetchData());
            }

            render() {
                const { state: { loading, data, error }, props } = this;

                if (loading) {
                    return <LoadingComponent/>;
                } else if (error) {
                    return <ErrorComponent error={error.message} stack={error.stack}/>
                } else {
                    return <ReactComponent jsonData={data} {...props}/>
                }
            }

            async fetchData() {
                try {
                    const data = await fetch(url, config);

                    this.setState({ data, loading: !this.state.loading })
                } catch (error) {
                    this.setState({ error, loading: !this.state.loading });
                }
            }
        }
    }
}