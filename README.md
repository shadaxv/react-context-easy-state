# react-context-easy-state

Super simple state management for React apps.

## Install

```sh
npm i react-context-easy-state
```

## Usage

Read Luke Hall's [State Management with React Hooks and Context API at 10 lines of code!](https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c) article on Medium or follow these steps:

1. Wrap your React App into `StateProvider`.

2. Pass context name, default state and reducer (simple function that accepts `state` object and `action` object):

```jsx harmony
import { StateProvider } from 'react-context-easy-state';

const initialState = {
  theme: { primary: 'green' }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'changeTheme':
      return {
        ...state,
        theme: action.newTheme
      };
    default:
      return state;
  }
};

const App = () => {
  return (
    <StateProvider
      contextName="main"
      initialState={initialState}
      reducer={reducer}
    >
      // App content...
    </StateProvider>
  );  
}
```

3\. Use and update your state in any component inside your App.
`useStateValue` function returns array, where first item is `state` object and second item is `dispatch` function that accepts the `action` as a parameter. 

```jsx harmony
import { getState } from 'react-context-easy-state';

const ThemedButton = () => {
  const [{ theme }, dispatch] = useStateValue("main");
  
  return (
    <Button
      primaryColor={theme.primary}
      onClick={() => dispatch({
        type: 'changeTheme',
        newTheme: { primary: 'blue'}
      })}
    >
      Make me blue!
    </Button>
  );
}
```

That's it. State management have never been easier!
