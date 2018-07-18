import React,{Component} from 'react';
import { Provider } from 'react-redux';
import { render } from "react-dom";
import store from 'reduxStore';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch  } from 'react-router-dom';
import { precon_preconReqList } from '../pages';

const Root = () => {
  return (    
    <BrowserRouter basename="/IctClean2/precon/precon_preconReq">
      <Provider store={store}>
          <div>            
            {/* <Route exact path="/detail/:userId" component={spch_preconMemberDetail}/>
            <Route exact path="/detail/:userId/precon/:precon" component={spch_preconReqDetail}/> */}
            <Route path="/list"           component={precon_preconReqList}/>
          </div>
      </Provider> 
    </BrowserRouter>
  );
};
//export default Root;
render(<Root />, document.getElementById('list') );