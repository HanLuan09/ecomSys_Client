import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import PropTypes from 'prop-types';

function DefaultLayout({children}) {
    return (
        <>
           <Header/>
           <Sidebar/>
           <div style={{ paddingTop: '13rem' }}>
                {children}
            </div>
            <Footer/>
        </>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;