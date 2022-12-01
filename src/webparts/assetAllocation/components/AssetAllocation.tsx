import * as React from 'react';
// import styles from './AssetAllocation.module.scss';
// import "./global.module.scss";
import "./global.scss";
import "./utils.scss";
import "./assets/icon.scss";
// import "./mediaquery.module.scss";
import * as jQuery from "jquery";
import { IAssetAllocationProps } from './IAssetAllocationProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import {
  Home,
  Error,
  Landing,
  Dashboard,
  EmployeeApproval,
  Asset,
  AssetManage,
  AssetDetail,
  Request,
  RequestManage,
  RequestDetail,
} from './screens'

// export default class AssetAllocation extends React.Component<IAssetAllocationProps, {}> {
export default class AssetAllocation extends React.Component<IAssetAllocationProps, any> {
  public render(): React.ReactElement<IAssetAllocationProps> {

    // jQuery("#workbenchPageContent").prop("style", "max-width: none");
    // jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    // jQuery(".CanvasZone").prop("style", "max-width: none");

    // jQuery("#workbenchPageContent").prop("style", "min-height: 100vh");
    // jQuery(".SPCanvas-canvas").prop("style", "min-height: 100vh");
    // jQuery(".CanvasZone").prop("style", "min-height: 100vh");

    // jQuery("#workbenchPageContent").prop("style", "min-height: 90vh; min-width: 100%");
    // jQuery(".SPCanvas-canvas").prop("style", "min-height: 90vh; min-width: 100%");
    // jQuery(".CanvasZone").prop("style", "min-height: 90vh; min-width: 100%");

    jQuery("#workbenchPageContent").prop("style", "min-height: 900px; max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "min-height: 900px; max-width: none");
    jQuery(".CanvasZone").prop("style", "min-height: 900px; max-width: none");

    const queryClient = new QueryClient()
    
    return (
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/app/landing" exact component={Landing} />
            <Route path="/app/dashboard" exact component={Dashboard} />

            <Route path="/app/asset" exact component={Asset} />
            <Route path="/app/asset/manage" exact component={AssetManage} />
            <Route path="/app/asset/detail/:id?" exact component={AssetDetail} />

            <Route path="/app/request" exact component={Request} />
            <Route path="/app/request/manage" exact component={RequestManage} />
            <Route path="/app/request/manage/pending" exact render={() => <RequestManage status="Pending" />} />
            <Route path="/app/request/manage/approved" exact render={() => <RequestManage status="Approved" />} />
            <Route path="/app/request/manage/declined" exact render={() => <RequestManage status="Declined" />} />
            <Route path="/app/request/detail/:id?" exact component={RequestDetail} />

            <Route path="/app/employee/approval" exact component={EmployeeApproval} />
            <Route path="/app/employee/request" exact component={Request} />
            <Route path="/app/employee/request/manage" exact component={RequestManage} />
            <Route path="/app/employee/request/manage/pending" exact render={() => <RequestManage status="Pending" section="employee" />} />
            <Route path="/app/employee/request/manage/approved" exact render={() => <RequestManage status="Approved" section="employee" />} />
            <Route path="/app/employee/request/manage/declined" exact render={() => <RequestManage status="Declined" section="employee" />} />
            <Route path="/app/employee/request/detail/:id?" exact render={() => <RequestDetail section="employee" />} />

            <Route path="/app/hr/approval" exact component={EmployeeApproval} />
            <Route path="/app/hr/request" exact component={Request} />
            <Route path="/app/hr/request/manage" exact component={RequestManage} />
            <Route path="/app/hr/request/manage/pending" exact render={() => <RequestManage status="Pending" section="hr" />} />
            <Route path="/app/hr/request/manage/approved" exact render={() => <RequestManage status="Approved" section="hr" />} />
            <Route path="/app/hr/request/manage/declined" exact render={() => <RequestManage status="Declined" section="hr" />} />
            <Route path="/app/hr/request/detail/:id?" exact render={() => <RequestDetail section="hr" />} />
            <Route component={Error} />
          </Switch>
        </HashRouter>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    );
    // return (
    //   <div className={ styles.assetAllocation }>
    //     <div className={ styles.container }>
    //       <div className={ styles.row }>
    //         <div className={ styles.column }>
    //           <span className={ styles.title }>Welcome to SharePoint!</span>
    //           <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
    //           <p className={ styles.description }>{escape(this.props.description)}</p>
    //           <a href="https://aka.ms/spfx" className={ styles.button }>
    //             <span className={ styles.label }>Learn more</span>
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}
