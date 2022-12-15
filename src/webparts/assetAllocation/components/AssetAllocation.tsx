import * as React from 'react';
// import styles from './AssetAllocation.module.scss';
// import "./global.module.scss";
import "./global.scss";
import "./utils.scss";
import "./assets/icon.scss";
// import "./mediaquery.module.scss";
import * as jQuery from "jquery";
import { IAssetAllocationProps } from './IAssetAllocationProps';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import {
  Home,
  Error,
  Landing,
  Dashboard,
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
  OfficeManager,
  OfficeManagerManage,
  OfficeManagerDetail,
  HR,
  HRManage,
  HRDetail,
  Settings,
} from './screens'
import { getUserData, getUserGroups, validateUserRole } from '../utils/listUtils';


// export default class AssetAllocation extends React.Component<IAssetAllocationProps, {}> {
export default class AssetAllocation extends React.Component<IAssetAllocationProps, any> {
  public constructor(props: IAssetAllocationProps, any) {
    super(props);
    this.state = {
      isEM: true,
      isOM: false,
      isHR: false,
    };
  }

  public render(): React.ReactElement<IAssetAllocationProps> {

    // // jQuery("#workbenchPageContent").prop("style", "max-width: none");
    // // jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    // // jQuery(".CanvasZone").prop("style", "max-width: none");

    // // jQuery("#workbenchPageContent").prop("style", "min-height: 900px; max-width: none");
    // // jQuery(".SPCanvas-canvas").prop("style", "min-height: 900px; max-width: none");
    // // jQuery(".CanvasZone").prop("style", "min-height: 900px; max-width: none");

    jQuery("#workbenchPageContent").prop("style", "min-height: none; max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "min-height: none; max-width: none");
    jQuery(".CanvasZone").prop("style", "min-height: none; max-width: none");

    const queryClient = new QueryClient()

    const OMRoutes = () => (
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/app/landing" exact component={Landing} />
        <Route path="/app/dashboard" exact component={Dashboard} />

        <Route path="/app/asset/manage" exact component={AssetManage} />
        <Route path="/app/asset/:id?" exact component={Asset} />
        <Route path="/app/asset/detail/:id?" exact component={AssetDetail} />

        <Route path="/app/branch/manage" exact component={BranchManage} />
        <Route path="/app/branch/:id?" exact component={Branch} />
        <Route path="/app/branch/detail/:id?" exact component={BranchDetail} />

        <Route path="/app/category/manage" exact component={CategoryManage} />
        <Route path="/app/category/:id?" exact component={Category} />
        <Route path="/app/category/detail/:id?" exact component={CategoryDetail} />

        <Route path="/app/request/:id?" exact component={Request} />
        <Route path="/app/request/manage/all" exact component={RequestManage} />
        <Route path="/app/request/manage/pending" exact render={() => <RequestManage status="Pending" />} />
        <Route path="/app/request/manage/approved" exact render={() => <RequestManage status="Approved" />} />
        <Route path="/app/request/manage/declined" exact render={() => <RequestManage status="Declined" />} />
        <Route path="/app/request/detail/:id?" exact component={RequestDetail} />

        <Route component={Error} />
      </Switch>
    )

    const EMRoutes = () => (
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/app/employee/landing" exact render={() => <Landing section = "employee" />} />
        <Route path="/app/employee/dashboard" exact render={() => <Dashboard section = "employee" />} />

        <Route path="/app/employee/request/:id?" exact component={Request} />
        <Route path="/app/employee/request/manage/all" exact render={() => <RequestManage section="employee" />} />
        <Route path="/app/employee/request/manage/pending" exact render={() => <RequestManage status="Pending" section="employee" />} />
        <Route path="/app/employee/request/manage/approved" exact render={() => <RequestManage status="Approved" section="employee" />} />
        <Route path="/app/employee/request/manage/declined" exact render={() => <RequestManage status="Declined" section="employee" />} />
        <Route path="/app/employee/request/detail/:id?" exact render={() => <RequestDetail section="employee" />} />

        <Route component={Error} />
      </Switch>
    )

    const HRRoutes = () => (
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/app/hr/landing" exact render={() => <Landing section = "hr" />} />
        <Route path="/app/hr/dashboard" exact render={() => <Dashboard section = "hr" />} />

        <Route path="/app/hr/request/:id?" exact component={Request} />
        <Route path="/app/hr/request/manage/all" exact render={() => <RequestManage section="hr" />} />
        <Route path="/app/hr/request/manage/pending" exact render={() => <RequestManage status="Pending" section="hr" />} />
        <Route path="/app/hr/request/manage/approved" exact render={() => <RequestManage status="Approved" section="hr" />} />
        <Route path="/app/hr/request/manage/declined" exact render={() => <RequestManage status="Declined" section="hr" />} />
        <Route path="/app/hr/request/detail/:id?" exact render={() => <RequestDetail section="hr" />} />

        <Route component={Error} />
      </Switch>
    )

    // return (
    //   <QueryClientProvider client={queryClient}>
    //     <HashRouter>
    //     {this.state.isOM && <OMRoutes />}
    //     {this.state.isHR && <HRRoutes />}
    //     {this.state.isEM && <EMRoutes />}
    //     </HashRouter>
    //     <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    //   </QueryClientProvider>
    // )

    return (
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Home} />

            {this.state.isOM && <Route path="/app/landing" exact component={Landing} />}
            {this.state.isHR && <Route path="/app/hr/landing" exact render={() => <Landing section = "hr" />} />}
            {this.state.isEM && <Route path="/app/employee/landing" exact render={() => <Landing section = "employee" />} />}

            {this.state.isOM && <Route path="/app/dashboard" exact component={Dashboard} />}
            {this.state.isHR && <Route path="/app/hr/dashboard" exact render={() => <Dashboard section = "hr" />} />}
            {this.state.isEM && <Route path="/app/employee/dashboard" exact render={() => <Dashboard section = "employee" />} />}
            
            {this.state.isOM && <Route path="/app/settings" exact component={Settings} />}

            {/* {this.state.isOM && <> */}
            {this.state.isOM && <Route path="/app/asset/manage" exact component={AssetManage} />}
            {this.state.isOM && <Route path="/app/asset/:id?" exact component={Asset} />}
            {this.state.isOM && <Route path="/app/asset/detail/:id?" exact component={AssetDetail} />}

            {this.state.isOM && <Route path="/app/branch/manage" exact component={BranchManage} />}
            {this.state.isOM && <Route path="/app/branch/:id?" exact component={Branch} />}
            {this.state.isOM && <Route path="/app/branch/detail/:id?" exact component={BranchDetail} />}

            {this.state.isOM && <Route path="/app/category/manage" exact component={CategoryManage} />}
            {this.state.isOM && <Route path="/app/category/:id?" exact component={Category} />}
            {this.state.isOM && <Route path="/app/category/detail/:id?" exact component={CategoryDetail} />}

            {this.state.isOM && <Route path="/app/om/manage" exact component={OfficeManagerManage} />}
            {this.state.isOM && <Route path="/app/om/:id?" exact render={(props) => <OfficeManager context={this.props.context} />} />}
            {this.state.isOM && <Route path="/app/om/detail/:id?" exact component={OfficeManagerDetail} />}

            {this.state.isOM && <Route path="/app/hr/manage" exact component={HRManage} />}
            {this.state.isOM && <Route path="/app/hr/:id?" exact render={(props) => <HR context={this.props.context} />} />}
            {this.state.isOM && <Route path="/app/hr/detail/:id?" exact component={HRDetail} />}

            {this.state.isOM && <Route path="/app/request/:id?" exact component={Request} />}
            {this.state.isOM && <Route path="/app/request/manage/all" exact component={RequestManage} />}
            {this.state.isOM && <Route path="/app/request/manage/pending" exact render={() => <RequestManage status="Pending" />} />}
            {this.state.isOM && <Route path="/app/request/manage/approved" exact render={() => <RequestManage status="Approved" />} />}
            {this.state.isOM && <Route path="/app/request/manage/declined" exact render={() => <RequestManage status="Declined" />} />}
            {this.state.isOM && <Route path="/app/request/detail/:id?" exact component={RequestDetail} />}
            {/* </>} */}

            {/* {this.state.isEM && <> */}
            {this.state.isEM && <Route path="/app/employee/landing" exact render={() => <Landing section = "employee" />} />}
            {this.state.isEM && <Route path="/app/employee/dashboard" exact render={() => <Dashboard section = "employee" />} />}

            {this.state.isEM && <Route path="/app/employee/request/:id?" exact component={Request} />}
            {this.state.isEM && <Route path="/app/employee/request/manage/all" exact render={() => <RequestManage section="employee" />} />}
            {this.state.isEM && <Route path="/app/employee/request/manage/pending" exact render={() => <RequestManage status="Pending" section="employee" />} />}
            {this.state.isEM && <Route path="/app/employee/request/manage/approved" exact render={() => <RequestManage status="Approved" section="employee" />} />}
            {this.state.isEM && <Route path="/app/employee/request/manage/declined" exact render={() => <RequestManage status="Declined" section="employee" />} />}
            {this.state.isEM && <Route path="/app/employee/request/detail/:id?" exact render={() => <RequestDetail section="employee" />} />}
            {/* </>} */}

            {/* {this.state.isHR && <> */}
            {this.state.isHR && <Route path="/app/hr/request/:id?" exact component={Request} />}
            {this.state.isHR && <Route path="/app/hr/request/manage/all" exact render={() => <RequestManage section="hr" />} />}
            {this.state.isHR && <Route path="/app/hr/request/manage/pending" exact render={() => <RequestManage status="Pending" section="hr" />} />}
            {this.state.isHR && <Route path="/app/hr/request/manage/approved" exact render={() => <RequestManage status="Approved" section="hr" />} />}
            {this.state.isHR && <Route path="/app/hr/request/manage/declined" exact render={() => <RequestManage status="Declined" section="hr" />} />}
            {this.state.isHR && <Route path="/app/hr/request/detail/:id?" exact render={() => <RequestDetail section="hr" />} />}
            {/* </>} */}

            <Route component={Error} />
          </Switch>
        </HashRouter>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    );
  }

  public componentDidMount() {
    this._userProfile();
  }

  private _userProfile(): void {
    
    // getUserData().then((data) => console.log({userData: data}))
    // getUserGroups().then((data) => console.log({userGroups: data}))

    validateUserRole("").then((data) => {
      console.log({isUserOfficeManager: data, 'this.state': this.state})
      this.setState({
        ...this.state,
        isOM: data,
      });
    })
    validateUserRole("employee").then((data) => {
      console.log({isUserEmployee: data})
      this.setState({
        ...this.state,
        isEM: data,
      });
    })
    validateUserRole("hr").then((data) => {
      console.log({isUserHr: data})
      this.setState({
        ...this.state,
        isHR: data,
      });
    })

  }
}
