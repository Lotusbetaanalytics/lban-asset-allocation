import * as React from 'react';
// import styles from './AssetAllocation.module.scss';
// import "./global.module.scss";
import "./global.scss";
import "./utils.scss";
import "./assets/icon.scss";
// import "./mediaquery.module.scss";
import * as jQuery from "jquery";
import { IAssetAllocationProps } from './IAssetAllocationProps';
// import { escape } from '@microsoft/sp-lodash-subset';
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
  Branch,
  BranchManage,
  BranchDetail,
  Category,
  CategoryManage,
  CategoryDetail,
} from './screens'
import { sp } from '@pnp/sp';


  const userData = async () =>  await sp.web.currentUser.get()
  const userGroups = async () => await sp.web.currentUser.groups.get()


// export default class AssetAllocation extends React.Component<IAssetAllocationProps, {}> {
export default class AssetAllocation extends React.Component<IAssetAllocationProps, any> {
  public constructor(props: IAssetAllocationProps, any) {
    super(props);
    this.state = {
      role: "employee",
    };
  }

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
    // const sectionUrl = ""
    
    return (
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/app/landing" exact component={Landing} />
            <Route path="/app/hr/landing" exact render={() => <Landing section = "hr" />} />
            <Route path="/app/employee/landing" exact render={() => <Landing section = "employee" />} />

            <Route path="/app/dashboard" exact component={Dashboard} />
            <Route path="/app/hr/dashboard" exact render={() => <Dashboard section = "hr" />} />
            <Route path="/app/employee/dashboard" exact render={() => <Dashboard section = "employee" />} />

            <Route path="/app/asset/manage" exact component={AssetManage} />
            <Route path="/app/asset/:id?" exact component={Asset} />
            <Route path="/app/asset/detail/:id?" exact component={AssetDetail} />

            <Route path="/app/branch/manage" exact component={BranchManage} />
            <Route path="/app/branch/:id?" exact component={Branch} />
            <Route path="/app/branch/detail/:id?" exact component={BranchDetail} />

            <Route path="/app/category/manage" exact component={CategoryManage} />
            <Route path="/app/category/:id?" exact component={Category} />
            <Route path="/app/category/detail/:id?" exact component={CategoryDetail} />

            <Route path="/app/request/manage" exact component={RequestManage} />
            <Route path="/app/request/:id?" exact component={Request} />
            <Route path="/app/request/manage/pending" exact render={() => <RequestManage status="Pending" />} />
            <Route path="/app/request/manage/approved" exact render={() => <RequestManage status="Approved" />} />
            <Route path="/app/request/manage/declined" exact render={() => <RequestManage status="Declined" />} />
            <Route path="/app/request/detail/:id?" exact component={RequestDetail} />

            <Route path="/app/employee/approval" exact component={EmployeeApproval} />
            <Route path="/app/employee/request/manage" exact render={() => <RequestManage section="employee" />} />
            <Route path="/app/employee/request/:id?" exact component={Request} />
            <Route path="/app/employee/request/manage/pending" exact render={() => <RequestManage status="Pending" section="employee" />} />
            <Route path="/app/employee/request/manage/approved" exact render={() => <RequestManage status="Approved" section="employee" />} />
            <Route path="/app/employee/request/manage/declined" exact render={() => <RequestManage status="Declined" section="employee" />} />
            <Route path="/app/employee/request/detail/:id?" exact render={() => <RequestDetail section="employee" />} />

            <Route path="/app/hr/approval" exact component={EmployeeApproval} />
            <Route path="/app/hr/request/manage" exact render={() => <RequestManage section="hr" />} />
            <Route path="/app/hr/request/:id?" exact component={Request} />
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

  public componentDidMount() {
    this._userProfile();
  }

  private _userProfile(): void {
    
    userData().then((data) => console.log({userData: data}))
    userGroups().then((data) => console.log({userGroups: data}))

    // sp.profiles.myProperties.get().then((response) => {
    //   console.log("response:", response);
    //   sp.web.lists
    //     .getByTitle(`Administrator`)
    //     .items.filter(`Title eq '${response.DisplayName}'`)
    //     .get()
    //     .then((res) => {
    //       if (res.length > 0) {
    //         this.setState({
    //           admin: true,
    //         });
    //       }
    //     });
    // });
  }
}
