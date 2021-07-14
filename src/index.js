import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './defaultPages/App';

import * as serviceWorker from './serviceWorker';
import { CometChat } from "@cometchat-pro/chat"

import reducer from './store/reducer';

import './index.scss';
import { loginBtn } from './defaultPages/KitchenSinkApp/style';
import Translator from './cometchat-pro-react-ui-kit/CometChatWorkspace/src/resources/localization/translator';

const store = createStore(reducer, compose(
  applyMiddleware(thunk)
));


  var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
  CometChat.init(appID, appSetting).then(async () => {
      if(CometChat.setSource) {
        CometChat.setSource("ui-kit", "web", "reactjs");
      }
    CometChat.login(uid, AUTH_KEY).then(
      user => {
        console.log("Login Successful:", { user });    
      },
      error => {
        console.log("Login failed with exception:", { error });    
      }
    );
    Translator.setLanguage(languageCultureInfo);
    console.log(languageCultureInfo);
        ReactDOM.render(
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>
        , document.getElementById('root'));
     
    },
    error => {
      console.log("Initialization failed with error:", error);
      // Check the reason for error and take appropriate action.
    }
  );

  


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
