import { mode } from './../parameters/parameters.js';
import clusterServer from './clusterServer.js';
import forkServer from './forkServer.js';

export default function initializeServer(httpServer, port){
    switch(mode){
        case "FORK":
            forkServer(httpServer, port);
            break;
        case "CLUSTER":
            clusterServer(httpServer, port);
            break;
        default:
            forkServer(httpServer, port);
            break;
    }
}