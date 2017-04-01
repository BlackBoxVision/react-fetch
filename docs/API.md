# API

In these API docs, a **higher-order component (HOC)** refers to a function that accepts a single React component and returns a new React component.

**withFetch** helper is a function that return a **higher-order component**:

```javascript
import { withFetch } from 'react-fetch-hoc';

const BaseComponent = props => <div>{JSON.stringify(props.jsonData, null, 2)}</div>;

//Options needed by react-fetch HOC
const options = {
    url: '/api/users',
    config: {
        method: 'GET'
    },
    delay: 2000,
    polling: false,
    renderOnServer: false,
    LoadingComponent: ({ message = "Loading..." }) => <div>{message}</div>,
    ErrorComponent: ({ error: { message, stack } }) => <div>{message}</div>
};

const hoc = withFetch(options);
const EnhancedComponent = hoc(BaseComponent);

// Same as
const EnhancedComponent = withFetch(options)(BaseComponent);
```

Also, another way to use is as a **decorator**: 

```javascript
import { withFetch } from 'react-fetch-hoc';

@withFetch(options)
class BaseComponent extends React.Component { ... }
```

## TOC

* [Higher-order component](#higher-order-component)
  + [`withFetch()`](###withFetch)
  
## Higher-order component

### `withFetch(options: Object)`