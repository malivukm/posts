import React, { useContext } from 'react';
// import logo from './logo.svg';
import './App.css';
import { PostSingle } from './components/postSingle';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NotFound } from './components/notFound';
import { Posts } from './components/posts';
import { AppContext } from './context/appContext';

function App(): JSX.Element {
  const appContext = useContext(AppContext);
  return (
    <BrowserRouter basename={''}>
      <Switch>
        <Route exact path={'/posts'} render={() => <Posts message={appContext.message} />} />
        <Route
          path={'/post/:id'}
          render={(routeProps) => {
            return <PostSingle postId={routeProps.match.params.id} message={appContext.message} />;
          }}
        />
        <Route path="*" render={() => <NotFound message={appContext.message} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
