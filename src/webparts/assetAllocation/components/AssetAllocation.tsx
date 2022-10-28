import * as React from 'react';
// import styles from './AssetAllocation.module.scss';
// import "./global.module.scss";
import "./global.scss";
import "./mediaquery.module.scss";
import * as jQuery from "jquery";
import { IAssetAllocationProps } from './IAssetAllocationProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { HashRouter, Switch, Route } from 'react-router-dom';
import {
  Home,
  Error,
  Landing,
  Dashboard,
  EmployeeApproval,
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
    
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route component={Error} />
          <Route path="/app/landing" exact component={Landing} />
          <Route path="/app/dashboard" exact component={Dashboard} />
          <Route path="/app/employee/approval" exact component={EmployeeApproval} />
        </Switch>
      </HashRouter>
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
