import './index.css';
import './Components/ShaderEditor/store/store';
import './App';
import config from "recompose/rxjsObservableConfig";
import {setObservableConfig} from "recompose";
setObservableConfig(config)
