import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {TicTacToeApp} from './functions/TicTacToeApp';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(<TicTacToeApp></TicTacToeApp>);

reportWebVitals();
