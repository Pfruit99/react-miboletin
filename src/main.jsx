import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import "../src/i18n"
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor }  from "./store"
import setupAxios from "./helpers/Api/axiosInit"
import axios from 'axios'

setupAxios(axios, store);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div className="loading" />}>
        <Suspense fallback={ <div className="loading" /> }>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
      </PersistGate>
    </Provider>
  </React.Fragment>
);

serviceWorker.unregister();
