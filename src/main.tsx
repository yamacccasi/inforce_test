import { createRoot } from 'react-dom/client'
import ProductList from './ProductList.tsx'
import {Provider} from "react-redux";
import store from '../src/redux/store.ts'
// @ts-ignore
import './App.css';


createRoot(document.getElementById('root')!).render(
      <Provider store={store}>
    <ProductList />
      </Provider>
)
