import './App.css';
import { Route, Switch } from 'react-router-dom';
import { SignIn } from './components/signin';
import { ToastContainer } from 'react-toastify';
import MiniDrawer from './components/sidebar';
import PrivateRoute from './components/layout/PrivateRoute';
import CompanyTable from './components/company/CompanyTable';
import ProductTable from './components/products/ProductTable';
import WorkersTable from './components/workers/WorkersTable';
import ServicesTable from './components/services/ServicesTable';
import NewsTable from './components/news/NewsTable';
import StatisticsTable from './components/statistics/StatisticsTable';
import TypesTable from './components/types/TypesTable';
import AboutTable from './components/about/AboutTable';

function App() {
    return (
        <>
            <Switch>
                <Route component={SignIn} path={'/login'} />
                <div>
                    <MiniDrawer>
                        <PrivateRoute component={CompanyTable} exact />
                        <PrivateRoute
                            component={TypesTable}
                            path="/discount"
                            exact
                        />
                        <PrivateRoute
                            component={ProductTable}
                            path="/products"
                            exact
                        />
                        <PrivateRoute
                            component={WorkersTable}
                            path="/workers"
                            exact
                        />
                        <PrivateRoute
                            component={ServicesTable}
                            path="/services"
                            exact
                        />
                        <PrivateRoute
                            component={NewsTable}
                            path="/news"
                            exact
                        />
                        <PrivateRoute
                            component={StatisticsTable}
                            path="/statistics"
                            exact
                        />
                        <PrivateRoute
                            component={AboutTable}
                            path="/about"
                            exact
                        />
                    </MiniDrawer>
                </div>
            </Switch>
            <ToastContainer />
        </>
    );
}

export default App;
